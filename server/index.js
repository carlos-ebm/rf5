//Importa mongoose, app, port y las constantes en el archivo config.
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 3977;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useFindAndModify", false);

//Establece la conexion con la base de datos.
mongoose.connect(
  `mongodb+srv://abcd1234:abcd1234@radiof5.rl8j5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  //`mongodb://${IP_SERVER}:${PORT_DB}/radiof5`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexión con la base de datos ha sido exitosa.");

      app.listen(port, () => {
        console.log(`http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
      });
    }
  }
);
