// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const httpServer = require('http').createServer();
const jwt = require('jsonwebtoken');
const chalk = require('chalk');
const { log } = require('./logs');
const userService = require('../services/user.service.js');

const io = require('socket.io')(httpServer, {
    cors: {
        origins: ["http://localhost:80", "http://localhost:443", "http://localhost:8000"],
        credentials: true,
        mathods: ['GET', 'POST']
    }
});

io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token, process.env.SERVER_TOKEN, function(err, decoded) {
                if (err) {
                    log(chalk.red(err))
                    log(chalk.red("WS: user token incorrect"));
                    socket.disconnect(true);
                    return;
                }

                log(chalk.green("WS: user token correct"));
                socket.decoded = decoded;

                next();
            });
        }
    })
    .on('connection', socket => {
        const { userId } = socket.decoded;
        log(chalk.blueBright(`WS connected: ${userId}`))
    });


httpServer.listen(8080, () => {
    log(chalk.green.bold("Websocket listening on port 8080"))
});

module.exports = io;