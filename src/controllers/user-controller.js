const firebaseHelper = require("../helpers/firebase-helper/fireabase-admin");
const modelHelper = require("../helpers/model-helper/user-helper");
const Response = require("../dto/response");

class UserController {
  static async registerUser(req, res, next) {
    const body = req.body;

    const firebaseUser = await firebaseHelper.createFirebaseUser(
      body.email_address,
      body.password
    );
    if (firebaseUser == null) {
      return res.status(400).json({
        message: "User already existed.",
      });
    }
    const newUser = {
      id: firebaseUser.uid,
      name: body.name,
      email_address: body.email_address,
      phone_number: body.phone_number,
      gender: body.gender,
    };
    try {
      if (req.query.condition == 0) {
        await modelHelper.createStudent(newUser);
      } else {
        await modelHelper.createTeacher(newUser);
      }
      const response = Response.postResponse(
        "The system successfully created a new user.",
        newUser
      );
      return res.status(200).json(response);
    } catch (error) {
      await firebaseHelper.deleteFirebaseUser(firebaseUser.uid);
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const userId = req.query.user_id;

    try {
      const deletedUserId = await modelHelper.deleteUser(userId);
      if (deletedUserId == null) {
        return res.status(404).json({ message: "User not found." });
      }

      await firebaseHelper.deleteFirebaseUser(userId);
      const response = Response.deleteResponse(
        "The system successfully deleted a user.",
        { id: deletedUserId }
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
