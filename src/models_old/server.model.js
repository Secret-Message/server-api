module.exports = (sequelize, Sequelize) => {
    const server = sequelize.define("server", {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.CHAR(50),
        allowNull: false
      },
      dm: {
        type: Sequelize.BOOLEAN(),
        allowNull: false
      }
    });
  
    return server;
};