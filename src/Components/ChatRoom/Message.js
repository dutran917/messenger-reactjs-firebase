import { Avatar, Tooltip } from 'antd'
import { formatRelative } from 'date-fns'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
const Message = ({ text, avt, name, time, userId }) => {
  const { uid } = useContext(AuthContext)
  function formatDate(seconds) {
    let formattedDate = '';

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  }
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-start',
      flexDirection: userId == uid ? 'row-reverse' : 'row',
      alignItems: 'center',
      margin: '10px'
    }}>
      <div className='message-info'>
        <Tooltip title={name}>
          <Avatar src={avt}>A</Avatar>
        </Tooltip>
      </div>
      <div className='message-content' style={{
        background: userId == uid ? 'lightblue' : '#e4e6eb',
        maxWidth: '300px',
        borderRadius: '10px',
        padding: '5px 10px',
        marginRight: '8px'
      }}>
        <Tooltip title={formatDate(time?.seconds)}>
          <p style={{
            fontSize: '16px',
            marginBottom: 0
          }}>{text}</p>
        </Tooltip>
      </div>
    </div>
  )
}

export default Message