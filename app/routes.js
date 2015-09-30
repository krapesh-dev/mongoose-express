/* =================== ROUTES FOR OUR API =================== */
module.exports = function(app, config, jwt) {
    // require necessary modules
    var Movie = require('./models/movie').Movie;

    // initialize the router
    // var router = express.Router();

    // middleware for all requests
    // router.use(function(req, res, next) {
    //     // dont stop. advance to routes
    //     next();
    // });

    // set secret key
    app.set('superSecret', config.secret);

    // authenticate
    app.post('/xauthenticate', function(request, response) {
        if('password' !== request.body.password) {
            response.json({
                success: false,
                message: 'Authentication failed. Wrong password'
            });
        }
        else {
            var token = jwt.sign({ name:'name' }, app.get('superSecret'), {
                expiresInMinutes: 10
            });

            response.send({
                success: true,
                message: 'Token generated',
                token  : token
            });
        }
    });

    // test route
    app.get('/', function(request, response) {
        res.json({ message: 'hooray!' });
    });

    // get movies
    app.get('/movies', function(request, response) {
        Movie.find(function(error, movies) {
            if(error)
                console.error('Database fetch failed.' + error);
            
            response.send(movies);
        });
    });

    // get a specific movie
    app.get('/movie/:id', function(request, response) {
        Movie.find({ id: parseInt(request.params.id, 10) }, function(error, movie) {
            if(error)
                console.error('Database fetch failed.' + error);

            response.send(movie);
        });
    });    

    // save a movie detail
    app.post('/movie', function(request, response) {
        var newMovie = new Movie(request.body);
        
        // newMovie.save(function(error, movie, affected) {
        //     if(error)
        //         console.log(error);

        //     console.log('Rows affected: ' + affected);
        // });

        response.sendStatus(response.statusCode);
    });

    /* =================== REGISTER OUR ROUTES =================== */
    // prefix our apis with /api
    // app.use('/api', router);
    // app.use('/api', require('./app/routes')(express));   
};