import React from "react";
import { Button, Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
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



  return (
    <>
    <Menu
      className="menu-top"
      theme="dark"
      mode="horizontal" defaultSelectedKeys={[location.pathname]}
    >
      <Menu.Item  className="menu-top__item" key="/visitor/home">
        Inicio <Link to="/home" />
      </Menu.Item>
      <Menu.Item  className="menu-top__item" key="/visitor/national">
        Nacional<Link to="/national" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/visitor/international">
        Internacional<Link to="/international" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/visitor/sports">
        Deportes <Link to="/sports" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/visitor/science">
        Ciencia <Link to="/science" />
      </Menu.Item>
      <Menu.Item className="menu-top__item" key="/visitor/programs">
        Programas <Link to="/programs" />
      </Menu.Item>
    </Menu>
    </>
  );
}

export default withRouter(MenuTop);