
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
 
module.exports = db

