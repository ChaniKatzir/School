const express = require("express");
const filesControler= require("../controllers/file.js");
const filesRouter = express.Router();

filesRouter.get("/:date/:periodA/:periodB",filesControler.print)

module.exports =filesRouter;