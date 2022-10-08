const firebaseAdmin = require("firebase-admin");
const firebaseAuth = require("firebase/auth");
const studentModel = require("../model/index").student;
const teacherModel = require("../model/index").teacher;
const Response = require("../dto/response");
var response = new Response();

class UserController {
  static async login(req, res, next) {
    const body = req.body;
    const auth = firebaseAuth.getAuth();

    firebaseAuth
      .signInWithEmailAndPassword(auth, body.email_address, body.password)
      .then((userCredential) => {
        response.message = "Successfully login.";
        response.results = { email_address: userCredential.user.email };
        response.type = "POST";
        return res.status(200).json(response);
      })
      .catch((error) => {
        next(error);
      });
  }

  static async logout(req, res, next) {
    const auth = firebaseAuth.getAuth();
    const currentUser = auth.currentUser.email;

    firebaseAuth
      .signOut(auth)
      .then(() => {
        response.message = "Successfully logout.";
        response.results = { email_address: currentUser };
        response.type = "POST";
        return res.status(200).json(response);
      })
      .catch((error) => {
        next(error);
      });
  }

  static async reigsterUser(req, res, next) {
    const body = req.body;

    try {
      var firebaseUser;
      await firebaseAdmin
        .auth()
        .createUser({
          email: body.email_address,
          password: body.password,
        })
        .then((newUser) => {
          firebaseUser = newUser;
          console.log(`Success creating new user: ${body.email_address}`);
        });

      // Check whether it is a student or teacher
      // 0 for student, 1 for teacher
      const newUser = {
        id: firebaseUser.uid,
        name: body.name,
        email_address: body.email_address,
        phone_number: body.phone_number,
        gender: body.gender,
      };
      if (req.query.condition == 0) {
        await studentModel.create(newUser);
      } else {
        await teacherModel.create(newUser);
      }

      response.message = "The system successfully in creating a new user.";
      response.results = newUser;
      response.type = "POST";
      return res.status(200).json(response);
    } catch (error) {
      await firebaseAdmin.auth().deleteUser(firebaseUser.uid);
      next(error);
    }
  }
}

module.exports = UserController;
