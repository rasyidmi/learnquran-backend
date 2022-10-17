const express = require("express");
const router = express.Router();
const userRoute = require("./user-route");
const classRoute = require("./class-route");
const studentRoute = require("./student-route");


router.use('/user', userRoute);
router.use('/class',classRoute);
router.use('/student', studentRoute);


module.exports = router;