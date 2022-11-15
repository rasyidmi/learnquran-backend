const sequelize = require("sequelize");
const { ApplicationError } = require("../helpers/error-template");
const classModel = require("../config/database/models").Classes;
const teacherModel = require("../config/database/models").Teacher;
const studentModel = require("../config/database/models").Student;

class ClassModel {
  static async createClass(data, teacherId) {
    const teacher = await teacherModel.findOne({
      where: {
        id: teacherId,
      },
    });
    // Check if the current user is teacher or not.
    if (!teacher) throw new ApplicationError("User is not a teacher.", 400);

    data.teacher_name = teacher.dataValues.name;
    const createdClass = await teacher.createClass(data);
    return createdClass;
  }

  static async getClassByTeacher(teacherId) {
    const classes = await classModel.findAll({
      where: {
        teacher_id: teacherId,
      },
    });

    return classes;
  }

  static async getClassByStudent(studentId) {
    const student = await studentModel.findOne({
      where: {
        id: studentId,
      },
    });

    const classes = await student.getClasses();

    return classes;
  }

  static async getAllClasses(body) {
    const studentInstance = await studentModel.findOne({
      where: {
        id: body.studentId,
      },
    });
    const listClass = [];
    const query = {
      include: {
        model: teacherModel,
        required: true,
        attributes: ["name"],
      },
    };
    if (body.condition == 1) {
      // Search by name
      query.where = {
        name: {
          [sequelize.Op.iLike]: `${body.keyword}%`,
        },
      };
    }
    const classInstance = await classModel.findAll(query);
    for (const kelas of classInstance) {
      // Exclude student enrolled class in search.
      if (!(await kelas.hasStudent(studentInstance))) {
        const totalStudent = await kelas.countStudents();
        listClass.push({
          id: kelas.dataValues.id,
          name: kelas.dataValues.name,
          capacity: kelas.dataValues.capacity,
          total_student: totalStudent,
          teacher_name: kelas.dataValues.Teacher.name,
        });
      }
    }

    return listClass;
  }

  static async getClassDetail(id, role, userId) {
    let includeQuery;
    if (role == 1) {
      includeQuery = {
        model: studentModel,
        attributes: ["name"],
      };
    }
    const classInstance = await classModel.findOne({
      where: {
        id: id,
      },
      include: includeQuery,
    });
    if (!classInstance) throw new ApplicationError("Class not found.", 404);
    // If user is student, check whether the student enroll to the class.
    if (role == 0) {
      const studentInstance = await studentModel.findOne({
        where: {
          id: userId,
        },
      });
      const isEnroll = await classInstance.hasStudent(studentInstance);
      classInstance.dataValues.is_enrolled = isEnroll;
    }
    return classInstance;
  }

  static async updateClass(data, id, teacherId) {
    const classInstance = await classModel.findOne({
      where: {
        id: id,
        teacher_id: teacherId,
      },
    });
    // Check if the current user is teacher or not.
    if (classInstance) return await classInstance.update(data);
    throw new ApplicationError(
      "The user is not the teacher in that class.",
      400
    );
  }

  static async deleteClass(id, teacherId) {
    const classInstance = await classModel.findOne({
      where: {
        id: id,
        teacher_id: teacherId,
      },
    });

    if (classInstance) return await classInstance.destroy();
    throw new ApplicationError("Class is not found", 404);
  }
}

module.exports = ClassModel;
