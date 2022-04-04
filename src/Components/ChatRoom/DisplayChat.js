import { UserAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Form, Input, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { db } from '../../firebase/config'
import { useEffect } from 'react'
import Message from './Message'
import { AppContext } from '../../Context/AppProvider'
const DisplayChat = () => {
  // useEffect(() => {
  //   db.collection('rooms').get().then(res => {
  //     res.docs.map((doc) => console.log(doc.data()))
  //   })
  // }, [])
  const { selectedRoom, members, setInviteVisible } = useContext(AppContext)
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
      <div className='display-chat-content'>
        {/* <div className='message-list'>
          {
            selectedRoom.message.map((item) => (
              <Message avt={null} text={item} name='du' time={1234}></Message>
            ))
          }
        </div> */}
        <Form>
          <Form.Item>
            <Input autoComplete='off' placeholder='Type your message...'></Input>
          </Form.Item>
          <Button type='primary'>Send</Button>
        </Form>
      </div>
    </div>
  )
}

export default DisplayChat