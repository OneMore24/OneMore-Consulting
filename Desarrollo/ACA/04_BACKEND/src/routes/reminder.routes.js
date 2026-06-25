const express = require("express");
const router = express.Router();

const {
  createReminder,
  getReminders,
  updateReminder,
  deleteReminder,
} = require("../controllers/reminder.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/", verifyToken, createReminder);
router.get("/", verifyToken, getReminders);
router.put("/:id", verifyToken, updateReminder);
router.delete("/:id", verifyToken, deleteReminder);

module.exports = router;
