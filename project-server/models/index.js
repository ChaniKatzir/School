
const dbConfig = require('../dbConfig/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER, 
    dbConfig.POSSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    },
    define:{
        freezeTableName:true,
        underscored:true,
        timestamps:false
    }
}
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.students = require('./students')(sequelize, DataTypes)
db.student_per_manners = require('./student per manners')(sequelize, DataTypes);
db.student_per_subjects = require('./student per subjects')(sequelize, DataTypes);
db.subject_assessments = require('./subject assessments')(sequelize, DataTypes);
db.subject_marks = require('./subject marks')(sequelize, DataTypes);
db.subjects = require('./subjects')(sequelize, DataTypes);
db.teachers = require('./teachers')(sequelize, DataTypes);
db.manners = require('./manners')(sequelize, DataTypes);
db.manner_marks = require('./manner marks')(sequelize, DataTypes);
db.period = require('./period')(sequelize, DataTypes);
db.assessments = require('./assessments')(sequelize, DataTypes);
db.grade = require('./grade')(sequelize, DataTypes);
  
// db.students.hasMany(db.grade, {
//   foreignKey: 'id',
// });
// db.grade.belongsTo(db.students, {
//   foreignKey: 'id',
// });
// db.student_per_manners.hasMany(db.students, {
//   foreignKey: 'student_id',
// });
// db.students.belongsTo(db.student_per_manners, {
//   foreignKey: 'student_id',
// });
// db.student_per_manners.hasMany(db.manners, {
//   foreignKey: 'manner_id',
// });
// db.manners.belongsTo(db.student_per_manners, {
//   foreignKey: 'manner_id',
// });
// db.student_per_manners.hasMany(db.manner_marks, {
//   foreignKey: 'mark_id',
// });
// db.manner_marks.belongsTo(db.student_per_manners, {
//   foreignKey: 'mark_id',
// });
// db.student_per_manners.hasMany(db.period, {
//   foreignKey: 'period_id',
// });
// db.period.belongsTo(db.student_per_manners, {
//   foreignKey: 'period_id',
// });
// db.student_per_subjects.hasMany(db.students, {
//   foreignKey: 'student_id',
// });
// db.students.belongsTo(db.student_per_subjects, {
//   foreignKey: 'student_id',
// });
// db.student_per_subjects.hasMany(db.subjects, {
//   foreignKey: 'id',
// });
// db.subjects.belongsTo(db.student_per_subjects, {
//   foreignKey: 'id',
// });
// db.student_per_subjects.hasMany(db.subject_assessments, {
//   foreignKey: 'assessment_id',
// });
// db.subject_assessments.belongsTo(db.student_per_subjects, {
//   foreignKey: 'assessment_id',
// });
// db.student_per_subjects.hasMany(db.subject_marks, {
//   foreignKey: 'mark__id',
// });
// db.subject_marks.belongsTo(db.student_per_subjects, {
//   foreignKey: 'mark_id',
// });
// db.student_per_subjects.hasMany(db.period, {
//   foreignKey: 'period__id',
// });
// db.period.belongsTo(db.student_per_subjects, {
//   foreignKey: 'period__id',
// });
// db.subject_assessments.hasMany(db.subjects, {
//   foreignKey: 'id',
// });
// db.subjects.belongsTo(db.subject_assessments, {
//   foreignKey: 'id',
// });
// db.subject_assessments.hasMany(db.assessments, {
//   foreignKey: 'assessment__id',
// });
// db.assessments.belongsTo(db.subject_assessments, {
//   foreignKey: 'assessment__id',
// });
   
module.exports = db

