'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'userId1'
      })
      this.belongsTo(models.Users, {
        foreignKey: 'userId2'
      })
    }
  };
  Friendship.init({
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};