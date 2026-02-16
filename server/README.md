# Project Assistant API

## Setup

1. Install dependencies in `server/`.
2. Create `.env` in repo root with:

```bash
OPENAI_API_KEY=...
OPENAI_CHAT_MODEL=gpt-4.1-mini
OPENAI_EMBEDDING_MODEL=text-embedding-3-small
ALLOWED_ORIGINS=http://localhost:5173,https://ruthwikdovala.com
PORT=8787
```

## Build retrieval index

```bash
cd server
npm install
npm run build-index
```

This generates `server/data/index.json` from `llm-data/projects.json` and `llm-data/faq.json`.

## Run API

```bash
npm run dev
```

Health check:

```bash
GET /healthz
```

Chat endpoint:

```bash
POST /api/project-assistant/chat
```
