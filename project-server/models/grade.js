const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Grade=sequelize.define('grade',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        num:{type: DataTypes.INTEGER, allowNull:false},
        year: { type: DataTypes.INTEGER, allowNull: false},
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Grade;}