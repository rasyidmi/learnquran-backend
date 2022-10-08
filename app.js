require("dotenv").config({ path: "./env/development/app.env" });

const express = require("express");
const app = express();
const routes = require("./src/routes");
const db = require("./src/model");
const authorizationMiddleware = require("./src/middlewares/authorization");
const errorHandler = require("./src/middlewares/error-handler");
const firebaseAdmin = require("firebase-admin");
const firebaseCredential = require("./serviceAccountKey.json");

// Initialize firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredential),
});

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
