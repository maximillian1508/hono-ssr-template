import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import type { AgentApiResponse } from '../types/agent';
import { getLicenseLabel, formatContactNumber } from '../types/agent';
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
  apiBaseUrl: string;
}

/**
 * Agent Profile Component - Premium Version
 * Displays agent information without authentication
 */
export const AgentProfile: FC<AgentProfileProps> = ({ agent, domain, accountId, commonData, apiBaseUrl }) => {
  // Helper function to get property type color

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
        <meta property="og:image:width" content="800" />
        <meta property="og:image:height" content="600" />
        <meta property="og:image:alt" content={`${name} - Property Agent`} />
        <meta property="og:locale" content="en_MY" />
        <meta property="og:site_name" content={`${name} - ${publisherName}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={pageUrl} />
        <meta property="twitter:title" content={pageTitle} />
        <meta property="twitter:description" content={pageDescription} />
        <meta property="twitter:image" content={imageUrl} />

        {/* Additional SEO Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content={name} />

        {/* Favicon and App Icons */}
        <link rel="icon" type="image/png" sizes="32x32" href={imageUrl} />
        <link rel="icon" type="image/png" sizes="16x16" href={imageUrl} />
        <link rel="apple-touch-icon" sizes="180x180" href={imageUrl} />
        <link rel="shortcut icon" href={imageUrl} />
        <meta name="theme-color" content="#3462F4" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "name": pageTitle,
            "description": pageDescription,
            "url": pageUrl,
            "mainEntity": {
              "@type": "Person",
              "name": name,
              "description": description || `Professional property agent at ${publisherName}`,
              "image": imageUrl,
              "url": pageUrl,
              "jobTitle": "Real Estate Agent",
              "worksFor": {
                "@type": "Organization",
                "name": publisherName,
                ...(publisherRegistrationNumber && {
                  "identifier": publisherRegistrationNumber
                })
              },
              ...(contactNumber && {
                "telephone": contactNumber
              }),
              ...(licenseNumber && {
                "identifier": {
                  "@type": "PropertyValue",
                  "name": getLicenseLabel(licenseNumber, true).replace(':', ''),
                  "value": licenseNumber
                }
              }),
              "knowsAbout": [
                "Real Estate",
                "Property Sales",
                "Property Rental",
                "Property Investment",
                "Malaysia Property Market"
              ],
              "additionalProperty": [
                {
                  "@type": "PropertyValue",
                  "name": "Active Listings",
                  "value": activeListingCount
                },
                {
                  "@type": "PropertyValue",
                  "name": "Sale Listings",
                  "value": activeSaleListingCount
                },
                {
                  "@type": "PropertyValue",
                  "name": "Rental Listings",
                  "value": activeRentListingCount
                },
                {
                  "@type": "PropertyValue",
                  "name": "Auction Listings",
                  "value": activeAuctionListingCount
                }
              ]
            },
            "dateModified": new Date().toISOString()
          })
        }} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'"/>
        <noscript>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" type="text/css" />
        </noscript>
        <Style>{css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: Poppins, sans-serif;
            line-height: 1.5;
            font-weight: 400;
            color: #2c2c2c;
            font-size: 1rem;
            background: white;
            -webkit-text-size-adjust: 100%;
            -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
          }

          h1, h2, h3, h4, h5, h6, p, span, a, button, input, select, textarea {
            font-family: Poppins, sans-serif;
          }

          main {
            display: flex;
            flex: 1;
            flex-direction: column;
            background: white;
          }

          .hero-section {
            background-image: url(/images/agent-profile-hero.webp);
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            height: 60vh;
            max-height: 500px;
            background-color: #3462F4;
            padding: 0 0 4rem 2rem;
          }

          .hero-content {
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-rows: auto auto;
            justify-items: end;
            align-content: end;
            gap: 1rem;
          }

          .hero-content div {
            width: 300px;
          }

          .hero-section p {
            grid-column: 1;
            grid-row: 1;
            color: white;
            font-size: 2.5rem;
            font-weight: bold;
            border-bottom: 2px solid white;
            padding: 0 3rem 0.5rem 0;
            margin: 0;
            text-align: left;
            width: 100%;
            max-width: 100%;
            word-wrap: break-word;
            white-space: normal;
          }

          .hero-copy-button {
            margin-top: 1rem;
            grid-column: 1;
            grid-row: 2;
            display: flex;
            align-items: center;
            gap: 1rem;
            background: oklch(0.95 0.01 270 / 0.85);
            border: 1px solid #fff;
            color: black;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            font-size: 1rem;
            cursor: pointer;
            width: fit-content;
            max-width: 100%;
            height: fit-content;
            text-align: left;
            transition: all 0.2s ease;
            word-wrap: break-word;
            white-space: normal;
          }

          .hero-copy-button:hover {
            transform: scale(1.02);
          }

          .hero-copy-button span {
            word-wrap: break-word;
            white-space:normal;
            width: 87.5%;
          }

          .hero-copy-button svg {
            width: 20px;
            height: 20px;
            fill: #3462F4;
            flex-shrink: 0;
          }

          @media (max-width: 1024px) {
            .hero-copy-button {
              font-size: 0.95rem;
            }
          }

          @media (max-width: 768px) {
            .hero-copy-button {
              font-size: 0.9rem;
            }
            .hero-section p {
              font-size: 2rem;
            }
          }

          @media (max-width: 576px) {
            .hero-copy-button {
              font-size: 0.85rem;
              padding: 0.5rem 1rem;
              border-radius: 12px;
            }
            .hero-section p {
              font-size: 1.5rem;
            }
          }

          .agent-detail-section {
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas:
              "first-row"
              "agent-content"
              "listings";
            gap: 0;
            position: relative;
            align-items: start;
          }

          .first-row {
            grid-area: first-row;
            display: grid;
            grid-template-columns: 300px 1fr;
            grid-template-areas:
              "image info"
              "image details";
            gap: 0 2rem;
            position: relative;
            align-items: start;
          }

          .right-content {
            display: flex;
            flex-direction: column;
            gap: 1rem;  /* Controls spacing between info and details */
          }

          .image-container {
            background-color: white;
            padding: 5px;
            border: solid 0.1px #e0e0e0;
            position: relative;
            top: -50px;
            left: 0;
            margin-left: 2rem;
            width: 250px;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            grid-area: image;
          }

          .image-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: 2px solid white;
          }

          .info-container {
            padding: 25px 25px 0 0;
            position: relative;
            grid-area: info;
          }

          .info-container h1 {
            margin: 0 0 5px 0;
            max-width: 75%;
            font-weight: 600;
            font-size: 2rem;
          }

          .info-container p.publisher-name {
            color: #666;
            font-weight: 500;
            font-size: 1.3rem;
            margin: 0;
          }

          .contact-section {
            position: absolute;
            top: 30px;
            right: 20px;
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .contact-btn {
            background: transparent;
            border: none;
            padding: 0;
            cursor: pointer;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            transition: opacity 0.2s;
          }

          .contact-btn:hover {
            opacity: 0.8;
          }

          .contact-btn#share-button {
            background-color: white;
            border-radius: 25px;
            padding: 8px 20px;
            border: 1px solid #3462F4;
            color: #333;
            gap: 8px;
            font-size: 1rem;
            font-weight: 500;
          }

          .contact-btn#share-button:hover {
            background-color: #f3f4f6;
            opacity: 1;
          }

          .details-container {
            margin-top: 0;
            margin-left: 0;
            grid-area: details;
            display: flex;
            gap: 1.5rem;
          }

          .details-container p {
            color: #666;
            margin: 5px 0 0 0;
            font-size: 1.05rem;
            display: flex;
            align-items: center;
            gap: 5px;
            flex-wrap: wrap;
          }

          .details-container strong {
            color: #3462F4;
          }

          .agent-content-container {
            grid-area: agent-content;
            padding: 0 2rem;
          }

          .description-container {
            position: relative;
            margin-top: 0;
          }

          .gallery-container {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            margin-top: 1rem;
          }

          .gallery-item-inline {
            width: 33.33%;
            height: 130px;
            position: relative;
            overflow: hidden;
            border-radius: 8px;
          }

          .gallery-item-inline img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .listings-container {
            grid-area: listings;
            display: flex;
            flex-direction: row;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            border-radius: 8px;
            padding: 0;
            margin: 2rem 0;
          }

          .listing-summary {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            padding: 40px 0;
            text-align: center;
          }

          .listing-summary p {
            color: #3462F4;
            font-size: 2.25rem;
            font-weight: 600;
            margin: 0;
          }

          .listing-summary h2 {
            font-size: 1.15rem;
            font-weight: 500;
            margin: 0;
          }

          /* Expandable Description Styles */
          .expandable-description {
            max-height: none;
            overflow: visible;
            transition: max-height 0.3s ease;
            position: relative;
          }

          .expandable-description.collapsed {
            max-height: 150px;
            overflow: hidden;
          }

          .expandable-description.collapsed::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: linear-gradient(transparent, white);
            pointer-events: none;
          }

          .read-more-button {
            background: none;
            border: none;
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.25rem;
            margin-top: 0.5rem;
            font-size: 0.875rem;
            padding: 0;
          }

          .read-more-button:hover {
            text-decoration: underline;
          }

          .expand-icon {
            transition: transform 0.3s ease;
          }

          .expand-icon.rotated {
            transform: rotate(180deg);
          }

          .listings-section {
            max-width: 1280px;
            width: 100%;
            margin: 2rem auto;
            padding: 0 1rem;
          }

          .listings-section h2 {
            text-align: center;
            font-size: 1.75rem;
            margin-bottom: 1.5rem;
          }

          .search-filter-container {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            gap: 1rem;
          }

          .listing-count {
            font-size: 0.95rem;
            color: #666;
          }

          .search-filter-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex: 1;
            max-width: 500px;
            margin-left: auto;
          }

          .search-input-container {
            position: relative;
            flex: 1;
          }

          .search-input {
            width: 100%;
            padding: 0.75rem 4.5rem 0.75rem 2.5rem;
            border: 1.5px solid #e0e0e0;
            border-radius: 8px;
            font-size: 0.95rem;
            background-color: #f9fafb;
            transition: all 0.2s;
          }

          .search-input:focus {
            outline: none;
            border-color: #3462F4;
            background-color: white;
          }

          .search-icon {
            position: absolute;
            left: 0.75rem;
            top: 50%;
            transform: translateY(-50%);
            color: #666;
            pointer-events: none;
          }

          .filter-button {
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.625rem;
            background-color: #3462F4;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
            z-index: 1;
          }

          .filter-button:hover {
            background-color: #5558eb;
          }

          .filter-badge {
            position: absolute;
            top: -0.375rem;
            right: -0.375rem;
            background-color: #ef4444;
            color: white;
            border-radius: 50%;
            padding: 0.125rem 0.5rem;
            font-size: 0.75rem;
            font-weight: 600;
          }

          /* Tabs Styles */

          .tabs-container {
            display: flex;
            justify-content: flex-start;
            border-bottom: 2px solid #e0e0e0;
            margin-bottom: 2rem;
            gap: 0;
            overflow-x: auto;
            white-space: nowrap;
            scrollbar-width: none;
            -ms-overflow-style: none;
          }

          .tabs-container::-webkit-scrollbar {
            display: none;
          }

          .tab {
            padding: 0.75rem 1rem;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            color: #666;
            transition: all 0.3s;
            white-space: nowrap;
            flex-shrink: 0;
            min-width: 90px;
            text-align: center;
          }

          .tab:hover {
            color: #333;
          }

          .tab.active {
            color: #000;
            border-bottom-color: #3462F4;
            font-weight: 700;
          }


          .loading {
            text-align: center;
            padding: 3rem;
            color: #666;
          }

          .empty-state {
            text-align: center;
            padding: 3rem;
            color: #666;
          }

          /* Empty Item Box */
          .empty-item-box {
            display: flex;
            width: 100%;
            min-height: 60vh;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            padding: 3rem 1rem;
          }

          .empty-image-container {
            height: 200px;
            width: 200px;
            margin-bottom: 1.5rem;
          }

          .empty-image-container img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .empty-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: #333;
            text-align: center;
          }

          .empty-description {
            font-size: 1rem;
            color: #666;
            text-align: center;
            margin-bottom: 1.5rem;
            max-width: 500px;
          }

          .empty-button {
            background-color: #3462F4;
            color: white;
            padding: 0.75rem 2rem;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .empty-button:hover {
            background-color: #5558eb;
          }

          /* Loading Overlay */
          .loading-overlay {
            position: fixed;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255, 255, 255, 0.9);
            z-index: 10000;
            transition: opacity 0.3s ease;
          }

          .loading-overlay.hidden {
            opacity: 0;
            pointer-events: none;
          }

          .loading-spinner {
            width: 64px;
            height: 64px;
            position: relative;
            display: inline-block;
          }

          .loading-spinner img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          /* CSS Spinner (fallback if no image) */
          .spinner-ring {
            display: inline-block;
            width: 64px;
            height: 64px;
          }

          .spinner-ring:after {
            content: " ";
            display: block;
            width: 48px;
            height: 48px;
            margin: 8px;
            border-radius: 50%;
            border: 6px solid #3462F4;
            border-color: #3462F4 transparent #3462F4 transparent;
            animation: spinner-ring 1.2s linear infinite;
          }

          @keyframes spinner-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

          .loading-text {
            margin-top: 1rem;
            font-size: 1rem;
            color: #333;
            font-weight: 500;
          }


          .listings-loading {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 60vh;
            padding: 3rem;
          }

          .listings-loading-spinner {
            width: 48px;
            height: 48px;
            margin-bottom: 1rem;
          }

          /* Pagination Styles */
          .pagination {
            display: flex;
            list-style: none;
            padding: 0;
            margin: 0;
            gap: 0.5rem;
          }

          .pagination-item {
            min-width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 500;
            color: #333;
            transition: all 0.2s;
          }

          .pagination-item:hover:not(.disabled):not(.selected) {
            background-color: #f3f4f6;
            border-color: #3462F4;
          }

          .pagination-item.selected {
            background-color: #3462F4;
            color: white;
            border-color: #3462F4;
          }

          .pagination-item.disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }

          .pagination-item svg {
            width: 20px;
            height: 20px;
          }


          @media (max-width: 768px) {
            .agent-detail-section {
              grid-template-columns: 1fr;
              grid-template-areas:
                "first-row"
                "agent-content"
                "listings";
            }

            .first-row {
              grid-template-columns: 1fr;
              grid-template-areas:
                "image"
                "info"
                "details";
              gap: 0;
            }

            .image-container {
              width: 200px;
              height: 200px;
              left: 0;
              margin-left: 1.25rem;
              top: -30px;
            }

            .info-container {
              padding: 0 20px;
            }

            .info-container h1 {
              max-width: 100%;
            }

            .info-container p.publisher-name {
              font-size: 1.2rem;
            }

            .contact-section {
              top: 0px;
              position: static;
              margin-top: 1rem;
              justify-content: flex-start;
            }

            .details-container {
              margin-left: 0;
              padding: 0 20px;
              flex-direction: column;
              gap: 0;
            }

            .details-container p {
              font-size: 1rem;
            }

            .agent-content-container {
              padding: 0 20px;
              margin-top: 2rem;
            }

            .agent-content-container p {
              margin-top: 0;
            }

            .listing-summary {
              padding: 25px;
            }

            .listing-summary p {
              font-size: 1.75rem;
            }

            .listing-summary h2 {
              font-size: 1rem;
            }


            .tab {
              padding: 0.625rem 0.875rem;
              font-size: 0.8125rem;
              min-width: 80px;
            }

            .search-filter-container {
              flex-direction: column;
              align-items: flex-start;
            }

            .listing-count {
              font-size: 0.875rem;
            }

            .search-filter-wrapper {
              max-width: 100%;
              width: 100%;
            }

            .search-input {
              padding: 0.75rem 4rem 0.75rem 2.5rem;
            }

            .filter-button {
              padding: 0.5rem;
              font-size: 0.875rem;
            }

            .hero-section p {
              font-size: 1.5rem;
            }

            .hero-section {
              height: 35vh;
            }
          }

          @media (max-width: 480px) {
          }
        `}</Style>
        <link rel="preload" href={`/images/agent-profile-hero.webp`} as="image" type="image/webp" fetchpriority="high"/>
      </head>
      <body>
        {/* Original Header - Backup (commented out) */}
        {/* <Header /> */}
        {/* <HeaderCompensation /> */}

        {/* New Agent Profile Header */}
        <AgentProfileHeader agentName={name} />

        {/* Listing Card Styles */}
        <ListingCardStyles />

        <main>

        <div class="hero-section">
          <div class="hero-content">
            <div>
              <p>{name}</p>
              <button class="hero-copy-button" id="hero-copy-button" data-domain={domain} aria-label="Copy Agent Website URL">
                <span>{domain}</span>
                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ContentCopyIcon">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div class="agent-detail-section">
          {/* First Row - Image + Info + Details */}
          <div class="first-row">
            <div class="image-container">
              <img src={avatarUrl} alt={name} fetchpriority="high" loading="eager"/>
            </div>

            <div class="right-content">
              <div class="info-container">
                <h1>{name}</h1>
                <p class="publisher-name">{publisherName}</p>

                <div class="contact-section">
                  <button class="contact-btn" id="whatsapp-button" aria-label="WhatsApp Agent">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="WhatsAppIcon" style="fill:white;background-color:#25d366;border-radius:50%;padding:8px;width:40px;height:40px"><path d="M16.75 13.96c.25.13.41.2.46.3.06.11.04.61-.21 1.18-.2.56-1.24 1.1-1.7 1.12-.46.02-.47.36-2.96-.73-2.49-1.09-3.99-3.75-4.11-3.92-.12-.17-.96-1.38-.92-2.61.05-1.22.69-1.8.95-2.04.24-.26.51-.29.68-.26h.47c.15 0 .36-.06.55.45l.69 1.87c.06.13.1.28.01.44l-.27.41-.39.42c-.12.12-.26.25-.12.5.12.26.62 1.09 1.32 1.78.91.88 1.71 1.17 1.95 1.3.24.14.39.12.54-.04l.81-.94c.19-.25.35-.19.58-.11l1.67.88M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10c-1.97 0-3.8-.57-5.35-1.55L2 22l1.55-4.65A9.969 9.969 0 0 1 2 12 10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8c0 1.72.54 3.31 1.46 4.61L4.5 19.5l2.89-.96A7.95 7.95 0 0 0 12 20a8 8 0 0 0 8-8 8 8 0 0 0-8-8z"></path></svg>
                  </button>
                  <button class="contact-btn" id="call-button" aria-label="Call Agent">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CallIcon" style="fill:white;background-color:#3462F4;border-radius:50%;padding:8px;width:40px;height:40px"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99"></path></svg>
                  </button>
                  <button class="contact-btn" id="share-button" aria-label="Share Agent Profile">Share</button>
                </div>
              </div>

              <div class="details-container">
                <p>
                  {maskedContact}
                  {isMobileVerified && <svg style="width: 20px; height: 20px; fill: #2563eb; margin-left: 5px; vertical-align: middle;" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedIcon"><path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z"></path></svg>}
                </p>
                <p>
                  {getLicenseLabel(licenseNumber)} <strong>{licenseNumber}</strong>
                  {isRenVerified && <svg style="width: 20px; height: 20px; fill: #2563eb; margin-left: 5px; vertical-align: middle;" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="VerifiedIcon"><path d="m23 12-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69zm-12.91 4.72-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48z"></path></svg>}
                </p>
                <p>
                  Agency Reg. no. <strong>{publisherRegistrationNumber}</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Second Row - Agent Content */}
          {(description || (agent.galleryImages && agent.galleryImages.length > 0)) && (
            <div class="agent-content-container">
              {description && (
                <div class="description-container">
                  <div class="expandable-description" id="description-text">
                    <p>{description}</p>
                  </div>
                  <button class="read-more-button" id="read-more-btn" style="display: none;" aria-label="Read More">
                    Read More
                    <span class="expand-icon"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style="width: 20px; height: 20px; fill: currentColor;"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path></svg></span>
                  </button>
                </div>
              )}

              {/* Gallery Images - Inline Display */}
              {agent.galleryImages && agent.galleryImages.length > 0 && (
                <div class="gallery-container">
                  {agent.galleryImages.slice(0, 3).map((image, index) => (
                    <div class="gallery-item-inline" key={index}>
                      <img src={image.medium?.src || ""} alt={`Gallery ${index + 1}`} loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Third Row - Listings Summary */}
          <div class="listings-container">
            <div class="listing-summary">
              <p>{activeSaleListingCount}</p>
              <h2>Listings for Sale</h2>
            </div>
            <div class="listing-summary">
              <p>{activeRentListingCount}</p>
              <h2>Listings for Rent</h2>
            </div>
            <div class="listing-summary">
              <p>{activeAuctionListingCount}</p>
              <h2>Listings for Auction</h2>
            </div>
          </div>
        </div>


        <div class="listings-section" id="listings-section">
            <h2>{name}'s Listings</h2>

            <div class="tabs-container">
              <button class="tab active" data-tab="all" aria-label="All Listings">All Listings</button>
              <button class="tab" data-tab="sale" aria-label="For Sale">For Sale</button>
              <button class="tab" data-tab="rent" aria-label="For Rent">For Rent</button>
              <button class="tab" data-tab="auction" aria-label="For Auction">For Auction</button>
            </div>

            <div class="search-filter-container">
              <div class="listing-count" id="listing-count">
                Showing 0 of {agent._metadata?.activeListingCount || 0} Listings
              </div>

              <div class="search-filter-wrapper">
                <div class="search-input-container">
                  <span class="search-icon"><svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SearchIcon" style="width: 20px; height: 20px;"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"></path></svg></span>
                  <input
                    type="text"
                    class="search-input"
                    placeholder="Property Name...."
                    id="search-input"
                  />
                  <button class="filter-button" id="filter-button" aria-label="Filter Listings">
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="FilterListOutlinedIcon" style="width: 1.2em; height: 1.2em; fill: #ffffff;"><path d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z"></path></svg>
                    <span class="filter-badge" id="filter-badge" style="display: none;">0</span>
                  </button>
                </div>
              </div>
            </div>

            <div id="listings-container">
              <div class="listings-grid">
                {agent.listings && agent.listings.length > 0 ? (
                  agent.listings.map((listing) => (
                    <ListingCard key={listing.id} listing={listing} />
                  ))
                ) : (
                  <div class="empty-state">No listings available</div>
                )}
              </div>
            </div>

            <div id="pagination-container" style="display: none; justify-content: center; align-items: center; padding: 2rem 0; margin-top: 3rem;">
            </div>
          </div>
          </main>

        {/* Loading Overlay */}
        <div class="loading-overlay hidden" id="loading-overlay">
          <div class="spinner-ring"></div>
          <div class="loading-text">Loading</div>
        </div>

        {/* Footer Component */}
        <AgentFooter
          publisherName={publisherName}
          agentName={name}
          licenseNumber={licenseNumber}
          agencyRegistrationNumber={publisherRegistrationNumber}
          phoneNumber={maskedContact}
          email={email}
          isRenVerified={isRenVerified}
        />


        {/* Filter Modal Component */}
        <FilterModal commonData={commonData} />

        {/* Contact Modal Component */}
        <ContactModal
          contactNumber={contactNumber}
          accountName={name}
          accountSlug={agent.slug}
          accountId={accountId}
          domain={`https://${domain}`}
          apiBaseUrl={apiBaseUrl}
        />

        {/* Share Modal Component */}
        <ShareModal
          url={`https://${domain}`}
          title={`${name} from ${publisherName}`}
        />

        <script dangerouslySetInnerHTML={{
          __html: `
            const initialData = {
              accountId: '${accountId}',
              accountSlug: '${agent.slug}',
              apiBaseUrl: '${apiBaseUrl}',
              listings: ${JSON.stringify(agent.listings || [])},
              metadata: ${JSON.stringify(agent._metadata || {})},
              commonData: ${JSON.stringify(commonData || {})}
            };

            let currentTab = 'all';
            let currentPage = 1;
            let isLoading = false;
            let searchKeyword = '';
            let filterTypes = { types: [] }; // Always include types as empty array
            let currentListings = initialData.listings;
            let totalCount = initialData.metadata.activeListingCount || 0;
            let searchTimeout = null;

            // Property type and category state
            let selectedPropertyType = ''; // Single string: 'residential', 'commercial', etc.
            let selectedCategories = {}; // Object tracking selected categories and their children

            // Loading overlay functions
            function showLoadingOverlay() {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) {
                overlay.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
              }
            }

            function hideLoadingOverlay() {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) {
                overlay.classList.add('hidden');
                document.body.style.overflow = '';
              }
            }

            function updateListingCount(currentListings, pagination) {
              const countEl = document.getElementById('listing-count');
              if (countEl) {
                const itemsOnPage = currentListings?.length || 0;
                const totalCount = pagination?.totalCount || 0;
                const currentPageNum = pagination?.currentPage || currentPage;
                const perPage = pagination?.perPage || 25;

                if (itemsOnPage === 0) {
                  countEl.textContent = \`Showing 0 of \${totalCount} Listings\`;
                } else {
                  const startItem = ((currentPageNum - 1) * perPage) + 1;
                  const endItem = Math.min(startItem + itemsOnPage - 1, totalCount);
                  countEl.textContent = \`Showing \${startItem}-\${endItem} of \${totalCount} Listings\`;
                }
              }
            }

            function updateFilterBadge(count) {
              const badge = document.getElementById('filter-badge');
              if (badge) {
                if (count > 0) {
                  badge.textContent = count;
                  badge.style.display = 'inline';
                } else {
                  badge.style.display = 'none';
                }
              }
            }

            function renderPagination(pagination) {
              const paginationContainer = document.getElementById('pagination-container');
              if (!paginationContainer) return;

              const pageCount = pagination?.pageCount || 0;
              const currentPageNum = pagination?.currentPage || 1;

              // Hide pagination if only 1 page or no pages
              if (pageCount <= 1) {
                paginationContainer.style.display = 'none';
                return;
              }

              paginationContainer.style.display = 'flex';

              // Build pagination HTML
              let paginationHtml = '<nav aria-label="pagination navigation"><ul class="pagination">';

              // Previous button
              const prevDisabled = currentPageNum === 1 ? 'disabled' : '';
              paginationHtml += \`
                <li class="pagination-item \${prevDisabled}" data-page="\${currentPageNum - 1}" aria-label="Go to previous page">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="NavigateBeforeIcon"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"></path></svg>
                </li>
              \`;

              // Page numbers
              for (let i = 1; i <= pageCount; i++) {
                const isSelected = i === currentPageNum ? 'selected' : '';
                const ariaCurrent = i === currentPageNum ? 'aria-current="true"' : '';
                paginationHtml += \`
                  <li class="pagination-item \${isSelected}" data-page="\${i}" \${ariaCurrent} aria-label="page \${i}">
                    \${i}
                  </li>
                \`;
              }

              // Next button
              const nextDisabled = currentPageNum === pageCount ? 'disabled' : '';
              paginationHtml += \`
                <li class="pagination-item \${nextDisabled}" data-page="\${currentPageNum + 1}" aria-label="Go to next page">
                  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="NavigateNextIcon"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>
                </li>
              \`;

              paginationHtml += '</ul></nav>';
              paginationContainer.innerHTML = paginationHtml;

              // Add click handlers
              paginationContainer.querySelectorAll('.pagination-item:not(.disabled)').forEach(item => {
                item.addEventListener('click', () => {
                  const page = parseInt(item.dataset.page);
                  if (page && page !== currentPageNum && page >= 1 && page <= pageCount) {
                    currentPage = page;
                    fetchListings(currentTab, currentPage);
                    // Scroll to top of listings section
                    document.querySelector('.listings-section')?.scrollIntoView({ behavior: 'smooth' });
                  }
                });
              });
            }


            // Share handler
            window.handleShare = function(event, slug, name) {
              event.preventDefault();
              event.stopPropagation();

              const url = \`https://www.propertygenie.com.my/property/\${slug}\`;

              if (navigator.share) {
                navigator.share({
                  title: name,
                  url: url
                }).catch(err => console.log('Error sharing:', err));
              } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(url).then(() => {
                  alert('Link copied to clipboard!');
                }).catch(err => {
                  console.error('Could not copy text:', err);
                });
              }
            };

            // Generate listing card HTML (client-side rendering helper)
            function generateListingCardHTML(listing) {
              // Helper to check if object has properties
              const isNotEmpty = (obj) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

              // Get price object
              const priceObject = isNotEmpty(listing.sale)
                ? listing.sale
                : isNotEmpty(listing.rent)
                ? listing.rent
                : isNotEmpty(listing.auction)
                ? listing.auction
                : null;

              const price = priceObject?.price?.text || '-';
              const psf = priceObject?.perSize?.text || '-';
              const propertyType = listing.type?.name || '';

              const propertyTypeColors = {
                'Condominium': '#3462F4',
                'Serviced Residence': '#8b5cf6',
                'Apartment': '#ec4899',
                'Flat': '#f97316',
                'Townhouse': '#14b8a6',
                'Terrace': '#10b981',
                'Bungalow': '#22c55e',
                'Semi-D': '#84cc16',
                'Shop': '#eab308',
                'Office': '#f59e0b',
                'Factory': '#ef4444',
                'Warehouse': '#dc2626',
                'Land': '#78716c',
                'Agricultural Land': '#65a30d',
                'Residential Land': '#16a34a',
                'Commercial Land': '#0891b2',
                'Industrial Land': '#0284c7',
              };

              const propertyTypeColor = propertyTypeColors[propertyType] || '#3462F4';
              const listingUrl = \`https://www.propertygenie.com.my/property/\${listing.slug}\`;
              const image = listing.image?.medium?.src || '/images/amenties-placeholder.png';
              const bed = listing.room?.bed?.text || listing.room?.bedroom || 0;
              const bath = listing.room?.bath?.text || listing.room?.bathroom || 0;
              const size = listing.size?.floor?.text || listing.size?.land?.text || '-';

              return \`
                <a class="listing-card" href="\${listingUrl}" target="_blank" rel="noopener noreferrer">
                  <img src="\${image}" alt="\${listing.name}" loading="lazy" />
                  \${propertyType ? \`<div class="property-type-badge" style="background-color: \${propertyTypeColor};">\${propertyType}</div>\` : ''}
                  <div class="action-buttons">
                    <button class="action-button" aria-label="Share Listing" onclick="handleShare(event, '\${listing.slug}', '\${listing.name.replace(/'/g, "\\'")}')">
                      📤
                    </button>
                  </div>
                  <div class="listing-overlay">
                    <h3>\${listing.name}</h3>
                    <p>\${listing.city?.name || '-'}, \${listing.postcode || '-'}, \${listing.state?.name || '-'}</p>
                    <div class="listing-details">
                      <div class="listing-detail-item">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="BedIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6h2v-2h16v2h2v-6c0-.88-.39-1.67-1-2.22M14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1M5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5z"></path></svg>
                        \${bed}
                      </div>
                      <div class="listing-detail-item">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShowerIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><circle cx="8" cy="17" r="1"></circle><circle cx="12" cy="17" r="1"></circle><circle cx="16" cy="17" r="1"></circle><path d="M13 5.08V3h-2v2.08C7.61 5.57 5 8.47 5 12v2h14v-2c0-3.53-2.61-6.43-6-6.92"></path><circle cx="8" cy="20" r="1"></circle><circle cx="12" cy="20" r="1"></circle><circle cx="16" cy="20" r="1"></circle></svg>
                        \${bath}
                      </div>
                      <div class="listing-detail-item">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SquareFootIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><path d="m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"></path></svg>
                        \${size}
                      </div>
                      <div class="listing-detail-item">
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SquareFootIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><path d="m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"></path></svg>
                        \${psf}
                      </div>
                    </div>
                    <p class="listing-price">\${price}</p>
                  </div>
                </a>
              \`;
            }

            function renderListings(listings, pagination = null) {
              const container = document.getElementById('listings-container');
              currentListings = listings;

              // Update listing count with proper range calculation
              updateListingCount(listings, pagination);

              // Render pagination controls
              renderPagination(pagination);

              if (!listings || listings.length === 0) {
                container.innerHTML = \`
                  <div class="empty-item-box">
                    <div class="empty-image-container">
                      <img src="/images/not-found.png" alt="No results found" loading="lazy" />
                    </div>
                    <h2 class="empty-title">No result found</h2>
                    <p class="empty-description">There are no property listing.</p>
                    <button aria-label="Refresh Listings" class="empty-button" onclick="window.location.reload()">Refresh</button>
                  </div>
                \`;
                return;
              }

              const listingsHtml = listings.map(listing => generateListingCardHTML(listing)).join('');
              container.innerHTML = '<div class="listings-grid">' + listingsHtml + '</div>';
            }

            async function fetchListings(tab, page = 1) {
              if (isLoading) return;

              isLoading = true;
              const container = document.getElementById('listings-container');

              // Show better loading state
              container.innerHTML = \`
                <div class="listings-loading">
                  <div class="spinner-ring"></div>
                  <div class="loading-text">Loading listings...</div>
                </div>
              \`;

              try {
                const endpoint = tab === 'all'
                  ? \`\${initialData.apiBaseUrl}/v1/account/\${initialData.accountSlug}/listing/all?page=\${page}\`
                  : \`\${initialData.apiBaseUrl}/v1/account/\${initialData.accountSlug}/listing/\${tab}?page=\${page}\`;

                const requestBody = {
                  keyword: searchKeyword || '',
                  ...filterTypes
                };

                // Only add empty types array if no types filter is set
                if (!filterTypes.types) {
                  requestBody.types = [];
                }

                const response = await fetch(endpoint, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(requestBody)
                });

                if (!response.ok) {
                  throw new Error('Failed to fetch listings');
                }

                const data = await response.json();
                // API returns pagination data in _meta field
                const paginationData = data._meta || data.pagination || null;
                renderListings(data.items || [], paginationData);
              } catch (error) {
                console.error('Error fetching listings:', error);
                container.innerHTML = \`
                  <div class="empty-item-box">
                    <div class="empty-image-container">
                      <img src="/images/not-found.png" alt="Error" loading="lazy" />
                    </div>
                    <h2 class="empty-title">Failed to load listings</h2>
                    <p class="empty-description">Please try again later.</p>
                    <button aria-label="Refresh Listings" class="empty-button" onclick="window.location.reload()">Refresh</button>
                  </div>
                \`;
              } finally {
                isLoading = false;
              }
            }

            // Search input handler with debounce
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
              searchInput.addEventListener('input', (e) => {
                const value = e.target.value;

                // Clear previous timeout
                if (searchTimeout) {
                  clearTimeout(searchTimeout);
                }

                // Set new timeout for debounce (600ms)
                searchTimeout = setTimeout(() => {
                  searchKeyword = value;
                  currentPage = 1;

                  // Check if we have any active filters (excluding the default 'types' key)
                  const hasActiveFilters = Object.keys(filterTypes).some(key => {
                    if (key === 'types') return false;
                    return true;
                  });

                  // Fetch with search keyword
                  if (currentTab === 'all' && !value && !hasActiveFilters) {
                    // If no search and no filters on 'all' tab, use initial data
                    const initialPagination = {
                      currentPage: 1,
                      pageCount: Math.ceil(totalCount / 30),
                      totalCount: totalCount,
                      perPage: 30
                    };
                    renderListings(initialData.listings, initialPagination);
                  } else {
                    fetchListings(currentTab, currentPage);
                  }
                }, 600);
              });
            }

            // Helper function to get all property type values for a category
            function getAllPropertyTypeValues(categoryKey) {
              const commonData = initialData.commonData;
              if (!commonData || !commonData.filter) return [];

              // Try to get category items from the nested structure
              const categoryData = commonData.filter.category?.[categoryKey]?.items ||
                                   commonData.filter.category?.items?.find(cat => cat.code === categoryKey);

              if (!categoryData) return [];

              const allTypes = [];

              // Handle array structure (from category.items[])
              if (Array.isArray(categoryData)) {
                categoryData.forEach(item => {
                  const nestedItems = item[0]?.items || item.items || [];
                  nestedItems.forEach(nested => {
                    if (nested.value || nested.code) {
                      allTypes.push(nested.value || nested.code);
                    }
                  });
                });
              }
              // Handle object structure (from category.types.items)
              else if (categoryData.types?.items) {
                const types = categoryData.types.items;
                types.forEach(type => {
                  if (type.types?.items) {
                    type.types.items.forEach(nestedType => {
                      allTypes.push(nestedType.code || nestedType.value);
                    });
                  }
                });
              }

              return allTypes;
            }

            // Helper function to get formatted category data
            function getFormattedCategoryData(categoryKey) {
              const commonData = initialData.commonData;
              if (!commonData || !commonData.filter) return [];

              // Try to access category data from nested structure
              const categoryData = commonData.filter.category?.[categoryKey]?.items ||
                                   commonData.filter.category?.items?.find(cat => cat.code === categoryKey);

              if (!categoryData) return [];

              const formatted = [];

              // Handle array structure (Map format from selectors)
              if (Array.isArray(categoryData)) {
                categoryData.forEach(item => {
                  const mainItem = item[0] || item;
                  const name = mainItem.name;
                  const value = mainItem.value;
                  const nestedItems = mainItem.items || [];

                  if (nestedItems.length > 0) {
                    formatted.push({
                      label: name,
                      value: value,
                      options: nestedItems.map(nested => ({
                        label: nested.name,
                        value: nested.value
                      }))
                    });
                  }
                });
              }
              // Handle object structure (from category.types.items)
              else if (categoryData.types?.items) {
                const types = categoryData.types.items;
                types.forEach(type => {
                  const nestedTypes = type.types?.items || [];
                  if (nestedTypes.length > 0) {
                    formatted.push({
                      label: type.name,
                      value: type.code,
                      options: nestedTypes.map(nested => ({
                        label: nested.name,
                        value: nested.code
                      }))
                    });
                  }
                });
              }

              return formatted;
            }

            // Initialize filter options from commonData
            function initializeFilterOptions() {
              const commonData = initialData.commonData;
              if (!commonData || !commonData.filter) return;

              // Render main Property Type buttons (5 categories)
              const propertyTypeGrid = document.getElementById('property-type-grid');

              // Try to get categories from commonData, fallback to hardcoded list
              let categories = commonData.filter.category?.items || [];

              // If no categories from API, use hardcoded list
              if (categories.length === 0) {
                categories = [
                  { code: 'residential', name: 'Residential' },
                  { code: 'commercial', name: 'Commercial' },
                  { code: 'agricultural', name: 'Agricultural' },
                  { code: 'industrial', name: 'Industrial' },
                  { code: 'others', name: 'Others' }
                ];
              }

              if (propertyTypeGrid && categories.length > 0) {
                const buttonsHtml = categories.map(category => {
                  return \`<button aria-label="Select Property Type" class="filter-option" data-type="main-category" data-value="\${category.code}">\${category.name}</button>\`;
                }).join('');
                propertyTypeGrid.innerHTML = buttonsHtml;
              }

              // Render bedrooms
              const bedroomsGrid = document.getElementById('bedrooms-grid');
              const bedrooms = commonData.filter.bedRoom?.items || [];
              if (bedroomsGrid && bedrooms.length > 0) {
                bedroomsGrid.innerHTML = bedrooms.map(item => {
                  const name = item.name || item.value;
                  const value = item.value;
                  return \`<button aria-label="Select Bedroom" class="filter-option" data-type="bedroom" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render bathrooms
              const bathroomsGrid = document.getElementById('bathrooms-grid');
              const bathrooms = commonData.filter.bathRoom?.items || [];
              if (bathroomsGrid && bathrooms.length > 0) {
                bathroomsGrid.innerHTML = bathrooms.map(item => {
                  const name = item.name || item.value;
                  const value = item.value;
                  return \`<button aria-label="Select Bathroom" class="filter-option" data-type="bathroom" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render tenure
              const tenureGrid = document.getElementById('tenure-grid');
              const tenures = commonData.filter.tenure?.items || [];
              if (tenureGrid && tenures.length > 0) {
                tenureGrid.innerHTML = tenures.map(item => {
                  const name = item.name || item.value;
                  const value = item.code || item.value;
                  return \`<button aria-label="Select Tenure" class="filter-option" data-type="tenure" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render floor levels
              const floorLevelGrid = document.getElementById('floor-level-grid');
              const floorLevels = commonData.filter.floorLevel?.items || [];
              if (floorLevelGrid && floorLevels.length > 0) {
                floorLevelGrid.innerHTML = floorLevels.map(item => {
                  const name = item.name || item.value;
                  const value = item.code || item.value;
                  return \`<button aria-label="Select Floor Level" class="filter-option" data-type="floorLevel" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render furnishing
              const furnishingGrid = document.getElementById('furnishing-grid');
              const furnishings = commonData.filter.furnishing?.items || [];
              if (furnishingGrid && furnishings.length > 0) {
                furnishingGrid.innerHTML = furnishings.map(item => {
                  const name = item.name || item.value;
                  const value = item.code || item.value;
                  return \`<button aria-label="Select Furnishing" class="filter-option" data-type="furnishing" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Add click handlers for main category buttons (Property Type)
              document.querySelectorAll('.filter-option[data-type="main-category"]').forEach(option => {
                option.addEventListener('click', (e) => {
                  handlePropertyTypeClick(e.currentTarget.dataset.value);
                });
              });

              // Add click handlers for other filter options (non-category)
              document.querySelectorAll('.filter-option:not([data-type="main-category"])').forEach(option => {
                option.addEventListener('click', (e) => {
                  e.currentTarget.classList.toggle('selected');
                });
              });
            }

            // Handle property type selection (Residential, Commercial, etc.)
            function handlePropertyTypeClick(typeValue) {
              const allTypeButtons = document.querySelectorAll('.filter-option[data-type="main-category"]');

              // If clicking the already selected type, deselect it
              if (selectedPropertyType === typeValue) {
                selectedPropertyType = '';
                selectedCategories = {};
                allTypeButtons.forEach(btn => btn.classList.remove('selected'));
                document.getElementById('property-categories-section').style.display = 'none';
                return;
              }

              // Select new type
              selectedPropertyType = typeValue;
              allTypeButtons.forEach(btn => {
                if (btn.dataset.value === typeValue) {
                  btn.classList.add('selected');
                } else {
                  btn.classList.remove('selected');
                }
              });

              // Auto-select "All" for this category
              const allTypeValues = getAllPropertyTypeValues(typeValue);
              selectedCategories = {
                [\`all_\${typeValue}\`]: {
                  selected: true,
                  children: allTypeValues
                }
              };

              // Render the property categories section
              renderPropertyCategories(typeValue);

              // Show the categories section
              document.getElementById('property-categories-section').style.display = 'block';
            }

            // Render property categories checkboxes based on selected property type
            function renderPropertyCategories(typeValue) {
              const container = document.getElementById('property-categories-container');
              if (!container) return;

              const categoryData = getFormattedCategoryData(typeValue);
              const allTypeValues = getAllPropertyTypeValues(typeValue);

              // Create "All" option
              const allOption = {
                label: \`All \${typeValue.charAt(0).toUpperCase() + typeValue.slice(1)}\`,
                value: \`all_\${typeValue}\`
              };

              // Combine "All" with category data
              const fullData = [allOption, ...categoryData];

              const html = fullData.map(category => {
                const isAllCategory = category.value.startsWith('all_');
                const isSelected = isCategorySelected(category);

                let categoryHtml = \`
                  <div class="filter-modal-checkbox-group">
                    <label class="filter-modal-parent-checkbox-label" data-category="\${category.value}">
                      <span class="filter-modal-styled-checkbox \${isSelected ? 'checked' : ''}"></span>
                      \${category.label}
                    </label>
                \`;

                // Render children if not "All" category and has children selected
                if (!isAllCategory && category.options && (isSelected || hasCategoryChildren(category))) {
                  category.options.forEach(subCategory => {
                    const isChildSelected = isSubCategorySelected(category, subCategory);
                    categoryHtml += \`
                      <label class="filter-modal-child-checkbox-label" data-parent="\${category.value}" data-child="\${subCategory.value}">
                        <span class="filter-modal-styled-checkbox \${isChildSelected ? 'checked' : ''}"></span>
                        \${subCategory.label}
                      </label>
                    \`;
                  });
                }

                categoryHtml += \`</div>\`;
                return categoryHtml;
              }).join('');

              container.innerHTML = html;

              // Add click handlers for category checkboxes
              container.querySelectorAll('.filter-modal-parent-checkbox-label').forEach(label => {
                label.addEventListener('click', (e) => {
                  const categoryValue = e.currentTarget.dataset.category;
                  const category = fullData.find(c => c.value === categoryValue);
                  handleCategoryToggle(category);
                });
              });

              container.querySelectorAll('.filter-modal-child-checkbox-label').forEach(label => {
                label.addEventListener('click', (e) => {
                  const parentValue = e.currentTarget.dataset.parent;
                  const childValue = e.currentTarget.dataset.child;
                  const parentCategory = fullData.find(c => c.value === parentValue);
                  const subCategory = parentCategory.options.find(opt => opt.value === childValue);
                  handleCategoryToggle(parentCategory, subCategory);
                });
              });
            }

            // Handle category toggle logic
            function handleCategoryToggle(category, subCategory = null) {
              const isAllCategory = !category.options || category.value.startsWith('all_');

              if (isAllCategory) {
                // Toggle "All" category
                const allTypeValues = getAllPropertyTypeValues(selectedPropertyType);

                if (selectedCategories[category.value]?.selected) {
                  // Deselect all
                  selectedCategories = {};
                } else {
                  // Select all
                  selectedCategories = {
                    [category.value]: {
                      selected: true,
                      children: allTypeValues
                    }
                  };
                }
              } else if (subCategory) {
                // Handle subcategory toggle
                // First clear "All" category if selected
                const allCategoryKey = Object.keys(selectedCategories).find(key => key.startsWith('all_'));
                if (allCategoryKey) {
                  delete selectedCategories[allCategoryKey];
                }

                if (!selectedCategories[category.value]) {
                  selectedCategories[category.value] = {
                    selected: false,
                    children: [subCategory.value]
                  };
                } else {
                  const children = [...(selectedCategories[category.value].children || [])];
                  const index = children.indexOf(subCategory.value);

                  if (index > -1) {
                    children.splice(index, 1);
                  } else {
                    children.push(subCategory.value);
                  }

                  selectedCategories[category.value].children = children;

                  // Check if all subcategories are selected
                  const allSubcategories = category.options.map(opt => opt.value);
                  const allSelected = allSubcategories.every(val => children.includes(val));
                  selectedCategories[category.value].selected = allSelected;
                }

                // Clean up empty categories
                if (selectedCategories[category.value]?.children?.length === 0) {
                  delete selectedCategories[category.value];
                }
              } else {
                // Handle parent category toggle (select/deselect all children)
                // First clear "All" category if selected
                const allCategoryKey = Object.keys(selectedCategories).find(key => key.startsWith('all_'));
                if (allCategoryKey) {
                  delete selectedCategories[allCategoryKey];
                }

                if (!selectedCategories[category.value] || !selectedCategories[category.value].selected) {
                  // Select all subcategories
                  selectedCategories[category.value] = {
                    selected: true,
                    children: category.options ? category.options.map(opt => opt.value) : []
                  };
                } else {
                  // Deselect all subcategories
                  selectedCategories[category.value] = {
                    selected: false,
                    children: []
                  };
                  delete selectedCategories[category.value];
                }
              }

              // Re-render categories
              renderPropertyCategories(selectedPropertyType);
            }

            // Helper functions for checking category state
            function isCategorySelected(category) {
              const categoryData = selectedCategories[category.value];
              return categoryData?.selected || (categoryData?.children && categoryData.children.length > 0) || false;
            }

            function isSubCategorySelected(category, subCategory) {
              return selectedCategories[category.value]?.children?.includes(subCategory.value) || false;
            }

            function hasCategoryChildren(category) {
              const categoryData = selectedCategories[category.value];
              return categoryData && categoryData.children && categoryData.children.length > 0;
            }

            // Get categories data for API request
            function getCategoriesData() {
              const categories = [];
              Object.keys(selectedCategories).forEach(parentKey => {
                const parentCategory = selectedCategories[parentKey];

                if (parentCategory.selected) {
                  // If parent is selected, add all children
                  categories.push(...parentCategory.children);
                } else if (parentCategory.children && parentCategory.children.length > 0) {
                  // Add only selected children
                  categories.push(...parentCategory.children);
                }
              });

              return categories.length > 0 ? categories : null;
            }

            // Open/Close modal handlers
            const filterModal = document.getElementById('filter-modal');
            const filterButton = document.getElementById('filter-button');
            const closeModalBtn = document.getElementById('close-modal');

            if (filterButton) {
              filterButton.addEventListener('click', () => {
                filterModal.classList.add('active');
                document.body.style.overflow = 'hidden';
              });
            }

            function closeModal() {
              filterModal.classList.remove('active');
              document.body.style.overflow = '';
            }

            if (closeModalBtn) {
              closeModalBtn.addEventListener('click', closeModal);
            }

            // Close on overlay click
            if (filterModal) {
              filterModal.addEventListener('click', (e) => {
                if (e.target === filterModal) {
                  closeModal();
                }
              });
            }

            // Apply filters
            const applyFiltersBtn = document.getElementById('apply-filters');
            if (applyFiltersBtn) {
              applyFiltersBtn.addEventListener('click', () => {
                // Check if property type is selected but no categories
                const categoriesData = getCategoriesData();
                if (selectedPropertyType && !categoriesData) {
                  alert('Please select at least one category for the chosen property type.');
                  return;
                }

                const minPrice = document.getElementById('min-price').value;
                const maxPrice = document.getElementById('max-price').value;

                const selectedBedrooms = Array.from(
                  document.querySelectorAll('.filter-option[data-type="bedroom"].selected')
                ).map(el => el.dataset.value).filter(v => v && v !== 'undefined');

                const selectedBathrooms = Array.from(
                  document.querySelectorAll('.filter-option[data-type="bathroom"].selected')
                ).map(el => el.dataset.value).filter(v => v && v !== 'undefined');

                const selectedTenures = Array.from(
                  document.querySelectorAll('.filter-option[data-type="tenure"].selected')
                ).map(el => el.dataset.value).filter(v => v && v !== 'undefined');

                const selectedFloorLevels = Array.from(
                  document.querySelectorAll('.filter-option[data-type="floorLevel"].selected')
                ).map(el => el.dataset.value).filter(v => v && v !== 'undefined');

                const selectedFurnishings = Array.from(
                  document.querySelectorAll('.filter-option[data-type="furnishing"].selected')
                ).map(el => el.dataset.value).filter(v => v && v !== 'undefined');

                // Build filter object
                // Note: types should always be empty array, categories contains the actual property types
                filterTypes = {
                  types: []  // Always empty array
                };

                if (minPrice) filterTypes.minPrice = parseInt(minPrice);
                if (maxPrice) filterTypes.maxPrice = parseInt(maxPrice);
                if (categoriesData) filterTypes.categories = categoriesData;
                if (selectedBedrooms.length > 0) filterTypes.bedRooms = selectedBedrooms;
                if (selectedBathrooms.length > 0) filterTypes.bathRooms = selectedBathrooms;
                if (selectedTenures.length > 0) filterTypes.tenures = selectedTenures;
                if (selectedFloorLevels.length > 0) filterTypes.floorLevels = selectedFloorLevels;
                if (selectedFurnishings.length > 0) filterTypes.furnishings = selectedFurnishings;

                // Update badge count (exclude types and keyword from count)
                const activeFilterKeys = Object.keys(filterTypes).filter(key => key !== 'types');
                updateFilterBadge(activeFilterKeys.length);

                // Close modal and fetch
                closeModal();
                currentPage = 1;
                fetchListings(currentTab, currentPage);
              });
            }

            // Clear filters
            const clearFiltersBtn = document.getElementById('clear-filters');
            if (clearFiltersBtn) {
              clearFiltersBtn.addEventListener('click', () => {
                // Reset all selections
                document.getElementById('min-price').value = '';
                document.getElementById('max-price').value = '';

                // Clear all filter option selections
                document.querySelectorAll('.filter-option.selected').forEach(el => {
                  el.classList.remove('selected');
                });

                // Clear property type and categories
                selectedPropertyType = '';
                selectedCategories = {};
                document.getElementById('property-categories-section').style.display = 'none';
                document.getElementById('property-categories-container').innerHTML = '';

                // Clear filter object - types should always be empty array
                filterTypes = {
                  types: []
                };
                updateFilterBadge(0);

                // Close modal and reset to initial data
                closeModal();
                currentPage = 1;
                searchKeyword = '';
                document.getElementById('search-input').value = '';

                if (currentTab === 'all') {
                  const initialPagination = {
                    currentPage: 1,
                    pageCount: Math.ceil(totalCount / 30),
                    totalCount: totalCount,
                    perPage: 30
                  };
                  renderListings(initialData.listings, initialPagination);
                } else {
                  fetchListings(currentTab, currentPage);
                }
              });
            }

            // Initialize filter options on page load
            initializeFilterOptions();

            // Initialize pagination and listing count on page load
            (function initializeListingsDisplay() {
              const itemsOnPage = initialData.listings?.length || 0;
              const perPage = 30; // Default perPage from API
              const initialPagination = {
                currentPage: 1,
                pageCount: Math.ceil(totalCount / perPage),
                totalCount: totalCount,
                perPage: perPage
              };
              updateListingCount(initialData.listings, initialPagination);
              renderPagination(initialPagination);
            })();

            // Expandable description functionality
            function initializeExpandableDescription() {
              const descriptionText = document.getElementById('description-text');
              const readMoreBtn = document.getElementById('read-more-btn');

              if (!descriptionText || !readMoreBtn) return;

              // Check if content height exceeds 150px
              const contentHeight = descriptionText.scrollHeight;
              const shouldShowReadMore = contentHeight > 150;

              if (shouldShowReadMore) {
                descriptionText.classList.add('collapsed');
                readMoreBtn.style.display = 'flex';

                // Add click handler for read more/less
                readMoreBtn.addEventListener('click', () => {
                  const isExpanded = !descriptionText.classList.contains('collapsed');
                  const expandIcon = readMoreBtn.querySelector('.expand-icon');

                  if (isExpanded) {
                    // Collapse
                    descriptionText.classList.add('collapsed');
                    readMoreBtn.childNodes[0].textContent = 'Read More ';
                    if (expandIcon) expandIcon.classList.remove('rotated');
                  } else {
                    // Expand
                    descriptionText.classList.remove('collapsed');
                    readMoreBtn.childNodes[0].textContent = 'Read Less ';
                    if (expandIcon) expandIcon.classList.add('rotated');
                  }
                });
              }
            }

            // Initialize expandable description on page load
            initializeExpandableDescription();

            // Tab click handlers
            document.querySelectorAll('.tab').forEach(tab => {
              tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab;

                // Update active tab
                document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                currentTab = tabType;
                currentPage = 1;

                // Check if we have any active filters (excluding the default 'types' key)
                const hasActiveFilters = Object.keys(filterTypes).some(key => {
                  if (key === 'types') return false;
                  return true;
                });

                // Use initial data for 'all' tab if no search/filters, fetch for others
                if (tabType === 'all' && !searchKeyword && !hasActiveFilters) {
                  const initialPagination = {
                    currentPage: 1,
                    pageCount: Math.ceil(totalCount / 30),
                    totalCount: totalCount,
                    perPage: 30
                  };
                  renderListings(initialData.listings, initialPagination);
                } else {
                  fetchListings(tabType, currentPage);
                }
              });
            });

            // Contact modal button handlers
            const whatsappButton = document.getElementById('whatsapp-button');
            const callButton = document.getElementById('call-button');
            const shareButton = document.getElementById('share-button');

            if (whatsappButton) {
              whatsappButton.addEventListener('click', () => {
                if (typeof window.openContactModal === 'function') {
                  window.openContactModal('whatsapp');
                }
              });
            }

            if (callButton) {
              callButton.addEventListener('click', () => {
                if (typeof window.openContactModal === 'function') {
                  window.openContactModal('call');
                }
              });
            }

            if (shareButton) {
              shareButton.addEventListener('click', () => {
                const shareModal = document.getElementById('share-modal');
                if (shareModal) {
                  shareModal.classList.add('active');
                  document.body.style.overflow = 'hidden';
                }
              });
            }

            // Hero copy button handler
            const heroCopyButton = document.getElementById('hero-copy-button');
            if (heroCopyButton) {
              heroCopyButton.addEventListener('click', () => {
                const domain = heroCopyButton.getAttribute('data-domain');
                if (domain && navigator.clipboard) {
                  navigator.clipboard.writeText(domain).then(() => {
                    heroCopyButton.style.background = '#a8d5ba';
                    setTimeout(() => {
                      heroCopyButton.style.background = '#C8D4F4';
                    }, 2000);
                  }).catch(err => {
                    console.error('Failed to copy:', err);
                  });
                }
              });
            }

            // Footer contact button handlers
            const footerWhatsappButton = document.getElementById('footer-whatsapp-button');
            const footerCallButton = document.getElementById('footer-call-button');
            const footerShareButton = document.getElementById('footer-share-button');
            const footerPhoneLink = document.getElementById('footer-phone-link');

            if (footerWhatsappButton) {
              footerWhatsappButton.addEventListener('click', () => {
                if (typeof window.openContactModal === 'function') {
                  window.openContactModal('whatsapp');
                }
              });
            }

            if (footerCallButton) {
              footerCallButton.addEventListener('click', () => {
                if (typeof window.openContactModal === 'function') {
                  window.openContactModal('call');
                }
              });
            }

            if (footerPhoneLink) {
              footerPhoneLink.addEventListener('click', () => {
                if (typeof window.openContactModal === 'function') {
                  window.openContactModal('call');
                }
              });
            }

            if (footerShareButton) {
              footerShareButton.addEventListener('click', () => {
                const shareModal = document.getElementById('share-modal');
                if (shareModal) {
                  shareModal.classList.add('active');
                  document.body.style.overflow = 'hidden';
                }
              });
            }

            // Header navigation handlers
            document.querySelectorAll('.agent-profile-header-nav-link').forEach(navLink => {
              navLink.addEventListener('click', () => {
                const navTabType = navLink.dataset.navTab;

                // Scroll to listings section
                const listingsSection = document.getElementById('listings-section');
                if (listingsSection) {
                  const headerHeight = 64; // Height of fixed header
                  const elementPosition = listingsSection.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }

                // Update active state on header nav links
                document.querySelectorAll('.agent-profile-header-nav-link').forEach(link => {
                  link.classList.remove('active');
                });
                navLink.classList.add('active');

                // Find and click the corresponding tab to trigger existing tab logic
                setTimeout(() => {
                  const correspondingTab = document.querySelector(\`.tab[data-tab="\${navTabType}"]\`);
                  if (correspondingTab) {
                    correspondingTab.click();
                  }
                }, 300); // Small delay to allow scroll to start
              });
            });

            // Sync header nav active state with tab changes
            document.querySelectorAll('.tab').forEach(tab => {
              const originalClickHandler = tab.onclick;
              tab.addEventListener('click', () => {
                const tabType = tab.dataset.tab;

                // Update header nav active state
                document.querySelectorAll('.agent-profile-header-nav-link').forEach(link => {
                  link.classList.remove('active');
                });

                const correspondingNavLink = document.querySelector(\`.agent-profile-header-nav-link[data-nav-tab="\${tabType}"]\`);
                if (correspondingNavLink) {
                  correspondingNavLink.classList.add('active');
                }
              });
            });

            // Scroll detection to reset header nav active state
            let scrollTimeout;
            window.addEventListener('scroll', () => {
              // Debounce scroll event
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                const listingsSection = document.getElementById('listings-section');
                if (!listingsSection) return;

                const listingsSectionRect = listingsSection.getBoundingClientRect();
                const headerHeight = 64;
                const viewportHeight = window.innerHeight;

                // Check if listings section is in viewport
                // We consider it "out of view" if the top of the section is above the viewport
                // or the bottom of the section is below the viewport
                const isAboveViewport = listingsSectionRect.bottom < headerHeight;
                const isBelowViewport = listingsSectionRect.top > viewportHeight;

                // Reset active state if listings section is completely out of view
                if (isAboveViewport || isBelowViewport) {
                  document.querySelectorAll('.agent-profile-header-nav-link').forEach(link => {
                    link.classList.remove('active');
                  });
                }
              }, 100); // Wait 100ms after scroll stops
            });
          `
        }} />
      </body>
    </html>
  );
};
