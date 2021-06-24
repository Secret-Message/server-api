'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Permissions_overwrites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      category_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categories",
          key: "id"
        }
      },
      channel_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Channels",
          key: "id"
        }
      },
      member_id: {
        type: Sequelize.UUID,
        references: {
          model: "Members",
          key: "id"
        }
      },
      role_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Roles",
          key: "id"
        }
      },
      allow: {
        type: Sequelize.BIGINT
      },
      deny: {
        type: Sequelize.BIGINT
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
    await queryInterface.dropTable('Permissions_overwrites');
  }
};