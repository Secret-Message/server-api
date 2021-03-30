// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const data = require('./database');
const stringUtils = require('../lib/utils/stringUtils');
const { log } = require('../lib/logs');
const chalk = require('chalk');
const { use, get } = require('../rest/routes/users');

const userDB = {
    doExist: (firebaseUID) => {
        return data.users[firebaseUID] != undefined;
    },

    getByInvitation: (code) => {
        return Object.keys(data.users).find(e => data.users[e].invitation == code);
    },
    addInvitation: (from, to) => {
        data.users[to].invitations.push(from);
    },
    acceptInvitation: (uid, from) => {
        delete invitations[from];
        const user = this.getByUID(uid);
        const friend = this.getByUID(from);
        if (!user || !friend) return;
        friend.friends.push(uid);
        user.friends.push(from);
    },

    addUser: (userData) => {
        data.users[userData.uid] = {
            name: userData.name,
            email: userData.email,
            avatarURL: userData.picture,
            groups: [], //dummy object (js doesn't have ref's)
            friends: [], //dummy object (js doesn't have ref's)
            chats: [], //dummy object (js doesn't have ref's)
            invitation: stringUtils.toHex(userData.email),
            invitations: [], // list of invitations 
            status: 'offline'
        };
        console.log(data);
    },

    setStatus: (uid, status, socket) => {
        try {
            log(chalk.yellow('user status changed: ') + chalk.yellow.bold(`${uid} -> ${status}`));
            data.users[uid].status = status;
        } catch {
            socket.disconnect(true);
        }
    },

    getByUID: (uid) => {
        // TODO: parse data from database
        return data.users[uid];
    },

    removeUser: (firebaseUID) => {
        data.users.delete(firebaseUID);
    },

}
module.exports = userDB;