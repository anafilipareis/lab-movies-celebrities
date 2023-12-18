// routes/celebrities.routes.js
const router = require("express").Router();
const Celebrity = require ('../models/Celebrity.model'); // import de celebrity model

// All your routes related to celebrities will go here
router.get ('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
} );

router.post('/create', (req, res, next) => {
    // Extract values from the form
    const { name, occupation, catchPhrase } = req.body;
  
    // Create a new instance of the Celebrity model
    Celebrity.create({ name, occupation, catchPhrase })

      .then((newCelebrity) => {
        console.log('New celebrity added:', newCelebrity);
        // Redirect to the list of celebrities after creating a new one
        res.redirect('/celebrities');
      })

      .catch((error) => {
        res.render('celebrities/new-celebrity', { errorMessage: 'Error creating celebrity.' });
      });
  });


router.get('/', (req, res, next) => {
  Celebrity.find()
  .then(allCelebrities => {
    // -> allTheBooksFromDB is a placeholder, it can be any word
    console.log('All Celebrities', allCelebrities);

    res.render('celebrities/celebrities', {allCelebrities});
  })
  .catch(error => {
    console.log('Error in showing all celebrities', error);
    next(error);
  });
})

module.exports = router;