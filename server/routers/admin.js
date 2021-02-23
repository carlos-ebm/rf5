const express = require("express");
const AdminController = require("../controllers/admin");
const multiparty = require("connect-multiparty");

const md_auth = require("../middleware/authenticated");
const md_upload_avatar = multiparty({uploadDir: "./uploads/avatar"});

const api = express.Router();

api.post("/signIn", AdminController.signIn);
api.post("/userAdd", AdminController.userAdd);
api.get("/getUsers", [md_auth.ensureAuth], AdminController.getUsers);
api.get("/getUser/:id", [md_auth.ensureAuth], AdminController.getUser);
api.put("/updateAdmin/:id", [md_auth.ensureAuth], AdminController.updateAdmin);
api.put("/updateAdminPassword/:id", [md_auth.ensureAuth], AdminController.updateAdminPassword);
api.put("/uploadAvatar/:id", [md_auth.ensureAuth, md_upload_avatar], AdminController.uploadAvatar);
api.get("/getAvatar/:avatarName", AdminController.getAvatar);
api.delete("/deleteUser/:id", [md_auth.ensureAuth], AdminController.deleteUser);

module.exports = api;
