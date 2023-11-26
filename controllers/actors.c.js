const data = require('../models/data.m')
const actorsModel = require('../models/actors.m')

async function insertAll() {
    let actorList = data.getActors();
    for (const actor of actorList) {
        let a = await actorsModel.byActorID(actor.id);
        if(!a) {
            actorsModel.insertActor(actor);

        }
        
    }
    console.log('inserted all actors');
}


module.exports = {
    insertAll,


}