const teacherModel = require("../config/database/models").teacher;

class TeacherModel {
  static async getTeacher(id) {
    return await teacherModel.findOne({ where: { id: id } });
  }
  
  static async updateData(userId, newData) {
    const user = await teacherModel.findOne({
      where: {
        id: userId,
      },
    });
    await user.update(newData);
  }
}

module.exports = TeacherModel;
