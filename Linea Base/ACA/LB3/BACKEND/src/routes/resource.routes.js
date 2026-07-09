const express = require("express");
const router = express.Router();

const {
  getResources,
  addFavorite,
  removeFavorite,
} = require("../controllers/resource.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

router.get("/", verifyToken, getResources);
router.post("/:id/favorito", verifyToken, addFavorite);
router.delete("/:id/favorito", verifyToken, removeFavorite);

module.exports = router;
