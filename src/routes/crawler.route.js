const express = require("express");
const { getReviewData } = require("../controllers/crwaler.controller");
const router = express.Router();

router.get("/crawl", getReviewData);

module.exports = router;
