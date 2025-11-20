import { Hono } from 'hono';
import { domainLookup, type Bindings, type Variables } from './middleware/domainLookup';
import { AgentProfile } from './components/AgentProfile';
import type { AgentApiResponse } from './types/agent';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

// Apply domain lookup middleware to all routes
app.use('*', domainLookup);

/**
 * Shared handler for rendering agent profile
 */
async function renderAgentProfile(c: any, accountId: string, domain: string) {
  try {
    // Fetch agent profile from API
    const response = await fetch(`${c.env.API_BASE_URL}/v1/account/${accountId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch agent profile [${accountId}]: ${response.statusText}`);
    }

    const agent = await response.json() as AgentApiResponse;

    if (!agent || !agent.id) {
      return c.text('Agent not found', 404);
    }

    // Fetch common filter data
    let commonData = null;
    try {
      const commonResponse = await fetch(`${c.env.API_BASE_URL}/v1/common`);
      if (commonResponse.ok) {
        commonData = await commonResponse.json();
      }
    } catch (error) {
      console.error('Failed to fetch common data:', error);
    }

    // Render agent profile
    return c.html(<AgentProfile agent={agent} domain={domain} accountId={accountId} commonData={commonData} />);
  } catch (error) {
    console.error('Error fetching agent data:', error);
    return c.html(
      <html>
        <body>
          <h1>Error Loading Agent Profile</h1>
          <p>Unable to load agent data. Please try again later.</p>
          <p style="color: #666;">Domain: {domain} | Account ID: {accountId}</p>
        </body>
      </html>,
      500
    );
  }
}

/**
 * Unified route for both dev and production
 *
 * Dev/Staging: http://localhost:8787/test.app (or any domain)
 * Production: https://agent-domain.com/
 */
app.get('/*', async (c) => {
  const accountId = c.var.accountId;
  const domain = c.var.domain;

  // If no accountId from middleware, show instructions
  if (!accountId) {
    const useDomainRouting = c.env.USE_DOMAIN_ROUTING === 'true';

    return c.html(
      <html>
        <body style="padding: 2rem; max-width: 800px; margin: 0 auto;">
          <h1>Agent Profile Template</h1>
          <p>This worker is running in <strong>{useDomainRouting ? 'domain-based' : 'path-based'}</strong> mode.</p>

          {!useDomainRouting && (
            <>
              <p>To view an agent profile, visit: <code>/domain.com</code></p>
              <p>Example: <a href="/test.app">/test.app</a></p>
              <p>The middleware will lookup the domain and fetch the associated agent profile.</p>
            </>
          )}

          <hr />
          <h3>Configuration:</h3>
          <ul>
            <li>USE_DOMAIN_ROUTING: {c.env.USE_DOMAIN_ROUTING || 'false'}</li>
            <li>API_BASE_URL: {c.env.API_BASE_URL}</li>
          </ul>
        </body>
      </html>
    );
  }

  return renderAgentProfile(c, accountId, domain);
});

export default app;
