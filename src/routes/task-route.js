const express = require("express");
const router = express.Router();
const userAuthorization = require("../middlewares/user-authorization");
const taskController = require("../controllers/task-controller");

router.use(userAuthorization);
router.get("/:id", taskController.getTaskDetail);
router.post("/create", taskController.createTask);
router.delete("/delete", taskController.deleteTask);

module.exports = router;
