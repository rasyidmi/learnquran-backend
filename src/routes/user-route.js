const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const userController = require("../controllers/user-controller");

router.post("/register", userController.registerUser);
if (process.env.ENV) router.use(userAuthorization);
router.delete("/delete", userController.deleteUser);

module.exports = router;
