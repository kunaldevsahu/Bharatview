const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select model
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

const generateItinerary = async (prompt) => {
  const enhancedPrompt = `
You are IndiBot, an expert Indian travel planner.

User request:
${prompt}

Respond ONLY in valid JSON.
DO NOT include explanations or markdown.
DO NOT include extra text.

JSON FORMAT:
{
  "title": "",
  "days": [
    {
      "day": 1,
      "title": "",
      "activities": []
    }
  ],
  "bestSeason": "",
  "budgetEstimate": "",
  "foodRecommendations": [],
  "tips": []
}
`;

  const result = await model.generateContent(enhancedPrompt);

  // Gemini sometimes adds spaces/newlines – still valid JSON
  return JSON.parse(result.response.text());
};

module.exports = { generateItinerary };




