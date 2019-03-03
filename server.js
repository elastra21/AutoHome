// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyParser = require('body-parser');
var configDB = require('./config/database.js');
var ipaddress = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

// configuration ===============================================================
mongoose.connect(configDB.db(),{useMongoClient: true }); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, ipaddress, function() {
    console.log('The magic happens on ' +ipaddress+':'+ port);
    console.log('Connected to MongoDB at: %s', configDB.db());
});

module.exports = app ;
