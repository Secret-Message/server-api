'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      this.hasMany(models.Member_Roles)
      this.hasMany(models.Permissions_overwrite)
      this.belongsTo(models.Servers)
    }
  };
  Roles.init({
    allow: DataTypes.BIGINT,
    deny: DataTypes.BIGINT,
    name: DataTypes.STRING,
    color: DataTypes.INTEGER,
    mentionable: DataTypes.BOOLEAN,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Roles',
  });
  return Roles;
};