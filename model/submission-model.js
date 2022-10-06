module.exports = (sequelize, DataTypes) => {
  const submission = sequelize.define(
    "submission",
    {
      score: {
        type: DataTypes.INTEGER,
      },
      feedback: {
        type: DataTypes.TEXT,
      },
      updated_date: {
        type: DataTypes.DATE,
      },
      audio_file: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );

  return submission;
};
