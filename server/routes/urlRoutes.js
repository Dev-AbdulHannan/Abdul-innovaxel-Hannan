const express = require("express");
const Url = require("../models/Url");
const router = express.Router();
const shortid = require("shortid");

// Create Short URL
router.post("/shorten", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  const shortCode = shortid.generate();
  const newUrl = new Url({ url, shortCode });

  await newUrl.save();
  res.status(201).json(newUrl);
});

// Retrieve Original URL
router.get("/:shortCode", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });
  if (!url) return res.status(404).json({ error: "URL not found" });

  url.accessCount += 1;
  await url.save();
  res.redirect(url.url);
});

router.put("/shorten/:shortCode", async (req, res) => {
  const { url } = req.body;
  const { shortCode } = req.params;

  if (!url) return res.status(400).json({ error: "URL is required" });

  const updatedUrl = await Url.findOneAndUpdate(
    { shortCode },
    { url, updatedAt: new Date() },
    { new: true }
  );

  if (!updatedUrl)
    return res.status(404).json({ error: "Short URL not found" });

  res.status(200).json(updatedUrl);
});

module.exports = router;
