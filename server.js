/* Mongoose News Scraper Site 
* Back-end
* ==================== */

//run this server file with node/nodemon

//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan"); //may or may not need, be sure to install if uncommented

//require request and cheerio, this makes scraping possible
var request = require("request");
var cheerio = require("cheerio");

// var mongojs = require("mongo"); // maybe this is mongoose instead?
// using mongoose instead of mongo
var mongoose = require("mongoose");

var Promise = require("bluebird");
mongoose.Promise = Promise;

//Initialize Express
var app = express();

//Use morgan and body parser with our app
// app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

//Set us a static folder (public) for our web app, looks inside public folder for index and display anything found there at the root
app.use(express.static("public"));

//Database configuration with mongoose
mongoose.connect("mongodb://localhost/news");
//We have a pending connection to the test database running on localhost. We now need to get notified if we connect successfully or if a connection error occurs:
var db = mongoose.connection;

//show any mongoose errors
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
  console.log("mongoose is connected");
});

// Routes Needed = 1. home (aka index) DONE  until handlebars, saved articles, scrape new article,
//save article, delete from saved,
//create note, view article note, delete note
// app.get main handlebars route
// modal or popup for handlebars partials (the different peices of the handlebars document (html code that handlebars will put into th body of main.handlebars ecxcept it gets renered with diff infomration))

// 1. At the root path, send a simple hello world message to the browser
app.get("/", function(req, res) {
  res.send(index.html); //once handlebars, change to res.render(home.handlebars)  see other handlebars examples
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
  request("https:/news.ycombinator.com/", function(error, response, html) {
    
    var $ = cheerio.load(html);

    $(".title").each(function(i, element) {
      var title = $(element)
        .children("a")
        .text(); //use element or this
      var url = $(element)
        .children("a")
        .attr("href");
      // var summary = $(this).children("p.summary").text(); //scraping this line is optional

      if (title && url) {
        db.articles.insert(
          ///save instead of insert?
          {
            title: title,
            url: url
            // summary: summary
          },
          function(error, saved) {
            if (error) {
              console.log(error);
            } else {
              console.log(saved);
            }
          }
        );
      }
    });
  });

  res.send("Scrape complete");
});

// Set the app to listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

//controllers is left but the routes are already in server.js, and pointing to html, handlebars and templating
