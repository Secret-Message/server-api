// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const { log } = require('../utils/logs.js');
const chalk = require('chalk');
const messageService = require('../services/message.service.js');

const createMessage = (req, res, next) => {
    const { userId } =  req.decoded;
    const { content, channelId, parentMessage } = req.body;

    if(content && channelId){
        messageService.createMessage(userId, content, channelId, parentMessage, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide content, channelId and optionaly parentMessage" });
    }
}

const deleteMessage = (req, res, next) => {
    const { userId } =  req.decoded;
    const { messageId } = req.body;

    if(messageId){
        messageService.deleteMessage(userId, messageId, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide messageId" });
    }
}

const updateMessage = (req, res, next) => {
    const { userId } =  req.decoded;
    const { messageId, content } = req.body;

    if(messageId && content){
        messageService.updateMessage(userId, messageId, content, (err, sqlRes) => {
            res.status(sqlRes.status).json({ msg: sqlRes.msg });
        })
    }else{
        res.status(403).json({ msg: "You must provide messageId and content" });
    }
}

module.exports = { 
    createMessage, 
    deleteMessage, 
    updateMessage 
}