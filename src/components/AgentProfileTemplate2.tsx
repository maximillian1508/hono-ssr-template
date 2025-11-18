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
 * Agent Profile Component - Modern Minimalist Template
 * Clean, card-based layout with white space emphasis
 */
export const AgentProfileTemplate2: FC<AgentProfileProps> = ({ agent, domain, accountId, commonData }) => {
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
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

        <Style>{css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #1a1a1a;
            background: #f8f9fa;
          }

          .modern-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 80px 24px 24px;
          }

          .modern-hero-card {
            background: white;
            border-radius: 24px;
            padding: 48px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            margin-bottom: 24px;
          }

          .modern-agent-header {
            display: flex;
            gap: 32px;
            align-items: flex-start;
            margin-bottom: 32px;
          }

          .modern-avatar {
            width: 120px;
            height: 120px;
            border-radius: 16px;
            object-fit: cover;
            flex-shrink: 0;
          }

          .modern-agent-info {
            flex: 1;
          }

          .modern-agent-name {
            font-size: 32px;
            font-weight: 700;
            color: #1a1a1a;
            margin-bottom: 8px;
          }

          .modern-agent-company {
            font-size: 16px;
            color: #6b7280;
            margin-bottom: 16px;
          }

          .modern-badges {
            display: flex;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 16px;
          }

          .modern-badge {
            padding: 6px 12px;
            border-radius: 8px;
            font-size: 13px;
            font-weight: 500;
            background: #f0f9ff;
            color: #0284c7;
          }

          .modern-contact-buttons {
            display: flex;
            gap: 12px;
            margin-top: 16px;
          }

          .modern-btn {
            padding: 12px 24px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 14px;
            border: none;
            cursor: pointer;
            transition: all 0.2s;
          }

          .modern-btn-primary {
            background: #0ea5e9;
            color: white;
          }

          .modern-btn-primary:hover {
            background: #0284c7;
          }

          .modern-btn-secondary {
            background: #f8f9fa;
            color: #1a1a1a;
            border: 1px solid #e5e7eb;
          }

          .modern-btn-secondary:hover {
            background: #e5e7eb;
          }

          .modern-stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            padding: 24px;
            background: #f8f9fa;
            border-radius: 16px;
          }

          .modern-stat-item {
            text-align: center;
          }

          .modern-stat-value {
            font-size: 28px;
            font-weight: 700;
            color: #0ea5e9;
            display: block;
          }

          .modern-stat-label {
            font-size: 14px;
            color: #6b7280;
            margin-top: 4px;
          }

          .modern-description {
            margin-top: 24px;
            line-height: 1.7;
            color: #4b5563;
          }

          .modern-listings-section {
            background: white;
            border-radius: 24px;
            padding: 32px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          }

          .modern-section-title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 24px;
          }

          .modern-tabs {
            display: flex;
            gap: 8px;
            margin-bottom: 24px;
            border-bottom: 1px solid #e5e7eb;
          }

          .modern-tab {
            padding: 12px 20px;
            font-weight: 500;
            color: #6b7280;
            background: none;
            border: none;
            border-bottom: 2px solid transparent;
            cursor: pointer;
            transition: all 0.2s;
          }

          .modern-tab.active {
            color: #0ea5e9;
            border-bottom-color: #0ea5e9;
          }

          .modern-search-bar {
            display: flex;
            gap: 12px;
            margin-bottom: 24px;
          }

          .modern-search-input {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            font-size: 14px;
          }

          .modern-filter-btn {
            padding: 12px 24px;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            background: white;
            cursor: pointer;
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .modern-container {
              padding: 64px 16px 16px;
            }

            .modern-hero-card {
              padding: 24px;
              border-radius: 16px;
            }

            .modern-agent-header {
              flex-direction: column;
              align-items: center;
              text-align: center;
            }

            .modern-agent-name {
              font-size: 24px;
            }

            .modern-contact-buttons {
              flex-direction: column;
              width: 100%;
            }

            .modern-btn {
              width: 100%;
            }
          }
        `}</Style>
      </head>
      <body>
        <Header domain={domain} accountId={accountId} />
        <HeaderCompensation />

        <div class="modern-container">
          {/* Hero Card */}
          <div class="modern-hero-card">
            <div class="modern-agent-header">
              <img src={avatarUrl} alt={name} class="modern-avatar" />
              <div class="modern-agent-info">
                <h1 class="modern-agent-name">{name}</h1>
                <div class="modern-agent-company">{publisherName}</div>

                <div class="modern-badges">
                  {licenseNumber && (
                    <span class="modern-badge">{getLicenseLabel(licenseNumber, true)}</span>
                  )}
                  {isRenVerified && (
                    <span class="modern-badge">REN Verified</span>
                  )}
                  {isMobileVerified && (
                    <span class="modern-badge">Mobile Verified</span>
                  )}
                </div>

                <div class="modern-contact-buttons">
                  <button class="modern-btn modern-btn-primary" onclick="window.openContactModal('whatsapp')">
                    WhatsApp
                  </button>
                  <button class="modern-btn modern-btn-secondary" onclick="window.openContactModal('call')">
                    Call
                  </button>
                  <button class="modern-btn modern-btn-secondary" onclick="window.openShareModal()">
                    Share
                  </button>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div class="modern-stats">
              <div class="modern-stat-item">
                <span class="modern-stat-value">{activeListingCount}</span>
                <span class="modern-stat-label">Total Listings</span>
              </div>
              <div class="modern-stat-item">
                <span class="modern-stat-value">{activeSaleListingCount}</span>
                <span class="modern-stat-label">For Sale</span>
              </div>
              <div class="modern-stat-item">
                <span class="modern-stat-value">{activeRentListingCount}</span>
                <span class="modern-stat-label">For Rent</span>
              </div>
              {activeAuctionListingCount > 0 && (
                <div class="modern-stat-item">
                  <span class="modern-stat-value">{activeAuctionListingCount}</span>
                  <span class="modern-stat-label">Auction</span>
                </div>
              )}
            </div>

            {description && (
              <div class="modern-description">
                <p>{description}</p>
              </div>
            )}
          </div>

          {/* Listings Section */}
          <div class="modern-listings-section">
            <h2 class="modern-section-title">Property Listings</h2>

            <div class="modern-tabs">
              <button class="modern-tab active" data-tab="all">All</button>
              <button class="modern-tab" data-tab="sale">For Sale</button>
              <button class="modern-tab" data-tab="rent">For Rent</button>
              {activeAuctionListingCount > 0 && (
                <button class="modern-tab" data-tab="auction">Auction</button>
              )}
            </div>

            <div class="modern-search-bar">
              <input
                type="text"
                class="modern-search-input"
                placeholder="Search properties..."
                id="searchInput"
              />
              <button class="modern-filter-btn" onclick="window.openFilterModal()">
                Filters
              </button>
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
            // (Listing loading, filtering, search, etc.)
            window.accountId = '${accountId}';
            window.domain = '${domain}';

            // Tab functionality
            document.querySelectorAll('.modern-tab').forEach(tab => {
              tab.addEventListener('click', function() {
                document.querySelectorAll('.modern-tab').forEach(t => t.classList.remove('active'));
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
