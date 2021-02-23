const express = require("express");
const ProgramController = require("../controllers/program");
const multiparty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const md_upload_image = multiparty({uploadDir: "./uploads/image"});

const api = express.Router();

api.post("/programAdd", [md_auth.ensureAuth], ProgramController.programAdd);
api.get("/getPrograms", [md_auth.ensureAuth], ProgramController.getPrograms);
api.get("/getProgramsVisitor", ProgramController.getProgramsVisitor);
api.delete("/deleteProgram/:id", [md_auth.ensureAuth], ProgramController.deleteProgram);
api.put("/updateProgram/:id", [md_auth.ensureAuth], ProgramController.updateProgram);
api.get("/getProgramVisitor/:id", ProgramController.getProgramVisitor);
api.put("/uploadImageProgram/:id", [md_auth.ensureAuth, md_upload_image], ProgramController.uploadImage);
api.get("/getImage/:imageName", ProgramController.getImage);


module.exports = api;

