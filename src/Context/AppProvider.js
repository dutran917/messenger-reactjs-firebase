import React, { createContext, useEffect } from 'react'
import { useContext, useMemo, useState } from 'react'
import { AuthContext } from './AuthProvider'
import useFirestore from '../hook/useFirestore'
export const AppContext = createContext()
const AppProvider = ({ children }) => {
    const [addRoomVisible, setAddRoomVisible] = useState(false)
    const [selectedRoomId, setSelectedRoomId] = useState('')
    const [inviteVisible, setInviteVisible] = useState(false)
    const { uid } = useContext(AuthContext)
    const roomCondition = useMemo(() => {
        return {
            fieldName: 'members',
            operator: 'array-contains',
            compareVal: uid
        }
    }, [uid])
    const rooms = useFirestore('rooms', roomCondition)
    // const [selectedRoom,setSelectedRoom] = useState(null)
    // useEffect(()=>{
    //     const tmp = rooms.find((room) => room.id === selectedRoomId) || {}
    //     setSelectedRoom(tmp)
    // },[selectedRoomId])
    const selectedRoom = useMemo(()=>
        rooms.find((room) => room.id === selectedRoomId) || {}
    ,[selectedRoomId])
    const userCondition = useMemo(() => {
        return {
            fieldName: 'uid',
            operator: 'in',
            compareVal: selectedRoom.members
        }

    }, [selectedRoom.members])

    const members = useFirestore('users', userCondition)
    const clearLogout = () => {
        setSelectedRoomId('')
        setInviteVisible(false)
        setAddRoomVisible(false)
    }
    return (
        <AppContext.Provider value={{
            rooms,
            addRoomVisible,
            setAddRoomVisible,
            selectedRoomId,
            setSelectedRoomId,
            selectedRoom,
            members,
            inviteVisible,
            setInviteVisible,
            clearLogout
        }}>
            {
                children
            }
        </AppContext.Provider>
    )
}

export default AppProvider