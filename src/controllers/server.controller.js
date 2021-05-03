// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const { log } = require('../utils/logs.js');
const chalk = require('chalk');
const serverService = require('../services/server.service.js');

const createServer = (req, res, next) => {
    const { serverName } = req.body;
    const { userId } =  req.decoded;

    if(!serverName){
        res.status(403).json({ status: "error", msg: "You must specify new name for server"})
        return;
    }
    serverService.createServer(userId, serverName, (err, sqlRes) => {
        res.status(200).json({ status: "ok", serverId: sqlRes})
    })
}

const deleteServer = (req, res, next) => {
    const { serverUuid } = req.body;
    const { userId } =  req.decoded;

    serverService.deleteServer(userId, serverUuid, (err, sqlRes) => {
        res.status(sqlRes.status).json({ msg: sqlRes.msg})
    })
}

const updateServer = (req, res, next) => {
    const { userId } =  req.decoded;
    const { serverUuid, name } = req.body;

    if(serverUuid && name){
        serverService.changeServerName(userId, serverUuid, name, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ status: 'error', msg: "You must provide serverUuid and name" });
        return;
    }
}

const getServerCategories = (req, res, next) => {
    const { userId } =  req.decoded;
    const { serverUuid } = req.body; 
    if(serverUuid){
        serverService.getCategories(userId, serverUuid, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide serverUuid" });
    }
}

const getServerMembers = (req, res, next) => {
    const { userId } =  req.decoded;
    const { serverUuid } = req.body; 
    if(serverUuid){
        serverService.getMembers(userId, serverUuid, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide serverUuid" });
    }
}

const createDM = (req, res, next) => {
    const { userId } =  req.decoded;
    const { reciverId } = req.body;

    if(reciverId){
        serverService.createDM(userId, reciverId, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide reciverId" });
    }
}

const joinServer = (req, res, next) => {
    const { userId } =  req.decoded;
    const { serverUuid } = req.params; 

    if(serverUuid){
        serverService.joinServer(userId, serverUuid, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide serverUuid in request url" });
    }
}

const leaveServer = (req, res, next) => {
    const { userId } =  req.decoded;
    const { serverUuid } = req.params; 

    if(serverUuid){
        serverService.leaveServer(userId, serverUuid, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide serverUuid in request url" });
    }
}

module.exports = { 
    createServer, 
    deleteServer, 
    updateServer, 
    getServerCategories, 
    getServerMembers, 
    createDM,
    joinServer,
    leaveServer
}