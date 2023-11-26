const movieModel = require('../models/movies.m')


exports.load = async(req, res, next) => {
    try {
        // let highestRating = movieModel.highestRating(); //To implement
        // let highestBoxOffice = movieModel.highestBoxOffice(); //To implement

        // let topFavorite = movieModel.topFavorite() || null; //To implement

        // res.render("home", highestRating, highestBoxOffice, topFavorite);
    } catch (error) {

        next(error);
        
    }
}