const db = require('../models/index.js');
const { log } = require('../utils/logs.js');
const chalk = require('chalk');

const createChannel = (userId, channelName, categoryId, voice, result) => {
    try {
        db.servers.findOne({
            include: [
                {
                model: db.members,
                where: {
                    isOwner: 1,
                    userUuid: userId
                }
                },
                {
                    model: db.categories,
                    where: {
                        id: categoryId
                    }
                }
            ],
            where: {
                dm: 0
            }
        }).then((member) => {
            if(member){
                db.channels.create({
                    name: channelName,
                    voice: voice,
                    categoryId: categoryId

                }).then((channel) => {
                    result(null, {status: 200, msg: channel})
                })
            }else{
                //TODO: Poprawić to kiedyś bo błąd o tym że nie jesteś ownerem wystąpi takrze gdy kategoria należy do dm lub kategoria nie istnieje
                result(null, { status: 403, msg: "You must be a owner to proced this operation"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const deleteChannel = (userId, channelId, result) => {
    try {
        db.servers.findOne({
            include: [
                {
                model: db.members,
                where: {
                    isOwner: 1,
                    userUuid: userId
                }
                },
                {
                    model: db.categories,
                    include: [
                        {
                            model: db.channels,
                            where: {
                                id: channelId
                            }
                        }
                    ]
                }
            ],
            where: {
                dm: 0
            }
        }).then((member) => {
            if(member){
                db.channels.destroy({
                    where: {
                        id: channelId
                    }

                }).then((channel) => {
                    result(null, {status: 200, msg: channel})
                })
            }else{
                //TODO: Poprawić to kiedyś bo błąd o tym że nie jesteś ownerem wystąpi takrze gdy kategoria należy do dm lub kategoria nie istnieje
                result(null, { status: 403, msg: "You must be a owner to proced this operation"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const changeChannelName = (userId, channelId, channelName, result) => {
    try {
        db.servers.findOne({
            include: [
                {
                model: db.members,
                where: {
                    isOwner: 1,
                    userUuid: userId
                }
                },
                {
                    model: db.categories,
                    include: [
                        {
                            model: db.channels,
                            where: {
                                id: channelId
                            }
                        }
                    ]
                }
            ],
            where: {
                dm: 0
            }
        }).then((member) => {
            if(member){
                db.channels.update(
                {
                    name: channelName
                },
                {
                    where: {
                        id: channelId
                    }

                }).then((channel) => {
                    result(null, {status: 200, msg: channel})
                })
            }else{
                //TODO: Poprawić to kiedyś bo błąd o tym że nie jesteś ownerem wystąpi takrze gdy kategoria należy do dm lub kategoria nie istnieje
                result(null, { status: 403, msg: "You must be a owner to proced this operation"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getMessages = (userId, channelId, result) => {
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
                                id: channelId
                            },
                            include: [
                                {
                                    model: db.messages
                                }
                            ]
                        }
                    ]
                }
            ],
        }).then((server) => {
            if(server){
                result(null, {status: 200, msg: server.categories[0].channels[0].messages})
            }else{
                result(null, { status: 403, msg: "You dont belong to this server"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}


module.exports = {
    createChannel,
    deleteChannel,
    changeChannelName,
    getMessages
}