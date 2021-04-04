const { Filter } = require('../filter');
const messageDB = require('../../database/message');
const { lower_bound, upper_bound } = require('../../lib/utils/algorithms');

/*
=< MESSAGE FILTER >=
OPTIONS:
from=<timestamp>
to=<timestamp>
id=<id/list 1,2,5,10>
sender=<who has sent message>
*/

const MessageFilterLayer0 = {
    from: (array, timestamp) => {
        // DON'T WORK
        return array.slice(lower_bound(array, (e) => messageDB.getById(e).timestamp <= parseInt(timestamp)));
    },
    to: (array, timestamp) => {
        // DON'T WORK
        return array.slice(0, upper_bound(array, (e) => messageDB.getById(e).timestamp < parseInt(timestamp)));
    },
}
const MessageFilterLayer1 = {
    id: (message, id) => {
        return (id.toString().split(' ').map(e => parseInt(e)).includes(message.id));
    },
    sender: (message, uid) => {
        return (message.author == uid);
    },
    count: (message, num, _variables, _stop) => {
        if (_variables.count < num) {
            _variables.count++;
            return true;
        } else {
            _stop();
            return false;
        }
    }
};
const MessageFilter = new Filter(key => messageDB.getById(key), MessageFilterLayer0, MessageFilterLayer1, { count: 0 });
function parseMessageFilter(filter) {
    return MessageFilter.parse(filter);
}

module.exports = { parseMessageFilter };