'use strict';
const Sequelize = require('sequelize');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.hasMany(models.Friend_requests, {
        foreignKey: 'requesterId'
      })
      this.hasMany(models.Friend_requests, {
        foreignKey: 'reciverId'
      })
    }
  };
  Users.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    firebase_uid: DataTypes.STRING,
    friend_code: DataTypes.INTEGER,
    avatar_url: DataTypes.STRING,
    join_date: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "online"
    },
    custom_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};