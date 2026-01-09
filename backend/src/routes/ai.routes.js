const express = require("express");
const { aiPlanner } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/plan", aiPlanner);

module.exports = router;
