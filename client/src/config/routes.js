//Componentes del Admiistrador
import AdminProfile from "../pages/Admin/Profile/";
import AdminSignIn from "../pages/Admin";
import AdminUserAdd from "../pages/Admin/UserAdd";
import AdminUsers from "../pages/Admin/Users";
import AdminPublications from "../pages/Admin/Publications";
import AdminPublicationAdd from "../pages/Admin/PublicationAdd";
import AdminPrograms from "../pages/Admin/Programs";
import AdminProgramAdd from "../pages/Admin/ProgramAdd";
import AdminPublicities from "../pages/Admin/Publicities";

//Componentes del Gestor de Contenido
import ContentAdminProfile from "../pages/Admin/Profile/";
import ContentAdminSignIn from "../pages/Admin";
import ContentAdminPublications from "../pages/Admin/Publications";
import ContentAdminPublicationAdd from "../pages/Admin/PublicationAdd";
import ContentAdminPrograms from "../pages/Admin/Programs";
import ContentAdminProgramAdd from "../pages/Admin/ProgramAdd";

//Componentes del Visitante
import VisitorHome from "../pages/Visitor/Home";
import VisitorNational from "../pages/Visitor/National";
import VisitorNationalPublication from "../pages/Visitor/NationalPublication";
import VisitorInternational from "../pages/Visitor/International";
import VisitorInternationalPublication from "../pages/Visitor/InternationalPublication";
import VisitorSports from "../pages/Visitor/Sports";
import VisitorSportsPublication from "../pages/Visitor/SportsPublication";
import VisitorScience from "../pages/Visitor/Science";
import VisitorSciencePublication from "../pages/Visitor/SciencePublication";
import VisitorPrograms from "../pages/Visitor/Programs";
import VisitorProgramsPublication from "../pages/Visitor/ProgramsPublication";

import LayoutAdmin from "../layouts/LayoutAdmin";
import LayoutBasic from "../layouts/LayoutBasic";
import LayoutContentAdmin from "../layouts/LayoutContentAdmin";

import {PUBLICATION_ID, PROGRAM_ID, ADMIN_PRIVILEGE} from "../utils/constants";

/*
    Se utiliza un arreglo para definir cada una de las rutas. 
    El arreglo tiene a su vez otro arreglo que contiene subrutas.
*/

const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminProfile,
        exact: true,
      },
      {
        path: "/admin/profile",
        component: AdminProfile,
        exact: true,
      },
      {
        path: "/admin/publications",
        component: AdminPublications,
        exact: true,
      },
      {
        path: "/admin/publications/publication-add",
        component: AdminPublicationAdd,
        exact: true,
      },
      {
        path: "/admin/programs",
        component: AdminPrograms,
        exact: true,
      },
      {
        path: "/admin/programs/program-add",
        component: AdminProgramAdd,
        exact: true,
      },
      {
        path: "/admin/users",
        component: AdminUsers,
        exact: true,
      },
      {
        path: "/admin/publicities",
        component: AdminPublicities,
        exact: true,
      },
      {
        path: "/admin/users/user-add",
        component: AdminUserAdd,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignIn,
        exact: true,
      },
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: VisitorHome,
        exact: true,
      },
      {
        path: "/home",
        component: VisitorHome,
        exact: true,
      },
      {
        path: "/national",
        component: VisitorNational,
        exact: true,
      },
      {
        path: `/national/${localStorage.getItem(PUBLICATION_ID)}`,
        component: VisitorNationalPublication,
        exact: false,
      },
      {
        path: "/international",
        component: VisitorInternational,
        exact: true,
      },
      {
        path: `/international/${localStorage.getItem(PUBLICATION_ID)}`,
        component: VisitorInternationalPublication,
        exact: false,
      },
      {
        path: "/sports",
        component: VisitorSports,
        exact: true,
      },
      {
        path: `/sports/${localStorage.getItem(PUBLICATION_ID)}`,
        component: VisitorSportsPublication,
        exact: false,
      },
      {
        path: "/science",
        component: VisitorScience,
        exact: true,
      },
      {
        path: `/science/${localStorage.getItem(PUBLICATION_ID)}`,
        component: VisitorSciencePublication,
        exact: true,
      },
      {
        path: "/programs",
        component: VisitorPrograms,
        exact: true,
      },
      {
        path: `/programs/${localStorage.getItem(PROGRAM_ID)}`,
        component: VisitorProgramsPublication,
        exact: true,
      },
    ],
  },
];

//Se exportan las rutas
export default routes;
