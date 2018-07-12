// importing headline.js and note.js
var headline = require("./headline.js");
var note = require("./note.js");


// creating an object that contains all the entire headline object and entire note object 
var bothObject = {
    headline: headline, //pulling in headline from line 2
    note: note, //pulling in note from line 3
    };

module.exports = bothObject