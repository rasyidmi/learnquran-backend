"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificate extends Model {
    static associate(models) {
      Certificate.belongsTo(models.Student, {
        foreignKey: "student_id",
        onDelete: "CASCADE",
      });
    }
  }
  Certificate.init(
    {
      author_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      sequelize,
      modelName: "Certificate",
    }
  );
  return Certificate;
};
