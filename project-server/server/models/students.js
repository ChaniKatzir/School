const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Students=sequelize.define('students',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        name:{type: DataTypes.STRING, allowNull:false,trim: true,},
        grade_id: { type: DataTypes.INTEGER, allowNull: false },
     },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Students;}