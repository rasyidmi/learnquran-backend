const errorHandler = (err, req, res, next) => {
  console.log(err);

  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      return res.status(400).json({
        message: "Data already existed.",
        field: err.fields,
      });
    default:
      const message = err.message || "Internal server error.";
      return res.status(500).json({ message: message });
  }
};

module.exports = errorHandler;
