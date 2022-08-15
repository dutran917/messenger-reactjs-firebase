import { Avatar, Button, Typography } from "antd";
import React, { useContext } from "react";
import { auth } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import { AppContext } from "../../Context/AppProvider";
const UserInfo = () => {
  const { displayName, photoURL } = useContext(AuthContext);
  const { clearLogout } = useContext(AppContext);
  const logout = () => {
    auth.signOut();
    clearLogout();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 10px",
      }}
    >
      <div>
        <Avatar src={photoURL}></Avatar>
        <Typography.Text
          style={{
            color: "white",
            marginLeft: "5px",
          }}
        >
          {displayName}
        </Typography.Text>
      </div>
      <Button ghost onClick={logout}>
        Logout
      </Button>
    </div>
  );
};

export default UserInfo;
