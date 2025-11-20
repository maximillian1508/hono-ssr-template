import { createMiddleware } from 'hono/factory';
import type { KVNamespace } from '@cloudflare/workers-types';

/**
 * Cloudflare bindings for the environment
 */
export type Bindings = {
  DOMAIN_MAPPING: KVNamespace;
  API_BASE_URL: string;
  USE_DOMAIN_ROUTING: string;
  WEBSITE_URL: string;
};

/**
 * Variables that will be available in context (c.var)
 */
export type Variables = {
  accountId: string;
  domain: string;
};

/**
 * Middleware to resolve domain → accountId
 * Runs on every request before rendering pages
 *
 * Mode 1 (Production - USE_DOMAIN_ROUTING=true):
 * - Domain comes from hostname (e.g., agent-domain.com)
 * - Lookup accountId from KV/API using hostname
 *
 * Mode 2 (Dev/Staging - USE_DOMAIN_ROUTING=false):
 * - Domain comes from query parameter (e.g., ?domain=test.app)
 * - Lookup accountId from KV/API using query param as domain
 */
export const domainLookup = createMiddleware<{ Bindings: Bindings; Variables: Variables }>(
  async (c, next) => {
    const useDomainRouting = c.env.USE_DOMAIN_ROUTING === 'true';
    const url = new URL(c.req.url);

    let hostname: string;

    if (useDomainRouting) {
      // Production: Use actual hostname
      hostname = url.hostname;
    } else {
      // Dev/Staging: Extract domain from query parameter
      const domainParam = url.searchParams.get('domain');

      if (!domainParam) {
        // No domain in query, skip lookup (will show instructions)
        await next();
        return;
      }

      hostname = domainParam;
    }

    // Try KV cache first (fast - 1-5ms)
    let accountId = await c.env.DOMAIN_MAPPING.get(hostname);

    if (!accountId) {
      // Cache miss - fetch from API (slower - 50-200ms)
      try {
        const response = await fetch(
          `${c.env.API_BASE_URL}/agent/infrastructure/account/domain?domain=${hostname}`
        );

        if (!response.ok) {
          console.error(`Domain not found: ${hostname}`);
          return c.text('Domain not configured', 404);
        }

        const data = await response.json() as { accountId: string };
        accountId = data.accountId;

        // Cache in KV for 24 hours
        await c.env.DOMAIN_MAPPING.put(hostname, accountId, {
          expirationTtl: 86400, // 24 hours
        });
      } catch (error) {
        console.error('Failed to lookup domain:', error);
        return c.text('Internal Server Error', 500);
      }
    }

    // Make accountId and domain available to all routes via c.var
    c.set('accountId', accountId);
    c.set('domain', hostname);

    await next();
  }
);
