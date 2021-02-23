const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-nodejs");
const Admin = require("../models/admin");
const jwt = require("../services/jwt");

function signIn(req, res) {
  const params = req.body;
  const email = params.email.toLowerCase();
  const password = params.password;

  Admin.findOne({ email }, (err, adminStored) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!adminStored) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        bcrypt.compare(password, adminStored.password, (err, check) => {
          if (err) {
            res.status(500).send({ message: "Error del servidor." });
          } else if (!check) {
            res.status(404).send({ message: "La contraseña es incorrecta." });
          } else {
            if (adminStored.status == 2) {
              res
                .status(200)
                .send({ code: 200, message: "El usuario no se ha activado." });
            } else {
              res.status(200).send({
                accessToken: jwt.createAccessToken(adminStored),
                refreshToken: jwt.createRefreshToken(adminStored),
                _id: adminStored._id,
              });
            }
          }
        });
      }
    }
  });
}

function userAdd(req, res) {
  const user = new Admin();

  const {
    name,
    lastname,
    email,
    password,
    repeatPassword,
    privilege,
    status,
  } = req.body;
  user.name = name;
  user.lastname = lastname;
  user.email = email;
  user.privilege = privilege;
  user.status = status;

  if (!password || !repeatPassword) {
    res.status(404).send({ message: "Las contraseñas son obligatorias." });
  } else {
    if (password !== repeatPassword) {
      res.status(404).send({ message: "Las contraseñas no son iguales" });
    } else {
      bcrypt.hash(password, null, null, function (err, hash) {
        if (err) {
          res
            .status(500)
            .send({ message: "Error al encriptar la contraseña." });
        } else {
          user.password = hash;
          user.save((err, userStored) => {
            if (err) {
              res.status(500).send({ message: "El usuario ya existe." });
            } else {
              if (!userStored) {
                res.status(500).send({ message: "Error al crear el usuario." });
              } else {
                res.status(200).send({ user: userStored });
              }
            }
          });
        }
      });
    }
  }
}

function getUsers(req, res) {
  Admin.find().then((users) => {
    if (!users) {
      res.status(400).send({ message: "No se encontro ningun usuario." });
    } else {
      res.status(200).send({ users });
    }
  });
}

function getUser(req, res) {
  const params = req.params;

  Admin.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        res.status(200).send({ userData });
      }
    }
  });
}

function updateAdmin(req, res) {
  const userData = req.body;
  const params = req.params;

  Admin.findByIdAndUpdate({ _id: params.id }, userData, (err, adminUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!adminUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        res.status(200).send({ message: "Usuario actualizado correctamente." });
      }
    }
  });
}

function updateAdminPassword(req, res) {
  const userData = req.body;
  const params = req.params;

  if (userData.password !== userData.repeatPassword) {
    res.status(404).send({ message: "Las contraseñas no son iguales" });
  } else {
    bcrypt.hash(userData.password, null, null, function (err, hash) {
      if (err) {
        res.status(500).send({ message: "Error al encriptar la contraseña." });
      } else {
        userData.password = hash;
        Admin.findByIdAndUpdate(
          { _id: params.id },
          userData,
          (err, adminUpdate) => {
            if (err) {
              res.status(500).send({ message: "Error del servidor." });
            } else {
              if (!adminUpdate) {
                res
                  .status(404)
                  .send({ message: "No se ha encontrado ningún usuario." });
              } else {
                res
                  .status(200)
                  .send({ message: "Contraseña actualizada correctamente." });
              }
            }
          }
        );
      }
    });
  }
}

function uploadAvatar(req, res) {
  const params = req.params;

  Admin.findById({ _id: params.id }, (err, userData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userData) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        let user = userData;

        if (req.files) {
          let filePath = req.files.avatar.path;
          let fileSplit = filePath.split("\\");
          let fileName = fileSplit[2];

          let extSplit = fileName.split(".");
          let fileExt = extSplit[1];

          if (fileExt !== "png" && fileExt !== "jpg") {
            res.status(400).send({
              message:
                "La extension de la imagen no es valida. (Extensiones permitidas: .png y .jpg)",
            });
          } else {
            user.avatar = fileName;
            Admin.findByIdAndUpdate(
              { _id: params.id },
              user,
              (err, userResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!userResult) {
                    res
                      .status(404)
                      .send({ message: "No se ha encontrado ningun usuario." });
                  } else {
                    res.status(200).send({ avatarName: fileName });
                  }
                }
              }
            );
          }
        }
      }
    }
  });
}

function getAvatar(req, res){
  
  const avatarName = req.params.avatarName;
  const filePath = "./uploads/avatar/" + avatarName;

  //cambiamos exists por existsSync
  fs.exists(filePath, exists => {
    if(!exists) {
      res.status(404).send({ message: "El avatar que buscas no existe."})
    }else{
      res.sendFile(path.resolve(filePath));
    }
  });

}

function deleteUser(req, res) {
  const { id } = req.params;

  Admin.findByIdAndRemove(id, (err, userDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!userDeleted) {
        res.status(404).send({ message: "Usuario no encontrado." });
      } else {
        res
          .status(200)
          .send({ message: "El usuario ha sido eliminado correctamente." });
      }
    }
  });
}

module.exports = {
  signIn,
  userAdd,
  getUsers,
  getUser,
  updateAdmin,
  updateAdminPassword,
  uploadAvatar,
  getAvatar,
  deleteUser,
};
