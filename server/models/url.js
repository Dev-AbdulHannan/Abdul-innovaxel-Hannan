const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  accessCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", UrlSchema);
