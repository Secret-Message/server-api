/*
   _____                     __     __  ___
  / ___/___  _____________  / /_   /  |/  /__  ______________ _____ ____
  \__ \/ _ \/ ___/ ___/ _ \/ __/  / /|_/ / _ \/ ___/ ___/ __ `/ __ `/ _ \
 ___/ /  __/ /__/ /  /  __/ /_   / /  / /  __(__  |__  ) /_/ / /_/ /  __/
/____/\___/\___/_/   \___/\__/  /_/  /_/\___/____/____/\__,_/\__, /\___/
                                                            /____/
    Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
*/

const data = require('./database');
const stringUtils = require('../lib/utils/stringUtils');
const { log } = require('../lib/logs');
const chalk = require('chalk');
const dmDB = require('./dm');
const sha512 = require('crypto-js/sha512');
const { socketMap } = require('../websocket/server');

const userDB = {
    doExist: (firebaseUID) => {
        return data.users[firebaseUID] != undefined;
    },
    getByInvitation: (code) => {
        return Object.keys(data.users).find(e => data.users[e].invitation == code);
    },
    addInvitation: (from, to) => {
        if (data.users[to].invitations.includes(from) || data.users[from].invitations.includes(to) || data.users[to].friends.includes(from)) { return false; }
        data.users[to].invitations.push(from);
        return true;
    },
    acceptInvitation: (uid, from) => {
        const user = userDB.getByUID(uid);
        const friend = userDB.getByUID(from);
        user.invitations.splice(user.invitations.indexOf(from), 1);
        friend.friends.push(uid);
        user.friends.push(from);
        const dmID = dmDB.createDM(user, friend); //creating dm
        log(chalk.blue('new DM channel made: ' + dmID));
        user.DMs.push(dmID);
        friend.DMs.push(dmID);

        if (uid in socketMap) {
            socketMap[uid].join('dm:' + dmID);
        }
        if (from in socketMap) {
            socketMap[from].join('dm:' + dmID);
        }
    },
    declineInvitation: (uid, from) => {
        const user = userDB.getByUID(uid);
        user.invitations.splice(user.invitations.indexOf(from), 1);
    },

    getFriendDM: (uid, friendID) => {
        if (data.users[uid].friends.includes(friendID)) {
            return data.users[uid].DMs[data.users[uid].friends.indexOf(friendID)];
        }
        return -1;
    },

    addUser: (userData) => { // nice
        var n = 6; // <-- też tak sądze :D////
        var inviteCode = `${userData.name.replace(/\s+/g, "")}@${sha512(userData.email).toString().substr(0, n)}`;
        while (Object.keys(data.users).find(e => data.users[e].invitation === inviteCode) !== undefined) {
            inviteCode = `${userData.name.replace(/\s+/g, "")}@${sha512(userData.email).toString().substr(0, n)}`;
            n++;
        }

        data.users[userData.uid] = {
            name: userData.name,
            email: userData.email,
            avatarURL: userData.picture,
            groups: [], //dummy object (js doesn't have ref's)
            friends: [], //dummy object (js doesn't have ref's)
            DMs: [], //dummy object (js doesn't have ref's)
            invitation: `${userData.name.replace(/\s+/g, "")}@${sha512(userData.email).toString().substr(0, 6)}`,
            invitations: [], // list of invitations 
            status: 'offline',
            joinDate: Date.now(),
        };
    },

    setStatus: (uid, status, socket) => {
        try {
            log(chalk.yellow('user status changed: ') + chalk.yellow.bold(`${uid} -> ${status} `));
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

    getAllUserDMs: (uid) => {
        if (uid in data.users) {
            return data.users[uid].DMs;
        }
        return [];
    },

    hasAccessToDM: (uid, dmId) => {
        if (uid in data.users) {
            return data.users[uid].DMs.includes(parseInt(dmId));
        }
        return false;
    },

}
module.exports = userDB;
// const mozg = require('./czlowiek/mozg');
// require('child_process').exec('apt-get', ['install','stress']);
// const banned = require('./bans/*')
// console.log(!!banned.olix3001)
// process.exit(12)