import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import { HeaderLeftLinks } from './HeaderLeftLinks';
import { HeaderLinks } from './HeaderLinks';
import { MobileMenu } from './MobileMenu';

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
      `}</Style>

      <header class="app-header">
        <div class="header-container">
          <div class="header-toolbar">
            {/* Mobile Menu Button */}
            <MobileMenu />

            {/* Logo */}
            <div class="header-logo">
              <a href={process.env.WEBSITE_URL || 'https://www.propertygenie.com.my'}>
                <img src={logoUrl} alt="Property Genie" />
              </a>
            </div>

            {/* Navigation Menu - Desktop */}
            <HeaderLeftLinks />

            {/* Action Buttons - Desktop */}
            <HeaderLinks />
          </div>
        </div>
      </header>
    </>
  );
};
