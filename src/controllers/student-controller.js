const modelHelper = require("../helpers/model-helper/student-helper");
const Response = require("../dto/response");

class StudentController {
  static async enrollClass(req, res, next) {
    const body = req.body;
    const userId = body.user_id;
    const classId = req.params.id;

    try {
      const fetchedData = await modelHelper.enrollClass(userId, classId);

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
    const body = req.body;
    const userId = body.user_id;
    const classId = req.params.id;

    try {
      const fetchedData = await modelHelper.unenrollClass(userId, classId);

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
}

module.exports = StudentController;