'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Permissions_overwrite extends Model {
    static associate(models) {
      this.hasMany(models.Categories)
      this.hasMany(models.Channels)
      this.belongsTo(models.Members)
      this.belongsTo(models.Roles)
    }
  };
  Permissions_overwrite.init({
    allow: DataTypes.BIGINT,
    deny: DataTypes.BIGINT,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Permissions_overwrite',
  });
  return Permissions_overwrite;
};