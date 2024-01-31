const { where } = require('sequelize');
const db = require('../models');
const students = db.students
const student_per_subjects = db.student_per_subjects
const subjects = db.subjects
const subject_marks = db.subject_marks
const subject_assessments = db.subject_assessments
const student_per_manners = db.student_per_manners
const manners = db.manners
const manner_marks = db.manner_marks
const grade = db.grade


var { cr } = require('./createObj ');

exports.findAll = async (req, res) => {
  let p = {};
  cr(p, "first_name", req.body.first_name);
  cr(p, "last_name", req.body.last_name);
  cr(p, "class", req.body.class);
  cr(p, "id", req.body.id);

  const qry = {};
  qry.where = p;
  qry.include = [{ model: db.students, attribute: [] }];
  qry.raw = true;

  students.findAll(qry).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding student."
      });
    });
};

exports.findSome = async (req, res) => {
  let year = new Date().getFullYear();
  let id_grade = await grade.findOne({
    where: { year: year - req.params.grade }
  })
  students.findAll({
    attributes: ['id', 'first_name','last_name'],
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

exports.findId = async (req, res) => {
  students.findOne({
    attributes: ['id'],
    where: { first_name: req.params.first_name, last_name: req.params.last_name}
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while finding student."
      });
    });
}

exports.createFromCSV = async (req, res) => {
  csvtojson().fromFile(req.body.fileName).then(source => {
    // Fetching the data from each row and inserting to the table "products"
    for (var i = 0; i < source.length; i++) {
      var F_Name = source[i]["שם פרטי"] ? source[i]["שם פרטי"] : null,
       L_Name = source[i]["שם משפחה"] ? source[i]["שם משפחה"] : null,
        grade_num = source[i]["מספר מחזור"] ? source[i]["מספר מחזור"] : null,
        grade_year = source[i]["שנת כניסה"] ? source[i]["שנת כניסה"] : null,
        grade = null

      const grade_id = grade.findOne({ where: { num: grade_num, year: grade_year } });
      if (grade_id?.dataValues?.id)
        grade = grade_id;
      else {
        var insertStatement = "INSERT INTO grades values(?,?, ?)";
        var items = [, grade_num, grade_year];
        // Inserting data of current row into database
        con.query(insertStatement, items,
          (err, results, fields) => {
            if (err) {
              console.log("Unable to insert grade at row ", i + 1);
              return console.log(err);
            }
            console.log("results ", results);
            //grade=results
          });
      }

      var insertStatement = "INSERT INTO students values(?, ?, ?)";
      var items = [, F_Name,L_Name, grade];

      // Inserting data of current row into database
      con.query(insertStatement, items,
        (err, results, fields) => {
          if (err) {
            console.log("Unable to insert item at row ", i + 1);
            return console.log(err);
          }
        });
    }
    console.log("Records inserted into database successfully...!!");
  });
}


// // Update a student by the id in the request
// exports.update = async (req, res) => {
//   const id = req.params.id;
//   let p = {};
//   cr(p, "name", req.body.name);
//   cr(p, "class", req.body.yearbook);
//   cr(p, "id", req.body.id);

//   if (Object.keys(p).length != 0) {
//     students.update(p, { where: { id: id } })
//       .then(num => {
//         if (num == 1)
//           res.send({
//             message: "student was updated successfully."
//           })
//         else
//           res.status(500).send({
//             message: "Error updating student with id=" + id
//           })
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating student with id=" + id
//         });
//       });
//   }
// };

// // // Delete a student with the specified id in the request
// exports.delete = async (req, res) => {
//   const id = req.params.id;
//   try {
//     students.destroy({
//       where: { id: id }
//     })
//       .then(
//         res.send({
//           message: "student was deleted successfully!"
//         }))
//   }
//   catch {
//     res.status(500).send({
//       message: "Could not delete student with id=" + id
//     });
//   }
// };

