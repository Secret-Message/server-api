const db = require('../models/index.js');
const { log } = require('../utils/logs.js');
const chalk = require('chalk');

const createMessage = (userId, content, channelId, parentMessage, result) => {
    try {
        db.servers.findOne({
            include: [
                {
                model: db.members,
                where: {
                    userUuid: userId
                }
                },
                {
                    model: db.categories,
                    include: [
                        {
                            model: db.channels,
                            where: {
                                id: channelId,
                                voice: 0
                            }
                        }
                    ]
                }
            ],
        }).then((server) => {
            if(server){
                db.messages.create({
                    content: content,
                    memberUuid: server.members[0].uuid,
                    messageId: parentMessage,
                    channelId: channelId
                }).then((message) => {
                    result(null, {status: 200, msg: message})
                })
            }else{
                result(null, { status: 403, msg: "You dont belong to this server"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const deleteMessage = (userId, messageId, result) => {
    try {
        db.members.findOne({
            where: {
                userUuid: userId,
            },
            include: [{
                model: db.messages,
                where: {
                    id: messageId
                }
            }]
        }).then((member) => {
            if(member){
                member?.messages[0].destroy();

                result(null, {status: 200, msg: "ok"})
            }else{
                db.servers.findOne({
                    include: [
                        {
                        model: db.members,
                        where: {
                            userUuid: userId,
                            isOwner: 1
                        }
                        },
                        {
                            model: db.categories,
                            include: [
                                {
                                    model: db.channels,
                                    include: [
                                        {
                                            model: db.messages,
                                            where: {
                                                id: messageId
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ],
                    where: {
                        dm: 0
                    }
                }).then((server) => {
                    if(server?.categories[0]?.channels[0]?.messages[0]){
                        server?.categories[0]?.channels[0]?.messages[0].destroy();

                        result(null, {status: 200, msg: "ok"})
                    }else{
                        result(null, {status: 401, msg: "You need to be owner of server or author of message"})
                    }
                })
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const updateMessage = (userId, messageId, content, result) => {
    try {
        db.members.findOne({
            where: {
                userUuid: userId,
            },
            include: [{
                model: db.messages,
                where: {
                    id: messageId
                }
            }]
        }).then((member) => {
            if(member?.messages[0]){
                member?.messages[0].update({
                    content: content
                })

                result(null, {status: 200, msg: "ok"})
            }else{
                result(null, {status: 401, msg: "You need to be author of the message to edit"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

module.exports = {
    createMessage,
    deleteMessage,
    updateMessage
}