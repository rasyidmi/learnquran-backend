module.exports = (sequelize, DataTypes) => {
  const classes = sequelize.define(
    "classes",
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
    }
  );

  return classes;
};
