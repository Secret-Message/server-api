'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member_Roles extends Model {
    static associate(models) {
      this.belongsTo(models.Members)
      this.belongsTo(models.Roles)
    }
  };
  Member_Roles.init({
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Member_Roles',
  });
  return Member_Roles;
};