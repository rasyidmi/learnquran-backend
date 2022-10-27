const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const studentController = require("../controllers/student-controller");

if (process.env.ENV) router.use(userAuthorization);
router.post("/enroll/:id", studentController.enrollClass);
router.post("/unenroll/:id", studentController.unenrollClass);


module.exports = router;
