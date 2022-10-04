module.exports = (sequelize, DataTypes) => {
  const submission = sequelize.define(
    "submission",
    {
      score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      feedback: {
        type: DataTypes.TEXT,
      },
      updated_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      audio_file: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return submission;
};
