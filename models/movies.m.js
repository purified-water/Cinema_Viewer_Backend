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

    getHighestRating: async () => {
        return await db.query(`
            SELECT *
            FROM movies
            WHERE imdbrating IS NOT NULL AND imdbrating != ''
            ORDER BY CAST(imdbrating AS DECIMAL(10,2)) DESC
            LIMIT 5;
        `)
    },

    getTopBoxOffice: async () => {
        return await db.query(`
            SELECT * FROM movies 
            WHERE boxOffice IS NOT NULL 
                AND boxOffice != '' 
                AND boxOffice ~ '^[0-9,$]+(.[0-9]+)?$' 
            ORDER BY REPLACE(SUBSTRING(boxOffice, 2), ',', '')::DECIMAL(18,2) DESC 
            LIMIT 15;
        `)
    },

    getFavorites: async () => {
        return await db.query(`
            SELECT *
            FROM movies
            WHERE isfav = TRUE
            LIMIT 15;
        `)
    },

    getMovieInfo: async (id) => {
        return await db.oneOrNone(`
            SELECT *
            FROM movies m
            WHERE m.id = id;
        `)
    }
}