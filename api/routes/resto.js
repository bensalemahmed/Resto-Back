const routes = require("express").Router();
const jwt = require("jsonwebtoken");
const plat = require("../models/plat");
const resto = require("../models/resto");
const user = require("../models/user");


let auth = require("./authjwt");
// *** Get Admin All Or One by _iD***
routes.get("/getresto/:id", auth.required, async (req, res) => {
  if (req.payload.data.role === "resto") {
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
// *** Add plat ***

routes.post("/addplat", auth.required, async (req, res) => {
  if (req.payload.data.role === "resto") {
    const addplat = await plat.create(req.body).catch(err => err);
    const updateplat = await resto.findOneAndUpdate(
      { _id: req.payload.data.resto },
      { $push: {
        plat : addplat._id
              }
      })
    res.send({ msg: "successful add", data: updateplat });
  } else {
    return res
      .status(403)
      .send({ code: 403, message: "You are not resto to do that" });
  }
});

// *************************************************************** end user **************************************************************************

module.exports = routes;
