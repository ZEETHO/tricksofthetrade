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

**Option A — open it live (no download):**
👉 https://zeetho.github.io/tricksofthetrade/

**Option B — run the file offline:**
No install, no build, no server.

1. Download `index.html` (the app).
2. Double-click it (or open it in any web browser).

That's it. It works fully offline.

## Source

Built from the `dpt_bot` project: Ian Dunlap's 8/21 EMA mean-reversion setup,
a 20%-drawdown filter, the congressional-trade signal, and the edge-test /
walk-forward methodology that keeps the whole thing honest.

---

*Practice money only. Not financial advice. Real money only after paper
trading for weeks and seeing a genuine edge (z > 2 with 100+ real trades).*
