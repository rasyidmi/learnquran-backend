const { ApplicationError } = require("../helpers/error-template");
const userModel = require("../config/database/models").User;

class UserModel {
  static async createUser(data) {
    return await userModel.create(data);
  }

  static async getUser(emailAddress) {
    const user = await userModel.findOne({
      where: {
        email_address: emailAddress,
      },
    });

    if (user) return user;
    throw new ApplicationError("User not found.", 404);
  }

  static async updatePassword(emailAddress, newData) {
    const user = await userModel.findOne({
      where: {
        email_address: emailAddress,
      },
    });
    if (!user) throw new ApplicationError("User not found.", 404);

    return await user.update(newData);
  }

  static async getUserRole(emailAddress) {
    const userInstance = await userModel.findOne({
      where: { email_address: emailAddress },
    });

    const studentInstance = await userInstance.getStudent();
    if (studentInstance) return 0;
    return 1;
  }

  static async createStudent(userInstance, data) {
    await userInstance.createStudent(data);
  }

  static async createTeacher(userInstance, data) {
    await userInstance.createTeacher(data);
  }

  static async deleteUser(emailAddress) {
    const userInstance = await userModel.findOne({
      where: {
        email_address: emailAddress,
      },
    });
    if (userInstance) {
      await userInstance.destroy();
      return emailAddress;
    }
    throw new ApplicationError("User not found.", 404);
  }

  static async getUserData(emailAddress) {
    const userInstance = await userModel.findOne({
      where: { email_address: emailAddress },
    });

    const studentInstance = await userInstance.getStudent();
    const teacherInstance = await userInstance.getTeacher();
    if (studentInstance) return studentInstance;
    return teacherInstance;
  }
}

module.exports = UserModel;
