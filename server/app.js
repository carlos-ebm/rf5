/*Importa express y bodyparser*/
const express = require("express");
const bodyParser = require("body-parser");

/*Inicializa la api y extrae la version*/
const app = express();
const { API_VERSION } = require("./config");

//Cargar rutas...
const authRoutes = require("./routers/auth");
const adminRoutes = require("./routers/admin");
const publicationRoutes = require("./routers/publication");
const programRoutes = require("./routers/program");

//Configurar bodyParser 
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Configurar Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

//Router basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, adminRoutes);
app.use(`/api/${API_VERSION}`, publicationRoutes);
app.use(`/api/${API_VERSION}`, programRoutes);

/*Exporta la app*/
module.exports = app;