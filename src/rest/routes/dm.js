// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const express = require('express');
const userLib = require('../../lib/user');
const router = express.Router();
const messageDB = require('../../database/message');
const dmDB = require('../../database/dm');
const { parseMessageFilter } = require('../../lib/filters/message');

// DELETE /dm/message
router.delete('/message/:id', user.userLib.verifyToken, (req, res) => { // delete message
    const id = req.params.id;
    const { author } = req.body;
    const deletingstatus = messageDB.deleteMessage(id, author);
    switch (deletingstatus) {
        case 0: res.status(404).json({ status: 'error', error: 'This message doesn\'t exist' }); break;
        case 1: res.status(403).json({ status: 'erorr', error: 'You aren\'t author of message you want to delete' }); break;
        default: res.status(200).json({ ststus: 'ok', error: 'id of messeage you deleted' + id }); break;
    }
});
router.get('/message', userLib.verifyToken, (req, res) => { // get message
    const id = req.params.id;
    const userUID = req.decoded.uid;
    const { filter, dmChannel } = req.body;
    // TODO: check if user has access to this channel
    const filterF = parseMessageFilter(filter);
    const messages = dmDB.getAllMessages(dmChannel);
    res.status(200).json({
        status: 'ok', messages: messages.filter(msg => filterF(msg)).map(msg => {
            const message = messageDB.getById(msg);
            return {
                author: message.author,
                content: message.content,
                timestamp: message.timestamp,
                answer: message.answer,
                reactions: message.reactions,
            };
        })
    });
});

router.post('/message', userLib.verifyToken, (req, res) => { // create message
    const { author, content, response } = req.body;
    messageDB.createMessage(author, content, answer);

});

router.put('/message', userLib.verifyToken, (req, res) => { // update message
    const id = req.params.id;
    const { content } = req.body;
});

module.exports = router;