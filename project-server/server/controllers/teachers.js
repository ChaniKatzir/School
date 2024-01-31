const db = require('../models')

var { cr } = require('./createObj ');
const teachers=db.teachers;
// const { where } = require('sequelize');
// const e = require('express');

exports.findName = async (req, res) => {
  let name=await teachers.findOne({where:{id:req.params.id}});
  if(!name){
    res.send(null)
  }
  else
  {
    let name=name.dataValues.name;
    res.send(name);
  }
}

exports.findAll = async (req, res) => {
  let p = {};
  cr(p, "name", req.body.name);
  cr(p, "admin", req.body.admin);
  cr(p, "id", req.body.id);
  cr(p, "password", req.body.password);

  const qry = {};
  qry.where = p;
  qry.include = [{ model: teachers , attribute: []}];
  qry.raw = true;

  teachers.findAll(qry).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding teacher."
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
    "password": req.body.password,
    "admin":req.body.admin
  };
  try {
    const data = await teachers.create(objperson)
    res.send({ data});
  }
  catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the teacher."
    });
  };
};


// Update a student by the id in the request
exports.update = async (req, res) => {
  let p = {};

  cr(p, "name", req.body.name);
  cr(p, "admin", req.body.admin);
  cr(p, "password", req.body.password);
  cr(p, "id", req.body.id);

  if (Object.keys(p).length != 0) {
    teachers.update(p, { where: { id: req.params.id } })
      .then(num => {
        if (num == 1) 
            res.send({
              message: "teacher was updated successfully."
            });
        else 
          res.send({
            message: `Cannot update teacher with id=${req.params.id}. Maybe teacher was not found or req.body is empty!`
          });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating teacher with id=" + req.params.id
        });
      });
  }
};

//Delete a teacher with the specified id in the request
exports.delete = async (req, res) => {
  let p = await teachers.findAll({ where: { id: id } })
  if (p) {
    try {
      teachers.destroy({
        where: { id: req.params.id }
      })    
        .then(
            res.send({
            message: "teacher was deleted successfully!"
        }))
    }
    catch {
       res.status(500).send({
          message: "Could not delete teacher with id=" + req.params.id
        })
    }
  }
}



