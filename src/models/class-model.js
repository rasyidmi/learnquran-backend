module.exports = (sequelize, DataTypes) => {
  const classes = sequelize.define(
    "class",
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
    },
    {
      timestamps: false,
      name: {
        singular: "class",
        plural: "classes",
      }
    },
  );

  return classes;
};
