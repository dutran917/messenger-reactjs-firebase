import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Tooltip } from 'antd'
import React, { useContext, useMemo, useRef, useState } from 'react'
import firebase, { db } from '../../firebase/config'
import { useEffect } from 'react'
import Message from './Message'
import './index.css'
import { AppContext } from '../../Context/AppProvider'
import { AuthContext } from '../../Context/AuthProvider'
import { addDocument } from '../../firebase/service'
import useFirestore from '../../hook/useFirestore'
const DisplayChat = () => {

  const { selectedRoom, selectedRoomId, members, setInviteVisible } = useContext(AppContext)
  const user = useContext(AuthContext)
  const [msg,setMsg] = useState('')
  const [form] = Form.useForm()
  const handleOnchange = (e) => {
    setMsg(e.target.value)
  }
  const messageRef = useRef(null)
  const inputRef = useRef(null)
  const handleSubmit = () => {
    addDocument('messages',{
      uid: user.uid,
      mess: msg,
      avt: user.photoURL,
      name: user.displayName,
      roomId: selectedRoomId,
      createAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    form.resetFields(['mess'])
    if (inputRef?.current) {
      setTimeout(() => {
        inputRef.current.focus()
      })
    }
  }
  const roomCondition = useMemo(()=>{
    return {
      fieldName: 'roomId',
      operator: '==',
      compareVal: selectedRoomId
    }
  },[selectedRoomId])
  const messages = useFirestore('messages',roomCondition)
  useEffect(() => {
    if (messageRef?.current) {
      messageRef.current.scrollTop =
        messageRef.current.scrollHeight + 50
    }
  }, [messages])

  return (
    <div className='display-chat'>
      <div className='display-chat-header'>
        <div className='room-info'>
          <p>{selectedRoom.name}</p>
          <span>{selectedRoom.description}</span>
        </div>
        <div className='room-member'>
          <Button icon={<UserAddOutlined />} onClick={() => setInviteVisible(true)}>Add member</Button>
          <Avatar.Group size='small' maxCount={2}>
            {members.map((member) => (
              <Tooltip title={member.displayName} key={member.id}>
                <Avatar src={member.photoURL}>
                  {member.photoURL
                    ? ''
                    : member.displayName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
      </div>
      <div className='display-chat-content' id='chat'>
        <div className='message-list' ref={messageRef}>
          {
            messages.map((item)=>(
              <Message text={item.mess} avt={item.avt} name={item.name} key={item.id} userId={item.uid} time={item.createAt}></Message>
            ))
          }
        </div>
        <Form form={form}>
          <Form.Item name='mess'>
            <Input 
            autoComplete='off' 
            placeholder='Type your message...'
            onPressEnter={handleSubmit}
            onChange={handleOnchange}
            ref={inputRef}
            ></Input>
          </Form.Item>
          <Button type='primary' onClick={handleSubmit}>Send</Button>
        </Form>
      </div>
    </div>
  )
}

export default DisplayChat