const firebaseAdmin = require("firebase-admin");

const userAuthorization = async (req, res, next) => {
  const userToken = req.header("user-token");
  if (userToken != null && userToken != "") {
    firebaseAdmin
      .auth()
      .verifyIdToken(userToken)
      .then((decodedToken) => {
        const userId = decodedToken.uid;
        req.query.user_id = userId;
        next();
      })
      .catch((error) => {
        return res.status(401).json({ message: "Unauthorized" });
      });
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = userAuthorization;
