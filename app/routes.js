/* =================== ROUTES FOR OUR API =================== */
module.exports = function(express) {
	// require necessary modules
	var Movie = require('./models/movie');

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
	router.get('/movies', function(req, res) {
	    Movie.find(function(error, movies) {
	        if(error)
	            console.error('Database fetch failed.' + error);
	        
	        res.send(movies);
	    });
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
	// app.use('/api', router);
};