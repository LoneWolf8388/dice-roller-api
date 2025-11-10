const path = require("path");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

/**
 * CORS: allow your static site to call this API.
 * For the API-test page (same origin), CORS isn't needed,
 * but for your separate Static Web App, set ALLOWED_ORIGIN.
 */
const allowedOrigin = process.env.ALLOWED_ORIGIN; // e.g. https://<your-static-site>.azurestaticapps.net
if (allowedOrigin) {
  app.use(cors({ origin: allowedOrigin }));
}

// Simple health endpoint
app.get("/api/ping", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

/**
 * Main API: roll dice.
 * Usage: GET /api/roll?faces=6&count=5
 */
app.get("/api/roll", (req, res) => {
  const faces = Math.max(2, parseInt(req.query.faces || "6", 10));
  const count = Math.max(1, parseInt(req.query.count || "1", 10));
  const rolls = Array.from(
    { length: count },
    () => 1 + Math.floor(Math.random() * faces)
  );
  res.json({ faces, count, rolls });
});

/**
 * Same logic but WITHOUT CORS headers to demonstrate a failure
 * when called from a *different origin* (your static site).
 * (Same-origin calls from this App Service page will still work.)
 */
app.get("/api/roll-no-cors", (req, res) => {
  const faces = Math.max(2, parseInt(req.query.faces || "6", 10));
  const count = Math.max(1, parseInt(req.query.count || "1", 10));
  const rolls = Array.from(
    { length: count },
    () => 1 + Math.floor(Math.random() * faces)
  );
  // intentionally do NOT call res.set(...) for CORS here
  res.json({ faces, count, rolls });
});

// Serve the tiny API test page (not the real UI)
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Dice API listening on port ${PORT}`);
});
