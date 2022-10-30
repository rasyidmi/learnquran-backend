const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/register", userController.registerUser);
router.post("/login", userController.login);
router.use(userAuthorization);
router.get("/", userController.getCurrentUserData);
router.delete("/delete", userController.deleteUser);

module.exports = router;
