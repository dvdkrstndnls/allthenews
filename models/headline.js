//require mongoose
var mongoose = require("mongoose");

//create the Schema class
var Schema = mongoose.Schema; //constructor we imported from mongoose package

// what we built with above constructor
var headlineSchema = new Schema({
    // firstName:  a trimmed, required string
    title: {
        type: String,
        trim: true,
        required: true
    },
    // firstName:  a trimmed, required string
    summary: {
        type: String,
        trim: true,
        required: false
    },

    // firstName:  a trimmed, required string
    url: {
        type: String,
        trim: true,
        required: true
    },

    // firstName:  a trimmed, required string
    date: {
        type: Date,
        default: Date.now,
    },

    // firstName:  a trimmed, required string
    saved: {
        type: Boolean,
        default: false,
    }


})

var headlineObject = mongoose.model("articles", headlineSchema )
module.exports = headlineObject