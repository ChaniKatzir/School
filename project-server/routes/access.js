const express = require("express");
const accessControler= require("../controllers/access.js");
const accessRouter = express.Router();

accessRouter.get("/:id/:password", accessControler.login);

module.exports = accessRouter;