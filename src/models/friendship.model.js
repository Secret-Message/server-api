module.exports = (sequelize, Sequelize) => {
    const friend_ship = sequelize.define("friend_ship", {
      user1: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      },
      user2: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
      }
    });
  
    return friend_ship;
};