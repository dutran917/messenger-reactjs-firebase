import { Col, Row } from 'antd'
import React from 'react'
import RoomList from './RoomList'
import UserInfo from './UserInfo'

const Sidebar = () => {
  return (
    <div style={{
      background: '#3f0e40',
      height: '100vh',
      color: 'white'
    }}>
      <Row>
        <Col span={24}>
          <UserInfo></UserInfo>
        </Col>
        <Col span={24}>
          <RoomList></RoomList>
        </Col>
      </Row>
    </div>
  )
}

export default Sidebar