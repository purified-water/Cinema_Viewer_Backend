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

const cn_new = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.MY_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
}

const db = pgp(cn);

//connect to new db
const new_db = pgp(cn_new)

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

            // tạm thời để cái này để xóa db nếu đang có
            if (exists) {
                await db.none(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = $1`, [newDB]);

                await db.none(`DROP DATABASE ${newDB}`);
                console.log(`Database "${newDB}" DROPPED successfully.`);
                exists = false
            }
            
            
            

            if (!exists) {
                await db.none(`CREATE DATABASE ${newDB}`);
                console.log(`Database "${newDB}" created successfully.`);
            } else {
                console.log(`Database "${newDB}" already exists.`);
            }
        } catch (error) {
            console.error('Error creating database:', error);
        } finally {

            pgp.end();
        }
    },

    createTable: async () => {
        
        try {
            // Check if the database already exists
            let exists = await db.oneOrNone(
            'SELECT 1 FROM pg_database WHERE datname = $1',
            newDB
            );

            // tạm thời để cái này để xóa db nếu đang có
            if (exists) {
                await db.none(`SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = $1`, [newDB]);

                await db.none(`DROP DATABASE ${newDB}`);
                console.log(`Database "${newDB}" DROPPED successfully.`);
                exists = false
            }
            
            
            

            if (!exists) {
                await db.none(`CREATE DATABASE ${newDB}`);
                console.log(`Database "${newDB}" created successfully.`);
            } else {
                console.log(`Database "${newDB}" already exists.`);
            }
        } catch (error) {
            console.error('Error creating database:', error);
        } finally {

            pgp.end();
        }
    }

    insertData: async (dataList) => {

    }

}