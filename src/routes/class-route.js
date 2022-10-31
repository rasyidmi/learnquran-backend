const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const classController = require("../controllers/class-controller");
const router = express.Router();

router.use(userAuthorization);
router.get("/", classController.getAllClass);
router.get("/search", classController.searchClasses);
router.get("/student", classController.getClassByStudent);
router.get("/teacher", classController.getClassByTeacher);
router.get("/:id", classController.getClassDetail);
router.post("/create", classController.createClass);
router.put("/:id", classController.updateClass);
router.delete("/:id", classController.deleteClass);

module.exports = router;
