const studentModel = require("../config/database/models").student;
const classModel = require("../config/database/models").classes;
const teacherModel = require("../config/database/models").teacher;
const submissionModel = require("../config/database/models").submission;

class StudentModel {
  static async enrollClass(studentId, classId) {
    const student = await studentModel.findOne({
      where: {
        id: studentId,
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

    // Check whether the class capacity is enough or not.
    // AND the gender.
    const totalStudent = await classInstance.countStudents();
    if (
      totalStudent + 1 <= classInstance.dataValues.capacity &&
      student.dataValues.gender == classInstance.teacher.dataValues.gender
    ) {
      // Assign the user to the desired class.
      await student.addClass(classInstance);
      return {
        student_id: studentId,
        clsas_id: classId,
      };
    } else {
      return null;
    }
  }

  static async unenrollClass(studentId, classId) {
    const student = await studentModel.findOne({
      where: {
        id: studentId,
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
          student_id: studentId,
          class_id: classInstance.dataValues.id,
        },
      });

      return {
        student_id: studentId,
        clsas_id: classId,
      };
    } else {
      return null;
    }
  }
}

module.exports = StudentModel;
