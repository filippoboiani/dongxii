/**
  Main file, the application is initialized here.
*/
var express = require('express');
// Create express app
var app = express();
// Mongo DB interface
var mongoose = require('mongoose');

var urlApp = "http://localhost:";
var port = process.env.PORT || 8080;

var database = require('./config/server/database'); 			// load the database config

var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var jwt = require('jwt-simple');
// var passport	= require('passport');
var open = require('open');
var color = require('colors-cli/safe');

/*
  Connection
  Connect to local MongoDB instance. A remoteUrl is also available (modulus.io for example)
*/
mongoose.connect(database.localUrl);
// mongoose.connect(MONGODB_URI);

// import the Strategy
// require('./config/server/passport')(passport);

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/client'));

// log every request to the console
app.use(morgan('dev'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('X-HTTP-Method-Override'));

// Use the passport package in our application
//app.use(passport.initialize());

/*
Setting the routes
*/
require('./app/routes.js')(app);

/*
listen (start app with node server.js)
*/
app.listen(port);
console.info(color.yellow.bold.underline("Server started on port " + port));
