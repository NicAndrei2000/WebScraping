const express = require("express");
const router = express.Router();
const controller2 = require("./controller");

router.post("/", controller2.getInfoFromUrl);

module.exports = router;
