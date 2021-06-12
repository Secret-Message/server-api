'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      author: {
        type: Sequelize.UUID,
        references: {
          model: "Members",
          key: "id"
        }
      },
      channel: {
        type: Sequelize.INTEGER,
        references: {
          model: "Channels",
          key: "id"
        }
      },
      content: {
        type: Sequelize.STRING
      },
      send_date: {
        type: Sequelize.DATE
      },
      parent_message: {
        type: Sequelize.INTEGER,
        references: {
          model: "Messages",
          key: "id"
        }
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
    await queryInterface.dropTable('Messages');
  }
};