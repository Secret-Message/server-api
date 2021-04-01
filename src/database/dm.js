const data = require('./database');

var last_group_id = 0;

const dmDB = {
    doExist: (dmGroupID) => {
        return data.dm[dmGroupID] != undefined;
    },

    createDM: (...users) => {
        data.dm[last_group_id] = {
            users: users,
            messages: [],
        }

        return last_group_id++;
    },

    getById: (dmGroupId) => {
        return data.dm[dmGroupId];
    },

    getAllMessages: (dmID) => {
        return data.dm[dmID];
    }
}

module.exports = dmDB;