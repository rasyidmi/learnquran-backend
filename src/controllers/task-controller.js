const modelHelper = require("../helpers/model-helper/task-helper");
const Response = require("../dto/response");

class TaskController {
  static async createTask(req, res, next) {
    const body = req.body;
    const teacherId = body.user_id;
    const classId = body.class_id;
    try {
      const createdTask = await modelHelper.createTask(
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
}

module.exports = TaskController;
