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

const express = require('express');
const app = express();
const chalk = require('chalk'); // <- kolorki :D
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
//const ws = require('./utils/websocket.js');

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
  .forEach(file => require(path.join(__dirname, file))(app))

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(chalk.green.bold(`App listening on port ${PORT}`));
    });
}

module.exports = app;
// /----------------------- Credits: -----------------------\
// |               rest api: olix3001, hiderr               |
// |           websocket: Frankoslaw, jj15_warrior          |
// \--------------------------------------------------------/