import React from "react";
import { Layout } from "antd";
import MenuTop from "../components/Visitor/MenuTop";
import BarTop from "../components/Global/BarTop";
import SocialBar from "../components/Visitor/SocialBar";
import {
  CodeFilled
} from "@ant-design/icons";



//Se importa 'LayoutAdmin.scss' que contiene las diversas
//configuraciones de diseño del Layout de Admin.
import "./LayoutBasic.scss";
//Se importa el modulo 'react-router-dom' que permite trabajar con las 
//rutas en React.
import { Route } from "react-router-dom";

export default function LayoutBasic(props) {
  //Aplica destruturing a props para obtener las rutas.
  const { routes } = props;
  //Aplica destructuring a Layout para obtener Header, content y Footer.
  const { Header, Content, Footer } = Layout;
  return (
    //Establece la estructura del Layout.
    <Layout className="layout-basic" >
      <Layout >
        <Header className="layout-basic__bar-top">
          <BarTop />
        </Header>
        <div className="layout-basic__header">
          <MenuTop/>
        </div>
        <Content className="layout-basic__content">
        <div className="layout-basic__socialbar"><SocialBar/></div>
          <LoadRoutes routes={routes} />
        </Content>
      </Layout>
      <Layout>
        <Footer className="layout-basic__footer">
          Radio F5 - Copyright 2021 | By Bortex{" "} <CodeFilled />
        </Footer>
      </Layout>
    </Layout>
  );
  }

//Observación: Aplica destructuring directamente a un objeto que pasa por parametro.
/*
    La función LoadRouters() genera una ciclo y retorna todas las rutas encontradas 
    en una colección de tipo mapa.
*/
function LoadRoutes({ routes }) {
  return routes.map((route, index) => (
    <Route
      key={index}
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  ));
}
