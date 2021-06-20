'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Channels extends Model {
    static associate(models) {
      this.belongsTo(models.Categories)
      this.hasMany(models.Messages)
      this.belongsTo(models.Permissions_overwrite)
    }
  };
  Channels.init({
    name: DataTypes.STRING,
    voice: DataTypes.BOOLEAN,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Channels',
  });
  return Channels;
};