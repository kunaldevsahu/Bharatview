require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Place = require("../models/Place.model");

// Required by OpenStreetMap
const geoAxios = axios.create({
  headers: {
    "User-Agent":
      "BharatView/1.0 (https://bharatview.local; contact@bharatview.dev)",
    Accept: "application/json",
  },
  timeout: 10000,
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Normalize problematic names
const normalizeName = (name) => {
  return name
    .replace(/ and .*/i, "") // Ajanta and Ellora → Ajanta
    .replace(/ caves/i, "")
    .replace(/ national park/i, "")
    .replace(/ hill station/i, "")
    .trim();
};

const fetchLatLng = async (query) => {
  try {
    const res = await geoAxios.get(
      "https://nominatim.openstreetmap.org/search",
      {
        params: {
          q: query,
          format: "json",
          limit: 1,
        },
      }
    );

    if (!res.data || res.data.length === 0) return null;

    return {
      lat: parseFloat(res.data[0].lat),
      lng: parseFloat(res.data[0].lon),
    };
  } catch {
    return null;
  }
};

const enrichGeo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const places = await Place.find();

    for (const place of places) {
      if (place.location?.lat && place.location?.lng) continue;

      const original = place.name;
      const normalized = normalizeName(place.name);

      let coords = null;

      // 1️⃣ Try original name
      coords = await fetchLatLng(
        `${original}, ${place.state}, India`
      );

      // 2️⃣ Try normalized name
      if (!coords) {
        coords = await fetchLatLng(
          `${normalized}, ${place.state}, India`
        );
      }

      if (!coords) {
        console.log(`⚠️ Geo failed for ${place.name}`);
        continue;
      }

      place.location = coords;
      await place.save();

      console.log(
        `📍 ${place.name} → ${coords.lat}, ${coords.lng}`
      );

      // Respect rate limit
      await sleep(1200);
    }

    console.log("🎉 Geo enrichment complete");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

enrichGeo();
