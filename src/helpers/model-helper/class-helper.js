const sequelize = require("sequelize");
const classModel = require("../../models/index").classes;
const teacherModel = require("../../models/index").teacher;

class ClassModelHelper {
  static async createClass(data, teacherId) {
    const teacher = await teacherModel.findOne({
      where: {
        id: teacherId,
      },
    });
    // Check if the current user is teacher or not.
    if (teacher == null) {
      return null;
    }

    const createdClass = await teacher.createClass(data);
    return createdClass;
  }
  static async getAllClasses(body) {
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
      const totalStudent = await kelas.countStudents();
      listClass.push({
        id: kelas.dataValues.id,
        name: kelas.dataValues.name,
        capacity: kelas.dataValues.capacity,
        total_student: totalStudent,
        teacher_name: kelas.dataValues.teacher.name,
      });
    }

    return listClass;
  }

  static async getClassDetail(id) {
    return await classModel.findOne({
      where: {
        id: id,
      },
    });
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
    return null;
  }

  static async deleteClass(id, teacherId) {
    const classInstance = await classModel.findOne({
      where: {
        id: id,
        teacher_id: teacherId,
      },
    });

    if (classInstance != null) {
      await classInstance.destroy();
      return 1; // Return 1 if success.
    } else {
      return null;
    }
  }
}

module.exports = ClassModelHelper;
