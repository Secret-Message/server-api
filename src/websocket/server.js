/*
   _____                     __     __  ___
  / ___/___  _____________  / /_   /  |/  /__  ______________ _____ ____
  \__ \/ _ \/ ___/ ___/ _ \/ __/  / /|_/ / _ \/ ___/ ___/ __ `/ __ `/ _ \
 ___/ /  __/ /__/ /  /  __/ /_   / /  / /  __(__  |__  ) /_/ / /_/ /  __/
/____/\___/\___/_/   \___/\__/  /_/  /_/\___/____/____/\__,_/\__, /\___/
                                                            /____/
    Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
*/

const httpServer = require('http').createServer();
const jwt = require('jsonwebtoken');
const userDB = require('../database/users');
const chalk = require('chalk');
const cookie = require('cookie');
const { log } = require('../lib/logs');

const io = require('socket.io')(httpServer, {
    cors: {
        origins: ["http://localhost:8000", "http://localhost:8080"],
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
        // set status to online :>
        userDB.setStatus(uid, "online", socket)
        // set status to offline
        socket.on('disconnect', (reason) => {
            userDB.setStatus(uid, "offline", socket);
            delete socketMap[uid];
        });

        // add user to socket map
        socketMap[uid] = socket;

    });
});

httpServer.listen(8080, () => {
    console.log(chalk.green.bold("Websocket listening on port 8080"))
});

module.exports = { socketMap: socketMap };