const sequelize = require("sequelize");

const teacherModel = require("../models/index").teacher;
const classModel = require("../models/index").classes;
const classHelper = require("../helpers/model-helper/class-helper");

const Response = require("../dto/response");

class ClassController {
  static async createClass(req, res, next) {
    const body = req.body;

    try {
      // Check if the current user is teacher or not.
      const teacher = await teacherModel.findOne({
        where: {
          id: body.user_id,
        },
      });
      if (teacher == null) {
        return res.status(404).json({ message: "User is not a teacher" });
      }

      const createdClass = await teacher.createClass({
        name: body.name,
        capacity: body.capacity,
      });
      if (createdClass != null) {
        const response = Response.postResponse(
          "The system successfully created a class.",
          createdClass
        );
        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getAllClass(req, res, next) {
    try {
      const allClasses = await classHelper.getAllClasses();

      const response = Response.getResponse(
        "The system successfully got all class data.",
        allClasses
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
      const fetchedClasses = await classModel.findAll({
        where: {
          name: {
            [sequelize.Op.iLike]: `${keyword}%`,
          },
        },
      });
      const response = Response.getResponse(
        "The system successfully got all class data.",
        { data: fetchedClasses, total: fetchedClasses.length }
      );
      return res.status(200).json(response);
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
        const response = Response.getResponse(
          "The system successfully got the class data.",
          fetchedClass
        );
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Class not found." });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateClass(req, res, next) {
    const body = req.body;

    try {
      // Check if the current user is teacher or not.
      const teacher = await teacherModel.findOne({
        where: {
          id: body.user_id,
        },
      });
      if (teacher == null) {
        return res.status(404).json({ message: "User is not a teacher" });
      }

      const updatedClass = await classModel.update(
        {
          name: body.name,
          capacity: body.capacity,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (updatedClass != null) {
        const response = Response.putResponse(
          "The system successfully updated a class."
        );
        return res.status(200).json(response);
      }
    } catch (error) {
      next(error);
    }
  }

  static async deleteClass(req, res, next) {
    const classId = req.params.id;
    const classInstance = await classModel.findOne({
      where: {
        id: classId,
      },
    });

    if (classInstance != null) {
      await classInstance.destroy();
      const response = Response.deleteResponse(
        "The system successfully deleted a class."
      );
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ message: "Class is not found." });
    }
  }
}

module.exports = ClassController;
