const { ApplicationError } = require("../helpers/error-template");
const studentModel = require("../config/database/models").Student;
const classModel = require("../config/database/models").Classes;
const teacherModel = require("../config/database/models").Teacher;
const submissionModel = require("../config/database/models").Submission;

class StudentModel {
  static async updateData(userId, newData) {
    const user = await studentModel.findOne({
      where: {
        id: userId,
      },
    });
    await user.update(newData);
  }
  static async enrollClass(userId, classId) {
    const student = await studentModel.findOne({
      where: {
        id: userId,
      },
    });
    const classInstance = await classModel.findOne({
      where: {
        id: classId,
      },
      include: {
        model: teacherModel,
        required: true,
        attributes: ["gender"],
      },
    });
    // Check if the user already enrolled.
    const isEnroll = await classInstance.hasStudent(student);
    if (isEnroll) throw new ApplicationError("Student already enrolled.", 400);

    // Check whether the class capacity is enough or not.
    // AND the gender.
    const totalStudent = await classInstance.countStudents();
    if (
      totalStudent + 1 <= classInstance.dataValues.capacity &&
      student.dataValues.gender == classInstance.Teacher.dataValues.gender
    ) {
      // Assign the user to the desired class.
      await student.addClass(classInstance);
      // Create the submission for existing task in the class.
      const tasks = await classInstance.getTasks();
      for (var i = 0; i < tasks.length; i++) {
        await submissionModel.create({
          class_id: classId,
          student_id: userId,
          task_id: tasks[0].dataValues.id,
          teacher_id: classInstance.dataValues.teacher_id,
        });
      }
      return {
        student_id: userId,
        class_id: classId,
      };
    } else {
      throw new ApplicationError(
        "Class is overloaded, or user gender is prohibited in the class.",
        400
      );
    }
  }

  static async unenrollClass(userId, classId) {
    const student = await studentModel.findOne({
      where: {
        id: userId,
      },
    });
    const classInstance = await classModel.findOne({
      where: {
        id: classId,
      },
    });

    // Check whether the user is enrolled in the class.
    if (await classInstance.hasStudent(student)) {
      // Unenroll the user.
      await student.removeClass(classInstance);
      // Delete all related submissions.
      await submissionModel.destroy({
        where: {
          student_id: userId,
          class_id: classInstance.dataValues.id,
        },
      });

      return {
        student_id: userId,
        class_id: classId,
      };
    } else {
      throw new ApplicationError(
        "The system failed to unenroll student from the class.",
        400
      );
    }
  }
}

module.exports = StudentModel;
