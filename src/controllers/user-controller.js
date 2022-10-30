const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const Response = require("../dto/response");

class UserController {
  static async registerUser(req, res, next) {
    const salt = await bcrypt.genSalt();
    const body = req.body;
    const hashedPassword = await bcrypt.hash(body.password, salt);

    const newUser = {
      name: body.name,
      phone_number: body.phone_number,
      gender: body.gender,
    };
    try {
      const userInstance = await userModel.createUser({
        email_address: body.email_address,
        password: hashedPassword,
      });
      if (req.query.condition == 0) {
        await userModel.createStudent(userInstance, newUser);
      } else {
        await userModel.createTeacher(userInstance, newUser);
      }
      const response = Response.postResponse(
        "The system successfully created a new user.",
        newUser
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    const userEmail = req.query.email_address;

    try {
      const deletedUserEmail = await userModel.deleteUser(userEmail);
      if (deletedUserEmail) {
        const response = Response.deleteResponse(
          "The system successfully deleted a user.",
          { email_address: deletedUserEmail }
        );
        return res.status(200).json(response);
      }
      return res.status(404).json({ message: "User not found." });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const body = req.body;

    try {
      const user = await userModel.getUser(body.email_address);
      if (!user) return res.status(404).json({ message: "User not found." });
      // Compare the password.
      const match = await bcrypt.compare(
        body.password,
        user.dataValues.password
      );
      if (!match)
        return res.status(400).json({ message: "Password is incorrect." });
      const studentTeacher = await userModel.getUserData(body.email_address);
      const payload = {
        userId: studentTeacher.dataValues.id,
        emailAddress: body.email_address,
      };
      const encodedJwt = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      const response = Response.postResponse(
        "The system successfully logged in a user.",
        { jwt: encodedJwt }
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getCurrentUserData(req, res, next) {
    const userEmail = req.query.email_address;
    try {
      const userData = await userModel.getUserData(userEmail);
      const response = Response.getResponse(
        "The system successfully got the user data.",
        userData
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
