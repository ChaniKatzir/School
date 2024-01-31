export const handler = async (event) => {

  require('dotenv').config();
  const express = require("express");
  const mysql = require('mysql2');
  const cors = require('cors');
  const fs = require('fs');
  const PORT = process.env.PORT || 2000;
  const app = express();
  const db = require('./models/index.js');

  app.use(cors({
    origin: 'http://localhost:3000'
  }));

  const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    connectionLimit: 10,
  });
  const promisePool = pool.promise();

  const studentsRouter = require("./routes/students.js");
  const teachersRouter = require("./routes/teachers.js");
  const accessRouter = require("./routes/access.js");
  const subjectsRouter = require("./routes/subjects.js");
  const marksRouter = require("./routes/marks.js");
  const assessmentsRouter = require("./routes/assessments.js");
  const spsRouter = require("./routes/student_per_subject.js");
  const spmRouter = require("./routes/student_per_manners.js");
  const mannersMarksRouter = require("./routes/manners_marks.js");
  const mannersRouter = require("./routes/manners.js");
  const fileRouter = require("./routes/file.js");

  app.use(express.urlencoded())
  app.use(express.json());

  app.use((req, res, next) => {
    req.db = promisePool;
    next();
  });

  db.sequelize.sync({ force: false })
    .then(() => {
      console.log('yes re-sync done!')
    })

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use("/teachers", teachersRouter);
  app.use("/students", studentsRouter);
  app.use("/access", accessRouter);
  app.use("/subjects", subjectsRouter);
  app.use("/marks", marksRouter);
  app.use("/assessments", assessmentsRouter);
  app.use("/sps", spsRouter);
  app.use("/spm", spmRouter);
  app.use("/mannersMarks", mannersMarksRouter);
  app.use("/manners", mannersRouter);
  app.use("/file", fileRouter);

  app.listen(PORT, () => {
    console.log("App running");
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};

