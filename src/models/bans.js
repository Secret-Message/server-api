'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bans extends Model {
    static associate(models) {
      this.belongsTo(models.Users)
      this.belongsTo(models.Servers)
    }
  };
  Bans.init({
    reason: DataTypes.STRING,
    permanent: DataTypes.BOOLEAN,
    timeout: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Bans',
  });
  return Bans;
};