const express = require("express");
const router = express.Router();
const testRouter = require("./test-route");

router.use('/test', testRouter);


module.exports = router;