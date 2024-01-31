const express = require("express");
const subjectsControler= require("../controllers/subjects.js");
const subjectsRouter = express.Router();

subjectsRouter.get("/", subjectsControler.findAll);

subjectsRouter.get("/:name", subjectsControler.findId);

subjectsRouter.put("/:id",subjectsControler.update);

subjectsRouter.post("/",subjectsControler.create);

subjectsRouter.delete("/:id",subjectsControler.delete);


module.exports =subjectsRouter;