const data = require('../models/data.m')
const reviewsModel = require('../models/reviews.m')

async function insertAll() {
    let reviewList = data.getReviews();
    reviewList.forEach(review => {
        let a = reviewsModel.byReviewID(review.movieid, review.username);
        if (!a) {
            reviewsModel.insertReview(review);
        }
        
    });
    console.log('inserted all reviews');
}


module.exports = {
    insertAll,


}