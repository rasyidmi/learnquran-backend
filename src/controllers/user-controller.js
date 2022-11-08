const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const studentModel = require("../models/student-model");
const teacherModel = require("../models/teacher-model");
const Response = require("../dto/response");
const { student } = require("../config/database/models");

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

  static async updateUser(req, res, next) {
    const userId = req.query.user_id;
    const emailAddress = req.query.email_address;
    const role = req.query.role;
    const body = req.body;

    if (body.password) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(body.password, salt);
      body.password = hashedPassword;
    }
    try {
      // Update data in user table.
      if (body.password) {
        await userModel.updatePassword(emailAddress, body);
      }
      // Update data in student or teacher table.
      if (role == 0) {
        await studentModel.updateData(userId, body);
      } else {
        await teacherModel.updateData(userId, body);
      }
      const response = Response.putResponse(
        "The system successfully updated the user data."
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
      const response = Response.deleteResponse(
        "The system successfully deleted a user.",
        { email_address: deletedUserEmail }
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const body = req.body;

    try {
      const user = await userModel.getUser(body.email_address);
      // Compare the password.
      const match = await bcrypt.compare(
        body.password,
        user.dataValues.password
      );
      if (!match)
        return res.status(400).json({ message: "Password is incorrect." });
      const userData = await userModel.getUserData(body.email_address);
      const role = await userModel.getUserRole(body.email_address);
      const payload = {
        userId: userData.dataValues.id,
        emailAddress: body.email_address,
        role: role,
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
