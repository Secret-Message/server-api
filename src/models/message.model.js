module.exports = (sequelize, Sequelize) => {
    const message = sequelize.define("message", {
      content: {
        type: Sequelize.TEXT(),
        allowNull: false
      },
      send_date: {
        type: Sequelize.DATE(),
        defaultValue: Sequelize.NOW,
        allowNull: false
      }
    });
  
    return message;
};