const db = require('../models/index.js');
const { log } = require('../utils/logs.js');
const chalk = require('chalk');

const createServer = (userId, serverName, result) => {
    try {
        db.servers.create({
            name: serverName,
            dm: 0
        }).then(( server ) => {
            db.members.create({
                userUuid: userId,
                serverUuid: server.uuid,
                isOwner: false
            })
            db.categories.create({
                name: "First category",
                serverUuid: server.uuid
            }).then((category) => {
                db.channels.bulkCreate([
                    {name: "First text channel", voice: 0, categoryId: category.id},
                    {name: "First voice channel", voice: 1, categoryId: category.id}
                ])
            })

            log(chalk.yellow(server.uuid))
            result(null, server);
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const deleteServer = ( userId, serverId, result) => {
    try {
        db.members.findOne({
            where: {
                isOwner: 1,
                userUuid: userId,
                serverUuid: serverId
            }
        }).then((data) => {
            if(!data){
                result(null, { status: 401, msg: "You don't have permisions for this operation"});
            }else{
                db.servers.findOne({
                    where: {
                        uuid: serverId
                    }
                }).then((server) => {
                    if(server.dm){
                        result(null, { status: 403, msg: "DM server cannot be edited or deleted directly"});
                    }else{
                        db.servers.destroy({
                            where: {
                                uuid: serverId
                            }
                        })

                        result(null, { status: 200, msg: "ok"});
                    }
                })
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const changeServerName = (userId, serverUuid, name, result) => {
    try {
        db.members.findOne({
            where: {
                isOwner: 1,
                userUuid: userId,
                serverUuid: serverUuid
            }
        }).then((member) => {
            if(!member){
                result(null, {status: 401, msg: "You don't have permissions to edit this group"})
            }else{
                db.servers.update(
                {
                    name: name
                },
                {
                    where:{
                        uuid: serverUuid
                    }
                }).then((server) => {
                    result(null, {status: 200, msg: "ok"})
                })
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getCategories = (userId, serverUuid, result) => {
    try {
        db.members.findOne({
            where: {
                userUuid: userId,
                serverUuid: serverUuid
            }
        }).then((member) => {
            if(!member){
                result(null, {status: 401, msg: "You don't belong to this group"})
            }else{
                db.categories.findAll({
                    where:{
                        serverUuid: serverUuid
                    }
                }).then((categories) => {
                    result(null, {status: 200, msg: {categories}})
                })
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getMembers = (userId, serverUuid, result) => {
    try {
        db.members.findOne({
            where: {
                userUuid: userId,
                serverUuid: serverUuid
            }
        }).then((member) => {
            if(!member){
                result(null, {status: 401, msg: "You don't belong to this group"})
            }else{
                db.members.findAll({
                    where:{
                        serverUuid: serverUuid
                    }
                }).then((members) => {
                    result(null, {status: 200, msg: {members}})
                })
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const joinServer = (userId, serverUuid, result) => {
    try {
        db.servers.findOne({
            where: {
                uuid: serverUuid
            }
        }).then((server) => {
            if(server){
                db.members.findOrCreate({
                    where: {
                        userUuid: userId,
                        serverUuid: serverUuid
                    },
                    defaults: {
                        isOwner: 0
                    }
                })

                result(null, {status: 200, msg: "ok"})
            }else{
                result(null, {status: 403, msg: "server don't exists"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const leaveServer = (userId, serverUuid, result) => {
    try {
        db.servers.findOne({
            where: {
                uuid: serverUuid
            }
        }).then((server) => {
            if(server){
                db.members.destroy({
                    where: {
                        userUuid: userId,
                        serverUuid: serverUuid,
                        isOwner: 0
                    }
                }).then((destroyRes) => {
                    if(destroyRes){
                        result(null, {status: 200, msg: "ok"})
                    }else{
                        result(null, {status: 403, msg: "You don't belong to this server or you are owner"})
                    }
                })
            }else{
                result(null, {status: 403, msg: "server don't exists"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const createDM = (userId, reciverId, result) => {
    try {
        db.users.findOne({
            where: {
                uuid: reciverId
            }
        }).then((reciver) => {
            if(!reciver){
                result(null, {status: 403, msg: "reciver dont exist"});
                return;
            }
            db.servers.findOne({
                where: {
                    dm: 1
                },
                include: [
                    {
                        model: db.members,
                        where: {
                            [db.Sequelize.Op.or]: [
                                {userUuid: userId},
                                {userUuid: reciverId}
                            ]
                        }
                    }
                ]
            }).then((DM) => {
                if(DM){
                    result(null, {status: 403, msg: "DM already exist"});
                }else{
                    db.servers.create({
                        name: "DM",
                        dm: 1
                    }).then(( server ) => {
                        db.members.bulkCreate([
                            {isOwner: 0, userUuid: userId, serverUuid: server.uuid},
                            {isOwner: 0, userUuid: reciverId, serverUuid: server.uuid}
                        ])
                        db.categories.create({
                            name: "DM category",
                            serverUuid: server.uuid
                        }).then((category) => {
                            db.channels.bulkCreate([
                                {name: "DM text channel", voice: 0, categoryId: category.id},
                                {name: "DM voice channel", voice: 1, categoryId: category.id}
                            ])
                        })
            
                        log(chalk.yellow(server.uuid))
                        result(null, {status: 200, msg: server});
                    })
                }
            })
        })
    } catch(e){
        throw new Error(e.message);
    }
}

module.exports = {
    createServer,
    deleteServer,
    changeServerName,
    getCategories,
    getMembers,
    joinServer,
    leaveServer,
    createDM
}