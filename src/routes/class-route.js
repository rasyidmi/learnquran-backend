const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const classController = require("../controller/class-controller");
const router = express.Router();

// router.use(userAuthorization);
router.get("/", classController.getAllClass);
router.post("/create", classController.createClass);
router.get("/:id", classController.getClassDetail);

module.exports = router;