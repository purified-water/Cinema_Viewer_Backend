const fs = require('fs')

//Lay data tu json 
const jsonData = JSON.parse(fs.readFileSync('./data/data.json', 'utf-8'));
// console.log('JSON la', jsonData.Movies);
module.exports = {
    getMovies: () => {
        return jsonData.Movies;
    },

    getActors: () => {
        return jsonData.Names;
    },

    getReviews: () => {
        return jsonData.Reviews;
    }

}