//require mongoose
var mongoose = require("mongoose");

//create the Schema class
var Schema = mongoose.Schema; //constructor we imported from mongoose package

// what we built with above constructor
var headlineSchema = new Schema({
    // title:  a trimmed, required string
    title: {
        type: String,
        trim: true,
        required: true
    },
    // summary:  a trimmed, non-required string
    summary: {
        type: String,
        trim: true,
        required: false
    },

    // url:  a trimmed, required string
    url: {
        type: String,
        trim: true,
        required: true
    },

    // date: 
    date: {
        type: Date,
        default: Date.now,
    },

    // saved:  a boolean
    saved: {
        type: Boolean,
        default: false,
    }


})

var headlineObject = mongoose.model("articles", headlineSchema )
module.exports = headlineObject