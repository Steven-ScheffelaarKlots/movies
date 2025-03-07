const movieModel = require('../models/movieModel');
let movies = movieModel;
let currentlyRented = [];

// Get all movies
exports.getMovies = (req, res) => {
    try {
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Checkout movies
exports.checkoutMovie = (req, res) => {
    try {
        const checkoutItems = req.body; // Array of { id, quantity }
        checkoutItems.forEach(item => {
            const movie = movies.find(m => m.id === item.id);
            if (movie && movie.stock >= item.quantity) {
                movie.stock -= item.quantity;
                const rentedMovie = currentlyRented.find(r => r.id === item.id);
                if (rentedMovie) {
                    rentedMovie.quantity += item.quantity;
                } else {
                    currentlyRented.push( {id: item.id, quantity: item.quantity, title: item.title} );
                }
            } else {
                throw new Error(`Not enough stock for movie ID: ${item.id}`);
            }
        });
        res.status(200).send(movies);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Return movies
exports.returnMovie = (req, res) => {
    try {
        const returnItems = req.body; // Array of { id, quantity }
        returnItems.forEach(item => {
            const movie = movies.find(m => m.id === item.id);
            if (movie) {
                movie.stock += item.quantity;
                const rentedIndex = currentlyRented.findIndex(r => r.id === item.id && r.quantity === item.quantity);
                if (rentedIndex !== -1) {
                    currentlyRented.splice(rentedIndex, 1);
                } else {
                    throw new Error(`Rented movie ID: ${item.id} with quantity: ${item.quantity} not found`);
                }
            } else {
                throw new Error(`Movie ID: ${item.id} not found`);
            }
        });
        res.status(200).send(movies);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get all currently rented movies
exports.getCurrentlyRentedMovies = (req, res) => {
    try {
        res.status(200).send(currentlyRented);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Reset movies to initial state
exports.resetMovies = (req, res) => {
    try {
        movies = movieModel;
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
};