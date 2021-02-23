import React from "react";
import { Layout } from "antd";
//Se importa 'LayoutAdmin.scss' que contiene las diversas
//configuraciones de diseño del Layout de Admin.
import "./LayoutContentAdmin.scss";
//Se importa el modulo 'react-router-dom' que permite trabajar con las
//rutas en React.
import { Route, Redirect } from "react-router-dom";
import AdminSignIn from "../pages/Admin/SignIn";
import MenuTop from "../components/Admin/MenuTop";
import useAuth from "../hooks/useAuth";
import BarTop from "../components/Global/BarTop";

export default function LayoutContentAdmin(props) {
  //Aplica destruturing a props para obtener las rutas.
  const { routes } = props;
  //Aplica destructuring a Layout para obtener Header, content y Footer.
  const { Header, Content, Footer } = Layout;

  //esto debe descomentarse para hacer uso de los tokens
  const { user, isLoading } = useAuth();

  //esto es provisorio hasta el uso de tokens
  //const user = "juan";

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  if (user && !isLoading) {
    return (
      //Establece la estructura del Layout.
      <Layout>
        <Layout className="layout-admin">
          <Header className="layout-admin__bar-top">
            <BarTop />
          </Header>
          <div className="layout-admin__header">
            <MenuTop />
          </div>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
        </Layout>
        <Layout className="layout-admin">
          <Footer className="layout-admin__footer">
            Radio F5 - Copyright 2021 | By EDEX & Rodrigo Ordenes{" "}
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
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
