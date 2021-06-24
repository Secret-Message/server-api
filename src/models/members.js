'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    static associate(models) {
      this.belongsTo(models.Users)
      this.belongsTo(models.Servers)
      this.hasMany(models.Member_Roles)
      this.hasMany(models.Permissions_overwrite)
      this.hasMany(models.Messages, {
        foreignKey: 'autohrId'
      })
    }
  };
  Members.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'Members',
  });
  return Members;
};