import { PlusSquareOutlined } from '@ant-design/icons'
import { Button, Collapse, Typography } from 'antd'
import { useContext, useEffect } from 'react'
import { AppContext } from '../../Context/AppProvider'
import AddRoom from '../Modal/AddRoom'
const { Panel } = Collapse
const RoomList = () => {
    const { setAddRoomVisible } = useContext(AppContext)
    const { rooms,setSelectedRoomId } = useContext(AppContext)
    return (
        <Collapse ghost defaultActiveKey={['1']}>
            <Panel header='CHATROOMS LIST' key='1'>
                {
                    rooms.map((item) => <Typography.Link key={item.id} onClick={()=>setSelectedRoomId(item.id)}>{item.name}</Typography.Link>)
                }
                <Button type='text' style={{ color: 'white' }} icon={<PlusSquareOutlined />} onClick={() => setAddRoomVisible(true)}>Add room</Button>
        
            </Panel>
        </Collapse>
    )
}

export default RoomList