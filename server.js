// server.js

// set up ======================================================================
// get all the tools we need
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var passport = require("passport");
var bodyParser = require("body-parser");
//var configDB = require("./config/database.js");
const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/login"; // Heroku server
//var ipaddress = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
var port = process.env.PORT || 3000;

// configuration ===============================================================
mongoose.connect(
  CONNECTION_URI,
  { useMongoClient: true }
); // connect to our database
app.engine("html", require("ejs").renderFile);

require("./config/passport")(passport); // pass passport for configuration

// set up our express application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log("Server running on ", port);

module.exports = app;
