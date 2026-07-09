# Trade Camp 🏕️

A fun, kid-friendly, **interactive** web app that teaches the fundamentals of
safe systematic trading — built from the research behind the `dpt_bot`
quantitative trading bot.

Everything here is **practice money only**. No real brokerage, no keys, no
accounts. It runs entirely in your browser.

## What's inside

| Section | What it teaches |
|---|---|
| 📚 **6 Lessons** | What a stock is, the 8/21 EMA reversal signal, stop-losses ("seatbelts"), the 1% risk rule, the honest edge test, and the traps (overfitting, win-rate chasing, the politician-signal lesson) |
| 🎮 **Trading Game** | A live animated price chart with real 8- and 21-day EMA lines. Buy/sell $100 of pretend money — it auto-sets a −3% stop-loss, ratchets to break-even at +12%, trails 5%, and takes profit at +20% (the bot's exact exit ladder) |
| 🧮 **Risk Calculator** | Position sizing using the bot's formula: `shares = (equity × 1%) ÷ (entry − stop)`, capped at 50% of equity per name |
| ❓ **7-Question Quiz** | Includes the real research numbers: edge-test z = 0.29, 27.6% win rate, $4.12 vs $1.07 average win/loss |
| 🛡️ **Golden Rules** | 8 printable safety rules distilled from the bot's honest backtest findings |
| ⭐ **Star system** | Earn 8 stars across lessons, quiz, and game; progress is saved in the browser |

## The honest part

Trade Camp teaches the truth, not a sales pitch: the bot's own backtest showed
a **+20.83% return with NO statistical edge over random** (edge-test z-score
0.29). That answer — "no edge" — is the most valuable lesson a new trader can
learn before risking real money.

## How to run

**Option A — open it live (no download, no keys):**
👉 https://zeetho.github.io/tricksofthetrade/
Runs the teaching app with the built-in simulator. No setup.

**Option B — run the file offline:**
No install, no build, no server. Just double-click `index.html`. Works fully offline.

**Option C — run the LIVE server (real-time quotes + macro ribbon):**
Mixes in CHRONICLE's live-data approach: a tiny Node server keeps your API keys
**server-side** (never exposed to the browser) and feeds a live market ribbon
(quotes + VIX / yields) into the app. The app still works with no keys — it
just shows "simulator only".

```bash
cd tricksofthetrade
cp .env.example .env        # paste your FREE Finnhub + FRED keys
node server.js              # no npm install needed — Node built-ins only
# open http://localhost:3000
```

| Key | Powers | Free? | Where |
|-----|--------|-------|-------|
| `FINNHUB_API_KEY` | Live equity/ETF quotes ribbon | ✅ free | https://finnhub.io/register |
| `FRED_API_KEY` | VIX, 10Y yield, 2s10s spread | ✅ free | https://fredaccount.stlouisfed.org/apikeys |

The server mirrors CHRONICLE's proxy routes (`/api/quote`, `/api/macro`) so keys
stay private. Without keys, the ribbon shows "off" and the simulator carries on.

> Note: the live server (Option C) is for local use. The GitHub Pages site
> (Option A) serves the static app only — it cannot run a server, so its ribbon
> stays in simulator mode. For a hosted live version you'd deploy the server
> (e.g. Render, Fly.io, Railway) with the keys as environment variables.

## Source

Built from the `dpt_bot` project: Ian Dunlap's 8/21 EMA mean-reversion setup,
a 20%-drawdown filter, the congressional-trade signal, and the edge-test /
walk-forward methodology that keeps the whole thing honest.

---

*Practice money only. Not financial advice. Real money only after paper
trading for weeks and seeing a genuine edge (z > 2 with 100+ real trades).*
