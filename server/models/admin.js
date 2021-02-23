const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = Schema({
  name: String,
  lastname: String,
  avatar: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  //date: String,
  privilege: String,
  status: String,
  
});

module.exports = mongoose.model("Admin", AdminSchema);
