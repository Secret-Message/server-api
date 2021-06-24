'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend_requests extends Model {
    static associate(models) {
      this.belongsTo(models.Users, {
        foreignKey: 'requesterId'
      })
      this.belongsTo(models.Users, {
        foreignKey: 'reciverId'
      })
    }
  };
  Friend_requests.init({
  }, {
    sequelize,
    modelName: 'Friend_requests',
  });
  return Friend_requests;
};