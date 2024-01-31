const express = require("express");
const spsControler= require("../controllers/student_per_subject.js");
const spsRouter = express.Router();

spsRouter.post("/", spsControler.create);
spsRouter.put("/:id", spsControler.update);
spsRouter.get("/:name/:subject", spsControler.get);

module.exports = spsRouter;