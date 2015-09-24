/* =================== BASE SETUP =================== */
'use strict'

// require necessary modules
var express    = require('express');
var bodyParser = require('body-parser');
				 
var routes     = require('./app/routes')(express);

// initialize the app
var app = express();

// initialise data warehouse
// var movie = new Movie();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// set the port for the app
var port = process.env.PORT || 8080;

/* =================== START THE SERVER =================== */
app.listen(port);
console.log('Server running at http://localhost/' + port);