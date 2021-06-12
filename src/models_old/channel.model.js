module.exports = (sequelize, Sequelize) => {
    const channel = sequelize.define("channel", {
      name: {
        type: Sequelize.CHAR(50),
        allowNull: false
      },
      voice: {
          type: Sequelize.BOOLEAN(),
          allowNull: false
      }
    });
  
    return channel;
};