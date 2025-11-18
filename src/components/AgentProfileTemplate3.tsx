import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import type { AgentApiResponse } from '../types/agent';
import { getLicenseLabel, formatContactNumber } from '../types/agent';
import { Header } from './Header';
import { HeaderCompensation } from './HeaderCompensation';
import { AgentProfileHeader } from './AgentProfileHeader';
import { ShareModal } from './ShareModal';
import { FilterModal } from './FilterModal';
import { ContactModal } from './ContactModal';
import { AgentFooter } from './AgentFooter';
import { ListingCardStyles } from './ListingCardStyles';
import { ListingCard } from './ListingCard';

interface AgentProfileProps {
  agent: AgentApiResponse;
  domain: string;
  accountId: string;
  commonData: any;
}

/**
 * Agent Profile Component - Classic Traditional Template
 * Simple, text-focused layout with traditional styling
 */
export const AgentProfileTemplate3: FC<AgentProfileProps> = ({ agent, domain, accountId, commonData }) => {
  // Extract agent data
  const name = agent.name;
  const description = agent.description || '';

  // Get mobile phone contact
  const mobileContact = agent.contact?.items?.find(
    item => item.type?.code === 'mobile-phone'
  );
  const contactNumber = mobileContact?.value || '';
  const maskedContact = formatContactNumber(contactNumber);

  // Get email contact
  const emailContact = agent.contact?.items?.find(
    item => item.type?.code === 'email'
  );
  const email = emailContact?.value || '';

  const licenseNumber = agent.licenseNumber || '';
  const publisherName = agent.publisher?.name || '';
  const publisherRegistrationNumber = agent.publisher?.registrationNumber || '';

  const avatarUrl = agent.image?.medium?.src || '/images/amenties-placeholder.png';

  const isRenVerified = agent._metadata?.isRenVerified || false;
  const isMobileVerified = agent._metadata?.isMobileVerified || false;

  // SEO Data
  const pageTitle = `${name} - ${publisherName} | Property Agent`;
  const pageDescription = description
    ? `${name} from ${publisherName}. ${description.substring(0, 150)}${description.length > 150 ? '...' : ''}`
    : `Professional property agent ${name} from ${publisherName}. Specializing in property sales and rentals.`;
  const pageUrl = `https://${domain}`;
  const imageUrl = avatarUrl.startsWith('http') ? avatarUrl : `https://${domain}${avatarUrl}`;

  // Active listing counts
  const activeSaleListingCount = agent._metadata?.activeSaleListingCount || 0;
  const activeRentListingCount = agent._metadata?.activeRentListingCount || 0;
  const activeAuctionListingCount = agent._metadata?.activeAuctionListingCount || 0;
  const activeListingCount = agent._metadata?.activeListingCount || 0;

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Primary Meta Tags */}
        <title>{pageTitle}</title>
        <meta name="title" content={pageTitle} />
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

        <Style>{css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Roboto', Arial, sans-serif;
            line-height: 1.8;
            color: #333;
            background: #fff;
          }

          .classic-container {
            max-width: 960px;
            margin: 0 auto;
            padding: 80px 20px 20px;
          }

          .classic-header {
            border-bottom: 3px solid #2c5aa0;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }

          .classic-profile-card {
            background: #f5f5f5;
            padding: 30px;
            border: 1px solid #ddd;
            margin-bottom: 30px;
          }

          .classic-profile-content {
            display: grid;
            grid-template-columns: 180px 1fr;
            gap: 30px;
          }

          .classic-avatar-wrapper {
            text-align: center;
          }

          .classic-avatar {
            width: 180px;
            height: 180px;
            border: 4px solid #2c5aa0;
            display: block;
          }

          .classic-agent-details {
            flex: 1;
          }

          .classic-agent-name {
            font-size: 28px;
            font-weight: 700;
            color: #2c5aa0;
            margin-bottom: 10px;
          }

          .classic-agent-company {
            font-size: 16px;
            color: #666;
            margin-bottom: 15px;
          }

          .classic-info-table {
            width: 100%;
            margin: 20px 0;
            border-collapse: collapse;
          }

          .classic-info-table td {
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
          }

          .classic-info-table td:first-child {
            font-weight: 600;
            width: 150px;
            color: #555;
          }

          .classic-info-table td:last-child {
            color: #333;
          }

          .classic-verified-badge {
            display: inline-block;
            background: #28a745;
            color: white;
            padding: 2px 8px;
            border-radius: 3px;
            font-size: 12px;
            margin-left: 8px;
          }

          .classic-contact-section {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 2px solid #ddd;
          }

          .classic-btn {
            display: inline-block;
            padding: 10px 24px;
            margin-right: 10px;
            background: #2c5aa0;
            color: white;
            border: none;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            text-decoration: none;
          }

          .classic-btn:hover {
            background: #1e3d6f;
          }

          .classic-btn-secondary {
            background: white;
            color: #2c5aa0;
            border: 2px solid #2c5aa0;
          }

          .classic-btn-secondary:hover {
            background: #f0f0f0;
          }

          .classic-stats-section {
            background: white;
            border: 2px solid #2c5aa0;
            padding: 20px;
            margin-bottom: 30px;
          }

          .classic-stats-title {
            font-size: 18px;
            font-weight: 700;
            color: #2c5aa0;
            margin-bottom: 15px;
            text-transform: uppercase;
          }

          .classic-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
          }

          .classic-stat-box {
            background: #f9f9f9;
            padding: 15px;
            border-left: 4px solid #2c5aa0;
          }

          .classic-stat-label {
            font-size: 13px;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .classic-stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #2c5aa0;
            margin-top: 5px;
          }

          .classic-description-section {
            background: #fafafa;
            padding: 25px;
            border-left: 4px solid #2c5aa0;
            margin-bottom: 30px;
          }

          .classic-description-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 15px;
            color: #2c5aa0;
          }

          .classic-description-text {
            line-height: 1.8;
            color: #444;
          }

          .classic-listings-section {
            border-top: 3px solid #2c5aa0;
            padding-top: 30px;
          }

          .classic-section-heading {
            font-size: 24px;
            font-weight: 700;
            color: #2c5aa0;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .classic-filter-bar {
            background: #f5f5f5;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #ddd;
          }

          .classic-filter-row {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            align-items: center;
          }

          .classic-filter-label {
            font-weight: 600;
            color: #555;
          }

          .classic-tab-link {
            display: inline-block;
            padding: 8px 20px;
            background: white;
            border: 1px solid #ddd;
            color: #555;
            text-decoration: none;
            cursor: pointer;
            font-weight: 500;
          }

          .classic-tab-link.active {
            background: #2c5aa0;
            color: white;
            border-color: #2c5aa0;
          }

          .classic-search-input {
            padding: 10px;
            border: 1px solid #ddd;
            flex: 1;
            min-width: 250px;
          }

          .classic-filter-button {
            padding: 10px 20px;
            background: white;
            border: 1px solid #ddd;
            cursor: pointer;
            font-weight: 500;
          }

          .classic-filter-button:hover {
            background: #f0f0f0;
          }

          @media (max-width: 768px) {
            .classic-container {
              padding: 64px 15px 15px;
            }

            .classic-profile-content {
              grid-template-columns: 1fr;
              text-align: center;
            }

            .classic-avatar {
              margin: 0 auto;
            }

            .classic-info-table td:first-child {
              width: 120px;
            }

            .classic-filter-row {
              flex-direction: column;
              align-items: stretch;
            }

            .classic-search-input {
              width: 100%;
            }

            .classic-btn {
              width: 100%;
              margin: 5px 0;
            }
          }
        `}</Style>
      </head>
      <body>
        <Header domain={domain} accountId={accountId} />
        <HeaderCompensation />

        <div class="classic-container">
          {/* Page Header */}
          <div class="classic-header">
            <h1 class="classic-agent-name">{name}</h1>
            <div class="classic-agent-company">{publisherName}</div>
          </div>

          {/* Profile Card */}
          <div class="classic-profile-card">
            <div class="classic-profile-content">
              <div class="classic-avatar-wrapper">
                <img src={avatarUrl} alt={name} class="classic-avatar" />
              </div>

              <div class="classic-agent-details">
                <table class="classic-info-table">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{name}</td>
                    </tr>
                    <tr>
                      <td>Agency:</td>
                      <td>{publisherName}</td>
                    </tr>
                    {licenseNumber && (
                      <tr>
                        <td>License:</td>
                        <td>
                          {getLicenseLabel(licenseNumber, true)}
                          {isRenVerified && <span class="classic-verified-badge">Verified</span>}
                        </td>
                      </tr>
                    )}
                    {publisherRegistrationNumber && (
                      <tr>
                        <td>Registration:</td>
                        <td>{publisherRegistrationNumber}</td>
                      </tr>
                    )}
                    <tr>
                      <td>Contact:</td>
                      <td>
                        {maskedContact}
                        {isMobileVerified && <span class="classic-verified-badge">Verified</span>}
                      </td>
                    </tr>
                    {email && (
                      <tr>
                        <td>Email:</td>
                        <td>{email}</td>
                      </tr>
                    )}
                  </tbody>
                </table>

                <div class="classic-contact-section">
                  <button class="classic-btn" onclick="window.openContactModal('whatsapp')">
                    Contact via WhatsApp
                  </button>
                  <button class="classic-btn classic-btn-secondary" onclick="window.openContactModal('call')">
                    Call Now
                  </button>
                  <button class="classic-btn classic-btn-secondary" onclick="window.openShareModal()">
                    Share Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div class="classic-stats-section">
            <div class="classic-stats-title">Property Portfolio</div>
            <div class="classic-stats-grid">
              <div class="classic-stat-box">
                <div class="classic-stat-label">Total Listings</div>
                <div class="classic-stat-value">{activeListingCount}</div>
              </div>
              <div class="classic-stat-box">
                <div class="classic-stat-label">For Sale</div>
                <div class="classic-stat-value">{activeSaleListingCount}</div>
              </div>
              <div class="classic-stat-box">
                <div class="classic-stat-label">For Rent</div>
                <div class="classic-stat-value">{activeRentListingCount}</div>
              </div>
              {activeAuctionListingCount > 0 && (
                <div class="classic-stat-box">
                  <div class="classic-stat-label">Auction</div>
                  <div class="classic-stat-value">{activeAuctionListingCount}</div>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div class="classic-description-section">
              <div class="classic-description-title">About {name}</div>
              <div class="classic-description-text">{description}</div>
            </div>
          )}

          {/* Listings Section */}
          <div class="classic-listings-section">
            <h2 class="classic-section-heading">Available Properties</h2>

            <div class="classic-filter-bar">
              <div class="classic-filter-row">
                <span class="classic-filter-label">Category:</span>
                <a href="#" class="classic-tab-link active" data-tab="all">All Listings</a>
                <a href="#" class="classic-tab-link" data-tab="sale">For Sale</a>
                <a href="#" class="classic-tab-link" data-tab="rent">For Rent</a>
                {activeAuctionListingCount > 0 && (
                  <a href="#" class="classic-tab-link" data-tab="auction">Auction</a>
                )}
              </div>

              <div class="classic-filter-row" style="margin-top: 15px;">
                <input
                  type="text"
                  class="classic-search-input"
                  placeholder="Search by location, property type, or keywords..."
                  id="searchInput"
                />
                <button class="classic-filter-button" onclick="window.openFilterModal()">
                  Advanced Filters
                </button>
              </div>
            </div>

            {/* Listings Grid */}
            <div id="listingsGrid" class="listing-grid">
              {/* Listings will be rendered here */}
            </div>

            {/* Pagination */}
            <div id="pagination" class="pagination-container"></div>
          </div>
        </div>

        <AgentFooter
          agent={agent}
          domain={domain}
        />

        {/* Modals */}
        <ShareModal domain={domain} />
        <FilterModal commonData={commonData} />
        <ContactModal contactNumber={contactNumber} />

        <ListingCardStyles />

        {/* JavaScript for interactivity */}
        <script dangerouslySetInnerHTML={{
          __html: `
            // Same JavaScript functionality as Template 1
            window.accountId = '${accountId}';
            window.domain = '${domain}';

            // Tab functionality
            document.querySelectorAll('.classic-tab-link').forEach(tab => {
              tab.addEventListener('click', function(e) {
                e.preventDefault();
                document.querySelectorAll('.classic-tab-link').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // Load listings for this tab
              });
            });
          `
        }} />
      </body>
    </html>
  );
};
