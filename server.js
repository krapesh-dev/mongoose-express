/* BASE SETUP
* ======================================================
*/
'use strict'

// require necessary modules
var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var User       = require('./app/models/user');

// initialize the app
var app = express();

// connect to a modulus database
// mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
// mongoose.connect("localhost:27017/api");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// set the port for the app
var port = process.env.PORT || 8080;

/* ROUTES FOR OUR API
* ======================================================
*/
// initialize the router
var router = express.Router();

// middleware for all requests
router.use(function(req, res, next) {
    // log
    // console.log('Abra Ca Dara');

    // dont stop. advance to routes
    next();
});

// test route
router.get('/', function(req, res) {
    res.json({ message: 'hooray!' });
});

// get users
router.get('/users', function(req, res) {
    var text = User.talk();

    res.send(text);
});

/* REGISTER OUR ROUTES
* ======================================================
*/
// prefix our apis with /api
app.use('/api', router);

/* START THE SERVER
* ======================================================
*/
app.listen(port);
console.log('Abra Ca Dabra at port: ' + port);