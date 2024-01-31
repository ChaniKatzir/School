const { Sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
const Student_per_subjects=sequelize.define('student_per_subjects',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        student_id:{type: DataTypes.INTEGER},
        subject_id:{type: DataTypes.INTEGER, allowNull:false},
        mark_id:{type: DataTypes.INTEGER},
        period_id:{type: DataTypes.INTEGER},
        assessment_id:{type: DataTypes.INTEGER},
        behavior:{type: DataTypes.STRING},
        listening:{type: DataTypes.STRING},
        home_work:{type: DataTypes.STRING},
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Student_per_subjects;}