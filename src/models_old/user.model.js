module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.CHAR(30),
        allowNull: false
      },
      firebase_uid: {
        type: Sequelize.CHAR(28),
        allowNull: false
      },
      friend_code: {
        type: Sequelize.INTEGER(),
        allowNull: false
      },
      avatar_url: {
        type: Sequelize.STRING()
      },
      status: {
        type: Sequelize.CHAR(28),
        allowNull: false,
        defaultValue: "offline"
      }
    });
  
    return user;
};