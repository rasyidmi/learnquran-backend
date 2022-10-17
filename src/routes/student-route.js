const express = require("express");
const router = express.Router();
const studentController = require("../controller/student-controller");

// router.use(userAuthorization);
router.put("/enroll/:id", studentController.enrollClass);
router.put("/unenroll/:id", studentController.unenrollClass);


module.exports = router;
