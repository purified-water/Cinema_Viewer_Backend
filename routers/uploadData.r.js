const app = require("express");
const uploadDataC = require("../controllers/loadData.c");

const router = app.Router();
router.get('/', async (req, res, next) => {
    try {

      await uploadDataC.loadData(req, res, next);
      res.send('Data inserted successfully');
    } catch (error) {
      next(error);
    }
});

module.exports = router;
