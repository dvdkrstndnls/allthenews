//Dependencies
var express = require("express");

var bodyParser = require("body-parser");
var cheerio = require("cheerio");
//where all dependencies referenced somehow?

// var mongojs = require("mongo"); // maybe this is mongoose instead?
// using mongoose instead of mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


//Initialize Express
var app = express();

//Set up a static public folder for our web app
app.use(express.static("public"));

// //Database configuration
// //Save the URL of database and name of collection
// var databaseUrl = "news"; //instead of zoo
// var collections = ["articles"] // instead of animals

//We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('mongoose is connected')
});

// //not gonna Use mongojs to hook the database to the db variable
// var db = mongoose(databaseUrl, collections);

// //This logs any errors if mongodb runs into an issue
// db.on("error", function(error) {
//     console.log("Database Error:", error);
// });

//Routes
app.get("/", function(req, res) {
    res.send("This will one day get an article");
});