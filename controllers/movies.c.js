const data = require('../models/data.m')
const moviesModel = require('../models/movies.m')

async function insertAll() {
    let movieList = data.getMovies();
    for (const movie of movieList) {
        let a = await moviesModel.byMoviesID(movie.id);
        if(!a) {
            moviesModel.insertMovie(movie);
        }
        // console.log('FINDING MOVIE', a);
        // console.log('---Inserting');

        
    };
    console.log('inserted all movies');
}


module.exports = {
    insertAll,


}