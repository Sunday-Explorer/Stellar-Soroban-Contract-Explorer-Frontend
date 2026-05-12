# Soroban Contract Explorer — Frontend

React frontend for the Soroban Contract Explorer. Consumes the [backend API](https://github.com/Sunday-Explorer/Stellar-Soroban-Contract-Explorer) and renders decoded contract state, events, and function invocations.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Contract search — enter a contract ID |
| `/contract/:contractId` | Contract detail — info + invocations |
| `/contract/:contractId/state` | Decoded storage state |
| `/contract/:contractId/events` | Decoded event log |

---

## Getting Started

### Prerequisites

- Node.js 20+
- The [backend](https://github.com/Sunday-Explorer/Stellar-Soroban-Contract-Explorer) running on `http://localhost:3001`

### Install and run

```bash
npm install
npm run dev
```

App is available at `http://localhost:3000`. API calls are proxied to `http://localhost:3001`.

---

## Project Structure

```
src/
├── lib/
│   └── api.ts          # Typed fetch client for the backend API
├── pages/
│   ├── ContractSearch.tsx
│   ├── ContractDetail.tsx
│   ├── EventLog.tsx
│   └── StateViewer.tsx
├── types.ts            # Response types — mirrors backend/src/types.ts
└── main.tsx            # App entry point and routing
```

---

## Contributing

See [CONTRIBUTING.md](https://github.com/Sunday-Explorer/Stellar-Soroban-Contract-Explorer/blob/main/CONTRIBUTING.md) in the backend repo for the full contributor guide.

Issues are in the backend repo: [open issues](https://github.com/Sunday-Explorer/Stellar-Soroban-Contract-Explorer/issues)

---

## Tech Stack

- React 18
- Vite
- TypeScript (strict mode)
- React Router v6

## License

MIT
