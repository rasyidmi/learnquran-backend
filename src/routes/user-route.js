const express = require("express");
const router = express.Router();
const userController = require("../controller/user-controller");

router.post("/register", userController.reigsterUser);
router.delete("/delete", userController.deleteUser);

module.exports = router;