//  OpenShift sample Node application
var express = require('express'),
    app     = express(),
    morgan  = require('morgan');
    
Object.assign=require('object-assign')
//var mongoose = require('mongoose');
//var passport = require('passport');
//var bodyParser = require('body-parser');
var configDB = require('./config/database.js');
var ip = process.env.IP   || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080;

// configuration ===============================================================
//mongoose.connect(configDB.db(),{useMongoClient: true }); // connect to our database

//require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(passport.initialize());

// routes ======================================================================
//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================

// error handling
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500).send('Something bad happened!');
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app ;
