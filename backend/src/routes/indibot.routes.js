const express = require("express");
const { indibotSearch } = require("../controllers/indibot.controller");

const router = express.Router();

router.post("/", indibotSearch);

module.exports = router;
