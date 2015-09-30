/* =================== BASE SETUP =================== */
'use strict'

// require necessary modules
var express    = require('express');
var bodyParser = require('body-parser');
var morgan     = require('morgan');
var jwt        = require('jsonwebtoken');
var config     = require('./config');

// initialize the app
var app = express();

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// use morgan to log requests to the console
app.use(morgan('dev'));

// require our modules
// var router = express.Router();
var routes = require('./app/routes')(app, config, jwt);


// route middleware to verify token
// router.use(function(request, response, next) {
//     // skip route which returns token
//     if(request.path === "/authenticate")
//         next();

//     var token = request.headers.token;

//     if(token) {
//         // verifies secret and checks expiry
//         jwt.verify(token, 'super-secret-key', function(error, decoded) {
//             if(error) {
//                 return response.json({
//                     success: false,
//                     message: 'Failed to authenticate token'
//                 });
//             }
//             else {
//                 request.decoded = decoded;
//                 next();
//             }
//         });
//     }
//     else {
//         return response.json({ 
//             success: false, 
//             message: 'No token provided' 
//         });
//     }
// });

// router.get('/user', function(request, response) {
//     response.send({ user : 'yay' });
// });

// // route middleware for jwt
// router.post('/authenticate', function(request, response) {
//     if('password' !== request.body.password) {
//         response.json({
//             success: false,
//             message: 'Authentication failed. Wrong password'
//         });
//     }
//     else {
//         var token = jwt.sign({ name:'name' }, 'super-secret-key', {
//             expiresInMinutes: 10
//         });

//         response.send({
//             success: true,
//             message: 'Token generated',
//             token  : token
//         });
//     }
// });

/* =================== REGISTER OUR ROUTES =================== */
// prefix our apis with /api
app.use('/api', router);
// app.use('/api', require('./app/routes')(express));   

// set the port for the app
var port = process.env.PORT || 8080;

/* =================== START THE SERVER =================== */
app.listen(port);
console.log('Server running at http://localhost:' + port);