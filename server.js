/* Mongoose News Scraper Site 
* Back-end
* ==================== */

//run this server file with node/nodemon

//Dependencies
var express = require("express");
var bodyParser = require("body-parser");

//require request and cheerio, this makes scraping possible
var request = require("request");
var cheerio = require("cheerio");
//where all dependencies referenced somehow?

// var mongojs = require("mongo"); // maybe this is mongoose instead?
// using mongoose instead of mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');


//Initialize Express
var app = express();

//Set us a static folder (public) for our web app, looks inside public folder for index and display anything found there at the root
app.use(express.static("public"));


// //Database configuration for mongo -WILL WE USE SOMETHING ELSE FOR MONGOOSE?
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


var newsSchema = mongoose.Schema({
    name: String
  });

// //not gonna Use mongojs to hook the database to the db variable
// var db = mongoose(databaseUrl, collections);

// //This logs any errors if mongodb runs into an issue
// db.on("error", function(error) {
//     console.log("Database Error:", error);
// });




// Routes
// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
    res.send("Hello world");
  });
  
  // 2. At the "/all" path, display every entry in the articles collection
  app.get("/all", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything
    db.articles.find({}, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });


    // 2. At the "/all" path, display every entry in the articles collection
    app.get("/scrape", function(req, res) {
     
      request("https:/news.ycombinator.com/", function(error, response, html){
        var $ = cheerio.load(html);

        $(".title").each(function(i, element){
          var title = $(this).children("a").text();
          var url = $(this).children("a").attr("href");

          if (title && url) {
            db.articles.save({
              title: title,
              url:url
            },
            function(error, saved) {
              if (error) {
                console.log(error);
              }
              else {
                console.log(saved);
              }
            });
          }
        });
      });

      res.send("Scrape complete");
    });
  
  // 3. At the "/article" path, display every entry in the articles collection, sorted by article
  app.get("/article", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by name (1 means ascending order)
    db.articles.find().sort({ article: 1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });
  
  // 4. At the "/weight" path, display every entry in the animals collection, sorted by weight
  app.get("/summary", function(req, res) {
    // Query: In our database, go to the animals collection, then "find" everything,
    // but this time, sort it by weight (-1 means descending order)
    db.articles.find().sort({ summary: -1 }, function(error, found) {
      // Log any errors if the server encounters one
      if (error) {
        console.log(error);
      }
      // Otherwise, send the result of this query to the browser
      else {
        res.json(found);
      }
    });
  });
  
  // Set the app to listen on port 3000
  app.listen(3000, function() {
    console.log("App running on port 3000!");
  });
  