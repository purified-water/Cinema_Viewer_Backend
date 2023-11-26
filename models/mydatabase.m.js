require('dotenv').config();

const pgp = require('pg-promise')({
    capSQL: true
});

const cn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.MY_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    max: 30
};
const dbase = pgp(cn);

// dbase.connect()
//     .then(obj => {
//         console.log('Connected to the database');
//         obj.done(); // success, release the connection
//     })
//     .catch(error => {
//         console.error('Error connecting to the database:', error);
//     });

module.exports = dbase;

// TAIJ SAO LẠI GỌI CÁI NÀY TRƯỚC KHI TẠO DATABASE