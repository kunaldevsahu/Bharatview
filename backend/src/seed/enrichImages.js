require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Place = require("../models/Place.model");

const UNSPLASH_URL = "https://api.unsplash.com/search/photos";

const fetchImages = async (query) => {
  const res = await axios.get(UNSPLASH_URL, {
    params: {
      query,
      per_page: 3,
      orientation: "landscape",
    },
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
    },
  });

  return res.data.results.map((img) => img.urls.regular);
};

const enrichImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const places = await Place.find();

    for (const place of places) {
      // Skip if images already exist
      if (place.images && place.images.length > 1) continue;

      const searchQuery = `${place.name} ${place.state} India`;

      try {
        const images = await fetchImages(searchQuery);
        if (images.length) {
          place.images = images;
          await place.save();
          console.log(`🖼️ Updated images for ${place.name}`);
        }
      } catch (err) {
        console.log(`⚠️ Failed for ${place.name}`);
      }
    }

    console.log("🎉 Image enrichment complete");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
};

enrichImages();
