import React, { useEffect, useState } from "react";
import { Card } from "antd";
import RegisterForm from "../../../components/Admin/RegisterForm";
import { getAccessTokenApi } from "../../../api/auth";
import { getUserApi } from "../../../api/admin";
import {ADMIN_ID} from "../../../utils/constants";

import "./UserAdd.scss";

export default function UserAdd() {
  const [ user, setUser] = useState([]);
  const token = getAccessTokenApi();

  useEffect(()=>{
    getUserApi(token, localStorage.getItem(ADMIN_ID)).then(response => {
      setUser(response.userData);
    })
    if(user.privilege=="2"){
     window.location.href = "/admin/profile";
    }
  });

  return (
    <Card className="user-add__card">
      {user.privilege==1?<RegisterForm/>:<></>}
    </Card>
  );
}



