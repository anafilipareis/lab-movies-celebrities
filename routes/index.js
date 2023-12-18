const router = require("express").Router();
const celebritiesRoutes = require("./celebrities.routes");
const moviesRoutes = require("./movies.routes.js");


/* GET home page */
router.get("/", (req, res, next) => { res.render("index"); });

// use the route files
router.use("/celebrities", celebritiesRoutes);
router.use("/movies", moviesRoutes);


module.exports = router;
