'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invites extends Model {
    static associate(models) {
      this.belongsTo(models.Servers)
    }
  };
  Invites.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    permanent: DataTypes.BOOLEAN,
    timeout: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Invites',
  });
  return Invites;
};