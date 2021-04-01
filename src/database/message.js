const data = require('./database');

var last_message_id = 0;

const messageDB = {
    doExist: (messageID) => {
        return data.messages[messageID] != undefined;
    },

    createMessage: (authorUID, messageContent, answer) => {
        data.messages[last_message_id] = {
            id: last_message_id,
            author: authorUID,
            content: messageContent,
            timestamp: Date.now(),
            answer: answer, // id of message that this is answer to
            reactions: [],
        }
        last_message_id++;
        return 1;
    },

    deleteMessage: (messageID, authorUID) => {
        if (!doExist(messageID)) {
            //message dont exist
            return 0;
        }
        if (authorUID != data.messages[messageID].author) {
            //you are not author of a messsage
            return 1;
        }
        delete data.messages[messageID];
        return 2;
    },

    editMessage: (messageID, authorUID, newContent) => {
        if (!doExist(messageID)) {
            //message dont exist
            return false;
        }
        if (authorUID != data.messages[messageID].author) {
            //you are not author of a messsage
            return false;
        }

        data.messages[messageID].content = newContent;
        return true;
    },

    getById: (messageId) => {
        return data.messages[messageId];
    }
}

module.exports = messageDB;