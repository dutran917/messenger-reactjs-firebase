/** @format */

import { Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../Context/AppProvider";
import { db } from "../../firebase/config";
const AddMember = () => {
  const { inviteVisible, setInviteVisible, selectedRoomId, selectedRoom } =
    useContext(AppContext);
  const [value, setValue] = useState(null);
  useEffect(() => {
    return () => {
      setValue(null);
    };
  }, []);
  useEffect(() => {
    console.log(value);
  }, [value]);
  const handleOk = () => {
    const roomRef = db.collection("rooms").doc(selectedRoomId);
    setValue(null);
    roomRef.update({
      members: [...selectedRoom.members, value.value],
    });
    form.resetFields();
    setInviteVisible(false);
    // window.location.reload();
  };
  const handleCancel = () => {
    setValue(null);
    form.resetFields();
    setInviteVisible(false);
  };
  const [form] = Form.useForm();

  const DebounceSearch = () => {
    const [options, setOptions] = useState([]);
    const loadUser = useMemo(() => {
      const fetchData = (value) => {
        setOptions([]);
        // setValue(null)
        searchUser(value).then((data) => {
          setOptions(data);
        });
      };
      return debounce(fetchData, 300);
    }, [searchUser]);
    useEffect(() => {
      console.log(options);
    }, [options]);
    return (
      <Select
        labelInValue
        showSearch
        value={value}
        filterOption={false}
        notFoundContent={<Spin></Spin>}
        onSearch={loadUser}
        onChange={(val) => setValue(val)}
        name='search-user'
        label='Tên các thành viên'
        placeholder='Nhập tên thành viên'
        style={{ width: "100%" }}>
        {options.map((item) => (
          <Select.Option key={item.uid} value={item.uid}>
            {`${item.displayName}`}
          </Select.Option>
        ))}
      </Select>
    );
  };
  const searchUser = async (search) => {
    return db
      .collection("users")
      .where("keywords", "array-contains", search.charAt(0).toUpperCase())
      .get()
      .then((snapshot) => {
        const a = snapshot.docs.map((item) => {
          return item.data();
        });
        // setOptions(a)
        return a;
      });
  };

  return (
    <Modal
      title='Add a new member'
      visible={inviteVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      destroyOnClose={true}>
      <Form form={form} layout='vertical'>
        <DebounceSearch></DebounceSearch>
      </Form>
    </Modal>
  );
};

export default AddMember;
