# Architecture — Soroban Contract Explorer Frontend

## Overview

A React single-page application that consumes the Soroban Contract Explorer backend API and renders decoded contract data. It has no direct connection to the Stellar network — all blockchain interaction is handled by the backend.

```
User
  └── Browser (React SPA, port 3000)
        └── fetch /api/...
              └── NestJS backend (port 3001)
                    └── Stellar RPC / Horizon
```

In development, Vite proxies all `/api` requests to `http://localhost:3001`, so the frontend never deals with CORS.

---

## Repository Structure

```
.
├── index.html
├── vite.config.ts          # Dev server + /api proxy config
├── tsconfig.json
├── package.json
├── .github/
│   └── workflows/
│       └── ci.yml
└── src/
    ├── main.tsx             # App entry — mounts React, sets up Router
    ├── types.ts             # Response types — mirrors backend/src/types.ts
    ├── lib/
    │   └── api.ts           # Typed fetch client for all backend endpoints
    └── pages/
        ├── ContractSearch.tsx
        ├── ContractDetail.tsx
        ├── EventLog.tsx
        └── StateViewer.tsx
```

---

## Routing

React Router v6. All routes are client-side.

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `ContractSearch` | Search form — entry point |
| `/contract/:contractId` | `ContractDetail` | Contract info + invocations |
| `/contract/:contractId/state` | `StateViewer` | Decoded storage entries |
| `/contract/:contractId/events` | `EventLog` | Decoded event log |

---

## Data Flow

Every page follows the same pattern:

```
useEffect (on contractId change)
  └── api.getSomething(contractId)
        ├── success → setState(data) → render table/list
        └── error   → setError(message) → render error message
```

Loading state is set to `true` on mount and `false` in the `finally` block, regardless of success or failure.

---

## API Client

`src/lib/api.ts` — a thin typed wrapper around `fetch`. No external HTTP library.

```typescript
api.getContract(id)      → Promise<ContractInfo>
api.getInvocations(id)   → Promise<DecodedInvocation[]>
api.getEvents(id, start) → Promise<ContractEvent[]>
api.getState(id)         → Promise<ContractStateEntry[]>
```

All functions throw an `Error` with the HTTP status and response body on non-2xx responses. Pages catch this in their `useEffect` and display it.

---

## Types

`src/types.ts` mirrors `backend/src/types.ts` exactly. These are kept in sync manually — if the backend changes a response shape, the frontend types must be updated to match.

```typescript
ContractInfo          // contractId, wasmHash, ledger, createdAt
DecodedInvocation     // functionName, args, result, txHash, ledger, timestamp
ContractEvent         // id, contractId, topics[], data, ledger, timestamp, txHash
ContractStateEntry    // key, value, durability, lastModifiedLedger
```

---

## Pages

### ContractSearch

- Renders a search form
- Validates the contract ID client-side before navigating: must match `/^C[A-Z2-7]{55}$/`
- On valid input, navigates to `/contract/:contractId`

### ContractDetail

- Fetches `ContractInfo` and `DecodedInvocation[]` in parallel (`Promise.all`)
- Renders contract metadata (wasm hash, creation ledger) and an invocations table
- Links to `StateViewer` and `EventLog`

### StateViewer

- Fetches `ContractStateEntry[]`
- Renders a table with key, decoded value (as formatted JSON), durability, and last modified ledger

### EventLog

- Fetches `ContractEvent[]` from `startLedger=0` by default
- Renders a table with ledger, decoded topics, decoded data (as formatted JSON), and tx hash

---

## CI Pipeline

`.github/workflows/ci.yml` runs on every push and PR to `main`:

```
1. actions/checkout
2. actions/setup-node (Node 20)
3. npm install
4. tsc --noEmit     ← TypeScript strict mode check
5. npm run build    ← Vite production build
```

---

## Key Design Decisions

**No state management library.** Each page manages its own local state with `useState` and `useEffect`. The data model is simple enough that Redux/Zustand would be overkill.

**No CSS framework.** Keeps the dependency footprint small and gives contributors full control over styling. Plain CSS or CSS modules are the expected approach.

**Client-side contract ID validation.** Stellar contract IDs have a fixed format (`C` + 55 base32 chars). Validating before the API call avoids a round-trip for obviously invalid input.

**Types mirrored from backend.** Rather than a shared npm package (which adds build complexity), `src/types.ts` is a manual copy of `backend/src/types.ts`. Simple and explicit.

**Vite proxy for `/api`.** Avoids CORS configuration in development. In production, the frontend and backend should be deployed behind the same reverse proxy (e.g. nginx) or the backend should set `Access-Control-Allow-Origin` explicitly.
