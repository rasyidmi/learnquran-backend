const errorHandler = (err, req, res, next) => {
  console.log(err);

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({
        message: "Data already existed.",
        field: err.fields,
      });
    case "UserAlreadyExists":
      return res.status(400).json({
        message: "User already existed.",
      });
    case "ApplicationError":
      return res.status(err.statusCode).json({ message: err.message });
    default:
      const message = "Internal server error.";
      return res.status(500).json({ message: message });
  }
};

module.exports = errorHandler;
