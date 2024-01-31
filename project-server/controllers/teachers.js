const db = require('../models')
const csvtojson = require('csvtojson');
var { cr } = require('./createObj ');
const mysql = require('mysql2');
const teachers = db.teachers;
const csv = require('csv-parser');
const fs = require('fs');
const Papa = require('papaparse');
const unzipper = require('unzipper'); 
// const { where } = require('sequelize');
// const e = require('express');

exports.findName = async (req, res) => {
  let name = await teachers.findOne({ where: { id: req.params.id } });
  if (!name) {
    res.send(null)
  }
  else {
    let n = name.dataValues.name;
    res.send(n);
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
  qry.include = [{ model: teachers, attribute: [] }];
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

exports.createFromCSV = async (req, res) => {
  var con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB
  });
  const filePath = req.body.fileName;
  if (!filePath) {
    return res.status(400).send('File path is missing in the request body.');
  }
  
  const results = [];
  
  const stream = fs.createReadStream(filePath);
  
  stream
    .pipe(unzipper.Parse())
    .on('entry', (entry) => {
      const chunks = [];
      entry
        .on('data', (chunk) => {
          chunks.push(chunk);
        })
        .on('end', () => {
          const content = Buffer.concat(chunks).toString('utf-8');
          // Now 'content' contains the text data of the current entry
          // Process the content as needed (e.g., parse CSV)
          results.push(content);
        });
    })
    .on('finish', () => {
      console.log('ZIP file successfully processed.');
      console.log(results); // Array containing all contents
      // You can send a response or perform additional actions here
    })
    .on('error', (error) => {
      console.error('Error reading ZIP file:', error);
      res.status(500).send('Error reading ZIP file');
    });
  // csv().fromFile(req.body.fileName).then(source => {
  //   // Fetching the data from each row and inserting to the table "products"
  //   for (var i = 0; i < source.length; i++) {
  //     var name = source[i]["שם"] ? source[i]["שם"] : null,
  //       id = source[i]["מספר זהות"] ? source[i]["מספר זהות"] : null,
  //       password = source[i]["פלאפון"] ? source[i]["פלאפון"] : null
  //     console.log("21212121212121212",source[i]["שם"]);
  //     var insertStatement = "INSERT INTO teachers values(?, ?, ?, ?)";
  //     var items = [id, name, password, 0];
  //     console.log("98989898989898989",items);

  //     // Inserting data of current row into database
  //     con.query(insertStatement, items,
  //       (err, results, fields) => {
  //         if (err) {
  //           console.log("Unable to insert item at row ", i + 1);
  //           return console.log(err);
  //         }
  //       });
  //   }
  //   console.log("Records inserted into database successfully...!!");
  // });



  // if (!req.body) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }
  // let objperson = {
  //   "id": req.body.id,
  //   "name": req.body.name,
  //   "password": req.body.password,
  //   "admin":req.body.admin
  // };
  // try {
  //   const data = await teachers.create(objperson)
  //   res.send({ data});
  // }
  // catch (err) {
  //   res.status(500).send({
  //     message:
  //       err.message || "Some error occurred while creating the teacher."
  //   });
  // };
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



