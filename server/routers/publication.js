const express = require("express");
const PublicationController = require("../controllers/publication");
const multiparty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const md_upload_image = multiparty({uploadDir: "./uploads/image"});

const api = express.Router();

api.post("/publicationAdd", [md_auth.ensureAuth], PublicationController.publicationAdd);
api.get("/getPublications", [md_auth.ensureAuth], PublicationController.getPublications);
api.get("/getPublicationsVisitor", PublicationController.getPublicationsVisitor);
api.get("/getPrincipalPublicationVisitor", PublicationController.getPrincipalPublicationVisitor);
api.get("/getSecondaryPublicationsVisitor", PublicationController.getSecondaryPublicationsVisitor);
api.delete("/deletePublication/:id", [md_auth.ensureAuth], PublicationController.deletePublication);
api.put("/updatePublication/:id", [md_auth.ensureAuth], PublicationController.updatePublication);
api.get("/getPublicationVisitor/:id", PublicationController.getPublicationVisitor);
api.put("/uploadImage/:id", [md_auth.ensureAuth, md_upload_image], PublicationController.uploadImage);
api.get("/getImage/:imageName", PublicationController.getImage);
api.put("/addViewToPublication/:id", PublicationController.addViewToPublication);
api.put("/setPublicPublication/:id", PublicationController.setPublicPublication);

module.exports = api;

