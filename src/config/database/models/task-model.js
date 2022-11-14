"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.Classes, {
        foreignKey: "class_id",
        onDelete: "CASCADE",
      });
      Task.hasMany(models.Submission, {
        foreignKey: "task_id",
        onDelete: "CASCADE",
      });
    }
  }
  Task.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
