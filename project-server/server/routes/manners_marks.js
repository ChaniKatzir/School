const express = require("express");
const mannersMarksControler= require("../controllers/manners_marks.js");
const mannersMarksRouter = express.Router();

mannersMarksRouter.get("/",mannersMarksControler.findAll);

module.exports =mannersMarksRouter;