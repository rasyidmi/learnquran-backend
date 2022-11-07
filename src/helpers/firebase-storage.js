const firebaseAdmin = require("firebase-admin");
const path = require("path");

class FirebaseStorage {
  static uploadFile(file) {
    const bucket = firebaseAdmin.storage().bucket();
    const name = `${Date.now().toString()}`;
    const fileName = name + path.extname(file.originalname);
    bucket.file(fileName).createWriteStream().end(file.buffer);
    return fileName;
  }

  static async deleteFile(fileName) {
    const bucket = firebaseAdmin.storage().bucket();
    return await bucket.file(fileName).delete();
  }
}

module.exports = FirebaseStorage;
