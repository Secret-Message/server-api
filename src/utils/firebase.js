const admin = require('firebase-admin');

const serviceAccount = require("../../config/firebase-admin-key.json");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

module.exports = { admin: admin };