const { Router } = require("express");
const express = require("express");
const UserController = require("../controller/user-controller");
const router = express.Router();
const userController = require("../controller/user-controller");

router.post("/register", userController.reigsterUser);
router.delete("/delete", UserController.deleteUser);

module.exports = router;