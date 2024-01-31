const express = require("express");
const marksControler= require("../controllers/marks.js");
const marksRouter = express.Router();

marksRouter.get("/",marksControler.findAll);

marksRouter.get("/:grade",marksControler.findSome);

marksRouter.put("/:id",marksControler.update);

marksRouter.post("/",marksControler.create);

marksRouter.delete("/:id",marksControler.delete);


module.exports =marksRouter;