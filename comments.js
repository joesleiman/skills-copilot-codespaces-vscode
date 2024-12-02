// Create web server
// http://expressjs.com/en/starter/hello-world.html
// http://expressjs.com/en/starter/static-files.html
// http://expressjs.com/en/starter/basic-routing.html

// Run web server
// node comments.js

// Load http module
var http = require("http");
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var fs = require("fs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Create a server
http.createServer(app).listen(3000, function() {
  console.log("Server started on port 3000");
});

// Create a route for the application
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Create a route to handle comments
app.post("/comments", function(req, res) {
  var comment = req.body;
  fs.appendFile("comments.json", JSON.stringify(comment) + "\n", function(err) {
    if (err) {
      console.log(err);
      res.status(500).send("Error saving comment");
    } else {
      res.status(201).send("Comment saved");
    }
  });
});