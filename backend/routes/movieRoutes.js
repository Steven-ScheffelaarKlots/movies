const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.get('/movies', movieController.getMovies);
router.get('/movies/rented', movieController.getCurrentlyRentedMovies);
router.post('/movies/checkout', movieController.checkoutMovie);
router.post('/movies/return', movieController.returnMovie);
router.post('/movies/reset', movieController.resetMovies);

module.exports = router;