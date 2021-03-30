// Secret Message project © 2021 is licensed under CC BY-NC-ND 4.0
// ^ naglowek z licencja
/*
   _____                     __     __  ___
  / ___/___  _____________  / /_   /  |/  /__  ______________ _____ ____
  \__ \/ _ \/ ___/ ___/ _ \/ __/  / /|_/ / _ \/ ___/ ___/ __ `/ __ `/ _ \
 ___/ /  __/ /__/ /  /  __/ /_   / /  / /  __(__  |__  ) /_/ / /_/ /  __/
/____/\___/\___/_/   \___/\__/  /_/  /_/\___/____/____/\__,_/\__, /\___/
                                                            /____/
*/
// ascii ^
//testowa zmiana dla gita

require('dotenv').config();

const admin = require('firebase-admin');
module.exports = admin;

require('./rest/server');
require('./websocket/server');
const serviceAccount = require("../secret/firebase-admin-key.json");

//login firebase
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

// rest api: olix3001, hiderr
// websocket: Frankoslaw, jj15_warrior