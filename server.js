const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

// Allow your static site later; "*" while testing
const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
app.use(cors({ origin: allowedOrigin }));

// Serve / with the tester page
app.use(express.static("public"));

// Health
app.get("/api/ping", (_req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// Dice API
app.get("/api/roll", (req, res) => {
  const faces = Number(req.query.faces ?? 6);
  const count = Number(req.query.count ?? 5);
  const rolls = Array.from(
    { length: count },
    () => 1 + Math.floor(Math.random() * faces)
  );
  res.json({ faces, count, rolls });
});

// No-CORS endpoint to demonstrate failure from static site
app.get("/api/roll-no-cors", (req, res) => {
  const faces = Number(req.query.faces ?? 6);
  const count = Number(req.query.count ?? 5);
  const rolls = Array.from(
    { length: count },
    () => 1 + Math.floor(Math.random() * faces)
  );
  // intentionally no cors() here
  res.json({ faces, count, rolls });
});

app.listen(PORT, () => console.log(`Dice API listening on ${PORT}`));
