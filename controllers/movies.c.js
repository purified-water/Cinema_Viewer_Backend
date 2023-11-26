const data = require('../models/data.m')
const moviesModel = require('../models/movies.m')

async function insertAll() {
    let movieList = data.getMovies();
    movieList.forEach(movie => {
        let a = moviesModel.byMoviesID(movie.id);
        if (!a) {
            moviesModel.insertMovie(movie);
        }
        
    });
    console.log('inserted all movies');
}


module.exports = {
    insertAll,


}