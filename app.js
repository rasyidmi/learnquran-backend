if (process.env.ENV == null) {
  require("dotenv").config({ path: "./env/local/app.env" });
}
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/routes");
const db = require("./src/config/database/models");
const authorizationMiddleware = require("./src/middlewares/authorization");
const errorHandler = require("./src/middlewares/error-handler");
const firebaseCredential = JSON.parse(process.env.FB_CRED);
const firebaseAdmin = require("firebase-admin");

// Initialize firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredential),
  storageBucket: process.env.FB_STORAGE_URL,
});

// Connecting to database
db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Success sync to the database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(authorizationMiddleware);
app.use(process.env.URL_PREFIX, routes);
app.use(errorHandler);

module.exports = app;
