const taskModel = require("../models/task-model");
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
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
