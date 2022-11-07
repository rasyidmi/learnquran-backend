const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const studentController = require("../controllers/student-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.use(userAuthorization);
router.post("/enroll/:id", studentController.enrollClass);
router.post("/unenroll/:id", studentController.unenrollClass);
router.post("/upload/:id", upload.single("file"), studentController.uploadAudio);

module.exports = router;
