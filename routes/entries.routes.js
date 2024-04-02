const express = require("express");
const router = express.Router();

const { fetchEntries } = require("../controllers/entries");
const { verifyToken } = require("../middlewares/auth");

router.get("/", verifyToken, fetchEntries);

module.exports = router;