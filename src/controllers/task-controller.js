const taskModel = require("../models/task-model");
const submissionModel = require("../models/submission-model");
const firebaseStorage = require("../helpers/firebase-storage");
const Response = require("../dto/response");

class TaskController {
  static async createTask(req, res, next) {
    const body = req.body;
    const teacherId = req.query.user_id;
    const classId = req.query.class_id;
    try {
      const createdTask = await taskModel.createTask(body, classId, teacherId);
      const response = Response.postResponse(
        "The system successfully created a task.",
        createdTask
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getTaskDetail(req, res, next) {
    const params = req.query;
    const studentId = params.student_id;
    const taskId = req.params.id;

    try {
      const task = await taskModel.getTaskDetail(taskId);
      const submission = await submissionModel.getByStudentAndTaskId(
        studentId,
        taskId
      );
      if (submission.dataValues.audio_file) {
        const audioUrl = await firebaseStorage.getSignedUrl(
          submission.dataValues.audio_file
        );
        submission.dataValues.audio_file_url = audioUrl;
      }

      const response = Response.getResponse(
        "The system successfully got a task.",
        {
          task: task,
          submission: submission,
        }
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteTask(req, res, next) {
    const params = req.query;
    const taskId = params.task_id;
    const teacherId = params.user_id;
    const classId = params.class_id;

    try {
      await taskModel.deleteTask(teacherId, taskId, classId);
      const response = Response.deleteResponse(
        "The system successfully deleted a task."
      );
      return res.status(200).json(x);
    } catch (error) {
      next(error);
    }
  }

  static async updateTask(req, res, next) {
    const taskId = req.query.task_id;
    const data = req.body;

    try {
      const updatedInstance = await taskModel.updateTaskById(taskId, data);
      const response = Response.putResponse(
        "The system successfully updated a task.",
        updatedInstance
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
