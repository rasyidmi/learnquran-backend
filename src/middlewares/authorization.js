const authorization = (req, res, next) => {
  const apiKey = req.header("apiKey");

  if (apiKey != process.env.API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

module.exports = authorization;