const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    name: String,
    city: String,
    state: String,

    shortDescription: String,
    fullDescription: String,

    category: [String],

    images: [String],

    isTopPlace: Boolean,

    travelInfo: {
      budget: String,
    },

    location: {
      lat: Number,
      lng: Number,
    },

    history: String,

    howToReach: {
      road: String,
      rail: String,
      air: String,
    },

    nearbyAttractions: [String],
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);
