/* =================== BASE SETUP =================== */
'use strict'

// require necessary modules
var express    = require('express');
var bodyParser = require('body-parser');
// var User       = require('./app/models/user');
var Movies     = require('./app/models/movie');

// initialize the app
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

// set the port for the app
var port = process.env.PORT || 8080;

/* =================== ROUTES FOR OUR API =================== */
// initialize the router
var router = express.Router();

// middleware for all requests
router.use(function(req, res, next) {
    // dont stop. advance to routes
    next();
});

// test route
router.get('/', function(req, res) {
    res.json({ message: 'hooray!' });
});

// get users
router.get('/users', function(req, res) {
    // var text = User.talk();

    res.send(text);
});

// get specific user
router.get('/users/:id', function(req, res) {

});

// post user
router.post('/users', function(req, res) {
    res.send({ method: 'POST' });
});

/* =================== REGISTER OUR ROUTES =================== */
// prefix our apis with /api
app.use('/api', router);

/* =================== START THE SERVER =================== */
app.listen(port);
console.log('Server running at http://localhost/' + port);