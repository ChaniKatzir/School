const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Period=sequelize.define('period',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        year:{type: DataTypes.INTEGER, allowNull:false},
        semester: { type: DataTypes.INTEGER, allowNull: false},
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Period;}