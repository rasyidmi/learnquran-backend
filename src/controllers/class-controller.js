const classModel = require("../models/class-model");
const teacherModel = require("../models/teacher-model");
const taskModel = require("../models/task-model");

const Response = require("../dto/response");

class ClassController {
  static async createClass(req, res, next) {
    const body = req.body;
    const params = req.query;
    try {
      const createdClass = await classModel.createClass(body, params.user_id);
      const response = Response.postResponse(
        "The system successfully created a class.",
        createdClass
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getAllClass(req, res, next) {
    try {
      const allClasses = await classModel.getAllClasses({ condition: 0 });
      const response = Response.getResponse(
        "The system successfully got all class data.",
        allClasses
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getClassByStudent(req, res, next) {
    const studentId = req.query.user_id;
    try {
      const classes = await classModel.getClassByStudent(studentId);
      const response = Response.getResponse(
        "The system successfully got all class data.",
        classes
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async getClassByTeacher(req, res, next) {
    const teacherId = req.query.user_id;
    try {
      const classes = await classModel.getClassByTeacher(teacherId);
      const response = Response.getResponse(
        "The system successfully got all class data.",
        classes
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async searchClasses(req, res, next) {
    const keyword = req.query.keyword;
    try {
      // Search classes by their name.
      const fetchedClasses = await classModel.getAllClasses({
        condition: 1,
        keyword: keyword,
      });
      const response = Response.getResponse(
        "The system successfully got all class data.",
        fetchedClasses
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async teacherGetClassDetail(req, res, next) {
    const classId = req.params.id;
    try {
      const fetchedClass = await classModel.getClassDetail(classId);
      // Add total students in the class.
      const totalStudents = fetchedClass.students.length;
      fetchedClass.dataValues.total_students = totalStudents;
      // Add class tasks.
      const classTasks = await taskModel.getTasksByClass(classId);
      fetchedClass.dataValues.tasks = classTasks;
      
      const response = Response.getResponse(
        "The system successfully got the class data.",
        fetchedClass
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async updateClass(req, res, next) {
    const body = req.body;
    const params = req.query;
    try {
      await classModel.updateClass(body, req.params.id, params.user_id);
      const response = Response.putResponse(
        "The system successfully updated a class."
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async deleteClass(req, res, next) {
    const classId = req.params.id;
    const teacherId = req.query.user_id;
    try {
      await classModel.deleteClass(classId, teacherId);
      const response = Response.deleteResponse(
        "The system successfully deleted a class."
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClassController;
