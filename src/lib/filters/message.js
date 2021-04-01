const { Filter } = require('../filter');

/*
=< MESSAGE FILTER >=
OPTIONS:
from=<timestamp>
to=<timestamp>
id=<id/list 1,2,5,10>
sender=<who has sent message>
*/
const MessageFilterOptions = {
    from: (message, timestamp) => {
        return (message.timestamp >= parseInt(timestamp));
    },
    to: (message, timestamp) => {
        return (message.timestamp <= parseInt(timestamp));
    },
    id: (message, id) => {
        return (id.split(' ').map(e => parseInt(e)).includes(message.id));
    },
    sender: (message, uid) => {
        return (message.author == uid);
    }
};
const messageDB = require('../database/message');
const MessageFilter = new Filter(key => messageDB.getById(key), MessageFilterOptions);
function parseMessageFilter(filter) {
    return MessageFilter.parse(filter);
}

module.exports = { parseMessageFilter };