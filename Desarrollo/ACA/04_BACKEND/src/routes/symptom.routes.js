const express = require("express");
const router = express.Router();

const {
  getCatalog,
  registerCrisis,
  getCrises,
} = require("../controllers/symptom.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/catalog", verifyToken, getCatalog);
router.post("/", verifyToken, registerCrisis);
router.get("/", verifyToken, getCrises);

module.exports = router;
