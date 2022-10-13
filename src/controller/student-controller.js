const studentModel = require("../model/index").student;
const classModel = require("../model/index").classes;

const Response = require("../dto/response");
var response = new Response();

class StudentController {
  static async enrollClass(req, res, next) {
    const body = req.body;
    const userId = body.user_id;
    const classId = body.class_id;

    try {
      const user = await studentModel.findOne({
        where: {
          id: userId,
        },
      });
      const classInstance = await classModel.findOne({
        where: {
          id: classId,
        },
      });

      // Check whether the class capacity is enough or not.
      const totalStudent = await classInstance.countStudents();
      if (totalStudent + 1 <= classInstance.dataValues.capacity) {
        // Assign the user to the desired class.
        await user.addClass(classInstance);
        response.message =
          "The system successfully assigned the user to the desired class.";
        response.results = {
          user_id: userId,
          clsas_id: classId,
        };
        response.type = "PUT";
        return res.status(200).json(response);
      } else {
        return res.status(400).json({ message: "Class is overloaded" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
