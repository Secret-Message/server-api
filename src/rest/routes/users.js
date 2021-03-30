// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const express = require('express');
const router = express.Router();
const userLib = require('../../lib/user');
const userDB = require('../../database/users');
const stringUtils = require('../../lib/utils/stringUtils');
const { socketMap } = require('../../websocket/server');
const { request } = require('express');

// create new user or login existing one
router.post('/login', userLib.signToken);


// delete user
router.delete('/delete', (req, res) => { // delete user from database
    const { token, serverToken } = req.body; // token: user token; serverToken: token that should match .env SERVER_TOKEN
    // this function doesn't exist
});

// /users/friends/
// Retrieves list of friends
router.get('/friends', userLib.verifyToken, (req, res) => {
    const user = userDB.getByUID(req.decoded.uid);
    res.status(200).json({
        status: 'ok',
        friends: user.friends.slice().map(e => {
            const PendingUser = userDB.getByUID(e);
            return {
                uid: e,
                name: PendingUser.name,
                pictrue: PendingUser.avatarURL
            }
        })
    })
})

// /users/invite/{kod przyjaciela}
// add friend
router.post('/invite/:code', userLib.verifyToken, (req, res) => {
    let RequestID = req.decoded.uid;
    // get uid from invitation code
    let InvitationID = userDB.getByInvitation(req.params.code);
    // if invitation code is incorrect return 404
    if (!InvitationID) { res.status(404).json({ status: 'error', error: 'user does not exist' }); return; }
    // notify user about new invitation
    userDB.addInvitation(RequestID, InvitationID);
    const sendingUser = userDB.getByUID(RequestID);
    if (socketMap.includes(InvitationID)) {
        socketMap[InvitationID].emit('friendRequest', {
            // all data about invitating user
            picture: sendingUser.avatarURL,
            name: sendingUser.name,
            uid: RequestID,
        });
    }
    // respond with code 200
    res.status(200).json({ status: 'ok' });
});

// /users/invite/
// Retrieves user's invite code
router.get('/invite', userLib.verifyToken, (req, res) => {
    const user = userDB.getByUID(req.decoded.uid);
    res.status(200).json({
        status: 'ok',
        inviteCode: user.invitation
    })
})

// /users/invites/
// Retrieves user's pending invitations
router.get('/invites', userLib.verifyToken, (req, res) => {
    // get user from database
    const user = userDB.getByUID(req.decoded.uid);
    // respond with status 200
    res.status(200).json({
        // map invitation list to show other data too
        status: 'ok', pending: user.invitations.slice().map(e => {
            const PendingUser = userDB.getByUID(e);
            return {
                uid: e,
                name: PendingUser.name,
                pictrue: PendingUser.avatarURL
            }
        })
    });
});


// /users/invite/accept
// Accept invitation
router.post('/invite/accept', userLib.verifyToken, (req, res) => {
    // get user
    const user = userDB.getByUID(req.decoded.uid);
    // if user doesn't exist respond with 404
    if (!user) { res.status(404).json({ status: 'error', error: 'user not found' }); return; }
    // if includes then accept
    if (user.invitations.includes(req.body.uid)) {
        userDB.acceptInvitation(req.decoded.uid, req.body.uid);
        res.status(200).json({ status: 'ok' });
        // TODO: send message via websocket
    } else {
        res.status(404).json({ status: 'error', error: 'user not found' })
    }
});

module.exports = router;