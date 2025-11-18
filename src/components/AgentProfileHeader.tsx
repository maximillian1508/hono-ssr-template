import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface AgentProfileHeaderProps {
  agentName: string;
}

/**
 * Agent Profile Header Component
 * Sticky header for agent profile with navigation to listing tabs
 */
export const AgentProfileHeader: FC<AgentProfileHeaderProps> = ({ agentName }) => {
  return (
    <>
      <Style>{css`
        .agent-profile-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: white;
          border-bottom: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
        }

        .agent-profile-header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .agent-profile-header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }

        .agent-profile-header-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #1f2937;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 400px;
        }

        .agent-profile-header-nav {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .agent-profile-header-nav-link {
          font-size: 1rem;
          font-weight: 500;
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem 0;
          position: relative;
          transition: color 0.2s;
        }

        .agent-profile-header-nav-link:hover {
          color: #3b82f6;
        }

        .agent-profile-header-nav-link.active {
          color: #3b82f6;
        }

        .agent-profile-header-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background-color: #3b82f6;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .agent-profile-header-name {
            font-size: 1rem;
            max-width: 150px;
          }

          .agent-profile-header-nav {
            gap: 1rem;
          }

          .agent-profile-header-nav-link {
            font-size: 0.875rem;
            padding: 0.25rem 0;
          }
        }

        @media (max-width: 480px) {
          .agent-profile-header-content {
            height: 56px;
          }

          .agent-profile-header-name {
            font-size: 0.875rem;
            max-width: 120px;
          }

          .agent-profile-header-nav {
            gap: 0.5rem;
          }

          .agent-profile-header-nav-link {
            font-size: 0.75rem;
          }
        }

        /* Add spacing to body to account for fixed header */
        body {
          padding-top: 64px;
        }

        @media (max-width: 480px) {
          body {
            padding-top: 56px;
          }
        }
      `}</Style>

      <header class="agent-profile-header">
        <div class="agent-profile-header-container">
          <div class="agent-profile-header-content">
            <h1 class="agent-profile-header-name">{agentName}</h1>

            <nav class="agent-profile-header-nav">
              <button
                class="agent-profile-header-nav-link"
                data-nav-tab="sale"
                id="header-nav-sale"
              >
                For Sale
              </button>
              <button
                class="agent-profile-header-nav-link"
                data-nav-tab="rent"
                id="header-nav-rent"
              >
                For Rent
              </button>
              <button
                class="agent-profile-header-nav-link"
                data-nav-tab="auction"
                id="header-nav-auction"
              >
                For Auction
              </button>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};
