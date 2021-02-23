const Program = require("../models/program");
const fs = require("fs");
const path = require("path");

function programAdd(req, res) {
    const program = new Program();
  
    const { title, subtitle, image, content, author, visibility, section, creationDate } = req.body;
    program.title = title;
    program.subtitle = subtitle;
    program.image = image;
    program.content = content;
    program.author = author;
    program.visibility = visibility;
    program.section = section;
    program.creationDate = creationDate;
  
    program.save((err, programStored) => {
      if (!programStored) {
        res.status(500).send({ message: "Error al crear la publicación." });
      } else {
        res.status(200).send({ program: programStored });
      }
    });
  }

  function getPrograms(req, res) {
    Program.find().then((programs) => {
      if (!programs) {
        res.status(400).send({ message: "No se encontro ninguna publicación." });
      } else {
        res.status(200).send({ programs });
      }
    });
  }

  function getProgramsVisitor(req, res) {
    Program.find().then((programs) => {
      if (!programs) {
        res.status(400).send({ message: "No se encontro ninguna publicación." });
      } else {
        res.status(200).send({ programs });
      }
    });
  }

  function getImage(req, res){
  
    const imageName = req.params.imageName;
    const filePath = "./uploads/image/" + imageName;
  
    //cambiamos exists por existsSync
    fs.exists(filePath, exists => {
      if(!exists) {
        res.status(404).send({ message: "La imagen que buscas no existe."})
      }else{
        res.sendFile(path.resolve(filePath));
      }
    });
  
  }

  function deleteProgram(req, res) {
    const { id } = req.params;
  
    Program.findByIdAndRemove(id, (err, programDeleted) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!programDeleted) {
          res.status(404).send({ message: "Publicación no encontrado." });
        } else {
          res
            .status(200)
            .send({ message: "La publicación ha sido eliminada correctamente." });
        }
      }
    });
  }

  function updateProgram(req, res) {
    const programData = req.body;
    const params = req.params;
  
    Program.findByIdAndUpdate({ _id: params.id }, programData, (err, programUpdate) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!programUpdate) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningún usuario." });
        } else {
          res.status(200).send({ message: "Usuario actualizado correctamente." });
        }
      }
    });
  }

  function getProgramVisitor(req, res) {
    const params = req.params;
  
    Program.findById({ _id: params.id }, (err, programData) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!programData) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningún usuario." });
        } else {
          res.status(200).send({ programData });
        }
      }
    });
  }

  function uploadImage(req, res) {
    const params = req.params;
  
    Program.findById({ _id: params.id }, (err, programData) => {
      if (err) {
        res.status(500).send({ message: "Error del servidor." });
      } else {
        if (!programData) {
          res
            .status(404)
            .send({ message: "No se ha encontrado ningún usuario." });
        } else {
          let program = programData;
  
          if (req.files) {
            let filePath = req.files.image.path;
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
              program.image = fileName;
              Program.findByIdAndUpdate(
                { _id: params.id },
                program,
                (err, programResult) => {
                  if (err) {
                    res.status(500).send({ message: "Error del servidor." });
                  } else {
                    if (!programResult) {
                      res
                        .status(404)
                        .send({ message: "No se ha encontrado ningun usuario." });
                    } else {
                      res.status(200).send({ programName: fileName });
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

  module.exports = {
    programAdd,
    getPrograms,
    getProgramsVisitor,
    deleteProgram,
    getImage,
    updateProgram,
    getProgramVisitor,
    uploadImage,
  };