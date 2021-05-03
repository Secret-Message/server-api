// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const { log } = require('../utils/logs.js');
const chalk = require('chalk');
const userService = require('../services/user.service.js');

const deleteUser = (req, res, next) => {
    const { userId } =  req.decoded;
    log(chalk.red("User deleted", userId))

    userService.deleteUser(userId, (err, sqlRes) => {
        res.status(sqlRes.status).clearCookie('Authorization').json({ msg: sqlRes.msg })
    });
}

const updateUser = (req, res, next) => {
    const { userId } =  req.decoded;
    const { name, avatar } = req.body;

    if(!name && !avatar){
        res.status(403).json({ msg: "You must specify min 1 of these values: name, avatar" });
        return;
    }

    if(name){
        userService.changeUserName(userId, name, (err, sqlRes) => {})
    }

    if(avatar){
        userService.changeAvatar(userId, avatar, (err, sqlRes) => {})
    }

    res.status(200).json({msg: "ok"})
}

const getUserServers = (req, res, next) => {
    const { userId } =  req.decoded;
    userService.getServers(userId, 0, (err, sqlRes) => {
        res.status(200).json({
             servers: sqlRes.map(e =>  {
                 return({"uuid": e.uuid, "name": e.name})
            })
        })
    })
}

const getUserFriends = (req, res, next) => {
    const { userId } =  req.decoded;
    userService.getFriends(userId, (err, sqlRes) => {
        res.status(200).json({
             friends: sqlRes.map(e => (e.user1 != userId) ? e.user1 : e.user2)
        })
    })
}

const getUserDMs = (req, res, next) => {
    const { userId } =  req.decoded;
    userService.getServers(userId, 1, (err, sqlRes) => {
        res.status(200).json({
             servers: sqlRes.map(e =>  {
                 return({"uuid": e.uuid, "name": e.name})
            })
        })
    })
}

const getUserById = (req, res, next) => {
    const { userId } =  req.body;

    if(userId){
        userService.getUserById(userId, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide userId" });
    }
}

module.exports = { 
    deleteUser, 
    updateUser,
    getUserServers, 
    getUserFriends, 
    getUserDMs,
    getUserById
}