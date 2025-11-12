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
          position: relative;
        }

        .action-btn {
          padding: 0.5rem 1rem;
          background-color: #3462F4;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 0.875rem;
          font-weight: 400;
          text-decoration: none;
          cursor: pointer;
          transition: background-color 0.2s;
          display: inline-flex;
          align-items: center;
          font-family: 'Poppins', sans-serif;
          text-transform: uppercase;
        }

        .action-btn-agent {
          background-color: #ec8d02;
          color: #2c2c2c;
        }

        .auth-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background-color: #fff;
          border-radius: 4px;
          box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
          width: 125px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
          z-index: 1300;
        }

        .auth-popover.visible {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .auth-popover-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .auth-popover-item {
          cursor: pointer;
          padding: 0;
        }

        .auth-popover-item:first-of-type {
          border-bottom: 1px solid #f0f0f0;
        }

        .auth-popover-link {
          display: block;
          padding: 12px 16px;
          width: 100%;
          font-size: 0.9rem;
          color: #2c2c2c;
          text-decoration: none;
          transition: background-color 0.2s;
        }

        .auth-popover-link:hover {
          background-color: #f5f5f5;
        }

        @media (max-width: 1279px) {
          .header-actions {
            display: none;
          }
        }
      `}</Style>

      <div class="header-actions">
        <a href="https://agents.propertygenie.com.my" class="action-btn action-btn-agent" data-gtm-action="join_agent_intent_header">
          Join as Agent
        </a>
        <div style="position: relative;">
          <button
            class="action-btn signup-btn"
            data-gtm-action="sign_up_intent_header"
            type="button"
          >
            Sign Up
          </button>
          <div class="auth-popover signup-popover">
            <ul class="auth-popover-list">
              <li class="auth-popover-item">
                <a href={`${baseUrl}/agent-sign-up`} class="auth-popover-link" data-gtm-action="agent_sign_up_header">
                  Agent
                </a>
              </li>
              <li class="auth-popover-item">
                <a href={`${baseUrl}/sign-up-form`} class="auth-popover-link" data-gtm-action="customer_sign_up_header">
                  Customer
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div style="position: relative;">
          <button
            class="action-btn login-btn"
            data-gtm-action="login_intent_header"
            type="button"
          >
            Login
          </button>
          <div class="auth-popover login-popover">
            <ul class="auth-popover-list">
              <li class="auth-popover-item">
                <a href="https://agents.propertygenie.com.my/login" class="auth-popover-link" data-gtm-action="agent_login_header">
                  Agent
                </a>
              </li>
              <li class="auth-popover-item">
                <a href={`${baseUrl}/login`} class="auth-popover-link" data-gtm-action="customer_login_header">
                  Customer
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        (function() {
          // Add click handlers for popover toggles
          const signupBtn = document.querySelector('.signup-btn');
          const loginBtn = document.querySelector('.login-btn');
          const signupPopover = document.querySelector('.signup-popover');
          const loginPopover = document.querySelector('.login-popover');

          function closeAllPopovers() {
            if (signupPopover) signupPopover.classList.remove('visible');
            if (loginPopover) loginPopover.classList.remove('visible');
          }

          if (signupBtn && signupPopover) {
            signupBtn.addEventListener('click', function(e) {
              e.stopPropagation();
              const isVisible = signupPopover.classList.contains('visible');
              closeAllPopovers();
              if (!isVisible) {
                signupPopover.classList.add('visible');
              }
            });
          }

          if (loginBtn && loginPopover) {
            loginBtn.addEventListener('click', function(e) {
              e.stopPropagation();
              const isVisible = loginPopover.classList.contains('visible');
              closeAllPopovers();
              if (!isVisible) {
                loginPopover.classList.add('visible');
              }
            });
          }

          // Close popovers when clicking outside
          document.addEventListener('click', function(e) {
            if (!e.target.closest('.signup-btn') && !e.target.closest('.signup-popover') &&
                !e.target.closest('.login-btn') && !e.target.closest('.login-popover')) {
              closeAllPopovers();
            }
          });
        })();
      `}} />
    </>
  );
};
