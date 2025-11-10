// server.js
const express = require('express');
const cors = require('cors');

const app = express();

// 👉 Put your exact SWA URL here (or set env var STATIC_UI_ORIGIN)
const STATIC_UI_ORIGIN =
  process.env.STATIC_UI_ORIGIN ||
  'https://yellow-island-0b294151e.3.azurestaticapps.net';

// CORS middleware for allowed origin (SWA)
// Note: we attach this only to /api (not to /api/roll-no-cors)
const corsOk = cors({
  origin: [STATIC_UI_ORIGIN],
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

// Simple root to confirm the app is up
app.get('/', (_req, res) => {
  res.type('text/plain').send('Dice Roller API is running');
});

// ❌ Intentionally NO CORS here — used to show a failure from SWA
app.get('/api/roll-no-cors', (_req, res) => {
  res.json({
    note:
      'This endpoint has no CORS—requests from your Static Web App should fail (by design for the assignment).',
  });
});

// ✅ CORS for the rest of /api
app.use('/api', corsOk);
app.options('/api/*', corsOk);

// Health check
app.get('/api/ping', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Dice roll
app.get('/api/roll', (req, res) => {
  const faces = Math.max(2, Math.min(1000, Number(req.query.faces) || 6));
  const count = Math.max(1, Math.min(100, Number(req.query.count) || 1));
  const rolls = Array.from({ length: count }, () => 1 + Math.floor(Math.random() * faces));
  const total = rolls.reduce((a, b) => a + b, 0);

  res.json({ faces, count, rolls, total });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Dice API listening on port ${port}`);
  console.log(`Allowing CORS from: ${STATIC_UI_ORIGIN}`);
});
