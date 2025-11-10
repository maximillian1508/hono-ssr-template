import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import { env } from 'cloudflare:workers';

/**
 * HeaderLeftLinks Component
 * Navigation menu with dropdown menus for Buy, Rent, Projects, Resources, Others
 */
export const HeaderLeftLinks: FC = () => {
  const baseUrl = env.WEBSITE_URL || 'https://www.propertygenie.com.my';

  return (
    <>
      <Style>{css`
        .nav-list {
          display: flex;
          align-items: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.5rem;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.6rem 1rem;
          font-weight: 600;
          font-size: 1em;
          color: #2c2c2c;
          text-decoration: none;
          border-radius: 3px;
          transition: all 150ms ease;
          cursor: pointer;
        }

        .nav-link:hover,
        .nav-link:focus {
          background: rgba(200, 200, 200, 0.2);
        }

        .nav-link.active {
          color: #6366f1;
        }

        .dropdown-icon {
          font-size: 1.2rem;
          transition: transform 0.3s ease;
        }

        .nav-item:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        /* Dropdown Container */
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: white;
          min-width: 700px;
          box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
          z-index: 1;
          top: 100%;
          left: 0;
          border-radius: 8px;
          padding: 1.25rem;
          animation: fadeIn 0.2s ease;
        }

        .dropdown-content.small {
          min-width: 250px;
        }

        .dropdown-content.medium {
          min-width: 500px;
        }

        .nav-item:hover .dropdown-content {
          display: block;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Dropdown Grid */
        .dropdown-grid {
          display: grid;
          gap: 1.25rem;
        }

        .dropdown-grid.cols-1 {
          grid-template-columns: 1fr;
        }

        .dropdown-grid.cols-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .dropdown-grid.cols-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        /* Dropdown Column */
        .dropdown-column {
          display: flex;
          flex-direction: column;
        }

        .column-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: #333;
          border-bottom: 2px solid #f0f0f0;
          padding-bottom: 0.5rem;
        }

        .dropdown-link {
          padding: 0.5rem;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.85rem;
          color: #333;
          transition: color 0.2s ease;
        }

        .dropdown-link:hover {
          color: #6366f1;
          background-color: #f0f0f0;
        }

        .dropdown-link.primary {
          color: #6366f1;
          font-weight: 500;
        }

        @media (max-width: 1279px) {
          .nav-list {
            display: none;
          }
        }
      `}</Style>

      <nav>
        <ul class="nav-list">
          {/* Buy Dropdown */}
          <li class="nav-item">
            <span class="nav-link">
              Buy
              <span class="dropdown-icon">▼</span>
            </span>
            <div class="dropdown-content">
              <div class="dropdown-grid cols-3">
                <div class="dropdown-column">
                  <p class="column-title">Directories</p>
                  <a href={`${baseUrl}/for-auction/all`} class="dropdown-link" data-gtm-action="for_auction_list_header">
                    Browse Auction Listings
                  </a>
                  <a href={`${baseUrl}/for-sale/all`} class="dropdown-link" data-gtm-action="for_sale_list_header">
                    Browse by List View
                  </a>
                  <a href={`${baseUrl}/property-for-sale`} class="dropdown-link" data-gtm-action="for_sale_map_header">
                    Browse by Map View
                  </a>
                  <a href={`${baseUrl}/project-listing`} class="dropdown-link">
                    Browse New Projects
                  </a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Popular Locations</p>
                  <a href={`${baseUrl}/for-sale/all/state-kuala-lumpur`} class="dropdown-link">Kuala Lumpur</a>
                  <a href={`${baseUrl}/for-sale/all/in-johor-bahru-state-johor`} class="dropdown-link">Johor Bahru</a>
                  <a href={`${baseUrl}/for-sale/all/state-penang`} class="dropdown-link">Penang</a>
                  <a href={`${baseUrl}/for-sale/all/state-selangor`} class="dropdown-link">Selangor</a>
                  <a href={`${baseUrl}/for-sale/all/in-klang-state-selangor`} class="dropdown-link">Klang</a>
                  <a href={`${baseUrl}/for-sale/all/in-shah-alam-state-selangor`} class="dropdown-link">Shah Alam</a>
                  <a href={`${baseUrl}/for-sale/all`} class="dropdown-link primary">View All Locations</a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Property Types</p>
                  <a href={`${baseUrl}/for-sale/condominium`} class="dropdown-link">Condominium</a>
                  <a href={`${baseUrl}/for-sale/1-storey-terrace`} class="dropdown-link">Terrace House</a>
                  <a href={`${baseUrl}/for-sale/bungalow`} class="dropdown-link">Bungalow</a>
                  <a href={`${baseUrl}/for-sale/apartment-condo-service-residence`} class="dropdown-link">Apartment</a>
                  <a href={`${baseUrl}/for-sale/studio-unit`} class="dropdown-link">Studio</a>
                  <a href={`${baseUrl}/for-sale/2-storey-semi-detached`} class="dropdown-link">Semi-D</a>
                  <a href={`${baseUrl}/for-sale/all`} class="dropdown-link primary">View All Property Types</a>
                </div>
              </div>
            </div>
          </li>

          {/* Rent Dropdown */}
          <li class="nav-item">
            <span class="nav-link">
              Rent
              <span class="dropdown-icon">▼</span>
            </span>
            <div class="dropdown-content">
              <div class="dropdown-grid cols-3">
                <div class="dropdown-column">
                  <p class="column-title">Directories</p>
                  <a href={`${baseUrl}/for-rent/all`} class="dropdown-link" data-gtm-action="for_rent_list_header">
                    Browse by List View
                  </a>
                  <a href={`${baseUrl}/property-for-rent`} class="dropdown-link" data-gtm-action="for_rent_map_header">
                    Browse by Map View
                  </a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Popular Locations</p>
                  <a href={`${baseUrl}/for-rent/all/state-kuala-lumpur`} class="dropdown-link">Kuala Lumpur</a>
                  <a href={`${baseUrl}/for-rent/all/in-johor-bahru-state-johor`} class="dropdown-link">Johor Bahru</a>
                  <a href={`${baseUrl}/for-rent/all/state-penang`} class="dropdown-link">Penang</a>
                  <a href={`${baseUrl}/for-rent/all/state-selangor`} class="dropdown-link">Selangor</a>
                  <a href={`${baseUrl}/for-rent/all/in-klang-state-selangor`} class="dropdown-link">Klang</a>
                  <a href={`${baseUrl}/for-rent/all/in-shah-alam-state-selangor`} class="dropdown-link">Shah Alam</a>
                  <a href={`${baseUrl}/for-rent/all`} class="dropdown-link primary">View All Locations</a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Property Types</p>
                  <a href={`${baseUrl}/for-rent/condominium`} class="dropdown-link">Condominium</a>
                  <a href={`${baseUrl}/for-rent/1-storey-terrace`} class="dropdown-link">Terrace House</a>
                  <a href={`${baseUrl}/for-rent/bungalow`} class="dropdown-link">Bungalow</a>
                  <a href={`${baseUrl}/for-rent/apartment-condo-service-residence`} class="dropdown-link">Apartment</a>
                  <a href={`${baseUrl}/for-rent/studio-unit`} class="dropdown-link">Studio</a>
                  <a href={`${baseUrl}/for-rent/2-storey-semi-detached`} class="dropdown-link">Semi-D</a>
                  <a href={`${baseUrl}/for-rent/all`} class="dropdown-link primary">View All Property Types</a>
                </div>
              </div>
            </div>
          </li>

          {/* Projects Dropdown */}
          <li class="nav-item">
            <span class="nav-link">
              Projects
              <span class="dropdown-icon">▼</span>
            </span>
            <div class="dropdown-content medium">
              <div class="dropdown-grid cols-2">
                <div class="dropdown-column">
                  <p class="column-title">Directories</p>
                  <a href={`${baseUrl}/looking-for-developer`} class="dropdown-link" data-gtm-action="browse_developers_header">
                    Browse Developers
                  </a>
                  <a href={`${baseUrl}/project-listing`} class="dropdown-link" data-gtm-action="project_listing_map_header">
                    Browse by Map View
                  </a>
                  <a href={`${baseUrl}/project-listing`} class="dropdown-link" data-gtm-action="browse_new_projects_header">
                    Browse New Projects
                  </a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Popular Locations</p>
                  <a href={`${baseUrl}/project-listing/kuala-lumpur`} class="dropdown-link">Kuala Lumpur</a>
                  <a href={`${baseUrl}/project-listing/johor/johor-bahru`} class="dropdown-link">Johor Bahru</a>
                  <a href={`${baseUrl}/project-listing/penang`} class="dropdown-link">Penang</a>
                  <a href={`${baseUrl}/project-listing/selangor`} class="dropdown-link">Selangor</a>
                  <a href={`${baseUrl}/project-listing/selangor/klang`} class="dropdown-link">Klang</a>
                  <a href={`${baseUrl}/project-listing/selangor/shah-alam`} class="dropdown-link">Shah Alam</a>
                  <a href={`${baseUrl}/project-listing`} class="dropdown-link primary">View All Locations</a>
                </div>
              </div>
            </div>
          </li>

          {/* Resources Dropdown */}
          <li class="nav-item">
            <span class="nav-link">
              Resources
              <span class="dropdown-icon">▼</span>
            </span>
            <div class="dropdown-content">
              <div class="dropdown-grid cols-3">
                <div class="dropdown-column">
                  <p class="column-title">Location Insights</p>
                  <a href={`${baseUrl}/location/kuala-lumpur`} class="dropdown-link">Kuala Lumpur Insights</a>
                  <a href={`${baseUrl}/location/johor`} class="dropdown-link">Johor Insights</a>
                  <a href={`${baseUrl}/location/selangor`} class="dropdown-link">Selangor Insights</a>
                  <a href={`${baseUrl}/location/penang`} class="dropdown-link">Penang Insights</a>
                  <a href={`${baseUrl}/location/melaka`} class="dropdown-link">Melaka Insights</a>
                  <a href={`${baseUrl}/location/negeri-sembilan`} class="dropdown-link">Negeri Sembilan Insights</a>
                  <a href={`${baseUrl}/location`} class="dropdown-link primary">View More Locations</a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Property Guides</p>
                  <a href={`${baseUrl}/insider-guide/guide-to-malaysia-property-auction-and-lelong`} class="dropdown-link">
                    Lelong Guides
                  </a>
                  <a href={`${baseUrl}/insider-guide`} class="dropdown-link primary">View More Guides</a>
                </div>
                <div class="dropdown-column">
                  <p class="column-title">Property Price Insights</p>
                  <a href={`${baseUrl}/transaction-and-statistics/residential/wp-kuala-lumpur`} class="dropdown-link">
                    Kuala Lumpur Past Property Prices
                  </a>
                  <a href={`${baseUrl}/transaction-and-statistics/residential/johor`} class="dropdown-link">
                    Johor Past Property Prices
                  </a>
                  <a href={`${baseUrl}/transaction-and-statistics/residential/pulau-pinang/seberang-perai-utara/bandar-butterworth`} class="dropdown-link">
                    Butterworth Past Property Prices
                  </a>
                  <a href={`${baseUrl}/transaction-and-statistics/residential/johor/batu-pahat`} class="dropdown-link">
                    Batu Pahat Past Property Prices
                  </a>
                  <a href={`${baseUrl}/transaction-and-statistics/residential/selangor/klang`} class="dropdown-link">
                    Klang Past Property Prices
                  </a>
                  <a href={`${baseUrl}/transaction-and-statistics/residential/pulau-pinang`} class="dropdown-link">
                    Penang Past Property Prices
                  </a>
                  <a href={`${baseUrl}/transaction-and-statistics`} class="dropdown-link primary">View More Transactions</a>
                </div>
              </div>
            </div>
          </li>

          {/* Others Dropdown */}
          <li class="nav-item">
            <span class="nav-link">
              Others
              <span class="dropdown-icon">▼</span>
            </span>
            <div class="dropdown-content small">
              <div class="dropdown-grid cols-1">
                <div class="dropdown-column">
                  <p class="column-title">Directories</p>
                  <a href={`${baseUrl}/looking-for-agent`} class="dropdown-link">Agent Directory</a>
                  <a href={`${baseUrl}/looking-for-developer`} class="dropdown-link">Developer Directory</a>
                  <a href={`${baseUrl}/home-affordability-cards`} class="dropdown-link">Home Affordability</a>
                  <a href={`${baseUrl}/2025`} class="dropdown-link">2025 Malaysia Real Estate Hub</a>
                  <a href={`${baseUrl}/career`} class="dropdown-link">Careers</a>
                </div>
              </div>
            </div>
          </li>

          {/* Contact Us (no dropdown) */}
          <li class="nav-item">
            <a href={`${baseUrl}/contact-us`} class="nav-link">
              Contact Us
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};
