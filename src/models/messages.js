'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    static associate(models) {
      this.belongsTo(models.Members, {
        foreignKey: 'autohrId'
      })
      this.belongsTo(models.Channels)
      this.belongsTo(models.Messages, {
        foreignKey: 'parentMessageId'
      })
      this.hasMany(models.Messages, {
        foreignKey: 'parentMessageId'
      })
    }
  };
  Messages.init({
    content: DataTypes.STRING,
    send_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Messages',
  });
  return Messages;
};