import { useHistory } from 'react-router-dom'
import { auth } from '../firebase/config'
import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { Spin } from 'antd'
export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    const history = useHistory()
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const unsubscribed = auth.onAuthStateChanged((user) => {
            if (user) {
                const { displayName, email, uid, photoURL } = user
                setUser({ displayName, email, uid, photoURL })
                setIsLoading(false)
                history.push('/')
                return
            }
            setUser({})
            // setSelectedRoom({})
            setIsLoading(false)
            history.push('/login')
        })
        return () => {
            unsubscribed()
        }
    }, [history])

    return (
        <AuthContext.Provider value={user}>
            {isLoading ? <Spin></Spin> : children}
        </AuthContext.Provider>
    )
}

export default AuthProvider