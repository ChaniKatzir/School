const { where } = require('sequelize');
const db = require('../models');
const manner_marks = db.manner_marks

exports.findAll = async (req, res) => {
  let marks= await manner_marks.findAll();
  marks?res.send(marks.map(x=>x.dataValues.name)):
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding student."
   
  })
};
