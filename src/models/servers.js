'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Servers extends Model {
    static associate(models) {
      this.hasMany(models.Members)
      this.hasMany(models.Bans)
      this.hasMany(models.Categories)
      this.hasMany(models.Roles)
      this.hasMany(models.Invites)
    }
  };
  Servers.init({
    name: DataTypes.STRING,
    icon_url: DataTypes.STRING,
    dm: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Servers',
  });
  return Servers;
};