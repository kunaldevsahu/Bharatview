const express = require("express");
const {
  getAllPlaces,
  getPlaceById,
} = require("../controllers/place.controller");

const router = express.Router();

router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);

module.exports = router;
