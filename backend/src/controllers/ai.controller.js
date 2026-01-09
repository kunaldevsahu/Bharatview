const { generateItinerary } = require("../services/ai.service");

const aiPlanner = async (req, res) => {
  try {
    const { prompt } = req.body;

    const itinerary = await generateItinerary(prompt);

    res.json({
      success: true,
      data: itinerary
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: "AI failed to generate itinerary"
    });
  }
};

module.exports = { aiPlanner };
