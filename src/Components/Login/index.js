import React from "react";
import "./index.css";
import { Button } from "antd";
import firebase, { auth } from "../../firebase/config";
import { GoogleCircleFilled } from "@ant-design/icons";
import { addDocument, generateKeywords } from "../../firebase/service";
const ggProvideer = new firebase.auth.GoogleAuthProvider();
const Login = () => {
  const loginWithGoogle = async () => {
    const { additionalUserInfo, user } = await auth.signInWithPopup(
      ggProvideer
    );
    if (additionalUserInfo.isNewUser) {
      addDocument("users", {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoURL: user.photoURL,
        providerId: additionalUserInfo.providerId,
        keywords: generateKeywords(user.displayName),
      });
    }
  };
  return (
    <div className="login">
      <div>
        <p className="app-name"> Messenger </p>
        <Button
          style={{ width: "300px", height: "50px" }}
          onClick={loginWithGoogle}
          icon={<GoogleCircleFilled />}
        >
          <span className="lg-btn">Login with Google</span>
        </Button>
      </div>
    </div>
  );
};

export default Login;
