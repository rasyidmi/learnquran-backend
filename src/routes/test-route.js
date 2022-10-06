const express = require("express");
const TestController = require("../controller/test-controller");
const router = express.Router();

router.get("/", TestController.get);

module.exports = router;
