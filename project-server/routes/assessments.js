const express = require("express");
const assessmentsControler= require("../controllers/assessments.js");
const assesssmentsRouter = express.Router();

assesssmentsRouter.get("/:subject",assessmentsControler.findAll);

// assesssmentsRouter.get("/:grade",assessmentsControler.findSome);

assesssmentsRouter.put("/:id",assessmentsControler.update);

assesssmentsRouter.post("/",assessmentsControler.create);

assesssmentsRouter.delete("/:id",assessmentsControler.delete);


module.exports =assesssmentsRouter;