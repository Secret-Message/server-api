// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const userDB = require('../models/old_users');
const httpServer = require('http').createServer();
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const cookie = require('cookie');
const { log } = require('./logs');


const io = require('socket.io')(httpServer, {
    cors: {
        origins: ["http://localhost:80", "http://localhost:443"],
        credentials: true,
        mathods: ['GET', 'POST']
    }
});

const socketMap = {};

io.on('connection', socket => {
    var timeout = setTimeout(() => {
        socket.disconnect(true);
    }, 5000);
    socket.on('auth', ({ cookies }) => {


        if (!cookies) {
            socket.disconnect(true);
            clearTimeout(timeout);
        }

        const token = cookie.parse(cookies).Authorization;

        // check user token
        var user_data;
        var correctToken = false;
        if (token) {
            jwt.verify(token, process.env.SERVER_TOKEN, (err, decoded) => {
                if (err) {
                    log(chalk.red("WS: user token incorrect"));
                    socket.disconnect(true);
                    clearTimeout(timeout);
                }
                if (decoded) {
                    log(chalk.green("WS: user token correct"));
                    user_data = decoded;
                    correctToken = true;
                }
            });
            if (!correctToken) {
                return;
            }
        }
        else {
            socket.disconnect(true);
            clearTimeout(timeout);
            return;
        }



        // disable timeout
        clearTimeout(timeout);

        // =====< STATUS >=====
        const uid = user_data.uid;

        socket.on('disconnect', (reason) => {
            userDB.setStatus(uid, "offline", socket);
            delete socketMap[uid];
        });
        if (uid in socketMap) {
            socket.disconnect(true);
            return;
        }

        for (let dm of userDB.getAllUserDMs(uid)) {
            socket.join('dm:' + dm);userDB = require('../models/old_users');
        }

        // set status to online :>
        userDB.setStatus(uid, "online", socket)
        // set status to offline

        // add user to socket map
        socketMap[uid] = socket;

    });
});

module.exports = { socketMap: socketMap, io: io };

httpServer.listen(8080, () => {
    console.log(chalk.green.bold("Websocket listening on port 8080"))
});