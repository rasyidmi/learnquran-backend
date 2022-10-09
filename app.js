var firebaseCredential;
if (process.env.ENV != "dev") {
  require("dotenv").config({ path: "./env/development/app.env" });
  firebaseCredential = {
    type: "service_account",
    project_id: "belajarquran",
    private_key_id: process.env.FB_CRED_PRIVATE_KEY_ID,
    private_key: process.env.FB_PRIVATE_KEY,
    client_email:
      "firebase-adminsdk-8ttha@belajarquran.iam.gserviceaccount.com",
    client_id: "117231822952764253870",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-8ttha%40belajarquran.iam.gserviceaccount.com",
  };
} else {
  firebaseCredential = require("./serviceAccountKey.json");
}
const express = require("express");
const app = express();
const routes = require("./src/routes");
const db = require("./src/model");
const authorizationMiddleware = require("./src/middlewares/authorization");
const errorHandler = require("./src/middlewares/error-handler");

const firebaseAdmin = require("firebase-admin");
const firebase = require("firebase/app");

// Initialize firebase admin
firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseCredential),
});

// Initialize firebase app
const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
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
