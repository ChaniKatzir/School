const express = require("express");
const spmControler= require("../controllers/student_per_manners.js");
const spmRouter = express.Router();

spmRouter.post("/", spmControler.create);
spmRouter.put("/:id", spmControler.update);
spmRouter.get("/:name", spmControler.get);

module.exports = spmRouter;