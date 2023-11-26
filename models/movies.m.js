const db = require('./mydatabase.m');


module.exports = {
    insertMovie: async(movie) => {
        try {
            await db.none(`
                INSERT INTO movies VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16
                )`, [
                    movie.id,
                    movie.title,
                    movie.originaltitle,
                    movie.fulltitle,
                    movie.year,
                    movie.image,
                    movie.releaseDate,
                    movie.runtimeStr,
                    movie.plot,
                    movie.awards,
                    movie.genreList,
                    movie.companies,
                    movie.countries,
                    movie.languages,
                    movie.imdbrating,
                    movie.boxOffice,
                    movie.plotFull,
                ]
            
            
            );
            console.log(`Inserted data for movie with ID: ${movie.id}`);

        } catch (error) {
            console.error(`Error inserting data for movie with ID: ${movie.id}`, error);

        } finally {
            db.$pool.end();
        }

       

    },

    byMoviesID: async (id) => {
        return await db.query("SELECT * FROM movies WHERE id=$1", id).then((el) => {
          return el[0];
        });
    },
}