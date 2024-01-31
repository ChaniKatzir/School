const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Manner_marks=sequelize.define('manner_marks',{
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
return Manner_marks;}