class TestController {
  static async get(req, res) {
    return res.status(200).json({
      message: "Success",
      request: { type: "GET", url: req.originalUrl },
    });
  }
}

module.exports = TestController;