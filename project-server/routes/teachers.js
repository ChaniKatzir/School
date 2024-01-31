const express = require("express");
const teachersControler= require("../controllers/teachers.js");
const teachersRouter = express.Router();

teachersRouter.get("/:id", teachersControler.findName);

teachersRouter.get("/", teachersControler.findAll);

teachersRouter.put("/:id",teachersControler.update);

teachersRouter.post("/",teachersControler.createFromCSV);

teachersRouter.delete("/:id",teachersControler.delete);


module.exports =teachersRouter;