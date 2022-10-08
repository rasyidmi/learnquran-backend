const firebaseAuth = require("firebase/auth");

const userAuthorization = (req, res, next) => {
  const currentUser = firebaseAuth.getAuth().currentUser;

  if (currentUser != null) {
    currentUser.getIdToken();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
