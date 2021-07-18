import * as admin from 'firebase-admin';

const serviceAccount = require("../../secrets/firebase-admin-key.json");

admin.initializeApp({
   credential: admin.credential.cert(serviceAccount)
});

export { admin }