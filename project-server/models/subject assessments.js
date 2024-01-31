const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Subject_assessments=sequelize.define('subject_assessments',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        assessment_id:{type: DataTypes.INTEGER, allowNull:false},
        subject_id: { type: DataTypes.INTEGER, allowNull: false},
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Subject_assessments;}