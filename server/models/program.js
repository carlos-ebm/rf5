const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramSchema = Schema({
    title: String,
    subtitle: String,
    image: String,
    author: String,
    content: String,
    visibility: String,
    section: String,
    creationDate: Date,
    modificationDate: Date,
    //publicationDate: Date,
})


module.exports = mongoose.model("Program", ProgramSchema);
