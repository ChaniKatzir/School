const { Sequelize, DataTypes } = require("sequelize");
module.exports=(sequelize,DataTypes)=>{
const Student_per_manners=sequelize.define('student_per_manners',{
        id:{
            type: DataTypes.INTEGER,
            autoIncrement:true,allowNull: false,uniqe:true,
            primaryKey:true},
        student_id:{type: DataTypes.INTEGER},
        manner_id:{type: DataTypes.INTEGER},
        mark_id:{type: DataTypes.INTEGER},
        period_id:{type: DataTypes.INTEGER}
    },
    {
        timestamps: false,
        freezeTableName: true
    }
    );
return Student_per_manners;}