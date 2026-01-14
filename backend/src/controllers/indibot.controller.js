const Place = require("../models/Place.model");
const { generateAIResponse } = require("../services/ai.service");

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

    const aiResponse = await generateAIResponse(aiPrompt);

    let filters;
    if (typeof aiResponse === 'object') {
      filters = aiResponse;
    } else {
      try {
        filters = JSON.parse(aiResponse);
      } catch (e) {
        console.error("Failed to parse filters from AI string:", aiResponse);
        filters = {};
      }
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

    let places = await Place.find(dbQuery).limit(6).select(
      "name city state shortDescription images category"
    );

    // AI Fallback Logic: If no DB results, get AI suggestions
    let aiFallback = false;
    if (places.length === 0) {
      aiFallback = true;
      const fallbackPrompt = `
You are IndiBot, an expert on Indian Tourism. 
The user is looking for: "${query}"
We don't have exact matches in our curated database for these filters: ${JSON.stringify(filters)}.

Provide 2-3 specific, high-quality travel recommendations for India that match the user's intent.
Format the response as a JSON array of objects with these keys:
- _id: (random unique string)
- name: Name of the place
- city: City
- state: State
- shortDescription: A 1-2 sentence description
- images: ["https://images.unsplash.com/photo-(suitable-id)?auto=format&fit=crop&w=800"] (provide a real-looking Unsplash URL if possible, or leave as placeholder)
- category: ["Nature"] (or other relevant categories)

Return ONLY the JSON array.
`;
      try {
        const fallbackResults = await generateAIResponse(fallbackPrompt);
        if (Array.isArray(fallbackResults)) {
          places = fallbackResults;
        } else if (typeof fallbackResults === 'string') {
          try {
            places = JSON.parse(fallbackResults.replace(/```json|```/g, ""));
          } catch (e) {
            console.error("Failed to parse fallback JSON:", e);
          }
        }
      } catch (err) {
        console.error("AI Fallback Error:", err);
      }
    }

    res.json({
      query,
      extractedFilters: filters,
      results: places,
      aiFallback,
      message: aiFallback 
        ? `I couldn't find exact matches in my curated database, but here are some brilliant suggestions for you:` 
        : `I've analyzed your request for "${query}". Here are some curated recommendations that match your interest:`
    });
  } catch (err) {
    console.error("IndiBot Controller Error:", err);
    res.status(500).json({ 
      error: "IndiBot failed",
      details: err.message,
      stack: err.stack
    });
  }
};

module.exports = { indibotSearch };
