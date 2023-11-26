const db = require('./mydatabase.m');

module.exports = {
    insertReview: async(review, item) => {
        try {
            // for (const rev of review.items) {
            //     const existingReviews = await db.oneOrNone('SELECT movieid FROM reviews WHERE movieid = $1 AND username = $2', [review.movieId, rev.username]);
            //     if(!existingReviews) {
                   
                    // console.log(`Inserted data for review with ID: ${review.movieid} ${review.username}`);
    
            //     }
            // }
            await db.none(`
            INSERT INTO reviews VALUES (
                $1, $2, $3, $4, $5, $6
            )`, [
                review.movieId,
                item.username,
                item.date,
                item.rate,
                item.title,
                item.content
            ]
        
            
            );
            // console.log(`Inserted data for review with ID: ${review.movieId} ${item.username}`);

            
           
        } catch (error) {
            console.error(`Error inserting data for review with ID:${review.movieId} ${item.username}`, error);

        } 
        // finally {
        //     db.$pool.end();
        // }

       

    },

    byReviewID: async (movid, username) => {
        return await db.query("SELECT * FROM reviews WHERE movieid=$1 AND username=$2", [movid, username]).then((el) => {
          return el[0];
        });
    },
}