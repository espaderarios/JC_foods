const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Simple API endpoints
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend' });
});

// In-memory datastore (replace with DB in production)
const soldCounts = {};
const locations = [];

// Record an order and increment sold counts
app.post('/api/order', (req, res) => {
  const { itemId, qty, deliveryPoint } = req.body || {};
  if (!itemId) return res.status(400).json({ error: 'itemId required' });
  const q = Number(qty) || 1;
  soldCounts[itemId] = (soldCounts[itemId] || 0) + q;
  return res.json({ message: 'order recorded', itemId, qty: q, deliveryPoint: deliveryPoint || null });
});

// Get most sold item
app.get('/api/most-sold', (req, res) => {
  const entries = Object.entries(soldCounts);
  if (entries.length === 0) return res.json({ mostSold: null });
  entries.sort((a,b)=>b[1]-a[1]);
  return res.json({ mostSold: { itemId: entries[0][0], count: entries[0][1] } });
});

// Add a location (example: lat/lng or address)
app.post('/api/location', (req, res) => {
  const { lat, lng, address } = req.body || {};
  if (!lat && !address) return res.status(400).json({ error: 'lat/lng or address required' });
  const entry = { id: locations.length+1, lat, lng, address, createdAt: new Date().toISOString() };
  locations.push(entry);
  return res.json({ ok: true, entry });
});

app.get('/api/locations', (req, res) => {
  return res.json(locations);
});

// Stub for Facebook messaging integration
app.post('/api/facebook-message', (req, res) => {
  const { to, message } = req.body || {};
  console.log('FB message stub', { to, message });
  return res.json({ ok: true, info: 'facebook messaging is stubbed on server' });
});

// Optional: serve docs folder at root for quick preview when running server
app.use('/', express.static(path.join(__dirname, '..', 'docs')));

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
