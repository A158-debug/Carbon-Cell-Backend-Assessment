const express = require("express");
const router = express.Router();

const { fetchEntries } = require("../controllers/entries");

router.get("/", fetchEntries);

module.exports = router;