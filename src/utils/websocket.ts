// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0

import { createServer } from "http";
import { Server, Socket } from "socket.io";
import * as jwt from 'jsonwebtoken';
import * as chalk from 'chalk';
import UserService from '../services/UserService'
import { CustomSocket } from '../interfaces/ICommon'

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:80", "http://localhost:443", "http://localhost:8000"],
        credentials: true,
        methods: ['GET', 'POST']
    }
});


io.use((socket: CustomSocket, next) => {
        if (socket.handshake.query && socket.handshake.query.token){
            jwt.verify(socket.handshake.query.token, process.env.SERVER_TOKEN, function(err, decoded) {
                if (err) {
                    console.log(chalk.red(err))
                    console.log(chalk.red("WS: user token incorrect"));
                    socket.disconnect(true);
                    return;
                }

                console.log(chalk.green("WS: user token correct"));
                socket.decoded = decoded;

                next();
            });
        }
    })
    .on('connection', (socket: CustomSocket) => {
        const { userId } = socket.decoded;
        console.log(chalk.blueBright(`WS connected: ${userId}`))
    });


httpServer.listen(8080, () => {
    console.log(chalk.green.bold("Websocket listening on port 8080"))
});

export = io