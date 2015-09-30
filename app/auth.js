var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Movie = require('./models/movie').Movie;

passport.use(new BasicStrategy(
    function(username, password, callback) {
        Movie.findOne({ title:'Thor' }, function(error, movie) {
            if(error)
                return callback(error);
            if(!movie)
                return callback(null, false);

            movie.verifyPassword(password, function(error, isMatch) {
                if(error)
                    return callback(error);
                if(!isMatch)
                    return callback(null, false);

                return callback(null, movie);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', { session:false });