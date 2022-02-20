const functions = require("firebase-functions");
const test = require("../controllers/index")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
 exports.helloWorld = functions.https.onRequest((request, response) => {   
   response.send("Hello from Firebase!");
 });

 exports.api = functions.https.onRequest(test.testController)
