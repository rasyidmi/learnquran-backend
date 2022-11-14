"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    static associate(models) {
      Teacher.belongsTo(models.User, {
        foreignKey: "email_address",
        onDelete: "CASCADE",
      });
      Teacher.hasMany(models.Classes, {
        foreignKey: "teacher_id",
        onDelete: "CASCADE",
      });
      Teacher.hasMany(models.Submission, {
        foreignKey: "teacher_id",
        onDelete: "CASCADE",
      });
    }
  }
  Teacher.init(
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
      modelName: "Teacher",
    }
  );
  return Teacher;
};
