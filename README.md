# app-bun

Monorepo with two workspace packages:

- packages/server: Express API (Bun + TypeScript)
- packages/client: React app (Vite + TypeScript)

## Install

Run once from the repository root:

```bash
bun install
```

## Run from root

Start server:

```bash
bun run server
```

Start server in watch mode:

```bash
bun run dev
```

Start client (Vite dev server):

```bash
bun run client
```

Build client:

```bash
bun run client:build
```

Preview client build:

```bash
bun run client:preview
```
