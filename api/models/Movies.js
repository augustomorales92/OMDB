const S = require('sequelize');
const db = require('../../db')

class Movie extends S.Model { };

Movie.init(
  {
    title: {
      type: S.STRING,
      allowNull: false
    },
    img: {
      type: S.STRING,
      allowNull: true
    },
    movieId:{
      type : S.INTEGER,
      allowNull: true
    }
  },
  { sequelize: db, modelName: `movie` }
);

module.exports = Movie;