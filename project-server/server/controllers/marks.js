const { where } = require('sequelize');
const db = require('../models');
const students = db.students
const subject_marks = db.subject_marks
const grade = db.grade

var { cr } = require('./createObj ');
exports.findAll = async (req, res) => {
  let marks= await subject_marks.findAll();
  marks?res.send(marks.map(x=>x.dataValues.name)):
    res.status(500).send({
      message:
        err.message || "Some error occurred while finding student."
   
  })
};

exports.findSome = async (req, res) => {
  let year = new Date().getFullYear();
  let id_grade = await grade.findOne({
    where: { year: year - req.params.grade }
  })
  students.findAll({
    attributes: ['name'],
    where: { grade_id: id_grade.id }
  })
    .then(data => {
      let d = data.map(item => item.dataValues)
      res.send(d);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding student."
      });
    });
};

exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  let objperson = {
    "id": req.body.id,
    "name": req.body.name,
    "class": req.body.class
  };
  try {
    const data = await students.create(objperson)
    res.send({ data });
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the student."
    });
  };
};


// Update a student by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;
  let p = {};
  cr(p, "name", req.body.name);
  cr(p, "class", req.body.yearbook);
  cr(p, "id", req.body.id);
  if (Object.keys(p).length != 0) {
    students.update(p, { where: { id: id } })
      .then(num => {
        if (num == 1)
          res.send({
            message: "student was updated successfully."
          })
        else
          res.status(500).send({
            message: "Error updating student with id=" + id
          })
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating student with id=" + id
        });
      });
  }
};

// // Delete a student with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    students.destroy({
      where: { id: id }
    })
      .then(
        res.send({
          message: "student was deleted successfully!"
        }))
  }
  catch {
    res.status(500).send({
      message: "Could not delete student with id=" + id
    });
  }
};

