const { where } = require('sequelize');
const db = require('../models');
const subjects = db.subjects
const subject_assessments = db.subject_assessments
const assessments = db.assessments

exports.findAll = async (req, res) => {
    try{
    let sub=await subjects.findOne({where:{name:req.params.subject}});
    let x= await subject_assessments.findAll({where:{subject_id:sub.dataValues.id}})
    let ass=await assessments.findAll({where:{id:x.map(x=>x.dataValues.assessment_id)}});
    res.send(ass.map(ass=>ass.dataValues.name));
    }
    catch{
        res.status(500).send({
            message:
              "Some error occurred."
          })
    }
};
