const firebaseAdmin = require("firebase-admin");
const studentModel = require("../model/index").student;
const teacherModel = require("../model/index").teacher;
const Response = require("../dto/response");

class UserController {
  static async get(req, res) {
    return res.status(200).json({
      message: "Success",
      request: { type: "GET", url: req.originalUrl },
    });
  }

  static async createUser(req, res) {
    const body = req.body;

    var response = new Response();
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
          console.log(`Success creating new user: ` + body.email_address);
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
        studentModel.create(newUser);
      } else {
        teacherModel.create(newUser);
      }

      response.message = "The system successfully in creating a new user.";
      response.results = newUser;
      response.type = "POST";
      response.url = req.originalUrl;
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(404).json({ message: response });
    }
  }
}

module.exports = UserController;
