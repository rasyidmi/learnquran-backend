const express = require("express");
const userAuthorization = require("../middlewares/user-authorization");
const router = express.Router();
const submissionController = require("../controllers/submission-controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.use(userAuthorization);
router.post("/upload/:id", upload.single("file"), submissionController.uploadAudio);
router.post("/score/:id", submissionController.giveScore);

module.exports = router;