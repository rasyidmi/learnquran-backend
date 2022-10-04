module.exports = (sequelize, DataTypes) => {
    const classes = sequelize.define("classes", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
  
    return classes;
  };
  