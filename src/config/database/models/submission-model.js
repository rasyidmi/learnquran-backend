"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    static associate(models) {
      Submission.belongsTo(models.Task, {
        foreignKey: "task_id",
        onDelete: "CASCADE",
      });
      Submission.belongsTo(models.Student, {
        foreignKey: "student_id",
        onDelete: "CASCADE",
      });
      Submission.belongsTo(models.Teacher, {
        foreignKey: "teacher_id",
        onDelete: "CASCADE",
      });
      Submission.belongsTo(models.Classes, {
        foreignKey: "class_id",
        onDelete: "CASCADE",
      });
    }
  }
  Submission.init(
    {
      score: {
        type: DataTypes.DOUBLE,
      },
      feedback: {
        type: DataTypes.TEXT,
      },
      updated_date: {
        type: DataTypes.DATE,
      },
      audio_file: {
        type: DataTypes.STRING,
      },
      duration: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Submission",
    }
  );
  return Submission;
};
