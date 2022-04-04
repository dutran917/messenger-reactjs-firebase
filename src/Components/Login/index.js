import React from 'react'
import { Row, Col, Typography, Button } from 'antd'
import firebase, { auth, db } from '../../firebase/config'
import { GoogleCircleFilled } from '@ant-design/icons'
import { addDocument, generateKeywords } from '../../firebase/service'
const { Title } = Typography
const fbProvider = new firebase.auth.FacebookAuthProvider()
const ggProvideer = new firebase.auth.GoogleAuthProvider()
const Login = () => {
    const loginWithFb = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(fbProvider)
        if (additionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                providerId: additionalUserInfo.providerId
            })
        }
    }
    const loginWithGoogle = async () => {
        const { additionalUserInfo, user } = await auth.signInWithPopup(ggProvideer)
        if (additionalUserInfo.isNewUser) {
            addDocument('users', {
                displayName: user.displayName,
                email: user.email,
                uid: user.uid,
                photoURL: user.photoURL,
                providerId: additionalUserInfo.providerId,
                keywords: generateKeywords(user.displayName)
            })
        }
    }
    return (
        <div>
            <Row justify='center' style={{ height: '800px' }}>
                <Col span={8}>
                    <Title style={{ textAlign: 'center' }} level={3}>
                        Messager
                    </Title>
                    <Button style={{ marginBottom: '5px', width: '100%' }} onClick={loginWithFb}>
                        Login with Facebook
                    </Button>
                    <Button style={{ width: '100%' }} onClick={loginWithGoogle} icon={<GoogleCircleFilled />}>
                        Login with Google
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default Login