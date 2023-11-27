const movieModel = require('../models/movies.m')


async function load(req, res, next) {
    try {
        let highestRating = await movieModel.getHighestRating(); 
        let highestBoxOffice = movieModel.getTopBoxOffice(); 

        let topFavorite = movieModel.getFavorites() || null;

        // console.log('HIGHEST RATING', highestRating);



        // const rating = {total: 5, movie: highestRating};
        // const boxOffice = {total: 15, movie: highestBoxOffice};
        // const fav = {total: 5, movie: topFavorite};

        // for (const mov in highestRating) {
        //     console.log(`idx ${mov}; rate: ${highestRating[mov].id}`);
        // }
        // console.log('HIGHEST RATING', rating);


        // res.render("home", {highestRating, highestBoxOffice, topFavorite});
        res.render("home", {highestRating});
        // res.render("home");
        
    } catch (error) {

        next(error);
        
    }
}

async function getMovieInfo(req, res, next) {
    try {
      const id = req.params.id;
      const data = await movieModel.getMovieInfo(id);
      res.render("movieDetal", { mov: data });
    } catch (error) {
      next(error);
    }
}

module.exports = {
    load,
    getMovieInfo
}

