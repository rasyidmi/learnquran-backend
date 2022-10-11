const teacherModel = require("../model/index").teacher;
const classModel = require("../model/index").classes;
const Response = require("../dto/response");
var response = new Response();

class ClassController {
  static async createClass(req, res, next) {
    const body = req.body;

    try {
      const teacher = await teacherModel.findOne({
        where: {
          id: body.user_id,
        },
      });
      if (teacher == null) {
        return res.status(404).json({ message: "User is not a teacher" });
      }

      const createdClass = await classModel.create({
        name: body.name,
        capacity: body.capacity,
        teacher_id: body.user_id,
      });
      if (createdClass != null) {
        response.message = "The system successfully in creating a class.";
        response.results = createdClass;
        response.type = "POST";
        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getClassDetail(req, res, next) {
    const classId = req.params.id;
    try {
      const fetchedClass = await classModel.findOne({
        where: {
          id: classId,
        },
      });
      if (fetchedClass != null) {
        response.message = "The system successfully in getting a class.";
        response.results = fetchedClass;
        response.type = "GET";
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Class not found." });
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllClass(req, res, next) {
    try {
      const allClass = await classModel.findAll();

      response.message = "The system successfully in getting all classes.";
      response.results = { data: allClass, total: allClass.length };
      response.type = "GET";
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async searchClasses(req,res, next) {
    
  }
}

module.exports = ClassController;
