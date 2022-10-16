const studentModel = require("../model/index").student;
const classModel = require("../model/index").classes;
const submissionModel = require("../model/index").submission;

const Response = require("../dto/response");

class StudentController {
  static async enrollClass(req, res, next) {
    const body = req.body;
    const userId = body.user_id;
    const classId = req.params.id;

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

        const response = Response.putResponse(
          "The system successfully enroll the user to the desired class.",
          {
            user_id: userId,
            clsas_id: classId,
          }
        );
        return res.status(200).json(response);
      } else {
        return res.status(400).json({ message: "Class is overloaded" });
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

      // Unenroll the user.
      await user.removeClass(classInstance);
      // Delete all related submissions.
      await submissionModel.destroy({
        where: {
          student_id: userId,
          class_id: classInstance.dataValues.id,
        },
      });
      const response = Response.putResponse(
        "The system successfully unenroll the user from the desired class.",
        {
          user_id: userId,
          clsas_id: classId,
        }
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;
