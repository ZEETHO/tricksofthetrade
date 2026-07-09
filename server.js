// server.js — lightweight backend for "Tricks of the Trade"
// Mirrors CHRONICLE's live-data proxy routes so API keys stay SERVER-SIDE
// (never exposed to the browser). Serves the static app + /api/quote + /api/macro.
//
// Setup:
//   1. cp .env.example .env   (then paste your free FINNHUB_API_KEY and FRED_API_KEY)
//   2. node server.js
//   3. open http://localhost:3000
//
// No npm install needed — uses only Node built-ins.

const http = require("http");
const fs = require("fs");
const path = require("path");

// --- tiny .env loader (no dependencies) ---
function loadEnv() {
  const file = path.join(__dirname, ".env");
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = __dirname;
const MIME = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".png": "image/png", ".svg": "image/svg+xml" };

function sendJSON(res, code, obj) {
  const body = JSON.stringify(obj);
  res.writeHead(code, { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" });
  res.end(body);
}

// GET /api/quote?symbols=AAPL,MSFT
async function quoteRoute(req, res, url) {
  const key = process.env.FINNHUB_API_KEY;
  if (!key) return sendJSON(res, 500, { error: "FINNHUB_API_KEY not set" });
  const symbols = (url.searchParams.get("symbols") || "").split(",").map(s => s.trim()).filter(Boolean);
  const out = {};
  await Promise.all(symbols.map(async (s) => {
    try {
      const r = await fetch(`https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(s)}&token=${key}`, { cache: "no-store" });
      const q = await r.json();
      out[s] = { c: q.c ?? null, dp: q.dp ?? null };
    } catch { out[s] = { c: null, dp: null }; }
  }));
  sendJSON(res, 200, out);
}

// GET /api/macro?series=VIXCLS,DGS10,T10Y2Y
async function macroRoute(req, res, url) {
  const key = process.env.FRED_API_KEY;
  if (!key) return sendJSON(res, 500, { error: "FRED_API_KEY not set" });
  const ids = (url.searchParams.get("series") || "").split(",").map(s => s.trim()).filter(Boolean);
  const out = {};
  await Promise.all(ids.map(async (id) => {
    try {
      const u = `https://api.stlouisfed.org/fred/series/observations?series_id=${encodeURIComponent(id)}&api_key=${key}&file_type=json&sort_order=desc&limit=1`;
      const r = await fetch(u, { cache: "no-store" });
      const j = await r.json();
      const v = j.observations?.[0]?.value;
      out[id] = v != null && v !== "." ? Number(v) : null;
    } catch { out[id] = null; }
  }));
  sendJSON(res, 200, out);
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/api/quote") return quoteRoute(req, res, url);
  if (url.pathname === "/api/macro") return macroRoute(req, res, url);

  // static file serving
  let p = url.pathname === "/" ? "/index.html" : url.pathname;
  const full = path.join(PUBLIC_DIR, path.normalize(p).replace(/^(\.\.[/\\])+/, ""));
  if (!full.startsWith(PUBLIC_DIR) || !fs.existsSync(full) || fs.statSync(full).isDirectory()) {
    res.writeHead(404); return res.end("Not found");
  }
  res.writeHead(200, { "Content-Type": MIME[path.extname(full)] || "application/octet-stream" });
  fs.createReadStream(full).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n  Tricks of the Trade (live) running:\n  http://localhost:${PORT}\n`);
  if (!process.env.FINNHUB_API_KEY) console.log("  ⚠️  FINNHUB_API_KEY not set — live quotes will be off (simulator still works).");
  if (!process.env.FRED_API_KEY) console.log("  ⚠️  FRED_API_KEY not set — macro ribbon will be off.\n");
});
