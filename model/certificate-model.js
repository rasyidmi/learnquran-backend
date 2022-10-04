module.exports = (sequelize, DataTypes) => {
    const certificate = sequelize.define("certificate", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
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
    });
  
    return certificate;
  };
  