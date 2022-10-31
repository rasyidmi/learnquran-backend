const dbConfig = require("../db-config");

const Sequelize = require("sequelize");
var sequelize;
if (process.env.ENV == null) {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      operatorsAliases: false,

      pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
      },
    }
  );
} else {
  sequelize = new Sequelize(dbConfig.url, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  });
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Assign the model to db variable
db.user = require("./user-model.js")(sequelize, Sequelize);
db.certificate = require("./certificate-model.js")(sequelize, Sequelize);
db.classes = require("./class-model.js")(sequelize, Sequelize);
db.student = require("./student-model.js")(sequelize, Sequelize);
db.submission = require("./submission-model.js")(sequelize, Sequelize);
db.task = require("./task-model.js")(sequelize, Sequelize);
db.teacher = require("./teacher-model.js")(sequelize, Sequelize);

// Define the associations
db.user.hasOne(db.teacher, {
  foreignKey: "email_address",
  onDelete: "CASCADE",
});
db.teacher.belongsTo(db.user, { foreignKey: "email_address" });

db.user.hasOne(db.student, {
  foreignKey: "email_address",
  onDelete: "CASCADE",
});
db.student.belongsTo(db.user, { foreignKey: "email_address" });

db.teacher.hasMany(db.classes, {
  foreignKey: "teacher_id",
  onDelete: "CASCADE",
});
db.classes.belongsTo(db.teacher, { foreignKey: "teacher_id" });

db.student.belongsToMany(db.classes, {
  through: "StudentAndClass",
  foreignKey: "student_id",
  timestamps: false,
});
db.classes.belongsToMany(db.student, {
  through: "StudentAndClass",
  foreignKey: "class_id",
  timestamps: false,
});

db.student.hasMany(db.certificate, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
});
db.certificate.belongsTo(db.student, { foreignKey: "student_id" });

db.classes.hasMany(db.task, { foreignKey: "class_id", onDelete: "CASCADE" });
db.task.belongsTo(db.classes, { foreignKey: "class_id" });

db.task.hasMany(db.submission, { foreignKey: "task_id", onDelete: "CASCADE" });
db.submission.belongsTo(db.task, { foreignKey: "task_id" });

db.student.hasMany(db.submission, {
  foreignKey: "student_id",
  onDelete: "CASCADE",
});
db.submission.belongsTo(db.student, { foreignKey: "student_id" });

db.teacher.hasMany(db.submission, {
  foreignKey: "teacher_id",
  onDelete: "CASCADE",
});
db.submission.belongsTo(db.teacher, { foreignKey: "teacher_id" });

db.classes.hasMany(db.submission, {
  foreignKey: "class_id",
  onDelete: "CASCADE",
});
db.submission.belongsTo(db.classes, { foreignKey: "class_id" });

module.exports = db;
