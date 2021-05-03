const db = require('../models/index.js');
const { log } = require('../utils/logs.js');
const chalk = require('chalk');

const createCategory = (userId, serverUuid, name, result) => {
    try {
        db.members.findOne({
            where: {
                isOwner: 1,
                userUuid: userId,
                serverUuid: serverUuid
            }
        }).then((member) => {
            if(member){
                db.categories.create({
                    name: name,
                    serverUuid: serverUuid
                }).then((category) => {
                    result(null, {status: 200,  msg: category})
                })
            }else{
                result(null, {status: 403, msg: "You must be a owner to proced this operation"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const deleteCategory = ( userId, categoryId, result) => {
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
                db.categories.destroy({
                    where: {
                        id: categoryId
                    }
                }).then((category) => {
                    result(null, { status: 200, msg: "ok"})
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

const changeCategoryName = (userId, categoryId, name, result) => {
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
                db.categories.findOne({
                    where:{
                        id: categoryId
                    }
                }).then((category) => {
                    category.update({
                        name: name
                    })

                    result(null, {status: 200, msg: "ok"})
                })
            }else{
                //TODO: Poprawić to kiedyś bo błąd o tym że nie jesteś ownerem wystąpi takrze gdy kategoria należy do dm lub kategoria nie istnieje
                result(null, {status: 403,  msg: "You must be a owner to proced this operation"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

const getChannels = (userId, categoryId, result) => {
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
                    where: {
                        id: categoryId
                    },
                    include: [
                        {
                            attributes: ["id", "name", "voice", "categoryId"],
                            model: db.channels
                        }
                    ]
                }
            ]
        }).then((server) => {
            log(chalk.yellow(JSON.stringify(server.categories[0].channels, "   ", 4)))
            if(server){
                result(null, {status: 200, msg: server.categories[0].channels})
            }else{
                result(null, {status: 401, msg: "You don't belong to this server"})
            }
        })
    } catch(e){
        throw new Error(e.message);
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    changeCategoryName,
    getChannels
}