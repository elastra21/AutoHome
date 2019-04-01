// server.js

// set up ======================================================================
// get all the tools we need
var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
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

io.on("connection", function(socket) {
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

// routes ======================================================================
require("./app/routes.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
http.listen(process.env.PORT || 3000, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

module.exports = app;
