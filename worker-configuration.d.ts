// Type definitions for Cloudflare Workers environment variables
// This augments the Cloudflare.Env interface from @cloudflare/workers-types
declare namespace Cloudflare {
  interface Env {
    // Environment variables from wrangler.jsonc
    API_BASE_URL: string;
    USE_DOMAIN_ROUTING: string;
    WEBSITE_URL: string;

    // KV Namespace bindings
    DOMAIN_MAPPING: KVNamespace;

    // Assets binding
    ASSETS: Fetcher;
  }
}
