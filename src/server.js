// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
/*
   _____                     __     __  ___
  / ___/___  _____________  / /_   /  |/  /__  ______________ _____ ____
  \__ \/ _ \/ ___/ ___/ _ \/ __/  / /|_/ / _ \/ ___/ ___/ __ `/ __ `/ _ \
 ___/ /  __/ /__/ /  /  __/ /_   / /  / /  __(__  |__  ) /_/ / /_/ /  __/
/____/\___/\___/_/   \___/\__/  /_/  /_/\___/____/____/\__,_/\__, /\___/
                                                            /____/
*/
// ascii banner^

import express from 'express';
import chalk from 'chalk'; // <- kolorki :D
import cors from 'cors';
import fs from 'fs';
import path from 'path';
//const ws = require('./utils/websocket.js');
import db from './models';
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();


var corsOptions = {
    origin: ["http://localhost:80", "http://localhost:443", "http://localhost:8000"],
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(require('cookie-parser')());

fs
  .readdirSync(`${__dirname}/routes`)
  .filter(file => {
    return (file.slice(-3) === '.js');
  })
  .forEach(file => require(path.join(`${__dirname}/routes`, file))(app))

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(chalk.green.bold(`App listening on port ${PORT}`));
    });
}

export default app;
// /----------------------- Credits: -----------------------\
// |               rest api: olix3001, hiderr               |
// |           websocket: Frankoslaw, jj15_warrior          |
// \--------------------------------------------------------/