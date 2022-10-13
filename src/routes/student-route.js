const express = require("express");
const router = express.Router();
const studentController = require("../controller/student-controller");

// router.use(userAuthorization);
router.put("/enroll", studentController.enrollClass);

module.exports = router;
