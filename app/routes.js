/* =================== ROUTES FOR OUR API =================== */
module.exports = function(app, appConfig, jwt) {
    // require necessary modules
    var Movie = require('./models/movie').Movie;

    // set secret key
    app.set('superSecret', appConfig.secret);

    // middleware to verify token
    app.use(function(request, response, next) {
        // skip route which returns token
        console.log(request.path);

        if(request.path === "/authenticate") {
            next();
        }
        else {
            var token = request.headers.token;

            if(token) {
                // verifies secret and checks expiry
                jwt.verify(token, 'super-secret-key', function(error, decoded) {
                    if(error) {
                        return response.json({
                            success: false,
                            message: 'Failed to authenticate token'
                        });
                    }
                    else {
                        request.decoded = decoded;
                        next();
                    }
                });
            }
            else {
                return response.json({ 
                    success: false, 
                    message: 'No token provided' 
                });
            }
        }
    });

    // authenticate
    app.post('/authenticate', function(request, response) {
        // NOTE: can also query mongo to get admin credentials
        if('password' !== request.body.password) {
            response.json({
                success: false,
                message: 'Authentication failed. Wrong password'
            });
        }
        else {
            // NOTE: pass response from mongo as first parameter
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
        response.json({ message: 'hooray!' });
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
};