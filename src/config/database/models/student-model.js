module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define(
    "student",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize.fn('uuid_generate_v4')
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
    }
  );

  return student;
};
