const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Select model
const model = genAI.getGenerativeModel({
  model: "gemini-flash-latest",
});

const generateAIResponse = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log("Raw Gemini Response:", responseText);

    const cleanedText = responseText.replace(/```json|```/g, "").trim();
    
    try {
      return JSON.parse(cleanedText);
    } catch (err) {
      console.error("AI Response not valid JSON. Cleaned Text:", cleanedText);
      return cleanedText; // Return string if parsing fails
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

module.exports = { generateAIResponse };




