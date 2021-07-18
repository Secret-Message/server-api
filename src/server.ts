import * as chalk from 'chalk'; // <- kolorki :D
import app from "./config/app";
require('dotenv').config();


app.listen( process.env.PORT || 3000 , () => {
    console.log(chalk.green.bold(`App listening on port ${process.env.PORT || 3000}`));
    console.log(chalk.green.bold(`Database on port ${process.env.MONGO_URI || 3000}`));
});
