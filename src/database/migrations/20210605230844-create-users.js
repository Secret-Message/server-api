'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
      },
      firebase_uid: {
        type: Sequelize.STRING
      },
      friend_code: {
        type: Sequelize.INTEGER
      },
      avatar_url: {
        type: Sequelize.STRING
      },
      join_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      custom_status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};