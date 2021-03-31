// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
const express = require('express');
const app = express();
const chalk = require('chalk'); // <- kolorki :D
const cors = require('cors');

var corsOptions = {
    origin: ["http://localhost:8000", "http://localhost:3000"],
    optionsSuccessStatus: 200, // For legacy browser support
    credentials: true,
}

app.use(cors(corsOptions));

// body parser
app.use(express.json());
app.use(require('cookie-parser')());
// routes
app.use('/users', require('./routes/users'));
app.use('/dm', require('./routes/dm'));

// listen
app.listen(3000, () => {
    console.log(chalk.green.bold("App listening on port 3000"));
});
