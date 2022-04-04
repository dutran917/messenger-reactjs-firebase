import { Avatar } from 'antd'
import React from 'react'

const Message = ({text,avt,name,time}) => {
  return (
    <div>
        <div className='message-info'>
            <Avatar src={avt}>A</Avatar>
            <h4>{name}</h4>
            <p>{time}</p>
        </div>
        <div className='message-content'>
            <p>{text}</p>
        </div>
    </div>
  )
}

export default Message