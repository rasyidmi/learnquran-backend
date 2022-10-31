const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const studentController = require("../controllers/student-controller");
const multer = require("multer");
const uploadFile = require("../middlewares/upload-file");
const upload = multer({ storage: multer.memoryStorage() });

router.use(userAuthorization);
router.post("/enroll/:id", studentController.enrollClass);
router.post("/unenroll/:id", studentController.unenrollClass);
router.post("/upload/:id", upload.single("file"), uploadFile, studentController.uploadAudio);

module.exports = router;
