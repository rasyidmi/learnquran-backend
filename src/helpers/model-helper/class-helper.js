const classModel = require("../../models/index").classes;
const teacherModel = require("../../models/index").teacher;

class ClassModelHelper {
  static async getAllClasses() {
    const listClass = [];
    const query = {
      include: { model: teacherModel, required: true, attributes: ["name"] },
    };
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
}

module.exports = ClassModelHelper;
