/* =================== BASE SETUP =================== */
'use strict'

// require necessary modules
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var jwt        = require('jsonwebtoken');
var appConfig  = require('./app/config/appConfig');

// initialize the app
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// require our modules
var routes = require('./app/routes')(app, appConfig, jwt);

// set the port for the app
var port = process.env.PORT || 8080;

/* =================== START THE SERVER =================== */
app.listen(port);
console.log('Server running at http://localhost:' + port);