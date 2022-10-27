const classModel = require("../../models/index").classes;

class TaskModelHelper {
  static async createTask(data, classId, teacherId) {
    const classInstance = await classModel.findOne({
      where: {
        id: classId,
        teacher_id: teacherId,
      },
    });

    if (classInstance) {
      // Create the task.
      const task = await classInstance.createTask(data);
      // Get all students in the class.
      const students = await classInstance.getStudents();
      // Create submission for each student.
      for (var i = 0; i < students.length; i++) {
        await task.createSubmission({
          student_id: students[i].dataValues.id,
          teacher_id: teacherId,
          class_id: classId,
        });
      }

      return task;
    }
    return null;
  }
}

module.exports = TaskModelHelper;
