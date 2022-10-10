const teacherModel = require("../model/index").teacher;
const classModel = require("../model/index").classes;
const Response = require("../dto/response");
var response = new Response();

class ClassController {
  static async createClass(req, res, next) {
    const body = req.body;

    try {
      teacherModel
        .findOne({
          where: {
            id: body.id,
          },
        })
        .then(async () => {
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
          } else {
            next(error);
          }
        })
        .catch(() => {
          return res.status(404).json({
            message: "User is not a teacher.",
          });
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClassController;
