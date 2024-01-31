const { Sequelize, DataTypes } = require("sequelize");

module.exports=(Sequelize,DataTypes)=>{
    const Teachers=Sequelize.define('teachers',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        name:{type: DataTypes.STRING, allowNull:false,trim: true,},
        password: { type: DataTypes.INTEGER, allowNull: false},
        admin: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        timestamps: false,
         freezeTableName: true
    }
    );
    return Teachers;}