"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.hasMany(models.Certificate, {
        foreignKey: "student_id",
        onDelete: "CASCADE",
      });
      Student.belongsTo(models.User, {
        foreignKey: "email_address",
        onDelete: "CASCADE",
      });
      Student.belongsToMany(models.Classes, {
        through: "StudentAndClass",
        foreignKey: "student_id",
        timestamps: false,
      });
      Student.hasMany(models.Submission, {
        foreignKey: "student_id",
        onDelete: "CASCADE",
      });
    }
  }
  Student.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.fn("uuid_generate_v4"),
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Student",
    }
  );
  return Student;
};
