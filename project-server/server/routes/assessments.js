const express = require("express");
const assessmentsControler= require("../controllers/assessments.js");
const assesssmentsRouter = express.Router();

assesssmentsRouter.get("/:subject",assessmentsControler.findAll);

module.exports =assesssmentsRouter;