require("dotenv").config({ path: "./env/development/app.env" });

const express = require("express");
const app = express();
const routes = require("./src/routes");
const db = require("./src/model");

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
app.use("/", routes);

module.exports = app;
