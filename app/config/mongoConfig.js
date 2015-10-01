// require mongoose
var mongoose = require('mongoose');

// connect to mongoose
mongoose.connect('mongodb://localhost/test');

// connection handle
var db = mongoose.connection;

// connection error
// NOTE: can be also written as 'mongoose.connection.on'
db.on('error', function() {
    console.error('Connection to mongo failed');
});

// connection success
db.on('open', function() {
    console.log('Connection to mongo eshtablished');
});

// close mongodb connection
var gracefulExit = function() {
    mongoose.connection.close(function() {
        console.log('Connection to mongo closed');
        process.exit(0);
    });
};

// if node process ends, close mongo connection
process.on('SIGINT', gracefulExit)
       .on('SIGTERM', gracefulExit);

module.exports = mongoose;