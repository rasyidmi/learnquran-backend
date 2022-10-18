class Response {
  static getResultsLength(results) {
    if (results == null) {
      return 0;
    } else {
      return results.length != null ? results.length : 1;
    }
  }
  static getResponse(message, results) {
    return {
      message: message,
      results: {
        data: results,
        total: this.getResultsLength(results),
      },
      type: "GET",
    };
  }

  static postResponse(message, results) {
    return {
      message: message,
      results: {
        data: results,
        total: this.getResultsLength(results),
      },
      type: "POST",
    };
  }

  static putResponse(message, results) {
    return {
      message: message,
      results: {
        data: results,
        total: this.getResultsLength(results),
      },
      type: "PUT",
    };
  }

  static deleteResponse(message, results) {
    return {
      message: message,
      results: {
        data: results,
        total: this.getResultsLength(results),
      },
      type: "DELETE",
    };
  }
}

module.exports = Response;
