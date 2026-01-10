const User = require("../models/User.model");

// Toggle favorite
const toggleFavorite = async (req, res) => {
  const userId = req.user.id;
  const { placeId } = req.body;

  const user = await User.findById(userId);

  const exists = user.favorites.includes(placeId);

  if (exists) {
    user.favorites = user.favorites.filter(
      (id) => id.toString() !== placeId
    );
  } else {
    user.favorites.push(placeId);
  }

  await user.save();

  res.json({ favorites: user.favorites });
};

// Get favorites
const getFavorites = async (req, res) => {
  const user = await User.findById(req.user.id).populate("favorites");
  res.json(user.favorites);
};

module.exports = { toggleFavorite, getFavorites };
