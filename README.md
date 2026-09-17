# Veridian IT Support Agent

A small internal IT-support prototype for the Veridian Corp Assignment 2 data pack.

The app takes employee requests, matches them against the supplied knowledge base,
checks the current ticket state, and returns a practical next action. It deliberately
does not invent approval rules when the supplied data does not define them.

## Stack

- Backend: Node.js, Express, TypeScript
- Architecture: MVC + service layer
- Frontend: React, TypeScript, Vite
- Styling: plain CSS
- Data: local TypeScript data files (no external database required)

## Project structure

```text
backend/
  src/
    controllers/
    models/
    routes/
    services/
    data/
    app.ts
    server.ts

frontend/
  src/
    components/
    pages/
    services/
    types/
    App.tsx
    main.tsx
```

The backend follows:

**Route → Controller → Service → Model/Data**

The `VeridianSupportAgent`, `PolicyEngine`, `TicketService`, `RequestService`,
and domain models are intentionally connected so that the names describe the
actual work they perform.

## Run locally

### Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:4000`.

### Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend normally runs on `http://localhost:5173`.

## What to try

1. Open the Agent page.
2. Try:
   - `My VPN credentials expired`
   - `I need guest Wi-Fi tomorrow`
   - `I received a phishing email`
   - `Give me admin access to the finance reporting server`
   - `hey can you help, its not working`
3. Open Requests to inspect REQ-01 through REQ-15.
4. Open Tickets to inspect the supplied ticket history.
5. Open Knowledge Base to see the exact source policies used by the agent.

## Data handling

Only the policies, requests and ticket records supplied in the assignment are
included. The prototype treats the provided material as its source of truth.
Where a policy is missing or an input is ambiguous, it asks for clarification
or routes the case for human review instead of making up a company rule.
