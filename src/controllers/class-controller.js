const modelHelper = require("../helpers/model-helper/class-helper");

const Response = require("../dto/response");

class ClassController {
  static async createClass(req, res, next) {
    const body = req.body;
    try {
      const createdClass = await modelHelper.createClass(
        { name: body.name, capacity: body.capacity },
        body.user_id
      );
      if (createdClass == null) {
        return res.status(404).json({ message: "User is not a teacher" });
      }
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
      const allClasses = await modelHelper.getAllClasses({ condition: 0 });

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
      const fetchedClasses = await modelHelper.getAllClasses({
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

  static async getClassDetail(req, res, next) {
    const classId = req.params.id;
    try {
      const fetchedClass = await modelHelper.getClassDetail(classId);

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
      const helperResponse = await modelHelper.updateClass(
        {
          name: body.name,
          capacity: body.capacity,
        },
        req.params.id,
        body.user_id
      );

      if (helperResponse == null)
        return res
          .status(200)
          .json({ message: "The user is not the teacher in that class." });

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
    try {
      const value = await modelHelper.deleteClass(classId);
      if (value != null) {
        const response = Response.deleteResponse(
          "The system successfully deleted a class."
        );
        return res.status(200).json(response);
      } else {
        return res.status(404).json({ message: "Class is not found." });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClassController;
