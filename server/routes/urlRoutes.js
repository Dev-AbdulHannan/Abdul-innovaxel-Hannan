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

// Update Short URL
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

// Delete Short URL (NEW)
router.delete("/shorten/:shortCode", async (req, res) => {
  const deletedUrl = await Url.findOneAndDelete({
    shortCode: req.params.shortCode,
  });

  if (!deletedUrl)
    return res.status(404).json({ error: "Short URL not found" });

  res.status(204).send();
});

// Get URL Statistics (NEW)
router.get("/shorten/:shortCode/stats", async (req, res) => {
  const url = await Url.findOne({ shortCode: req.params.shortCode });

  if (!url) return res.status(404).json({ error: "Short URL not found" });

  res.status(200).json({
    id: url._id,
    url: url.url,
    shortCode: url.shortCode,
    createdAt: url.createdAt,
    updatedAt: url.updatedAt,
    accessCount: url.accessCount,
  });
});

module.exports = router;
