const db = require('./mydatabase.m');

module.exports = {
    insertReview: async(review) => {
        try {
            await db.none(`
                INSERT INTO reviews VALUES (
                    $1, $2, $3, $4, $5, $6
                )`, [
                    review.movieid,
                    review.username,
                    review.date,
                    review.rate,
                    review.title,
                    review.content
                ]
            
            
            );
            console.log(`Inserted data for review with ID: ${review.movieid} ${review.username}`);

        } catch (error) {
            console.error(`Error inserting data for review with ID:${review.movieid} ${review.username}`, error);

        } finally {
            db.$pool.end();
        }

       

    },

    byReviewID: async (movid, username) => {
        return await db.query("SELECT * FROM reviews WHERE movieid=$1 AND username=$2", [movid, username]).then((el) => {
          return el[0];
        });
    },
}