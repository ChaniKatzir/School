const express = require("express");
const studentsControler= require("../controllers/students.js");
const studentsRouter = express.Router();

studentsRouter.get("/",studentsControler.findAll);

studentsRouter.get("/:grade",studentsControler.findSome);

studentsRouter.get("/:first_name/:last_name",studentsControler.findId);

// studentsRouter.put("/:id",studentsControler.update);

studentsRouter.post("/",studentsControler.createFromCSV);

// studentsRouter.delete("/:id",studentsControler.delete);


module.exports =studentsRouter;