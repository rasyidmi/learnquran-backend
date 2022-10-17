class Response {
  message = "";
  results = [];
  type = "";

  static getResponse(message, results) {
    return {
      message: message,
      results: results,
      type: "GET",
    };
  }

  static postResponse(message, results) {
    return {
      message: message,
      results: results,
      type: "POST",
    };
  }

  static putResponse(message, results) {
    return {
      message: message,
      results: results,
      type: "PUT",
    };
  }

  static deleteResponse(message, results) {
    return {
      message: message,
      results: results,
      type: "DELETE",
    };
  }
}

module.exports = Response;
