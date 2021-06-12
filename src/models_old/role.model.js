module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define("role", {
      name: {
        type: Sequelize.CHAR(50),
        allowNull: false
      },
      privlages: {
        type: Sequelize.BLOB("LONG")
      }
    });
  
    return role;
};