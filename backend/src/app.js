const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/ai.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const placeRoutes = require("./routes/place.routes");
const indibotRoutes = require("./routes/indibot.routes");
const favoriteRoutes = require("./routes/favorite.routes");





const app = express();


app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
  })
);
// app.options("*", cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/indibot", indibotRoutes);
app.use("/api/favorites", favoriteRoutes);


module.exports = app;
