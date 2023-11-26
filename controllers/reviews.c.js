const data = require('../models/data.m')
const reviewsModel = require('../models/reviews.m')

async function insertAll() {
    let reviewList = data.getReviews();



    // console.log('List', reviewList[0]);
    for (const review of reviewList) {
        for (const item of review.items) {
            let a = await reviewsModel.byReviewID(review.movieid, item.username);
            if(!a) {
                reviewsModel.insertReview(review, item);
            }
        }
       
        
        
    }
    console.log('inserted all reviews');
}


module.exports = {
    insertAll,


}