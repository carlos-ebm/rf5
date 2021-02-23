import React, { useState, useEffect }  from "react";
import { Button, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { getAccessTokenApi } from "../../../api/auth";
import { getUsersApi, getUserApi } from "../../../api/admin";
import {ADMIN_ID} from "../../../utils/constants";

import {
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import Logo from "../../../assets/img/png/LogoProvisorio.png";

import "./MenuTop.scss";
import { logout } from "../../../api/auth";

function MenuTop(props) {
  const {location} = props;
  const [ user, setUser] = useState([]);
  const token = getAccessTokenApi();

  function logoutAdmin(){
    logout();
    window.location.reload();
  }

  useEffect(()=>{
    getUserApi(token, localStorage.getItem(ADMIN_ID)).then(response => {
      setUser(response.userData);
    })
  });

  return (
    <>
    {user.privilege==1?<Menu
      className="menu-top"
      //theme="light"
      mode="horizontal" defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item  className="menu-top__item" key="/admin/profile">
        Perfil <Link to="/admin/profile" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/publications">
        Publicaciones <Link to="/admin/publications" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/programs">
        Programas <Link to="/admin/programs" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/users">
        Usuarios <Link to="/admin/users" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/publicities">
        Publicidad <Link to="/admin/publicities" />
      </Menu.Item>
         <Button type="link" className="menu-top__button-logout" onClick={logoutAdmin}><LogoutOutlined />Salir</Button>
    </Menu>: <Menu
      className="menu-top"
      //theme="light"
      mode="horizontal" defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item  className="menu-top__item" key="/admin/profile">
        Perfil <Link to="/admin/profile" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/publications">
        Publicaciones <Link to="/admin/publications" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/admin/programs">
        Programas <Link to="/admin/programs" />
      </Menu.Item>
         <Button type="link" className="menu-top__button-logout" onClick={logoutAdmin}><LogoutOutlined />Salir</Button>
    </Menu>}
    </>
  );
}

export default withRouter(MenuTop);