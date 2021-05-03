const db = require('../models/index.js');
const { log } = require('../utils/logs.js');
const chalk = require('chalk');

const deleteUser = ( userId, result ) => {
    try {
        db.users.destroy({
            where: {
                uuid: userId
            }
        }).then(( data ) => {
            result(null, { status: 200, msg: "ok"});
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const changeUserName = ( userId, newUserName, result ) => {
    try {
        db.users.update(
        {
            name: newUserName
        },
        {
            where: {
                uuid: userId
        }
        }).then(( user ) => {
            result(null, { status: 200, msg: "ok"});
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const changeAvatar = ( userId, newAvatarUrl, result ) => {
    try {
        db.users.update(
        {
            avatar_url: newAvatarUrl
        },
        {
            where: {
                uuid: userId
            }
        }).then(( user ) => {
            result(null, { status: 200, msg: "ok"});
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getServers = ( userId, dm, result) => {
    try {
        db.servers.findAll({
            attributes: ["uuid", "name"],
            include: [
                {
                  model: db.members,
                  where: {
                      userUuid: userId
                  }
                }
            ],
            where: {
                dm: dm
            }
        }).then(( data ) => {
            result(null, data);
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getFriends = ( userId, result) => {
    try {
        db.friendships.findAll({
            attributes: ["user1", "user2"],
            where: {
                [db.Sequelize.Op.or]: [{user1: userId}, {user2: userId}]
            }
        }).then(( data ) => {
            result(null, data);
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getUserById = ( userId, result ) => {
    try {
        db.users.findOne({
            where: {
                uuid: userId
            }
        }).then((user) => {
            result(null, {status: 200, msg: user })
        })
    } catch(e){
        throw new Error(e.message);
    }
}

module.exports = {
    deleteUser,
    changeUserName,
    changeAvatar,
    getServers,
    getFriends,
    getUserById
}