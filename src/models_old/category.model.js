module.exports = (sequelize, Sequelize) => {
    const category = sequelize.define("category", {
      name: {
        type: Sequelize.CHAR(50),
        allowNull: false
      }
    });
  
    return category;
};