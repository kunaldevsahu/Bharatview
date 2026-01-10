require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Place = require("../models/Place.model");

const WIKI_SUMMARY = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const WIKI_SEARCH = "https://en.wikipedia.org/w/api.php";

// ✅ REQUIRED BY WIKIPEDIA
const wikiAxios = axios.create({
  headers: {
    "User-Agent":
      "BharatView/1.0 (https://bharatview.local; contact@bharatview.dev)",
    Accept: "application/json",
  },
  timeout: 10000,
});

// Clean place names
const cleanPlaceName = (name) => {
  return name
    .replace(/ and .*/i, "")
    .replace(/ caves/i, "")
    .replace(/ national park/i, "")
    .trim();
};

// Delay to respect robot policy
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const trySummary = async (title) => {
  try {
    const res = await wikiAxios.get(
      WIKI_SUMMARY + encodeURIComponent(title)
    );
    return res.data?.extract ? res.data : null;
  } catch {
    return null;
  }
};

const searchWikipedia = async (query) => {
  try {
    const res = await wikiAxios.get(WIKI_SEARCH, {
      params: {
        action: "query",
        list: "search",
        srsearch: query,
        format: "json",
      },
    });
    return res.data.query.search[0]?.title || null;
  } catch {
    return null;
  }
};

const enrichWikipedia = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    const places = await Place.find();

    for (const place of places) {
      if (place.fullDescription && place.fullDescription.length > 200)
        continue;

      const originalName = place.name;
      const cleanedName = cleanPlaceName(place.name);

      let summary = null;

      // 1️⃣ Exact attempt
      summary = await trySummary(`${originalName}, India`);

      // 2️⃣ Cleaned name
      if (!summary) {
        summary = await trySummary(`${cleanedName}, India`);
      }

      // 3️⃣ Search fallback
      if (!summary) {
        const title = await searchWikipedia(`${cleanedName} India`);
        if (title) {
          summary = await trySummary(title);
        }
      }

      if (!summary) {
        console.log(`⚠️ Wiki failed for ${place.name}`);
        continue;
      }

      place.fullDescription = summary.extract;
      place.history =
        summary.extract.split(". ").slice(0, 4).join(". ") + ".";

      await place.save();
      console.log(`📚 Enriched ${place.name}`);

      // ⏳ polite delay (VERY IMPORTANT)
      await sleep(1200);
    }

    console.log("🎉 Wikipedia enrichment complete");
    process.exit();
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

enrichWikipedia();
