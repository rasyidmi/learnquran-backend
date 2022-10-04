module.exports = (sequelize, DataTypes) => {
    const task = sequelize.define("task", {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deadline_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    });
  
    return task;
  };
  