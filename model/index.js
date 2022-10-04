const dbConfig = require("../config/db-config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.certificate = require("./certificate-model.js")(sequelize, Sequelize);
db.classes = require("./classes-model.js")(sequelize, Sequelize);
db.student = require("./student-model.js")(sequelize, Sequelize);
db.submission = require("./submission-model.js")(sequelize, Sequelize);
db.task = require("./task-model.js")(sequelize, Sequelize);
db.teacher = require("./teacher-model.js")(sequelize, Sequelize);

// Define the associations
db.teacher.hasMany(db.classes, { foreignKey: "teacher_id", onDelete: 'CASCADE' });
db.classes.belongsTo(db.teacher);

db.student.belongsToMany(db.classes, { through: 'StudentAndClass' });
db.classes.belongsToMany(db.student, { through: 'StudentAndClass' });

db.student.hasMany(db.certificate, { foreignKey: "student_id", onDelete: 'CASCADE' });
db.classes.belongsTo(db.teacher);

db.classes.hasMany(db.task, { foreignKey: "class_id", onDelete: 'CASCADE' });
db.task.belongsTo(db.classes);

db.task.hasMany(db.submission, { foreignKey: "task_id", onDelete: 'CASCADE' });
db.submission.belongsTo(db.task);

db.student.belongsToMany(db.submission, { through: 'StudentAndSubmission' });
db.submission.belongsToMany(db.student, { through: 'StudentAndSubmission' });

db.teacher.hasMany(db.submission, { foreignKey: "teacher_id", onDelete: 'CASCADE' });
db.submission.belongsTo(db.teacher);

module.exports = db;
