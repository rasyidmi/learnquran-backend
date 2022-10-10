const firebaseAdmin = require("firebase-admin");

const userAuthorization = (req, res, next) => {
  const token = firebaseAdmin.auth().verifyIdToken(req.header("user-token"));

  if (token != null) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
