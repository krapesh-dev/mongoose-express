// require necessary modules
var mongoose = require('mongoose');

// initialize db schema
// var Schema = mongoose.Schema;

// define the model schema
// var BearSchema = new Schema({
//     name: String
// });

// module.exports = mongoose.model('Bear', BearSchema);

mongoose.connect('mongodb://localhost/api');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(callback) {
    console.log('yay!');
});

var userSchema = mongoose.Schema({
    name: String
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.talk = function() {
    var greeting = this.name ? "I am " + this.name : "No name";

     return(greeting);
};

userSchema.getUser = function(id) {
    return "Hi";
};

var User = mongoose.model('User', userSchema);

var user = new User();
// console.log(user);
// user.talk();

// user.save(function(err, user) {
//     if(err)
//         return console.log(err);

//     user.talk();
// });

module.exports = user;