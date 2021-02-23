const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublicationSchema = Schema({
    title: String,
    subtitle: String,
    image: String,
    author: String,
    content: String,
    visibility: String,
    section: String,
    creationDate: Date,
    modificationDate: Date,
    publicationDate: Date,
    views: Number,
})


module.exports = mongoose.model("Publication", PublicationSchema);
