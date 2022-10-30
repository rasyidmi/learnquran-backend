const teacherModel = require("../config/database/models").teacher;
const studentModel = require("../config/database/models").student;

class UserModel {
  static async createStudent(data) {
    await studentModel.create(data);
  }

  static async createTeacher(data) {
    await teacherModel.create(data);
  }

  static async deleteUser(id) {
    const query = {
      where: {
        id: id,
      },
    };
    const studentInstance = await studentModel.findOne(query);
    const teacherInstance = await teacherModel.findOne(query);
    if (studentInstance == null && teacherInstance == null) {
      return null;
    } else if (studentInstance != null) {
      await studentInstance.destroy();
    } else if (teacherInstance != null) {
      await teacherInstance.destroy();
    }
    return id;
  }

  static async getUserData(id) {
    const query = {
      where: {
        id: id,
      },
    };

    const studentInstance = await studentModel.findOne(query);
    const teacherInstance = await teacherModel.findOne(query);
    if (studentInstance) return studentInstance;
    return teacherInstance;
  }
}

module.exports = UserModel;
