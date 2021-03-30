const httpServer = require('http').createServer();
const jwt = require('jsonwebtoken');
const userDB = require('../database/users');
const chalk = require('chalk');
const cookie = require('cookie');
const { log } = require('../lib/logs');
const { time } = require('console');

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
        if (token) {
            jwt.verify(token, process.env.SERVER_TOKEN, (err, decoded) => {
                if (err) {
                    log(chalk.red("WS: user token incorrect"));
                    socket.disconnect(true);
                    clearTimeout(timeout);
                    return;
                }
                if (decoded) {
                    log(chalk.green("WS: user token correct"));
                    user_data = decoded;
                }
            })
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

module.exports = socketMap;