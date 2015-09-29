module.exports = function(mongoose) {
    // define a movie schema
    var movieSchema = new mongoose.Schema({
        title      : String,
        rating     : String,
        releaseYear: Number 
    });

    // define a user schema
    var userSchema = new mongoose.Schema({
        name : 'String',
        age  : 'Number',
        work : 'String',
        phone: 'Number'
    });

    return {
        movieSchema : movieSchema,
        userSchema : userSchema
    };
};