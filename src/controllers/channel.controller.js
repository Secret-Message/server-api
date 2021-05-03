// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const { log } = require('../utils/logs.js');
const chalk = require('chalk');
const channelService = require('../services/channel.service.js');

const createChannel = (req, res, next) => {
    const { channelName, categoryId, voice } = req.body;
    const { userId } =  req.decoded;

    if(!channelName || !categoryId || voice == undefined){
        res.status(403).json({ msg: "You must specify channelName, categoryId, voice"})
        return;
    }
    channelService.createChannel(userId, channelName, categoryId, voice, (err, sqlRes) => {
        res.status(sqlRes.status).json({ channelId: sqlRes.msg})
    })
}

const deleteChannel = (req, res, next) => {
    const { channelId } = req.body;
    const { userId } =  req.decoded;

    /*TODO: Prawdopodobnie wywali to kiedyś błąd bo ktoś ustawi channel id na 0 ale zmienię to później bo 
    trzeba to jeszcze zmienić w paru miejscach gdzie przyjmowane są liczby z body.*/

    if(!channelId){
        res.status(403).json({ msg: "You must specify channelId"})
        return;
    }
    channelService.deleteChannel(userId, channelId, (err, sqlRes) => {
        res.status(sqlRes.status).json({ channelId: sqlRes.msg})
    })
}

const updateChannel = (req, res, next) => {
    const { userId } =  req.decoded;
    const { channelId, channelName } = req.body;

    if(channelId && channelName){
        channelService.changeChannelName(userId, channelId, channelName, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide channelId and channelName" });
        return;
    }
}

const getChannelMessages = (req, res, next) => {
    const { userId } =  req.decoded;
    const { channelId } = req.body;

    if(channelId){
        channelService.getMessages(userId, channelId, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide channelId" });
        return;
    }
}


module.exports = { 
    createChannel, 
    deleteChannel, 
    updateChannel, 
    getChannelMessages 
}