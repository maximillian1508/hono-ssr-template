# Agent Domain Template

Multi-tenant property agent website powered by Hono and Cloudflare Workers. Automatically resolves domains to agent accounts using KV cache.

## Features

- **Domain-based routing**: Each custom domain automatically routes to the correct agent
- **KV caching**: Fast domain lookups (1-5ms) with 24-hour cache
- **SSR with JSX**: Server-side rendering using Hono's JSX support
- **Agent API integration**: Fetches profiles and listings from Property Genie API

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create KV namespace

Create a KV namespace for domain caching:

```bash
wrangler kv:namespace create DOMAIN_MAPPING
```

Copy the namespace ID from the output.

### 3. Configure local development

Copy `.dev.vars.example` to `.dev.vars`:

```bash
cp .dev.vars.example .dev.vars
```

Update `.dev.vars` with your configuration:

```env
# KV Namespace ID
DOMAIN_MAPPING_ID=your-kv-namespace-id-here

# API Base URL (use localhost for development)
API_BASE_URL=http://localhost:22080

# Routing Mode (false = path-based for dev, true = domain-based for production)
USE_DOMAIN_ROUTING=false
```

**Note:** For production, these variables are set in `wrangler.jsonc` vars section.

### 4. Update wrangler.jsonc

Replace `preview_id` in `wrangler.jsonc` with your actual KV namespace ID:

```jsonc
{
  "kv_namespaces": [
    {
      "binding": "DOMAIN_MAPPING",
      "id": "your-production-kv-id",
      "preview_id": "your-preview-kv-id"
    }
  ]
}
```

## Development

Start the development server:

```bash
npm run dev
```

### Routing Modes

The worker supports two routing modes for domain lookup:

#### 1. Path-based domain lookup (Dev/Staging - `USE_DOMAIN_ROUTING=false`)

Use the domain as the first path segment. The middleware will extract the domain from the URL path and perform the lookup:

```
http://localhost:8787/test.app
http://localhost:8787/agent-domain.com
```

**How it works:**
1. Request: `http://localhost:8787/test.app`
2. Middleware extracts `test.app` as the domain
3. Looks up domain in KV cache or API
4. Fetches the associated `accountId`
5. Renders the agent profile

This allows you to test the full domain lookup flow locally without configuring custom domains.

#### 2. Hostname-based domain lookup (Production - `USE_DOMAIN_ROUTING=true`)

Each custom domain automatically routes to the correct agent:

```
https://agent-custom-domain.com/
```

**How it works:**
1. Request: `https://test.app/`
2. Middleware uses `test.app` from hostname
3. Looks up domain in KV cache or API
4. Fetches the associated `accountId`
5. Renders the agent profile

## Deployment

Deploy to Cloudflare Workers:

```bash
npm run deploy
```

## How it works

### Domain Lookup Flow

1. Request comes in with a custom domain (e.g., `agent123.propertygenie.com.my`)
2. Middleware checks KV cache for domain → accountId mapping
3. If cache miss, fetches from API and caches for 24 hours
4. Makes `accountId` available to all routes via `c.var`
5. Routes use `accountId` to fetch agent-specific data

### File Structure

```
src/
├── index.tsx              # Main app with routes
├── middleware/
│   └── domainLookup.ts    # Domain → accountId resolver
└── utils/
    └── agentApi.ts        # Agent API client functions
```

## Type Safety

For generating/synchronizing types based on your Worker configuration:

```bash
npm run cf-typegen
```

Types are automatically inferred from the Bindings and Variables defined in the middleware.
