//require mongoose
var mongoose = require("mongoose");

//create the Schema class
var Schema = mongoose.Schema;

// new Schema = new Schema
var UserSchema = new Schema({
    // firstName:  a trimmed, required string
    firstName: {
        type: String,
        trim: true,
        required: "First Name is Required"
    },
    // firstName:  a trimmed, required string
    lastName: {
        type: String,
        trim: true,
        required: "Last Name is Required"
    },

})