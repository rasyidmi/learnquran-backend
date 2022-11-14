"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Classes extends Model {
    static associate(models) {
      Classes.belongsTo(models.Teacher, {
        foreignKey: "teacher_id",
        onDelete: "CASCADE",
      });
      Classes.belongsToMany(models.Student, {
        through: "StudentAndClass",
        foreignKey: "class_id",
        timestamps: false,
      });
      Classes.hasMany(models.Task, {
        foreignKey: "class_id",
        onDelete: "CASCADE",
      });
      Classes.hasMany(models.Submission, {
        foreignKey: "class_id",
        onDelete: "CASCADE",
      });
    }
  }
  Classes.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      teacher_name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Classes",
      name: {
        singular: "Class",
        plural: "Classes",
      },
    }
  );
  return Classes;
};
