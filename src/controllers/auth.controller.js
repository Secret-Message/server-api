// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const jwt = require('jsonwebtoken');
const { admin } = require('../utils/firebase.js');
const { log } = require('../utils/logs.js');
const chalk = require('chalk');
const db = require('../models/index.js');

//const userService = require('../services/user.service.js');

const login = (req, res) => {
    log(chalk.green("authorize"))
    const { Token } = req.body;

    if(!Token){
        res.status(403).json({ msg: "Firebase token not provided"});
        return;
    }
    admin
        .auth()
        .verifyIdToken(Token)
        .then((decodedToken) => {
            db.users.findOne({
                where: {
                    firebase_uid:  decodedToken.user_id
                }
            }).then(data => {
                if(!data){
                    log(chalk.yellow("Created user"))
                    db.users.create({
                        name: decodedToken.email.split('@')[0],
                        firebase_uid:  decodedToken.user_id,
                        friend_code: Math.floor(Math.random() * 9999)
                    }).then((result) => {
                        log(chalk.yellow("User logged in 1", result?.uuid));
                        let token = jwt.sign({ userId: result?.uuid }, process.env.SERVER_TOKEN, { expiresIn: "1h" })
                        res.status(200).cookie('Authorization', token, { maxAge: 86_400_000 }).json({ user: result });
                    })
                }else{
                    log(chalk.yellow("User logged in 2", data?.uuid));
                    let token = jwt.sign({ userId: data?.uuid }, process.env.SERVER_TOKEN, { expiresIn: "1h" })
                    res.status(200).cookie('Authorization', token, { maxAge: 86_400_000 }).json({ user: data });
                }
            })
        })
        .catch((error) => {
            log(error);
            log(chalk.red("user provided wrong credentials"));
            res.status(403).json({ msg: error.code });
            return;
        });
}

const loggedin = (req, res, next) => {
    const cookies = req.cookies || req.headers.cookie;

    if (!cookies) { res.status(401).json({ msg: 'Unauthorized' }); return; }
    const token = cookies['Authorization'];
    if (token) {
        jwt.verify(token, process.env.SERVER_TOKEN, (err, decoded) => {
            if (err) {
                log(chalk.red("user token incorrect"));
                res.status(401).json({ msg: 'Unauthorized' })
            }

            if (decoded) {
                log("decoded", decoded)

                db.users.findOne({
                    where: {
                        uuid:  decoded.userId
                    }
                }).then((data) => {
                    if(!data){
                        res.status(403).json({ msg: "How it's possible you should not exist" })
                    }else{
                        req.decoded = decoded
                        next()
                    }
                })
            }
        })
    }
    else {
        res.status(403).json({ msg: "Token not provided" })
    }
}

module.exports = { 
    login, 
    loggedin 
}