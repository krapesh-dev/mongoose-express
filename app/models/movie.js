// require mongoose
var mongoose = require('mongoose');

// require schemas
var movieSchema = require('../schema/schema.js')(mongoose).movieSchema;

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



// methods for our schema
movieSchema.methods.saveMovie = function(input) {
    // save the model
    // API: Model.save([options], document,)
    input.save(function(error, movie, affected) {
        if(error)
            console.error('Database update failed. ' + error);

        console.log('Rows affected: ' + affected);
    });
};

movieSchema.methods.findOneMovie = function() {
    // find a single movie by name
    // API: Model.findOne(conditions, [projections], [options], [callback])
    Movie.findOne({ title: 'Thor' }, function(error, movie) {
        if(error)
            console.error('Database fetch failed.' + error);

        console.log(movie);
    });
};

movieSchema.methods.findAllMovies = function() {
    // find all movies
    // API: Model.find(conditions, [projection], [options], [callback])
    Movie.find(function(error, movies) {
        if(error)
            console.error('Database fetch failed.' + error);
        
        return movies;
    });
};

movieSchema.methods.findMovieBy = function(projection, value) {
    // find movies using a projection
    Movie.find({ projection: value }, function(error, movies) {
        if(error)
            console.error('Database fetch failed.' + error);

        console.log(movies);
    });
};

// static helper functions
movieSchema.statics.findAllWithRating = function() {
    // return this.find({ })
};

// create a model for our schema
var Movie = mongoose.model('Movie', movieSchema);
// var User  = mongoose.model('User', userSchema);

// CRUD operations
// var thor = new Movie({
//     title      : 'Thor',
//     rating     : 'PG-13',
//     releaseYear: 2011
// });

module.exports = {
    Movie : Movie
    // User  : User
};