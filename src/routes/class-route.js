const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const classController = require("../controller/class-controller");
const router = express.Router();

// router.use(userAuthorization);
router.get("/", classController.getAllClass);
router.get("/:id", classController.getClassDetail);
router.get("/search", classController.searchClasses);
router.post("/create", classController.createClass);
router.put("/:id", classController.updateClass);

module.exports = router;