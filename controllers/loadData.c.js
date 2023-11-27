const movieControl = require('./movies.c')
const actorControl = require('./actors.c')
const reviewControl = require('./reviews.c')

exports.loadData = async (req, res, next) => {
    try {
        // console.log('DATA LOAD CONTROLLER');
        await movieControl.insertAll();
        // console.log('INSERTING ACTORS');
        await actorControl.insertAll();
        // console.log('INSERTING REVIEWS');

        await reviewControl.insertAll();
        
        res.redirect('/');
    } catch (error) {
        next(error)
    }
}
