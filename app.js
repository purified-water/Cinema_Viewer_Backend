const express = require('express')
const fs = require('fs')
require('dotenv').config();
const dbHandle = require('./models/db.m')
const getData = require('./models/data.m')

const app = express();
const path = require('path')
const port = process.env.PORT;
const hostname = 'localhost';


// dbHandle.createDatabase()

console.log('MOVIES', getData.getMovies());
//Lay data trong json





// TO DO 
/* Viet 1 ham hay file để lọc từng mảng movies, actors, reviews trong data
    
    Đọc từng data của movies, actors, reviews
    Gọi hàm trong db.js để insert vào db

    */



app.get("/", (req, res) => {
    res.send('HELLO WORLD')
})

app.set("views", "./views");
app.set("view engine", "html");

// // Routing
// const userRouter = require("./routers/user.r");
// app.use("/", userRouter);

// // Middleware
// const middleware = require("./middlewares/mdw");
// app.use(middleware);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

