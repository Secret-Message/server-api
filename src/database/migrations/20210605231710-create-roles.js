'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      allow: {
        type: Sequelize.BIGINT
      },
      deny: {
        type: Sequelize.BIGINT
      },
      name: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.INTEGER
      },
      mentionable: {
        type: Sequelize.BOOLEAN
      },
      server: {
        type: Sequelize.INTEGER,
        references: {
          model: "Servers",
          key: "id"
        }
      },
      number: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Roles');
  }
};