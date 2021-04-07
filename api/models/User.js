const S = require('sequelize');
const db = require('../../db')
const bcrypt = require('bcrypt');
const Movie = require('./Movies')

class User extends S.Model { };

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false
    },
    password: {
      type: S.STRING,
      allowNull: false
    },
    salt: {
      type: S.STRING
    }
  },
  { sequelize: db, modelName: `user` }
);

User.beforeCreate(user => {
  return bcrypt
    .genSalt(16)
    .then(salt => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then(hash => user.password = hash);
});

User.prototype.hash = function(pass, salt){
  return bcrypt.hash(pass, salt);
}

Movie.belongsTo(User, { as: 'user' });


module.exports = User;