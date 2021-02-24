const Publication = require("../models/publication");
const fs = require("fs");
const path = require("path");
const publication = require("../models/publication");

function publicationAdd(req, res) {
  const publication = new Publication();

  const { title, subtitle, image, content, author, visibility, section, creationDate, publicationDate, publicationTime, views } = req.body;
  publication.title = title;
  publication.subtitle = subtitle;
  publication.image = image;
  publication.content = content;
  publication.author = author;
  publication.visibility = visibility;
  publication.section = section;
  publication.creationDate = creationDate;
  publication.publicationDate = publicationDate;
  publication.publicationTime = publicationTime;
  publication.views = views;

  publication.save((err, publicationStored) => {
    if (!publicationStored) {
      res.status(500).send({ message: "Error al crear la publicación." });
    } else {
      res.status(200).send({ publication: publicationStored });
    }
  });
}

function getPublications(req, res) {
  Publication.find().then((publications) => {
    if (!publications) {
      res.status(400).send({ message: "No se encontro ninguna publicación." });
    } else {
      res.status(200).send({ publications });
    }
  });
}

function getPublicationsVisitor(req, res) {
  Publication.find().then((publications) => {
    if (!publications) {
      res.status(400).send({ message: "No se encontro ninguna publicación." });
    } else {
      res.status(200).send({ publications });
    }
  });
}

function getPrincipalPublicationVisitor(req, res) {
  Publication.find({visibility: "1"}).then((publications) => {
    if (!publications) {
      res.status(400).send({ message: "No se encontro ninguna publicación." });
    } else {
      const publication = publications[publications.length-1]
      res.status(200).send({ publication });
    }
  });
}

function getSecondaryPublicationsVisitor(req, res) {
  Publication.find({visibility: "1"}).then((publications) => {
    if (!publications) {
      res.status(400).send({ message: "No se encontro ninguna publicación." });
    } else {
      if(publications.length==0){
        res.status(400).send({ message: "No se encontro ninguna publicación." });
      }
      if(publications.length==2){
        const secondaryPublications = [publications[publications.length-2]]
        res.status(200).send({ secondaryPublications });
      }
      if(publications.length==3){
        const secondaryPublications = [publications[publications.length-2],  publications[publications.length-3]]
        res.status(200).send({ secondaryPublications });
      }
      if(publications.length==4){
        const secondaryPublications = [publications[publications.length-2],  publications[publications.length-3], publications[publications.length-4] ]
        res.status(200).send({ secondaryPublications });
      }
      if(publications.length>=5){
        const secondaryPublications = [publications[publications.length-2],  publications[publications.length-3], publications[publications.length-4], publications[publications.length-5] ]
        res.status(200).send({ secondaryPublications });
      }
      //res.status(200).send({ secondaryPublications });
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

function deletePublication(req, res) {
  const { id } = req.params;

  Publication.findByIdAndRemove(id, (err, publicationDeleted) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!publicationDeleted) {
        res.status(404).send({ message: "Publicación no encontrado." });
      } else {
        res
          .status(200)
          .send({ message: "La publicación ha sido eliminada correctamente." });
      }
    }
  });
}

function updatePublication(req, res) {
  const publicationData = req.body;
  const params = req.params;

  Publication.findByIdAndUpdate({ _id: params.id }, publicationData, (err, publicationUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!publicationUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        res.status(200).send({ message: "Publicación actualizada correctamente." });
      }
    }
  });
}

function getPublicationVisitor(req, res) {
  const params = req.params;

  Publication.findById({ _id: params.id }, (err, publicationData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!publicationData) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        res.status(200).send({ publicationData });
      }
    }
  });
}

function uploadImage(req, res) {
  const params = req.params;

  Publication.findById({ _id: params.id }, (err, publicationData) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!publicationData) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningún usuario." });
      } else {
        let publication = publicationData;

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
            publication.image = fileName;
            Publication.findByIdAndUpdate(
              { _id: params.id },
              publication,
              (err, publicationResult) => {
                if (err) {
                  res.status(500).send({ message: "Error del servidor." });
                } else {
                  if (!publicationResult) {
                    res
                      .status(404)
                      .send({ message: "No se ha encontrado ningun usuario." });
                  } else {
                    res.status(200).send({ publicationName: fileName });
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

function addViewToPublication(req, res){
  const publicationData = req.body;
  const params = req.params;
  const num = publicationData.views;
  publicationData.views= num+1;

  Publication.findByIdAndUpdate({ _id: params.id }, publicationData, (err, publicationUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!publicationUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningúna publicacion." });
      } else {
        res.status(200).send({ message: "Publicacion actualizada correctamente." });
      }
    }
  });
}

function setPublicPublication(req, res){
  const publicationData = req.body;
  const params = req.params;
  publicationData.visibility="1";

  Publication.findByIdAndUpdate({ _id: params.id }, publicationData, (err, publicationUpdate) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor." });
    } else {
      if (!publicationUpdate) {
        res
          .status(404)
          .send({ message: "No se ha encontrado ningúna publicacion." });
      } else {
        res.status(200).send({ message: "Publicacion actualizada correctamente." });
      }
    }
  });
}

//}

module.exports = {
  publicationAdd,
  deletePublication,
  updatePublication,
  getPublications,
  getPublicationsVisitor,
  getPublicationVisitor,
  getPrincipalPublicationVisitor,
  getSecondaryPublicationsVisitor,
  uploadImage,
  getImage,
  addViewToPublication,
  setPublicPublication,
};

