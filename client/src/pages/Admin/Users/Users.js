import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { Button} from "antd";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi, getUserApi } from "../../../api/admin";
import ListUsers from "../../../components/Admin/ListUsers";
import {ADMIN_ID} from "../../../utils/constants";
import AdminProfile from "../../../pages/Admin/Profile";

import "./Users.scss";

export default function Users() {
  const [ users, setUsers] = useState([]);
  const [ user, setUser] = useState([]);
  const [ reloadUsers, setReloadUsers ] = useState(false);
  const token = getAccessTokenApi();

  useEffect( () => {
    getUsersApi(token).then(response => {
      setUsers(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  useEffect(()=>{
    getUserApi(token, localStorage.getItem(ADMIN_ID)).then(response => {
      setUser(response.userData);
    })
    if(user.privilege=="2"){
     window.location.href = "/admin/profile";
    }
  });
  
  return (
    <>
      {user.privilege=="1" ? <ListUsers users={users} setReloadUsers={setReloadUsers} /> : <></>}
    </>
  );
}