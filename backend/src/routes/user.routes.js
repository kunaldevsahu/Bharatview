const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const User = require("../models/User.model");

const router = express.Router();

// Protected route
router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

module.exports = router;
