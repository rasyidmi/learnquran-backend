const firebaseAdmin = require("firebase-admin");
const moment = require("moment");
const path = require("path");

class FirebaseStorage {
  static uploadFile(file) {
    const bucket = firebaseAdmin.storage().bucket();
    const name = `${Date.now().toString()}`;
    const fileName = name + path.extname(file.originalname);
    bucket.file(fileName).createWriteStream().end(file.buffer);
    return fileName;
  }

  static async getSignedUrl(fileName) {
    const bucket = firebaseAdmin.storage().bucket();
    const expiresDate = moment().add(30, "m");
    return bucket.file(fileName).getSignedUrl({
      action: "read",
      expires: expiresDate,
    });
  }

  static async deleteFile(fileName) {
    const bucket = firebaseAdmin.storage().bucket();
    return await bucket.file(fileName).delete();
  }
}

module.exports = FirebaseStorage;
