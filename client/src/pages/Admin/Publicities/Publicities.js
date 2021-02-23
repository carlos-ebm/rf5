import React, { useEffect, useState } from "react";
import { Menu, Button, Table } from "antd";

import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi, getUserApi } from "../../../api/admin";
import {ADMIN_ID} from "../../../utils/constants";

import "./Publicities.scss";

export default function Publicities() {
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
    <>
      {user.privilege=="1" ? <></> : <></>}
    </>
  );
}


function toPublicityAdd(){
    window.location.href="/admin/publicities/publicity-add";
}