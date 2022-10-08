require("dotenv").config({ path: "./env/development/app.env" });

const express = require("express");
const app = express();
const routes = require("./src/routes");
const db = require("./src/model");
const authorizationMiddleware = require("./src/middlewares/authorization");
const errorHandler = require("./src/middlewares/error-handler");
const firebaseAdmin = require("firebase-admin");
const firebase = require("firebase/app");
const firebaseCredential = require("./serviceAccountKey.json");

// Initialize firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredential),
});

// Initialize firebase app
const firebaseConfig = {
  apiKey: "AIzaSyAxNirzHCUNaw68ahXwn9aQj_LZGo_brQc",
  authDomain: "belajarquran.firebaseapp.com",
  projectId: "belajarquran",
  storageBucket: "belajarquran.appspot.com",
  messagingSenderId: "365522424050",
  appId: "1:365522424050:web:94963302a14b366a2f806b",
  measurementId: "G-3SRSZ7KLWT"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Connecting to database
db.sequelize
  .sync()
  .then(() => {
    console.log("Success sync to the database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authorizationMiddleware);
app.use("/", routes);
app.use(errorHandler);

module.exports = app;
