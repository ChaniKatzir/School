
const express = require("express");
const mannersMarksControler= require("../controllers/manners.js");
const mannersMarksRouter = express.Router();

mannersMarksRouter.get("/",mannersMarksControler.findAll);

module.exports =mannersMarksRouter;