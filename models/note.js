//require mongoose
var mongoose = require("mongoose");

//create the Schema class
var Schema = mongoose.Schema; //constructor we imported from mongoose package

// what we built with above constructor
var noteSchema = new Schema({
    // title:  a trimmed, required string
    title: {
        type: String,
    },
    // noteBody:  a trimmed, required string
    noteBody: {
        type: String,
        required: false
    },

    // date:  a trimmed, required string
    date: {
        type: Date,
        default: Date.now,
    },

     // articleId:  a trimmed, required string
     articleId: {
        type: String,
        required: true
    }

})

var noteObject = mongoose.model("notes", noteSchema )
module.exports = noteObject