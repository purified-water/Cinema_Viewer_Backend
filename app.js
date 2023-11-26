const express = require('express')
const fs = require("fs/promises");
require('dotenv').config();
const dbHandle = require('./models/db.m')

const app = express();
const path = require('path')
const port = process.env.PORT;
const hostname = 'localhost';


app.use(express.static(__dirname));

// Tạo database và các bảng
dbHandle.createDatabase()
console.log('Finished database');



// Require custom engine
const myTemplateEngine = require('./21588');
app.engine("html", myTemplateEngine);

app.set("views", "./views");
app.set("view engine", "html");



// ROUTERS
// Upload data
const uploadData = require('./routers/uploadData.r')
app.use('/', uploadData)

const homeRoute = require("./routers/home.r");
app.use("/", homeRoute);

// MIDDLEWARE
const middleware = require("./middleware/middleware");
app.use(middleware.middleware);


// Trigger data insertion when a GET request is made to "/"
app.get('/', async (req, res, next) => {
    try {
        // Assuming your loadData controller is in uploadDataC
        await uploadDataC.loadData(req, res, next);
    } catch (error) {
        next(error);
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

