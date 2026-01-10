require("dotenv").config();
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const Place = require("../models/Place.model");

const results = [];

const filePath = path.join(
  __dirname,
  "../seed/Expanded_Indian_Travel_Dataset.csv"
);

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    await Place.deleteMany(); // optional reset

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        results.push({
          name: row["Destination Name"],
          state: row["State"],
          region: row["Region"],
          category: [row["Category"]],
          shortDescription: row["Popular Attraction"],
          accessibility: row["Accessibility"],
          howToReach: {
            air: row["Nearest Airport"],
            rail: row["Nearest Railway Station"],
          },
          images: [
            "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
          ], // placeholder
          isTopPlace: false,
        });
      })
      .on("end", async () => {
        await Place.insertMany(results);
        console.log(`🎉 Seeded ${results.length} places`);
        process.exit();
      });
  } catch (err) {
    console.error("Seeding failed", err);
    process.exit(1);
  }
};

seedDB();
