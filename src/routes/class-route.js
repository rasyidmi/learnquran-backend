const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const classController = require("../controller/class-controller");
const router = express.Router();

router.use(userAuthorization);
router.post("/create", classController.createClass);

module.exports = router;