// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const express = require('express');
const userLib = require('../../lib/user');
const router = express.Router();
const messageDB = require('../../database/message');
const dmDB = require('../../database/dm');
const { parseMessageFilter } = require('../../lib/filters/message');
const userDB = require('../../database/users');
const { io } = require('../../websocket/server');

// DELETE /dm/message
router.delete('/message/:id', userLib.verifyToken, (req, res) => { // delete message
    const id = req.params.id;
    const { author } = req.body;
    const deletingstatus = messageDB.deleteMessage(id, author);
    switch (deletingstatus) {
        case 0: res.status(404).json({ status: 'error', error: 'This message doesn\'t exist' }); break;
        case 1: res.status(403).json({ status: 'erorr', error: 'You aren\'t author of message you want to delete' }); break;
        default: res.status(200).json({ ststus: 'ok', error: 'id of messeage you deleted' + id }); break;
    }
});
router.get('/message/:id', userLib.verifyToken, (req, res) => { // get message
    const userUID = req.decoded.uid;
    const dmChannel = req.params.id;
    const filter = req.query.filter;
    const sort = req.query.sort;
    if (!userDB.hasAccessToDM(userUID, dmChannel)) {
        res.status(403).json({ status: 'error', error: 'You don\'t have access to this DM channel' })
        return;
    };
    const filterF = parseMessageFilter(filter);
    const messages = dmDB.getAllMessages(dmChannel);
    var filteredMessageList = [];
    var loop = true;
    if (sort == undefined || sort == 'oldest') {
        for (let i = 0; i < messages.length; i++) {
            if (filterF(messages[i], () => { loop = false; }, 'oldest')) {
                filteredMessageList.push(messages[i]);
            }
            if (!loop) {
                break;
            }
        }
    } else if (sort == 'newest') {
        for (let i = messages.length - 1; i >= 0; i--) {
            if (filterF(messages[i], () => { loop = false; }, 'newest')) {
                filteredMessageList.push(messages[i]);
            }
            if (!loop) {
                break;
            }
        }
    }
    res.status(200).json({
        status: 'ok', messageList: filteredMessageList.map(msg => {
            const message = messageDB.getById(msg);
            const author = userDB.getByUID(message.author);
            return {
                author: {
                    name: author.name,
                    avatar: author.avatarURL
                },
                content: message.content,
                timestamp: message.timestamp,
                answer: message.answer,
                reactions: message.reactions,
            };
        })
    });
});

router.post('/message', userLib.verifyToken, (req, res) => { // create message
    const { content, response, channel } = req.body;
    const author = req.decoded.uid;
    if (!userDB.hasAccessToDM(author, channel)) {
        res.status(403).json({ status: 'error', error: 'You don\'t have access to this DM channel' })
        return;
    };
    const messageID = messageDB.createMessage(author, content, response);
    dmDB.addMessage(channel, messageID);
    const authorUser = userDB.getByUID(author);
    io.to('dm:' + channel).emit('message', {
        author: {
            name: authorUser.name,
            avatar: authorUser.avatarURL,
        },
        content: content,
        response: response,
        channel: channel,
    });
    res.status(200).json({ status: 'ok' });
});
router.put('/message', userLib.verifyToken, (req, res) => { // update message
    const id = req.params.id;
    const { content } = req.body;
    res.status(501).json({ status: 'error', error: 'not implemented yet, BRUUUH' });
});

router.get('/access/:id', userLib.verifyToken, (req, res) => {
    if (userDB.hasAccessToDM(req.decoded.uid, req.params.id)) {
        res.status(200).json({ status: 'ok' });
    } else {
        res.status(403).json({ status: 'error', error: "NO ACCESS, no i co pajacu? taki kozak jesteś? i co? może myślałes że ci wybacze? nie, nie wydarzy się to ziomeczku. A teraz żegnam! NAUUURA" });
    }
})

module.exports = router;