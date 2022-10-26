if (process.env.ENV != "dev") {
  require("dotenv").config({ path: "./env/development/app.env" });
}
const express = require("express");
const app = express();
const routes = require("./src/routes");
const db = require("./src/models");
const authorizationMiddleware = require("./src/middlewares/authorization");
const errorHandler = require("./src/middlewares/error-handler");
const firebaseCredential = JSON.parse(process.env.FB_CRED);
const firebaseAdmin = require("firebase-admin");

// Initialize firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredential),
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
app.use(authorizationMiddleware);
app.use(process.env.URL_PREFIX, routes);
app.use(errorHandler);

module.exports = app;
