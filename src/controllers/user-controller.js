const firebaseAdmin = require("firebase-admin");
const studentModel = require("../models/index").student;
const teacherModel = require("../models/index").teacher;
const Response = require("../dto/response");

class UserController {
  static async reigsterUser(req, res, next) {
    const body = req.body;

    await firebaseAdmin
      .auth()
      .createUser({
        email: body.email_address,
        password: body.password,
      })
      .then(async (user) => {
        console.log(`Success creating new user: ${body.email_address}`);

        // Check whether it is a student or teacher
        // 0 for student, 1 for teacher
        const newUser = {
          id: user.uid,
          name: body.name,
          email_address: body.email_address,
          phone_number: body.phone_number,
          gender: body.gender,
        };

        try {
          if (req.query.condition == 0) {
            await studentModel.create(newUser);
          } else {
            await teacherModel.create(newUser);
          }

          const response = Response.postResponse(
            "The system successfully in creating a new user.",
            newUser
          );
          return res.status(200).json(response);
        } catch (error) {
          await firebaseAdmin.auth().deleteUser(user.uid);
          next(error);
        }
      })
      .catch((error) => {
        error.name = "UserAlreadyExists";
        next(error);
      });
  }

  static async deleteUser(req, res, next) {
    const userId = req.body.id;

    try {
      if (req.query.condition == 0) {
        const studentInstance = await studentModel.findOne({
          where: {
            id: userId,
          },
        });
        if (studentInstance != null) {
          await studentInstance.destroy();
          await firebaseAdmin.auth().deleteUser(userId);
        } else {
          return res.status(404).json({ message: "User not found." });
        }
      } else {
        const teacherInstance = await teacherModel.findOne({
          where: {
            id: userId,
          },
        });
        if (teacherInstance != null) {
          await teacherInstance.destroy();
          await firebaseAdmin.auth().deleteUser(userId);
        } else {
          return res.status(404).json({ message: "User not found." });
        }
      }

      const response = Response.deleteResponse(
        "The system successfully in deleting a user.",
        { id: userId }
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;