const studentModel = require("../models/student-model");
const submissionModel = require("../models/submission-model");
const Response = require("../dto/response");

class StudentController {
  static async enrollClass(req, res, next) {
    const userId = req.query.user_id;
    const classId = req.params.id;

    try {
      const fetchedData = await studentModel.enrollClass(userId, classId);

      if (fetchedData != null) {
        const response = Response.putResponse(
          "The system successfully enrolled the user in the desired class.",
          fetchedData
        );
        return res.status(200).json(response);
      } else {
        return res.status(400).json({
          message:
            "Class is overloaded, or user gender is prohibited in the class.",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async unenrollClass(req, res, next) {
    const userId = req.query.user_id;
    const classId = req.params.id;

    try {
      const fetchedData = await studentModel.unenrollClass(userId, classId);

      if (fetchedData != null) {
        const response = Response.putResponse(
          "The system successfully unenrolled the user from the desired class.",
          fetchedData
        );
        return res.status(200).json(response);
      }
      return res
        .status(400)
        .json({ message: "The user is not enrolled in the class." });
    } catch (error) {
      next(error);
    }
  }

  static async uploadAudio(req, res, next) {
    const audioFileName = req.file;
    const submissionId = req.params.id;

    try {
      await submissionModel.uploadAudio(submissionId, audioFileName);
      const response = Response.postResponse(
        "The system successfully uploaded the audio to the submission."
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
