const teacherModel = require("../config/database/models").teacher;

class TeacherModel {
  static async getTeacher(id) {
    return await teacherModel.findOne({ where: { id: id } });
  }
}

module.exports = TeacherModel;
