import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface HeaderProps {
  logoUrl?: string;
}

/**
 * Header Component
 * Main navigation header for public pages (logged out state only)
 */
export const Header: FC<HeaderProps> = ({ logoUrl = '/images/Logo/pg-logo-main-r.png' }) => {
  return (
    <>
      <Style>{css`
        .app-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background-color: white;
          border-bottom: 1px solid #dddddd;
          color: #2c2c2c;
        }

        .header-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .header-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 54px;
          height: 73px;
        }

        .header-logo {
          display: flex;
          align-items: center;
          height: 54px;
        }

        .header-logo a {
          display: flex;
          align-items: center;
          height: 54px;
        }

        .header-logo img {
          height: 54px;
          width: auto;
          object-fit: contain;
        }

        .header-nav {
          display: flex;
          align-items: center;
          gap: 2rem;
          flex: 1;
          margin: 0 2rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        @media (max-width: 1279px) {
          .header-nav {
            display: none;
          }

          .header-actions {
            display: none;
          }
        }
      `}</Style>

      <header class="app-header">
        <div class="header-container">
          <div class="header-toolbar">
            {/* Logo */}
            <div class="header-logo">
              <a href={process.env.WEBSITE_URL || 'https://www.propertygenie.com.my'}>
                <img src={logoUrl} alt="Property Genie" />
              </a>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav class="header-nav">
              {/* TODO: Add HeaderLeftLinks navigation here */}
              <a href="/property-for-sale" style="color: #2c2c2c; text-decoration: none; font-weight: 600;">Buy</a>
              <a href="/property-for-rent" style="color: #2c2c2c; text-decoration: none; font-weight: 600;">Rent</a>
              <a href="/project-listing" style="color: #2c2c2c; text-decoration: none; font-weight: 600;">Projects</a>
              <a href="/contact-us" style="color: #2c2c2c; text-decoration: none; font-weight: 600;">Contact Us</a>
            </nav>

            {/* Action Buttons - Desktop */}
            <div class="header-actions">
              {/* TODO: Add HeaderLinks buttons here */}
              <a
                href="/agent-sign-up"
                style="background-color: #6366f1; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: 600;"
              >
                Sign Up
              </a>
              <a
                href="/login"
                style="background-color: #6366f1; color: white; padding: 0.5rem 1rem; border-radius: 4px; text-decoration: none; font-weight: 600;"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
