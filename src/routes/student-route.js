const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const studentController = require("../controllers/student-controller");

router.use(userAuthorization);
router.put("/enroll/:id", studentController.enrollClass);
router.put("/unenroll/:id", studentController.unenrollClass);


module.exports = router;
