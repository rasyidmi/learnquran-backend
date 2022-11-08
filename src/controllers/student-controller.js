const studentModel = require("../models/student-model");
const Response = require("../dto/response");

class StudentController {
  static async enrollClass(req, res, next) {
    const userId = req.query.user_id;
    const classId = req.params.id;

    try {
      const fetchedData = await studentModel.enrollClass(userId, classId);
      const response = Response.putResponse(
        "The system successfully enrolled the user in the desired class.",
        fetchedData
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async unenrollClass(req, res, next) {
    const userId = req.query.user_id;
    const classId = req.params.id;

    try {
      const fetchedData = await studentModel.unenrollClass(userId, classId);
      const response = Response.putResponse(
        "The system successfully unenrolled the user from the desired class.",
        fetchedData
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
