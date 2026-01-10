const Place = require("../models/Place.model");
const { generateItinerary } = require("../services/ai.service");

// NOTE: generateItinerary now works as "AI reasoning"
const indibotSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    // Ask AI to extract filters
    const aiPrompt = `
User is searching for tourism places in India.

User query:
"${query}"

Extract and return ONLY JSON in this format:
{
  "category": "",
  "state": "",
  "city": "",
  "keywords": []
}

If something is not mentioned, return empty string or empty array.
`;

    const aiResponse = await generateItinerary(aiPrompt);

    let filters;
    try {
      filters = JSON.parse(aiResponse);
    } catch {
      filters = {};
    }

    const dbQuery = {};

    if (filters.category) {
      dbQuery.category = filters.category;
    }

    if (filters.state) {
      dbQuery.state = filters.state;
    }

    if (filters.city) {
      dbQuery.city = filters.city;
    }

    if (filters.keywords?.length) {
      dbQuery.tags = { $in: filters.keywords };
    }

    const places = await Place.find(dbQuery).limit(6).select(
      "name city state shortDescription images"
    );

    res.json({
      query,
      extractedFilters: filters,
      results: places,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "IndiBot failed" });
  }
};

module.exports = { indibotSearch };
