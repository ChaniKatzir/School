const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Assessments=sequelize.define('assessments',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        name:{type: DataTypes.STRING, allowNull:false,trim: true,},
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Assessments;}