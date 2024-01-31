
const express = require("express");
const mannersMarksControler= require("../controllers/manners.js");
const mannersMarksRouter = express.Router();

mannersMarksRouter.get("/",mannersMarksControler.findAll);

// mannersMarksRouter.get("/:grade",mannersMarksControler.findSome);

// mannersMarksRouter.put("/:id",mannersMarksControler.update);

// mannersMarksRouter.post("/",mannersMarksControler.create);

// mannersMarksRouter.delete("/:id",mannersMarksControler.delete);


module.exports =mannersMarksRouter;