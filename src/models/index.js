const dbConfig = require("../../config/db.config.js");
const { log } = require("../utils/logs.js");
const chalk = require("chalk");

const Sequelize = require("sequelize");
const { BOOLEAN } = require("sequelize/lib/data-types");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  //logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.friendships = require("./friendship.model.js")(sequelize, Sequelize);
db.members = require("./member.model.js")(sequelize, Sequelize);
db.messages = require("./message.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.servers = require("./server.model.js")(sequelize, Sequelize);
db.categories = require("./category.model.js")(sequelize, Sequelize);
db.channels = require("./channel.model.js")(sequelize, Sequelize);

db.users.hasMany( db.members, { onDelete: 'CASCADE' } );
db.servers.hasMany( db.members, { onDelete: 'CASCADE' } );

db.users.hasMany( db.friendships, { as: "user1", foreignKey: "user1", onDelete: 'CASCADE' } );
db.users.hasMany( db.friendships, { as: "user2", foreignKey: "user2", onDelete: 'CASCADE' } );

db.members.hasMany( db.messages, { onDelete: 'CASCADE' } );
db.messages.hasMany( db.messages, { onDelete: 'CASCADE' } );
db.channels.hasMany( db.messages, { onDelete: 'CASCADE' } );

db.servers.hasMany( db.roles, { onDelete: 'CASCADE' } );
db.members.hasMany( db.roles, { onDelete: 'CASCADE' } );

db.servers.hasMany( db.categories, { onDelete: 'CASCADE' } );

db.categories.hasMany( db.channels, { onDelete: 'CASCADE' } );

db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});


module.exports = db;