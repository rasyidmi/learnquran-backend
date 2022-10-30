const taskModel = require("../models/task-model");
const Response = require("../dto/response");

class TaskController {
  static async createTask(req, res, next) {
    const body = req.body;
    const teacherId = req.query.user_id;
    const classId = body.class_id;
    try {
      const createdTask = await taskModel.createTask(
        body,
        classId,
        teacherId
      );

      if (createdTask == null) {
        return res
          .status(404)
          .json({ message: "User is not the teacher of the class." });
      }
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
    const taskId = req.params.id;
    const teacherId = params.user_id;
    const classId = params.class_id;

    try {
      const value = await taskModel.deleteTask(teacherId, taskId, classId);
      if (value != null) {
        const response = Response.deleteResponse(
          "The system successfully deleted a task."
        );
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Task is not found or the user is not the class teacher." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TaskController;
