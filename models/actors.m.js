const db = require('./mydatabase.m');

module.exports = {
    insertActor: async(actor) => {
        try {
            // const existingActors = await db.oneOrNone('SELECT id FROM actors WHERE id = $1', [actor.id]);
            
            // if(!existingActors) {
               
            //     // console.log(`Inserted data for actor with ID: ${actor.id}`);
            // }

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

            

        } catch (error) {
            console.error(`Error inserting data for actor with ID: ${actor.id}`, error);

        } 
        // finally {
        //     db.$pool.end();
        // }

       

    },

    byActorID: async (id) => {
        return await db.query("SELECT * FROM actors WHERE id=$1", id).then((el) => {
          return el[0];
        });
    },
}