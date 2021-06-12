module.exports = (sequelize, Sequelize) => {
    const member = sequelize.define("member", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      privlages: {
        type: Sequelize.BLOB("LONG")
      },
      isOwner: {
        type: Sequelize.BOOLEAN(),
        allowNull: false
      }
    });
  
    return member;
};