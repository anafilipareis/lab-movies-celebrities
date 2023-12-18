// routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
const Movie = require ('../models/Movie.model'); // import movie model


// GET route to render the form to create a new movie
router.get('/create', (req, res, next) => {
    Celebrity.find()
      .then(allCelebrities => {
        res.render('movies/new-movie', { allCelebrities });
      })
      .catch(error => {
        next(error);
      });
  });

  // POST route to handle form submission and create a new movie
router.post('/create', (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    const castIds = Array.isArray(cast) ? cast : [cast];

    // Array.isArray(cast): This part checks if cast is already an array. If it is, castIds will be assigned the value of cast. This is useful when the user selects multiple celebrities in the form, resulting in an array of IDs.
    // ? cast : [cast]: This is the ternary operator, which is a shorthand way of writing an if-else statement. If cast is an array, it uses cast as the value of castIds; otherwise, it creates an array with a single element [cast]. This ensures that castIds is always an array.
  
    Movie.create({ title, genre, plot, cast: castIds })
      .then(newMovie => {
        console.log('New movie added:', newMovie);
        res.redirect('/movies'); // Redirect to the list of movies after creating a new one
      })
      .catch(error => {
        next(error);
      });
  });

// GET route to render the movies view
router.get('/', (req, res, next) => {
    // Use a database query to retrieve all the movies
    Movie.find()
      .then(allMovies => {
        // Render the view and pass the array of movies into the view as a variable
        res.render('movies/movies', { allMovies });
      })
      .catch(error => {
        console.log('Error in showing all movies', error);
        next(error);
      });
  });

// GET route to display details of a specific movie
router.get('/:id', (req, res, next) => {
    const movieId = req.params.id;
  
    // Retrieve details of the specific movie by its id
    Movie.findById(movieId)
      .populate('cast') // Populate the cast field to get details about the celebrities
      .then(movie => {
          
        // Render the view with movie details
        res.render('movies/movie-details', { movie });
      })
      .catch(error => {
        console.log('Error in showing movie details', error);
        next(error);
      });
  });

  // POST route to delete a specific movie
router.post('/:id/delete', (req, res, next) => {
    const movieId = req.params.id;
  
    // Delete the specific movie by its id
    Movie.findByIdAndRemove(movieId)
      .then(() => {
        res.redirect('/movies');
      })
      .catch(error => {
        console.log('Error in deleting movie', error);
        next(error);
      });
  });

 

module.exports = router;