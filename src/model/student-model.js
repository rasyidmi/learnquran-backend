module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "student",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email_address: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.INTEGER,
        unique: true,
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
    }
  );

  return student;
};
