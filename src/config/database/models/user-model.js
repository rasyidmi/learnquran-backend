module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email_address: {
        type: DataTypes.STRING,
        isEmail: true,
        primaryKey: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return user;
};
