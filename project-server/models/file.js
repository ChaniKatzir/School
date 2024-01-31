const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Assessments=sequelize.define('files',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        name:{type: DataTypes.STRING, allowNull:false,trim: true,},
        file:{type: DataTypes.BLOB, allowNull:false},
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Files;}