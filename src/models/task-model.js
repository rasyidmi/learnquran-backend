module.exports = (sequelize, DataTypes) => {
  const task = sequelize.define(
    "task",
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
        defaultValue: "",
      },
    },
    {
      timestamps: false,
    }
  );

  return task;
};
