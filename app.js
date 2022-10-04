const express = require('express');
const app = express();
const routes = require("./routes");
const db = require("./model");

// Connecting to database
db.sequelize.sync()
  .then(() => {
    console.log("Synced to the database.");
  })
  .catch((err) => {
    console.log("Failed to sync database: " + err.message);
  });

app.use(express.json());
app.use("/", routes);

module.exports = app;