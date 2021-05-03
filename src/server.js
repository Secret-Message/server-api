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
require('dotenv').config();


var corsOptions = {
    origin: ["http://localhost:80", "http://localhost:443"],
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(require('cookie-parser')());

const db = require("./models");


require("./routes/user.route.js")(app);
require("./routes/message.route.js")(app);
require("./routes/server.route.js")(app);
require("./routes/channel.route.js")(app);
require("./routes/category.route.js")(app);
require("./routes/role.route.js")(app);

app.listen(3000, () => {
    console.log(chalk.green.bold("App listening on port 3000"));
});

// /----------------------- Credits: -----------------------\
// |               rest api: olix3001, hiderr               |
// |           websocket: Frankoslaw, jj15_warrior          |
// \--------------------------------------------------------/