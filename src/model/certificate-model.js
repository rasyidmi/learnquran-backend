module.exports = (sequelize, DataTypes) => {
  const certificate = sequelize.define(
    "certificate",
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
    }
  );

  return certificate;
};
