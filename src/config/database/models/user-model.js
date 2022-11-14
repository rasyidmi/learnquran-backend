"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Teacher, {
        foreignKey: "email_address",
        onDelete: "CASCADE",
      });
      User.hasOne(models.Student, {
        foreignKey: "email_address",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      email_address: {
        type: DataTypes.STRING,
        isEmail: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
