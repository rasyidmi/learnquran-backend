const classModel = require("../config/database/models").classes;
const taskModel = require("../config/database/models").task;

class TaskModel {
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

  static async getTasksByClass(classId) {
    return await taskModel.findAll({
      where: { class_id: classId },
      attributes: ["id", "name", "description"],
    });
  }

  static async deleteTask(teacherId, taskId, classId) {
    // Check whether user is the class teacher or not.
    const classInstance = await classModel.findOne({
      where: {
        id: classId,
        teacher_id: teacherId,
      },
    });
    if (classInstance == null) {
      return null;
    }

    const taskInstance = await taskModel.findOne({
      where: {
        id: taskId,
        class_id: classId,
      },
    });
    if (taskInstance) {
      await taskInstance.destroy();
      return 1;
    }
    return null;
  }
}

module.exports = TaskModel;
