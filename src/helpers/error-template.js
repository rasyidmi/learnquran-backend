class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = ApplicationError.name;
  }
}

module.exports = {
  ApplicationError,
};
