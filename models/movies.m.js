const db = require('./mydatabase.m');


module.exports = {
    insertMovie: async(movie) => {

        try {
            // const existingMovie = await db.oneOrNone('SELECT id FROM movies WHERE id = $1', [movie.id]);
            
            // // console.log('EXISTING', movie.id);
            // if(!existingMovie) {
               
                // console.log(`Inserted data for movie with ID: ${movie.id}`);

            // }
            await db.none(`
            INSERT INTO movies VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
            )`, [
                movie.id,
                movie.title,
                movie.originalTitle,
                movie.fullTitle,
                movie.year,
                movie.image,
                movie.releaseDate,
                movie.runtimeStr,
                movie.plot,
                movie.awards,
                movie.genreList,
                movie.countries,
                movie.languages,
                movie.imDbRating,
                movie.boxOffice,
                movie.plotFull,
            ]
        
        
            );
            

        } catch (error) {
            console.log(error);
        }
        // finally {
        //     db.$pool.end();
        // }

       

    },

    byMoviesID: async (id) => {
        return await db.query("SELECT * FROM movies WHERE id=$1", id).then((el) => {
            return el[0];
        });
    },
}