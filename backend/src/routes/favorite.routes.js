const express = require("express");
const {
  toggleFavorite,
  getFavorites,
} = require("../controllers/favorite.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", auth, toggleFavorite);
router.get("/", auth, getFavorites);

module.exports = router;
