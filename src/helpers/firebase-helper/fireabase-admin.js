const firebaseAdmin = require("firebase-admin");

class FirebaseAdmin {
  static async createFirebaseUser(email, password) {
    const firebaseUser = await firebaseAdmin.auth().createUser({
      email: email,
      password: password,
    });

    return firebaseUser
  }

  static async deleteFirebaseUser(uid) {
    await firebaseAdmin.auth().deleteUser(uid);
  }
}

module.exports = FirebaseAdmin;
