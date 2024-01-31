const db = require('../models')
const spm = db.student_per_manners
const students = db.students
const manners = db.manners
var { cr } = require('./createObj ');

exports.get = async (req, res) => {
    let student = await students.findOne({ where: {name: req.params.name } });
    if (student) {
        student = student.dataValues.id;
        let spers = await spm.findAll({ where: { student_id: student } })
        return res.send(spers);
    }
    else
        return res.status(400).send({});
}

exports.create = async (req, res) => {
    if (!req.body) {
        return;
    }
    const spmObject = {
        student_id: req.body.student_id,
        manner_id: req.body.manner_id,
        mark_id: req.body.mark_id,
        period_id: req.body.period_id,
    }
    console.log("kkkkkkkkkkkkk",spmObject);
    try {
        const spers = await spm.create(spmObject);
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
    let spmObject = {};
    cr(spmObject, "mark_id", req.body.mark_id);
    cr(spmObject, "period_id", req.body.period_id);
    cr(spmObject, "manner_id", req.body.manner_id);
    if (Object.keys(spmObject).length != 0) {
        console.log("ssssssss",spmObject,req.params.id);
        spm.update(spmObject, { where: { id: req.params.id } })
            .then(num => {
                console.log("111111",num);
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
    }
}