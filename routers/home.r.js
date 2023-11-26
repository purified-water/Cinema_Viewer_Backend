const express = require('express');
const router = express.Router();
const uploadToDB = require('../controllers/loadData.c')

const homeController = require('../controllers/home.c');
router.get("/", homeController.load); // uploadToDB.loadData


module.exports = router;