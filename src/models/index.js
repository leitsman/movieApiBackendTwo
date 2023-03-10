const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");


// Movies/Actors
Movie.belongsToMany(Actor, { through: 'moviesActors' })
Actor.belongsToMany(Movie, { through: 'moviesActors' })


// Movies/genres 
Movie.belongsToMany(Genre, { through: 'moviesGenres' })
Genre.belongsToMany(Movie, { through: 'moviesGenres' })

// Movies/directors
Movie.belongsToMany(Director, { through: 'moviesDirectors' })
Director.belongsToMany(Movie, { through: 'moviesDirectors' })