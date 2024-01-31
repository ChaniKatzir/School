const db = require('../models')
const sps = db.student_per_subjects
const students = db.students
const subjects = db.subjects
var { cr } = require('./createObj ');

exports.get = async (req, res) => {
    let student = await students.findOne({ where: { name: req.params.name } });
    let subject = await subjects.findOne({ where: { name: req.params.subject } })
    if (student && subject) {
        student = student.dataValues.id;
        subject = subject.dataValues.id;
        let spers = await sps.findOne({ where: { student_id: student, subject_id: subject } })
        return res.send(spers);
    }
    else
        return res.status(400).send({});
}

exports.create = async (req, res) => {
    if (!req.body) {
        return;
    }
    const spsObject = {
        student_id: req.body.student_id,
        subject_id: req.body.subject_id,
        mark_id: req.body.mark_id,
        period_id: req.body.period_id,
        assessment_id: req.body.assessment_id,
        behavior: req.body.behavior,
        listening: req.body.listening,
        home_work: req.body.home_work
    }
    try {
        const spers = await sps.create(spsObject);
        res.send(spers);
    }
    catch (err) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the sps."
        });
    }
}

exports.update = async (req, res) => {
    let spsObject = {};
    cr(spsObject, "mark_id", req.body.mark_id);
    cr(spsObject, "period_id", req.body.period_id);
    cr(spsObject, "assessment_id", req.body.assessment_id);
    cr(spsObject, "behavior", req.body.behavior);
    cr(spsObject, "listening", req.body.listening);
    cr(spsObject, "home_work", req.body.home_work);
    if (Object.keys(spsObject).length != 0) {
        console.log(spsObject);
        console.log(req.params.id);
        let existingData=sps.findOne({where:{ id: req.params.id}})
        const valuesChanged = existingData!== spsObject;
        if(valuesChanged){
            sps.update(spsObject, { where: { id: req.params.id } })
            .then(num => {
                if (num == 1) {
                    res.send({ message: "Marks wer updated successfully." })
                }
                else {
                    res.send({ message: "Cannot update marks." })
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error updating marks." })
            })
        } else {
            res.send({ message: "Values are the same. No update performed." });
          }
    }
}