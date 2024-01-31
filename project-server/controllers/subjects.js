const db = require('../models')
var { cr } = require('./createObj ');
const { where } = require('sequelize');
const subjects=db.subjects;

exports.findAll = async (req, res) => {
  await subjects.findAll().then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding subject."
      });
    });
};

exports.findId = async (req, res) => {
  await subjects.findOne({where:{name:req.params.name}}).then(data => {
    const id=data.dataValues.id;
    res.send({id});
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding subject."
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
  let obj = {
    "id": req.body.id,
    "name": req.body.name,
  };
  try {
    const data = await subjects.create(obj)
    res.send({ data});
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the subject."
    });
  };
};


// Update a subject by the id in the request
exports.update = async (req, res) => {
  let p = {};

  cr(p, "name", req.body.name);
  cr(p, "id", req.body.id);

  if (Object.keys(p).length != 0) {
    subjects.update(p, { where: { id: req.params.id } })
      .then(num => {
        if (num == 1) 
            res.send({
              message: "subject was updated successfully."
            });
        else 
          res.send({
            message: `Cannot update subject with id=${req.params.id}. Maybe teacher was not found or req.body is empty!`
          });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating subject with id=" + req.params.id
        });
      });
  }
};

//Delete a teacher with the specified id in the request
exports.delete = async (req, res) => {
  let p = await subjects.findAll({ where: { id: id } })
  if (p) {
    try {
      subjects.destroy({
        where: { id: req.params.id }
      })    
        .then(
            res.send({
            message: "subject was deleted successfully!"
        }))
    }
    catch {
       res.status(500).send({
          message: "Could not delete subject with id=" + req.params.id
        })
    }
  }
}



