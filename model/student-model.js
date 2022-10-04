module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define("student", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true,
    },
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
  });

  return student;
};
