require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Place = require("../models/Place.model");

// ✅ Required by OpenStreetMap
const geoAxios = axios.create({
  headers: {
    "User-Agent":
      "BharatView/1.0 (https://bharatview.local; contact@bharatview.dev)",
    Accept: "application/json",
  },
  timeout: 10000,
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const fetchLatLng = async (query) => {
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
};

const enrichGeo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const places = await Place.find();

    for (const place of places) {
      // Skip if already has coordinates
      if (place.location?.lat && place.location?.lng) continue;

      const query = `${place.name}, ${place.state}, India`;

      try {
        const coords = await fetchLatLng(query);

        if (!coords) {
          console.log(`⚠️ Geo failed for ${place.name}`);
          continue;
        }

        place.location = coords;
        await place.save();

        console.log(
          `📍 ${place.name} → ${coords.lat}, ${coords.lng}`
        );

        // ⏳ REQUIRED delay
        await sleep(1200);
      } catch {
        console.log(`❌ Error for ${place.name}`);
      }
    }

    console.log("🎉 Geo enrichment complete");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

enrichGeo();
