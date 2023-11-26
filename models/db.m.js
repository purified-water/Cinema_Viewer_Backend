require('dotenv').config();

const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
};

const db = pgp(cn);

const createMoviesTable = async(new_db) => {
    // CREATE TABLES
    try {

        await new_db.none(`
        CREATE TABLE IF NOT EXISTS movies (
            id VARCHAR(20) NOT NULL,
            title VARCHAR(255),
            originaltitle VARCHAR(255),
            fulltitle VARCHAR(255),
            year VARCHAR(10),
            image VARCHAR(255),
            releaseDate DATE,
            runtimestr VARCHAR(30),
            plot TEXT,
            awards VARCHAR(255),
            genreList TEXT,
            countries VARCHAR(255),
            languages VARCHAR(255),
            imdbrating VARCHAR(20),
            boxOffice VARCHAR(20),
            plotFull TEXT
        )
    `)
        console.log(`TABLE movies created successfully.`);

            
    } catch (error) {
        console.error(`Error creating table movies:`, error);
    }

}

const createActorsTable = async(new_db) => {
    // ACTORS
    try {

        await new_db.none(`
        CREATE TABLE IF NOT EXISTS actors (
            id VARCHAR(20) NOT NULL,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(100),
            image VARCHAR(255),
            summary TEXT,
            birthDate DATE,
            deathDate DATE,
            awards VARCHAR(255)
        )
    `)
        console.log(`TABLE actors created successfully.`);

    } catch (error) {
        console.error(`Error creating table actors:`, error);
    }
}

const createReviewsTable = async(new_db) => {
    //REVIEWS
    try {

        await new_db.none(`
        CREATE TABLE IF NOT EXISTS reviews (
            movieid VARCHAR(20) NOT NULL,
            username VARCHAR(50) NOT NULL,
            date DATE NOT NULL,
            rate VARCHAR(20),
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL

           
        )
        


    `)
    // CONSTRAINT PK_Review PRIMARY KEY (movieId, username)
        console.log(`TABLE reviews created successfully.`);

    } catch (error) {
        console.error(`Error creating table reviews:`, error);
    }
}


// console.log('\tconnected db', db);
module.exports = {
    createDatabase: async () => {
        const newDB = process.env.MY_DB
        try {
            // Check if the database already exists
            let exists = await db.oneOrNone(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            newDB
            );
            
            console.log('\tEXIST?', exists);
            // tạm thời để cái này để xóa db nếu đang có
            if (exists) {
                // await db.none(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = $1`, [newDB]);
                await db.none("DROP TABLE if exists movies")
                await db.none("DROP TABLE if exists actors")
                await db.none("DROP TABLE if exists reviews")
                await db.none(`DROP DATABASE ${newDB}`);
                console.log(`Database "${newDB}" DROPPED successfully.`);
                exists = false
            }

            if (!exists) {
                await db.none(`CREATE DATABASE ${newDB}`);
                console.log(`Database "${newDB}" created successfully.`);
            } else {
                console.log(`Database "${newDB}" already exists.`);
                return;
            }

            const new_pgp = require('pg-promise')({
                capSQL: true
            });
            const new_db = new_pgp({ ...cn, database: newDB });
            try {
                await createMoviesTable(new_db);
                await createActorsTable(new_db);
                await createReviewsTable(new_db);
            } catch (error) {
                console.log('ERROR in creating tables');
            } 
            // finally {
            //     new_pgp.end()
            //     console.log('NEW PGP ENDED');

            // }
           

            

            

        } catch (error) {
            console.error('Error creating database:', error);
        } finally {
            // pgp.end();
            console.log('PGP ENDED');
        }
        
    },



}