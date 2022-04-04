import { Alert, Col, Row } from 'antd'
import React, { useContext } from 'react'
import DisplayChat from './DisplayChat'
import Sidebar from './Sidebar'
import './index.css'
import { AppContext } from '../../Context/AppProvider'
const ChatRoom = () => {
  const { selectedRoomId } = useContext(AppContext)
  return (
    <div>
      <Row>
        <Col span={6}>
          <Sidebar></Sidebar>
        </Col>
        <Col span={18}>
          {
            selectedRoomId.length > 0 ?
              <DisplayChat></DisplayChat> :
              <Alert
                message="Choose a room chat"
                type="warning"
                closable
              />
          }
        </Col>
      </Row>
    </div>
  )
}

export default ChatRoom