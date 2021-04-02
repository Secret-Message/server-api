// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const jwt = require('jsonwebtoken');
const { admin } = require('../index');
const { log } = require('./logs');
const chalk = require('chalk');
const userDB = require('../database/users');

const signToken = (req, res) => {
    const { Token } = req.body;

    if (Token) {
        admin
            .auth()
            .verifyIdToken(Token)
            .then((decodedToken) => {
                let token = jwt.sign({ uid: decodedToken.uid }, process.env.SERVER_TOKEN, { expiresIn: "1d" })
                log(chalk.green("user logged in"));
                if (!userDB.doExist(decodedToken.uid))
                    userDB.addUser(decodedToken);
                res.status(200).cookie('Authorization', token, { maxAge: 86_400_000 }).json({ status: 'ok' });
                return;
            })
            .catch((error) => {
                console.log(error);
                log(chalk.red("user provided wrong credentials"));
                res.status(403).json({ status: 'error', msg: "Credentials not correct" });
                return;
            });
    } else {
        log(chalk.red("no token provided"));
        res.status(403).json({ status: 'error', msg: "No token provided" });
        return;
    }
}

const verifyToken = (req, res, next) => {

    const cookies = req.cookies || req.headers.cookie;
    if (!cookies) { res.status(401).json({ status: 'error', msg: 'Unauthorized' }); return; }
    const token = cookies['Authorization'];
    if (token) {
        jwt.verify(token, process.env.SERVER_TOKEN, (err, decoded) => {
            if (err) {
                log(chalk.red("user token incorrect"));
                res.status(401).json({ status: 'error', msg: 'Unauthorized' })
            }
            if (decoded) {
                if (!userDB.doExist(decoded.uid)) {
                    return;
                }
                req.decoded = decoded
                next()
            }
        })
    }
    else {
        res.status(403).json({ status: 'error', msg: "Token not provided" })
    }
}

module.exports = { signToken, verifyToken }