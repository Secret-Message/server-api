const data = require('./database');

var last_group_id = 0;

const dmDB = {
    doExist: (dmGroupID) => {
        return data.dm[parseInt(dmGroupID)] != undefined;
    },

    createDM: (...users) => {
        data.dm[last_group_id] = {
            users: users,
            messages: [],
        }

        return last_group_id++;
    },

    addMessage: (dmID, id) => {
        data.dm[parseInt(dmID)].messages.push(id);
    },

    getById: (dmGroupId) => {
        return data.dm[parseInt(dmGroupId)];
    },

    getAllMessages: (dmID) => {
        return data.dm[parseInt(dmID)].messages;
    }
}

module.exports = dmDB;