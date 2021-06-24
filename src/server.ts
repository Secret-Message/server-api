import * as chalk from 'chalk'; // <- kolorki :D
import app from "./config/app";
import env from './environment'

require('dotenv').config();
const PORT = env.getPort();


app.listen(PORT, () => {
    console.log(chalk.green.bold(`App listening on port ${PORT}`));
});
