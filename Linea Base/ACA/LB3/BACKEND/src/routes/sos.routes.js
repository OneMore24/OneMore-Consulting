const express = require("express");
const router = express.Router();

const { getSOS } = require("../controllers/sos.controller");

router.get("/", getSOS);

module.exports = router;
