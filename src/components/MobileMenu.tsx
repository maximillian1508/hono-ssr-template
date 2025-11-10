import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import { env } from 'cloudflare:workers';

/**
 * MobileMenu Component
 * Hamburger menu and drawer navigation for mobile devices with dropdown menus
 */
export const MobileMenu: FC = () => {
  const baseUrl = env.WEBSITE_URL || 'https://www.propertygenie.com.my';

  return (
    <>
      <Style>{css`
        /* Hamburger Button */
        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: #2c2c2c;
        }

        .mobile-menu-button svg {
          width: 24px;
          height: 24px;
        }

        @media (max-width: 1279px) {
          .mobile-menu-button {
            display: block;
          }
        }

        /* Drawer Overlay */
        .mobile-drawer-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9998;
          animation: fadeIn 0.3s ease;
        }

        .mobile-drawer-overlay.active {
          display: block;
        }

        /* Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          right: -100vw;
          width: 100vw;
          height: 100vh;
          background-color: #3462F4;
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
          z-index: 9999;
          overflow-y: auto;
          transition: right 0.3s ease;
        }

        .mobile-drawer.active {
          right: 0;
        }

        /* Drawer Header */
        .drawer-header {
          display: flex;
          align-items: center;
          height: 73px;
          padding: 0 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .drawer-close {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          color: white;
          margin-right: auto;
        }

        .drawer-close svg {
          width: 28px;
          height: 28px;
        }

        .drawer-logo {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        .drawer-logo img {
          height: 54px;
          width: auto;
        }

        .drawer-spacer {
          width: 40px;
        }

        /* Drawer Content */
        .drawer-content {
          padding: 1rem;
        }

        .mobile-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .mobile-nav-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 1.5rem 0.6rem;
          color: white;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 600;
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: background 0.2s ease;
        }

        .mobile-nav-toggle:hover {
          background: rgba(200, 200, 200, 0.2);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 0.6rem;
          color: white;
          text-decoration: none;
          font-size: 1.25rem;
          font-weight: 600;
          transition: background 0.2s ease;
        }

        .mobile-nav-link:hover {
          background: rgba(200, 200, 200, 0.2);
        }

        .dropdown-arrow {
          width: 25px;
          height: 25px;
          transition: transform 0.3s ease;
        }

        .dropdown-arrow.active {
          transform: rotate(180deg);
        }

        .mobile-dropdown-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          background: rgba(0, 0, 0, 0.2);
        }

        .mobile-dropdown-content.active {
          max-height: 1000px;
        }

        .mobile-dropdown-link {
          display: block;
          padding: 1em 1.2em;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          transition: background 0.2s ease;
        }

        .mobile-dropdown-link:hover {
          background: rgba(200, 200, 200, 0.2);
        }

        /* Mobile Actions */
        .mobile-actions {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .mobile-action-btn {
          padding: 1rem;
          background-color: white;
          color: #3462F4;
          border: none;
          border-radius: 8px;
          font-size: 1.25rem;
          font-weight: 600;
          text-decoration: none;
          text-align: center;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .mobile-action-btn:hover {
          opacity: 0.9;
        }

        .mobile-action-btn.secondary {
          background-color: #f97316;
          color: #000;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</Style>

      {/* Hamburger Button */}
      <button class="mobile-menu-button" id="mobile-menu-button" aria-label="Open menu">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Drawer Overlay */}
      <div class="mobile-drawer-overlay" id="mobile-drawer-overlay"></div>

      {/* Drawer */}
      <div class="mobile-drawer" id="mobile-drawer">
        <div class="drawer-header">
          <button class="drawer-close" id="drawer-close" aria-label="Close menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div class="drawer-logo">
            <a href={baseUrl}>
              <img src="/images/Logo/pg-logo-white-r.png" alt="Property Genie" />
            </a>
          </div>
          <div class="drawer-spacer"></div>
        </div>

        <div class="drawer-content">
          <nav>
            <ul class="mobile-nav-list">
              {/* Buy Dropdown */}
              <li class="mobile-nav-item">
                <button class="mobile-nav-toggle" data-dropdown="buy">
                  <div>Buy</div>
                  <svg class="dropdown-arrow" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="white">
                    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                  </svg>
                </button>
                <div class="mobile-dropdown-content" data-dropdown-content="buy">
                  <a href={`${baseUrl}/for-auction/all`} class="mobile-dropdown-link" data-gtm-action="for_auction_list_header">
                    Browse Auction Listings
                  </a>
                  <a href={`${baseUrl}/for-sale/all`} class="mobile-dropdown-link" data-gtm-action="for_sale_list_header">
                    Browse by List View
                  </a>
                  <a href={`${baseUrl}/property-for-sale`} class="mobile-dropdown-link" data-gtm-action="for_sale_map_header">
                    Browse by Map View
                  </a>
                  <a href={`${baseUrl}/project-listing`} class="mobile-dropdown-link">
                    Browse New Projects
                  </a>
                </div>
              </li>

              {/* Rent Dropdown */}
              <li class="mobile-nav-item">
                <button class="mobile-nav-toggle" data-dropdown="rent">
                  <div>Rent</div>
                  <svg class="dropdown-arrow" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="white">
                    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                  </svg>
                </button>
                <div class="mobile-dropdown-content" data-dropdown-content="rent">
                  <a href={`${baseUrl}/for-rent/all`} class="mobile-dropdown-link" data-gtm-action="for_rent_list_header">
                    Browse by List View
                  </a>
                  <a href={`${baseUrl}/property-for-rent`} class="mobile-dropdown-link" data-gtm-action="for_rent_map_header">
                    Browse by Map View
                  </a>
                </div>
              </li>

              {/* Projects Dropdown */}
              <li class="mobile-nav-item">
                <button class="mobile-nav-toggle" data-dropdown="projects">
                  <div>Projects</div>
                  <svg class="dropdown-arrow" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="white">
                    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                  </svg>
                </button>
                <div class="mobile-dropdown-content" data-dropdown-content="projects">
                  <a href={`${baseUrl}/looking-for-developer`} class="mobile-dropdown-link" data-gtm-action="browse_developers_header">
                    Browse Developers
                  </a>
                  <a href={`${baseUrl}/project-listing`} class="mobile-dropdown-link" data-gtm-action="project_listing_map_header">
                    Browse by Map View
                  </a>
                  <a href={`${baseUrl}/project-listing`} class="mobile-dropdown-link" data-gtm-action="browse_new_projects_header">
                    Browse New Projects
                  </a>
                </div>
              </li>

              {/* Resources Dropdown */}
              <li class="mobile-nav-item">
                <button class="mobile-nav-toggle" data-dropdown="resources">
                  <div>Resources</div>
                  <svg class="dropdown-arrow" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="white">
                    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                  </svg>
                </button>
                <div class="mobile-dropdown-content" data-dropdown-content="resources">
                  <a href={`${baseUrl}/location`} class="mobile-dropdown-link">Location Insights</a>
                  <a href={`${baseUrl}/insider-guide`} class="mobile-dropdown-link">Property Guides</a>
                  <a href={`${baseUrl}/transaction-and-statistics`} class="mobile-dropdown-link">Property Price Insights</a>
                </div>
              </li>

              {/* Others Dropdown */}
              <li class="mobile-nav-item">
                <button class="mobile-nav-toggle" data-dropdown="others">
                  <div>Others</div>
                  <svg class="dropdown-arrow" focusable="false" aria-hidden="true" viewBox="0 0 24 24" fill="white">
                    <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>
                  </svg>
                </button>
                <div class="mobile-dropdown-content" data-dropdown-content="others">
                  <a href={`${baseUrl}/looking-for-agent`} class="mobile-dropdown-link">Agent Directory</a>
                  <a href={`${baseUrl}/looking-for-developer`} class="mobile-dropdown-link">Developer Directory</a>
                  <a href={`${baseUrl}/home-affordability-cards`} class="mobile-dropdown-link">Home Affordability</a>
                  <a href={`${baseUrl}/2025`} class="mobile-dropdown-link">2025 Malaysia Real Estate Hub</a>
                  <a href={`${baseUrl}/career`} class="mobile-dropdown-link">Careers</a>
                </div>
              </li>

              {/* Contact Us (no dropdown) */}
              <li class="mobile-nav-item">
                <a href={`${baseUrl}/contact-us`} class="mobile-nav-link">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div class="mobile-actions">
            <a href={`${baseUrl}/login`} class="mobile-action-btn">
              Login as User
            </a>
            <a href={`${baseUrl}/agent-sign-in`} class="mobile-action-btn secondary">
              Login as Agent
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu JavaScript */}
      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            const menuButton = document.getElementById('mobile-menu-button');
            const drawer = document.getElementById('mobile-drawer');
            const overlay = document.getElementById('mobile-drawer-overlay');
            const closeButton = document.getElementById('drawer-close');
            const dropdownToggles = document.querySelectorAll('.mobile-nav-toggle');

            function openDrawer() {
              drawer.classList.add('active');
              overlay.classList.add('active');
              document.body.style.overflow = 'hidden';
            }

            function closeDrawer() {
              drawer.classList.remove('active');
              overlay.classList.remove('active');
              document.body.style.overflow = '';
            }

            // Dropdown toggle functionality
            dropdownToggles.forEach(toggle => {
              toggle.addEventListener('click', function() {
                const dropdownName = this.getAttribute('data-dropdown');
                const content = document.querySelector(\`[data-dropdown-content="\${dropdownName}"]\`);
                const arrow = this.querySelector('.dropdown-arrow');

                // Toggle active state
                const isActive = content.classList.contains('active');

                // Close all other dropdowns
                document.querySelectorAll('.mobile-dropdown-content').forEach(dd => {
                  dd.classList.remove('active');
                });
                document.querySelectorAll('.dropdown-arrow').forEach(arr => {
                  arr.classList.remove('active');
                });

                // Toggle current dropdown
                if (!isActive) {
                  content.classList.add('active');
                  arrow.classList.add('active');
                }
              });
            });

            if (menuButton) {
              menuButton.addEventListener('click', openDrawer);
            }

            if (closeButton) {
              closeButton.addEventListener('click', closeDrawer);
            }

            if (overlay) {
              overlay.addEventListener('click', closeDrawer);
            }
          })();
        `
      }} />
    </>
  );
};
