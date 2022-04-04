import { Alert, Form, Input, Modal } from 'antd'
import { useContext, useState } from 'react'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { addDocument } from '../../firebase/service'
import './index.css'
const AddRoom = () => {
    const { addRoomVisible, setAddRoomVisible } = useContext(AppContext)
    const [name, setName] = useState('')
    const [des, setDes] = useState('')
    const user = useContext(AuthContext)
    const x = document.getElementById('form')
    const [noti,setNoti] = useState(null)
    const handleOk = () => {
        if (name.length > 0) {
            addDocument('rooms', {
                description: des,
                name: name,
                members: [user.uid],
                message: []
            })
            setAddRoomVisible(false)
            setName('')
            setDes('')
            x.reset()
            setNoti(null)
        }
        else{
            setNoti("Room's name cant be empty")
        }
    }
    const handleCancel = () => {
        setAddRoomVisible(false)
        setNoti(null)
        x.reset()
    }
    return (
        <Modal
            visible={addRoomVisible}
            title="Add a new room"
            onOk={handleOk}
            onCancel={handleCancel}
        >   
            {
                noti ? <Alert message={noti} type='error' closable></Alert> : <></>
            }
            <Form id='form'>
                <Form.Item label="Room's name" name='name' className='form-item'>
                    <Input placeholder='name' onChange={(e) => setName(e.target.value)}>
                    </Input>
                </Form.Item>
                <Form.Item label="Room's description" name='description' className='form-item'>
                    <Input.TextArea placeholder='description' onChange={(e) => setDes(e.target.value)}>
                    </Input.TextArea>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddRoom