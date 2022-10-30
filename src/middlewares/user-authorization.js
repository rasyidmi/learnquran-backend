const jwt = require("jsonwebtoken");

const userAuthorization = async (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ");
    const jwtToken = token[1];
    try {
      const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
      req.query.user_id = payload.userId;
      req.query.email_address = payload.emailAddress;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is invalid." });
    }
  } else {
    return res.status(401).json({ message: "Token is invalid." });
  }
};

module.exports = userAuthorization;
