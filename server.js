const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// allow static site to call this API (set ALLOWED_ORIGIN in Azure later)
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

// serve a tiny test page ONLY to exercise APIs (this is NOT the real UI)
app.use(express.static("public"));

app.get("/api/ping", (_, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

app.get("/api/roll", (req, res) => {
  const faces = Math.max(2, parseInt(req.query.faces || "6", 10));
  const count = Math.max(1, parseInt(req.query.count || "5", 10));
  const rolls = Array.from(
    { length: count },
    () => 1 + Math.floor(Math.random() * faces)
  );
  res.json({ faces, count, rolls });
});

// SAME logic but we will call it from the static site to DEMO CORS failure later
app.get("/api/roll-no-cors", (req, res) => {
  const faces = Math.max(2, parseInt(req.query.faces || "6", 10));
  const count = Math.max(1, parseInt(req.query.count || "5", 10));
  const rolls = Array.from(
    { length: count },
    () => 1 + Math.floor(Math.random() * faces)
  );
  res.json({ faces, count, rolls, note: "intended for CORS demo" });
});

app.listen(PORT, () => console.log(`Dice API listening on ${PORT}`));
