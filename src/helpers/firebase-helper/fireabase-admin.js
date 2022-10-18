const firebaseAdmin = require("firebase-admin");

class FirebaseAdmin {
  static async createFirebaseUser(email, password) {
    return await firebaseAdmin.auth().createUser({
      email: email,
      password: password,
    });
  }

  static async deleteFirebaseUser(uid) {
    await firebaseAdmin.auth().deleteUser(uid);
  }
}

module.exports = FirebaseAdmin;
