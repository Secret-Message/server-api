'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      this.belongsTo(models.Servers)
      this.hasMany(models.Channels)
      this.hasMany(models.Permissions_overwrite)
    }
  };
  Categories.init({
    name: DataTypes.STRING,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return Categories;
};