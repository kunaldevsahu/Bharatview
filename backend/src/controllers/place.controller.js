const Place = require("../models/Place.model");

// GET /api/places
const getAllPlaces = async (req, res) => {
  const { category, search, top } = req.query;

  let query = {};

  if (category) query.category = category;
  if (top === "true") query.isTopPlace = true;

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  const places = await Place.find(query).select(
    "name city state shortDescription images category isTopPlace"
  );

  res.json(places);
};

// GET /api/places/:id
const getPlaceById = async (req, res) => {
  const place = await Place.findById(req.params.id);

  if (!place) {
    return res.status(404).json({ error: "Place not found" });
  }

  res.json(place);
};

module.exports = { getAllPlaces, getPlaceById };
