const firebaseAdmin = require("firebase-admin");
const multer = require("multer");
const path = require("path");

const uploadFile = async (req, res, next) => {
  const bucket = firebaseAdmin.storage().bucket();
  const name = `${Date.now().toString()}`;
  const fileName = name + path.extname(req.file.originalname);
  bucket.file(fileName).createWriteStream().end(req.file.buffer);
  req.file = fileName;
  next();
};

module.exports = uploadFile;
