const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

//Path for serviceAccountKey to be given
const serviceAccount = require("./path/to/serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
module.exports = db;
