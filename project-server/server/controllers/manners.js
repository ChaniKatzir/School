const { where } = require('sequelize');
const db = require('../models');
const manners = db.manners

exports.findAll = async (req, res) => {
  let marks= await manners.findAll();
  marks?res.send(marks.map(x=>x.dataValues.name)):
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding student."
   
  })
};
