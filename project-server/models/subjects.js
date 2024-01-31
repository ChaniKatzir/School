const { Sequelize, DataTypes } = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
const Subjects=sequelize.define('subjects',{
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
return Subjects;}