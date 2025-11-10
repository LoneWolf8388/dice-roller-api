const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// allow your static site to call this API (we'll lock this down after deploy)
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

// health check / wake-up
app.get("/api/ping", (_, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// /api/roll?count=3&faces=6  ->  { faces, count, rolls:[...] }
app.get("/api/roll", (req, res) => {
  const faces = Math.max(2, parseInt(req.query.faces || "6", 10));
  const count = Math.max(1, Math.min(100, parseInt(req.query.count || "1", 10)));
  const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * faces));
  res.json({ faces, count, rolls });
});

// intentionally no CORS: browser should block this
app.get("/api/roll-no-cors", (_, res) => {
  const faces = 6;
  const rolls = [1 + Math.floor(Math.random() * faces)];
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ faces, count: 1, rolls }));
});

app.listen(PORT, () => {
  console.log(`Dice API listening on port ${PORT}`);
});

