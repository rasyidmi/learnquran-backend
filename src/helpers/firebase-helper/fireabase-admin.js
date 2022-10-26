const firebaseAdmin = require("firebase-admin");

class FirebaseAdmin {
  static async createFirebaseUser(email, password) {
    await firebaseAdmin
      .auth()
      .createUser({
        email: email,
        password: password,
      })
      .then((firebaseUser) => {
        return firebaseUser;
      })
      .catch(() => {
        return null;
      });
  }

  static async deleteFirebaseUser(uid) {
    await firebaseAdmin.auth().deleteUser(uid);
  }
}

module.exports = FirebaseAdmin;
