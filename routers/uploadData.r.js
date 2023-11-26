const app = require("express");
const uploadDataC = require("../controllers/loadData.c");

const router = app.Router();
router.get("/", uploadDataC.loadData);

module.exports = router;
