const express = require("express");
const router = express.Router();

const {
  registerEmotion,
  getEmotions,
} = require("../controllers/emotion.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, registerEmotion);
router.get("/", verifyToken, getEmotions);

module.exports = router;
