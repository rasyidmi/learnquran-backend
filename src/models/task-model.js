const e = require("express");
const { ApplicationError } = require("../helpers/error-template");
const classModel = require("../config/database/models").Classes;
const taskModel = require("../config/database/models").Task;
const submissionModel = require("../config/database/models").Submission;

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
    throw new ApplicationError("User is not the teacher of the class.", 404);
  }

  static async getStudentTasksByClass(studentId, classId) {
    const taskInstances = await taskModel.findAll({
      where: { class_id: classId },
      attributes: ["id", "name", "description"],
      include: {
        model: submissionModel,
        attributes: ["id", "score", "audio_file"],
        where: {
          student_id: studentId,
        },
        required: true,
      },
    });

    for (var i = 0; i < taskInstances.length; i++) {
      if (taskInstances[i].Submissions[0].dataValues.score)
        taskInstances[i].Submissions[0].dataValues.status = "Telah dinilai";
      else if (taskInstances[i].Submissions[0].dataValues.audio_file)
        taskInstances[i].Submissions[0].dataValues.status = "Sudah submit";
      else taskInstances[i].Submissions[0].dataValues.status = "Belum submit";
    }
    return taskInstances;
  }

  static async getTasksByClass(classId) {
    return await taskModel.findAll({
      where: { class_id: classId },
      attributes: ["id", "name", "description"],
    });
  }

  static async getTaskDetail(taskId) {
    const task = await taskModel.findOne({
      where: {
        id: taskId,
      },
    });
    if (!task) throw new ApplicationError("Task is not found.", 400);
    return task;
  }

  static async deleteTask(teacherId, taskId, classId) {
    // Check whether user is the class teacher or not.
    const classInstance = await classModel.findOne({
      where: {
        id: classId,
        teacher_id: teacherId,
      },
    });
    if (!classInstance)
      throw new ApplicationError("User is not the teacher of the class.", 400);

    const taskInstance = await taskModel.findOne({
      where: {
        id: taskId,
        class_id: classId,
      },
    });
    if (taskInstance) {
      await taskInstance.destroy();
      return;
    }
    throw new ApplicationError("Task not found.", 404);
  }

  static async updateTaskById(taskId, newData) {
    const taskInstance = await taskModel.findOne({
      where: {
        id: taskId,
      },
    });
    if (!taskInstance) throw new ApplicationError("Task not found.", 404);
    const updatedData = await taskInstance.update(newData);
    return updatedData;
  }
}

module.exports = TaskModel;
