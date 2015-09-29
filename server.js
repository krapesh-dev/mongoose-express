/* =================== BASE SETUP =================== */
'use strict'

// require necessary modules
var express    = require('express');
var bodyParser = require('body-parser');

// initialize the app
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// require our modules
var routes = require('./app/routes')(app);

/* =================== REGISTER OUR ROUTES =================== */
// prefix our apis with /api
// app.use('/api', router);
// app.use('/api', require('./app/routes')(express));   

// set the port for the app
var port = process.env.PORT || 8080;

/* =================== START THE SERVER =================== */
app.listen(port);
console.log('Server running at http://localhost:' + port);