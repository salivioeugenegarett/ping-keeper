const express = require("express");
const path = require("path");
const { pingSites, getStatus } = require("./pinger");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API for site status
app.get("/api/status", (req, res) => {
  res.json(getStatus());
});

// Start server
app.listen(PORT, () => {
  console.log(`🌍 Server running on port ${PORT}`);
  pingSites(); // Initial ping
  setInterval(pingSites, 5 * 60 * 1000); // Repeat every 5 mins
});
