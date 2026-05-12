# Build Plan — Soroban Contract Explorer Frontend

## Goal

A clean, accessible web UI where anyone can search a Soroban contract ID and browse its decoded state, events, and function invocations — no raw XDR, no protocol knowledge required.

---

## Current Status

| Component | Status |
|-----------|--------|
| Project scaffold | ✅ Done |
| Routing (React Router) | ✅ Done |
| API client (`src/lib/api.ts`) | ✅ Done |
| `ContractSearch` page | ✅ Done (with client-side validation) |
| `ContractDetail` page | ✅ Done (skeleton — needs real invocations data) |
| `EventLog` page | ✅ Done (skeleton) |
| `StateViewer` page | ✅ Done (skeleton) |
| Styling | 🔧 Not started |
| Loading skeletons | 🔧 Not started |
| Error boundary | 🔧 Not started |
| Network switcher | 🔧 Not started |
| Search history | 🔧 Not started |
| Invocation argument drill-down | 🔧 Not started |
| Pagination (events) | 🔧 Not started |

---

## Phase 1 — Core UI Wiring

Pages are scaffolded. This phase makes them production-ready.

### 1.1 Styling

- [ ] Add a base stylesheet — layout, typography, table styles, code blocks
- [ ] Style the search form on `ContractSearch`
- [ ] Responsive layout for all pages (mobile + desktop)

No CSS framework required — plain CSS or CSS modules are fine.

### 1.2 Loading and Error States

- [ ] Replace `<p aria-busy="true">Loading…</p>` with a proper loading skeleton on each page
- [ ] Show a user-friendly error message when the API returns 404 (contract not found)
- [ ] Show a user-friendly error message when the API is unreachable
- [ ] Add a top-level error boundary to catch unexpected crashes

### 1.3 ContractDetail — Invocation Args Drill-Down

- [ ] Each row in the invocations table should be expandable
- [ ] Clicking a row reveals the full decoded `args` object as formatted JSON
- [ ] Collapse on second click

---

## Phase 2 — UX Improvements

### 2.1 Search History

- [ ] Store the last 5 searched contract IDs in `localStorage`
- [ ] Show them as quick-access links below the search form
- [ ] Allow clearing history

### 2.2 Network Switcher

- [ ] Add a toggle (testnet / mainnet) that updates the API base URL
- [ ] Persist the selected network in `localStorage`
- [ ] Show the active network clearly in the header

### 2.3 Pagination — Event Log

- [ ] Add "Load more" button on `EventLog` that fetches the next page using `startLedger`
- [ ] Disable the button when there are no more events

### 2.4 Copy to Clipboard

- [ ] Add copy button next to contract ID, tx hashes, and wasm hash
- [ ] Show a brief "Copied!" confirmation

---

## Phase 3 — Polish

**Trivial**
- Add a favicon
- Add `<meta>` description tags per page
- Improve empty state illustrations/messages

**Medium**
- Add a global header with the app name and network indicator
- Add a "share this contract" button that copies the current URL

**High**
- State diff view — compare storage entries between two ledger heights
- WASM function signature viewer (requires backend support)

---

## Implementation Order

```
1. Base styling                    ← makes everything presentable
2. Loading + error states          ← required for real usage
3. Invocation args drill-down      ← highest UX value on ContractDetail
4. Search history                  ← quality of life
5. Network switcher                ← needed for mainnet usage
6. Pagination on EventLog          ← depends on backend pagination support
7. Copy to clipboard               ← polish
```

---

## Definition of Done (MVP)

- All four pages render real data from the backend with no raw XDR visible
- Loading and error states are handled gracefully on every page
- The app is usable on mobile and desktop
- CI passes on every PR (type check + build)
