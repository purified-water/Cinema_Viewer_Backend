const db = require('./mydatabase.m');

module.exports = {
    insertActor: async(actor) => {
        try {
            await db.none(`
                INSERT INTO actors VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8
                )`, [
                    actor.id,
                    actor.name,
                    actor.role,
                    actor.image,
                    actor.summary,
                    actor.birthdate,
                    actor.deathdate,
                    actor.awards
                ]
            
            
            );
            console.log(`Inserted data for actor with ID: ${actor.id}`);

        } catch (error) {
            console.error(`Error inserting data for actor with ID: ${actor.id}`, error);

        } finally {
            db.$pool.end();
        }

       

    },

    byActorID: async (id) => {
        return await db.query("SELECT * FROM actors WHERE id=$1", id).then((el) => {
          return el[0];
        });
    },
}