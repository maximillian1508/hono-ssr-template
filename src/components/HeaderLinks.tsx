import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import { env } from 'cloudflare:workers';

/**
 * HeaderLinks Component
 * Sign Up and Login buttons for logged-out users
 */
export const HeaderLinks: FC = () => {
  const baseUrl = env.WEBSITE_URL || 'https://www.propertygenie.com.my';

  return (
    <>
      <Style>{css`
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          background-color: #6366f1;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s;
          display: inline-flex;
          align-items: center;
          font-family: 'Poppins', sans-serif;
        }

        .action-btn:hover {
          background-color: #5558eb;
        }

        @media (max-width: 1279px) {
          .header-actions {
            display: none;
          }
        }
      `}</Style>

      <div class="header-actions">
        <a href={`${baseUrl}/agent-sign-up`} class="action-btn" data-gtm-action="sign_up_intent_header">
          Sign Up
        </a>
        <a href={`${baseUrl}/login`} class="action-btn" data-gtm-action="login_intent_header">
          Login
        </a>
      </div>
    </>
  );
};
