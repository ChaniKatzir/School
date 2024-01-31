require('dotenv').config()
const express = require("express");
const db = require('./models');
const cors = require('cors');
var fs = require('fs');

const PORT = process.env.PORT || 2000;
const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));

const studentsRouter = require("./routes/students.js")
const teachersRouter = require("./routes/teachers.js")
const accessRouter = require("./routes/access.js")
const subjectsRouter = require("./routes/subjects.js")
const marksRouter = require("./routes/marks.js")
const assessmentsRouter = require("./routes/assessments.js")
const spsRouter = require("./routes/student_per_subject.js")
const spmRouter = require("./routes/student_per_manners.js")
const mannersMarksRouter = require("./routes/manners_marks.js")
const mannersRouter = require("./routes/manners.js");
const fileRouter=require("./routes/file.js")

app.use(express.urlencoded())
app.use(express.json());

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })

app.use("/teachers", teachersRouter)
app.use("/students", studentsRouter)
app.use("/access", accessRouter)
app.use("/subjects", subjectsRouter)
app.use("/marks", marksRouter)
app.use("/assessments", assessmentsRouter)
app.use("/sps", spsRouter)
app.use("/spm", spmRouter)
app.use("/mannersMarks", mannersMarksRouter)
app.use("/manners", mannersRouter)
app.use("/file", fileRouter)


app.listen(PORT, () => {
    console.log("app running");
});



