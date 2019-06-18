const routes = require('express').Router();
const user = require('../models/user');
const jwt = require('jsonwebtoken')
const plat = require("../models/plat");
const resto = require("../models/resto");


let auth = require("./authjwt");

// *** Get user All Or One by _iD***
routes.get("/getclient/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "user") {
    if (req.params.id === "all") {
      const restoResult = await user.find({role: "user"}, {password:0}).exec();
      res.send({ msg: "successful findall", data: restoResult });
    } else {
      const adminResult = await user.findOne({ _id: req.params.id }, {password:0}).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *************************************************************** resto todo *****************************************************************************
routes.get("/getrestofc/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "user") {
    if (req.params.id === "all") {
      const restoResult = await user.find({role: "resto"}, {password:0}).populate({path:'resto', populate:{path:'plat'}}).exec();
      res.send({ msg: "successful findall", data: restoResult });
    } else {
      const adminResult = await user.findOne({ _id: req.params.id }, {password:0}).populate({path:'resto', populate:{path:'plat'}}).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
    }
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not Admin to do that" });
  }
});
// *************************************************************** resto todo *****************************************************************************

// *************************************************************** resto todo *****************************************************************************
routes.get("/getplat/:id", async (req, res) => {

      const adminResult = await plat.findOne({ _id: req.params.id }).exec();
      res.send({
        msg: "successful  ",
        data: adminResult
      });
});
// *************************************************************** resto todo *****************************************************************************

module.exports = routes;