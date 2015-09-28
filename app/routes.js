/* =================== ROUTES FOR OUR API =================== */
module.exports = function(app) {
	// require necessary modules
	var Movie = require('./models/movie').Movie;

	// initialize the router
	// var router = express.Router();

	// middleware for all requests
	// router.use(function(req, res, next) {
	//     // dont stop. advance to routes
	//     next();
	// });

	// test route
	app.get('/', function(req, res) {
	    res.json({ message: 'hooray!' });
	});

	// get movies	
	app.get('/movies', function(req, res) {
	    Movie.find(function(error, movies) {
	        if(error)
	            console.error('Database fetch failed.' + error);
	        
	        res.send(movies);
	    });
	});

	// get specific user
	app.get('/users/:id', function(req, res) {

	});

	// post user
	app.post('/users', function(req, res) {
	    res.send({ method: 'POST' });
	});

	// save a movie detail
	app.post('/movie', function(req, res) {
		res.send(req.body);
	});

	/* =================== REGISTER OUR ROUTES =================== */
	// prefix our apis with /api
	// app.use('/api', router);
	// app.use('/api', require('./app/routes')(express));	
};