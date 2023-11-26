const express = require('express')
const fs = require('fs')
require('dotenv').config();
const dbHandle = require('./models/db.m')
const getData = require('./models/data.m')

const app = express();
const path = require('path')
const port = process.env.PORT;
const hostname = 'localhost';



// Tạo database và các bảng
dbHandle.createDatabase()


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

