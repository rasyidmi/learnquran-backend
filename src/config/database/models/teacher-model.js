module.exports = (sequelize, DataTypes) => {
  const teacher = sequelize.define(
    "teacher",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        default: sequelize.fn('uuid_generate_v4')
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

  return teacher;
};
