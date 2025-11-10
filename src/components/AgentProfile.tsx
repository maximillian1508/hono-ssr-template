import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import type { AgentApiResponse } from '../types/agent';
import { getLicenseLabel, formatContactNumber } from '../types/agent';

interface AgentProfileProps {
  agent: AgentApiResponse;
  domain: string;
  accountId: string;
  commonData: any;
}

/**
 * Agent Profile Component - Premium Version
 * Displays agent information without authentication
 */
export const AgentProfile: FC<AgentProfileProps> = ({ agent, domain, accountId, commonData }) => {
  // Helper function to get property type color
  const getPropertyTypeColor = (typeName: string): string => {
    const colorMap: Record<string, string> = {
      'Condominium': '#6366f1',
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
    return colorMap[typeName] || '#6366f1';
  };

  // Extract agent data
  const name = agent.name;
  const description = agent.description || '';

  // Get mobile phone contact
  const mobileContact = agent.contact?.items?.find(
    item => item.type?.code === 'mobile-phone'
  );
  const contactNumber = mobileContact?.value || '';
  const maskedContact = formatContactNumber(contactNumber);

  const licenseNumber = agent.licenseNumber || '';
  const publisherName = agent.publisher?.name || '';
  const publisherRegistrationNumber = agent.publisher?.registrationNumber || '';

  const avatarUrl = agent.image?.medium?.src || '/amenties-placeholder.png';

  const isRenVerified = agent._metadata?.isRenVerified || false;
  const isMobileVerified = agent._metadata?.isMobileVerified || false;

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{name} from {publisherName} | Property Genie</title>
        <meta
          name="description"
          content={`${name} from ${publisherName}. ${description.substring(0, 150)}...`}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <Style>{css`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: Poppins, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
          }

          main {
            display: flex;
            flex: 1;
            flex-direction: column;
            background: white;
          }

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
            min-height: 54px;
            height: 73px;
          }

          .header-logo {
            display: flex;
            align-items: center;
          }

          .header-spacer {
            height: 73px;
            visibility: hidden;
          }

          .hero-section {
            background-image: url(/images/agent-profile-hero.webp);
            background-size: cover;
            background-position: center top;
            background-repeat: no-repeat;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 45vh;
            max-height: 400px;
            background-color: #6366f1;
          }

          .hero-section p {
            color: white;
            font-size: 2.5rem;
            font-weight: bold;
            border-bottom: 2px solid white;
            padding: 0 3rem 0.5rem 3rem;
          }

          .agent-detail-section {
            max-width: 1280px;
            margin: 0 auto;
            width: 100%;
            display: grid;
            grid-template-columns: 300px 1fr;
            grid-template-areas:
              "left right"
              "listings listings";
            gap: 1rem 2rem;
            position: relative;
            align-items: start;
            padding: 0 35px;
          }

          .left-column {
            grid-area: left;
            display: flex;
            flex-direction: column;
            padding: 0;
          }

          .right-column {
            grid-area: right;
            display: flex;
            flex-direction: column;
            padding: 0;
          }

          .image-container {
            background-color: white;
            padding: 5px;
            border: solid 0.1px #e0e0e0;
            position: absolute;
            top: -100px;
            left: 30px;
            width: 250px;
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
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
          }

          .info-container h1 {
            margin: 0 0 5px 0;
            max-width: 75%;
            font-weight: 600;
            font-size: 2rem;
          }

          .info-container h3 {
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
            background-color: white;
            border-radius: 25px;
            padding: 8px 20px;
            border: 1px solid #6366f1;
            font-size: 1rem;
            cursor: pointer;
            text-decoration: none;
            color: #333;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .contact-btn:hover {
            background-color: #f3f4f6;
          }

          .icon-whatsapp {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-color: #25D366;
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 14px;
          }

          .icon-phone {
            display: inline-block;
            width: 24px;
            height: 24px;
            background-color: #6366f1;
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 14px;
          }

          .details-container {
            margin-top: 175px;
            margin-left: 2rem;
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
            color: #6366f1;
          }

          .agent-content-container {
            padding: 0;
          }

          .description-container {
            position: relative;
            margin-top: 0;
          }

          .description-container p {
            line-height: 1.8;
            color: #333;
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
            border: 1px solid #e5e7eb;
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
            border-top: 2px solid #dddddd;
            border-bottom: 2px solid #dddddd;
            padding: 0;
            margin-top: 2rem;
          }

          .listing-summary {
            width: 33.33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            padding: 25px 0;
            text-align: center;
          }

          .listing-summary:nth-child(2) {
            border-left: 2px solid #dddddd;
            border-right: 2px solid #dddddd;
          }

          .listing-summary p {
            color: #6366f1;
            font-size: 2.25rem;
            font-weight: 600;
            margin: 0;
          }

          .listing-summary h3 {
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
            border-top: 2px solid #e0e0e0;
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
            padding: 0.75rem 1rem 0.75rem 2.5rem;
            border: 1.5px solid #e0e0e0;
            border-radius: 8px;
            font-size: 0.95rem;
            background-color: #f9fafb;
            transition: all 0.2s;
          }

          .search-input:focus {
            outline: none;
            border-color: #6366f1;
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
            padding: 0.75rem 1rem;
            background-color: #6366f1;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 500;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: background-color 0.2s;
            white-space: nowrap;
          }

          .filter-button:hover {
            background-color: #5558eb;
          }

          .filter-badge {
            background-color: #ef4444;
            color: white;
            border-radius: 50%;
            padding: 0.125rem 0.5rem;
            font-size: 0.75rem;
            font-weight: 600;
          }

          /* Filter Modal Styles */
          .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.4);
            z-index: 9999;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.2s ease;
          }

          .modal-overlay.active {
            display: flex;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .modal-container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            width: 90%;
            max-width: 900px;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            animation: slideIn 0.3s ease-out;
          }

          .modal-header {
            padding: 1.5rem;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .modal-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .close-button {
            background: none;
            border: none;
            padding: 0.5rem;
            border-radius: 8px;
            cursor: pointer;
            color: #6b7280;
            transition: all 0.2s;
          }

          .close-button:hover {
            background: #f3f4f6;
            color: #000;
          }

          .modal-content {
            padding: 1.5rem;
            overflow-y: auto;
            flex: 1;
          }

          .filter-section {
            margin-bottom: 2rem;
          }

          .section-title {
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 1rem 0;
          }

          .filter-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 0.75rem;
          }

          .filter-option {
            padding: 0.75rem 1rem;
            border-radius: 12px;
            border: 1.5px solid #e5e7eb;
            background: white;
            color: #111827;
            font-size: 0.875rem;
            font-weight: 400;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
          }

          .filter-option:hover {
            border-color: #6366f1;
            background: #eef2ff;
          }

          .filter-option.selected {
            border-color: #6366f1;
            background: #eef2ff;
            color: #6366f1;
            font-weight: 600;
          }

          .price-inputs {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }

          .price-input-wrapper {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .price-label {
            font-size: 0.875rem;
            font-weight: 500;
            color: #111827;
          }

          .price-select {
            padding: 0.75rem 1rem;
            border: 1.5px solid #e5e7eb;
            border-radius: 12px;
            font-size: 0.875rem;
            background: white;
            cursor: pointer;
            transition: all 0.2s;
          }

          .price-select:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }

          .modal-footer {
            padding: 1.25rem 1.5rem;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 0.75rem;
          }

          .footer-button {
            flex: 1;
            padding: 0.875rem 1.5rem;
            border-radius: 12px;
            font-size: 0.875rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            border: none;
          }

          .footer-button.outline {
            background: white;
            color: #6366f1;
            border: 1.5px solid #6366f1;
          }

          .footer-button.outline:hover {
            background: #eef2ff;
          }

          .footer-button.primary {
            background: #6366f1;
            color: white;
          }

          .footer-button.primary:hover {
            background: #5558eb;
          }

          /* Property Type Category Styles */
          .property-category {
            margin-bottom: 1.5rem;
          }

          .category-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 8px;
            transition: background 0.2s;
          }

          .category-header:hover {
            background: #f9fafb;
          }

          .category-checkbox {
            width: 18px;
            height: 18px;
            cursor: pointer;
          }

          .category-title {
            font-size: 0.9rem;
            font-weight: 600;
            color: #374151;
          }

          .category-types {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 0.75rem;
            margin-left: 2rem;
          }

          @media (max-width: 768px) {
            .modal-container {
              width: 100%;
              max-width: 100%;
              border-radius: 0;
              max-height: 100vh;
            }

            .price-inputs {
              grid-template-columns: 1fr;
            }

            .category-types {
              margin-left: 1rem;
              grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            }
          }

          .tabs-container {
            display: flex;
            justify-content: center;
            border-bottom: 2px solid #e0e0e0;
            margin-bottom: 2rem;
            gap: 1rem;
          }

          .tab {
            padding: 1rem 2rem;
            background: none;
            border: none;
            border-bottom: 3px solid transparent;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            color: #666;
            transition: all 0.3s;
          }

          .tab:hover {
            color: #333;
          }

          .tab.active {
            color: #000;
            border-bottom-color: #6366f1;
            font-weight: 700;
          }

          .listings-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-top: 2rem;
          }

          .listing-card {
            position: relative;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            height: 375px;
            cursor: pointer;
            transition: transform 0.3s ease;
            display: block;
            text-decoration: none;
          }

          .listing-card:hover {
            transform: translateY(-4px);
          }

          .listing-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease;
          }

          .listing-card:hover img {
            transform: scale(1.025);
          }

          .action-buttons {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            gap: 8px;
            z-index: 2;
          }

          .action-button {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background-color: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            color: white;
            font-size: 20px;
          }

          .action-button:hover {
            transform: scale(1.1);
            background-color: rgba(0, 0, 0, 0.6);
          }

          .action-button.active {
            background-color: #ef4444;
          }

          .action-button.active:hover {
            background-color: #dc2626;
          }

          .property-type-badge {
            position: absolute;
            top: 12px;
            left: 12px;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            color: white;
            z-index: 2;
          }

          .listing-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(0,0,0,0.85) 100%);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            color: white;
          }

          .listing-overlay h3 {
            font-size: 1.15rem;
            margin: 0 0 0.5rem 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .listing-overlay p {
            font-size: 0.875rem;
            margin: 0.25rem 0;
          }

          .listing-details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.5rem;
            margin: 0.75rem 0;
          }

          .listing-detail-item {
            display: flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.875rem;
          }

          .listing-price {
            font-size: 1.3rem;
            font-weight: 600;
            margin-top: 0.5rem;
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
            background-color: #6366f1;
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
            border: 6px solid #6366f1;
            border-color: #6366f1 transparent #6366f1 transparent;
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

          /* Footer Styles */
          .footer {
            margin-top: 4rem;
            background-color: #1f2937;
            color: white;
            padding: 2rem 0;
          }

          .footer-container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 0 2rem;
          }

          .footer-content {
            text-align: center;
          }

          .footer-content p {
            margin: 0.5rem 0;
            font-size: 0.9rem;
            color: #d1d5db;
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

          @media (max-width: 992px) {
            .listings-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          @media (max-width: 768px) {
            .agent-detail-section {
              grid-template-columns: 1fr;
              grid-template-areas:
                "image"
                "info"
                "details"
                "agent-content"
                "listings";
            }

            .left-column,
            .right-column {
              display: contents;
            }

            .image-container {
              width: 200px;
              height: 200px;
              left: 20px;
            }

            .info-container {
              margin-top: 100px;
              padding: 0 20px;
            }

            .info-container h1 {
              max-width: 100%;
            }

            .info-container h3 {
              font-size: 1.2rem;
            }

            .contact-section {
              top: 0px;
              position: static;
              margin-top: 1rem;
              justify-content: flex-start;
            }

            .details-container {
              margin-top: 0;
              margin-left: 0;
              padding: 0 20px;
            }

            .details-container p {
              font-size: 1rem;
            }

            .agent-content-container {
              padding: 0 20px;
            }

            .agent-content-container p {
              margin-top: 0;
            }

            .listings-container {
              padding: 0;
            }

            .listing-summary {
              padding: 15px;
            }

            .listing-summary p {
              font-size: 1.75rem;
            }

            .listing-summary h3 {
              font-size: 1rem;
            }

            .listings-grid {
              grid-template-columns: repeat(2, 1fr);
            }

            .tabs-container {
              overflow-x: auto;
              justify-content: flex-start;
            }

            .tab {
              padding: 0.75rem 1rem;
              font-size: 0.9rem;
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

            .filter-button {
              padding: 0.75rem;
              font-size: 0.875rem;
            }

            .hero-section p {
              font-size: 1.5rem;
            }

            .hero-section {
              height: 35vh;
            }
          }
        `}</Style>
      </head>
      <body>
        {/* Header */}
        <header class="app-header">
          <div class="header-container">
            <div class="header-toolbar">
              <div class="header-logo">
                {/* Logo placeholder - can add logo image here */}
              </div>
            </div>
          </div>
        </header>

        {/* Spacer for fixed header */}
        <div class="header-spacer"></div>

        <main>

        <div class="hero-section">
          <p>PROPERTY AGENT</p>
        </div>

        <div class="agent-detail-section">
          {/* Left Column */}
          <div class="left-column">
            <div class="image-container">
              <img src={avatarUrl} alt={name} />
            </div>

            <div class="details-container">
              <p>
                {maskedContact}
                {isMobileVerified && <span style="color: #2563eb; margin-left: 5px;">✓</span>}
              </p>
              <p>
                {getLicenseLabel(licenseNumber)} <strong>{licenseNumber}</strong>
                {isRenVerified && <span style="color: #2563eb; margin-left: 5px;">✓</span>}
              </p>
              <p>
                Agency Reg. no. <strong>{publisherRegistrationNumber}</strong>
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div class="right-column">
            <div class="info-container">
              <h1>{name}</h1>
              <h3>{publisherName}</h3>

              <div class="contact-section">
                <a
                  href={`https://wa.me/${contactNumber}/?text=Hi ${name}, I am looking for property. I'm eager to explore the available options and would appreciate it if you could share details about any properties you have. Thank you!`}
                  class="contact-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="icon-whatsapp">💬</span>
                </a>
                <button class="contact-btn" onclick="alert('Please login to view contact details')">
                  <span class="icon-phone">📞</span>
                </button>
                <button class="contact-btn">Share</button>
              </div>
            </div>

            <div class="agent-content-container">
              {description && (
                <div class="description-container">
                  <div class="expandable-description" id="description-text">
                    <p>{description}</p>
                  </div>
                  <button class="read-more-button" id="read-more-btn" style="display: none;">
                    Read More
                    <span class="expand-icon">▼</span>
                  </button>
                </div>
              )}

              {/* Gallery Images - Inline Display */}
              {agent.galleryImages && agent.galleryImages.length > 0 && (
                <div class="gallery-container">
                  {agent.galleryImages.slice(0, 3).map((image, index) => (
                    <div class="gallery-item-inline" key={index}>
                      <img src={image.medium?.src || ""} alt={`Gallery ${index + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Listings Summary Container */}
          <div class="listings-container">
            <div class="listing-summary">
              <p>{agent._metadata?.activeSaleListingCount || 0}</p>
              <h3>Listings for Sale</h3>
            </div>
            <div class="listing-summary">
              <p>{agent._metadata?.activeRentListingCount || 0}</p>
              <h3>Listings for Rent</h3>
            </div>
            <div class="listing-summary">
              <p>{agent._metadata?.activeAuctionListingCount || 0}</p>
              <h3>Listings for Auction</h3>
            </div>
          </div>
        </div>


        <div class="listings-section">
            <h2>{name}'s Listings</h2>

            <div class="tabs-container">
              <button class="tab active" data-tab="all">All Listings</button>
              <button class="tab" data-tab="sale">For Sale</button>
              <button class="tab" data-tab="rent">For Rent</button>
              <button class="tab" data-tab="auction">For Auction</button>
            </div>

            <div class="search-filter-container">
              <div class="listing-count" id="listing-count">
                Showing {agent.listings?.length || 0} of {agent._metadata?.activeListingCount || 0} Listings
              </div>

              <div class="search-filter-wrapper">
                <div class="search-input-container">
                  <span class="search-icon">🔍</span>
                  <input
                    type="text"
                    class="search-input"
                    placeholder="Property Name...."
                    id="search-input"
                  />
                </div>
                <button class="filter-button" id="filter-button">
                  🎛️ Filter
                  <span class="filter-badge" id="filter-badge" style="display: none;">0</span>
                </button>
              </div>
            </div>

            <div id="listings-container">
              <div class="listings-grid">
                {agent.listings && agent.listings.length > 0 ? (
                  agent.listings.map((listing) => {
                    const priceObject = listing.sale || listing.rent || listing.auction || null;
                    const formattedPrice = priceObject?.price?.text || '-';
                    const psf = priceObject?.perSize?.text || '-';
                    const propertyType = listing.type?.name || '';
                    const listingHref = `https://www.propertygenie.com.my/property/${listing.slug}`;

                    return (
                      <a class="listing-card" key={listing.id} href={listingHref} target="_blank" rel="noopener noreferrer">
                        <img
                          src={listing.image?.medium?.src || '/amenties-placeholder.png'}
                          alt={listing.name}
                        />
                        {propertyType && (
                          <div class="property-type-badge" style={`background-color: ${getPropertyTypeColor(propertyType)};`}>
                            {propertyType}
                          </div>
                        )}
                        <div class="action-buttons">
                          <button class="action-button" data-action="share" data-slug={listing.slug} onclick="handleShare(event, '{listing.slug}', '{listing.name}')">
                            📤
                          </button>
                        </div>
                        <div class="listing-overlay">
                          <h3>{listing.name}</h3>
                          <p>{listing.city?.name}, {listing.postcode}, {listing.state?.name}</p>
                          <div class="listing-details">
                            <div class="listing-detail-item">
                              🛏️ {listing.room?.bed?.text || listing.room?.bedroom || 0}
                            </div>
                            <div class="listing-detail-item">
                              🚿 {listing.room?.bath?.text || listing.room?.bathroom || 0}
                            </div>
                            <div class="listing-detail-item">
                              📏 {listing.size?.floor?.text || listing.size?.land?.text || '-'}
                            </div>
                            <div class="listing-detail-item">
                              📐 {psf}
                            </div>
                          </div>
                          <p class="listing-price">
                            {formattedPrice}
                          </p>
                        </div>
                      </a>
                    );
                  })
                ) : (
                  <div class="empty-state">No listings available</div>
                )}
              </div>
            </div>
          </div>
          </main>

        {/* Loading Overlay */}
        <div class="loading-overlay hidden" id="loading-overlay">
          <div class="spinner-ring"></div>
          <div class="loading-text">Loading</div>
        </div>

        {/* Footer */}
        <footer class="footer">
          <div class="footer-container">
            <div class="footer-content">
              <p>&copy; {new Date().getFullYear()} {publisherName}. All rights reserved.</p>
              <p>Powered by PropertyGenie</p>
            </div>
          </div>
        </footer>

        {/* Filter Modal */}
        <div class="modal-overlay" id="filter-modal">
          <div class="modal-container">
            <div class="modal-header">
              <h2 class="modal-title">
                🎛️ Filter Properties
              </h2>
              <button class="close-button" id="close-modal">
                ✕
              </button>
            </div>

            <div class="modal-content">
              <div class="filter-section">
                <h3 class="section-title">Price Range</h3>
                <div class="price-inputs">
                  <div class="price-input-wrapper">
                    <label class="price-label">Minimum Price</label>
                    <select class="price-select" id="min-price">
                      <option value="">Any</option>
                      <option value="50000">RM 50,000</option>
                      <option value="100000">RM 100,000</option>
                      <option value="200000">RM 200,000</option>
                      <option value="300000">RM 300,000</option>
                      <option value="400000">RM 400,000</option>
                      <option value="500000">RM 500,000</option>
                      <option value="600000">RM 600,000</option>
                      <option value="700000">RM 700,000</option>
                      <option value="800000">RM 800,000</option>
                      <option value="900000">RM 900,000</option>
                      <option value="1000000">RM 1,000,000</option>
                      <option value="1500000">RM 1,500,000</option>
                      <option value="2000000">RM 2,000,000</option>
                    </select>
                  </div>
                  <div class="price-input-wrapper">
                    <label class="price-label">Maximum Price</label>
                    <select class="price-select" id="max-price">
                      <option value="">Any</option>
                      <option value="100000">RM 100,000</option>
                      <option value="200000">RM 200,000</option>
                      <option value="300000">RM 300,000</option>
                      <option value="400000">RM 400,000</option>
                      <option value="500000">RM 500,000</option>
                      <option value="600000">RM 600,000</option>
                      <option value="700000">RM 700,000</option>
                      <option value="800000">RM 800,000</option>
                      <option value="900000">RM 900,000</option>
                      <option value="1000000">RM 1,000,000</option>
                      <option value="1500000">RM 1,500,000</option>
                      <option value="2000000">RM 2,000,000</option>
                      <option value="3000000">RM 3,000,000</option>
                      <option value="5000000">RM 5,000,000</option>
                      <option value="10000000">RM 10,000,000</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="filter-section">
                <h3 class="section-title">Property Type</h3>
                <div id="property-type-container"></div>
              </div>

              <div class="filter-section">
                <h3 class="section-title">Bedrooms</h3>
                <div class="filter-grid" id="bedrooms-grid"></div>
              </div>

              <div class="filter-section">
                <h3 class="section-title">Bathrooms</h3>
                <div class="filter-grid" id="bathrooms-grid"></div>
              </div>

              <div class="filter-section">
                <h3 class="section-title">Tenure</h3>
                <div class="filter-grid" id="tenure-grid"></div>
              </div>

              <div class="filter-section">
                <h3 class="section-title">Floor Level</h3>
                <div class="filter-grid" id="floor-level-grid"></div>
              </div>

              <div class="filter-section">
                <h3 class="section-title">Furnishing</h3>
                <div class="filter-grid" id="furnishing-grid"></div>
              </div>
            </div>
            

            <div class="modal-footer">
              <button class="footer-button outline" id="clear-filters">Clear All</button>
              <button class="footer-button primary" id="apply-filters">Find Properties</button>
            </div>
          </div>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            const initialData = {
              accountId: '${accountId}',
              accountSlug: '${agent.slug}',
              apiBaseUrl: window.location.hostname === 'localhost' ? 'http://localhost:22080' : 'https://api.propertygenie.com.my',
              listings: ${JSON.stringify(agent.listings || [])},
              metadata: ${JSON.stringify(agent._metadata || {})},
              commonData: ${JSON.stringify(commonData || {})}
            };

            let currentTab = 'all';
            let currentPage = 1;
            let isLoading = false;
            let searchKeyword = '';
            let filterTypes = {};
            let currentListings = initialData.listings;
            let totalCount = initialData.metadata.activeListingCount || 0;
            let searchTimeout = null;

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

            function updateListingCount(showing, total) {
              const countEl = document.getElementById('listing-count');
              if (countEl) {
                countEl.textContent = \`Showing \${showing} of \${total} Listings\`;
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

            // Property type color helper
            function getPropertyTypeColor(typeName) {
              const colorMap = {
                'Condominium': '#6366f1',
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
              return colorMap[typeName] || '#6366f1';
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

            function renderListings(listings, pagination = null) {
              const container = document.getElementById('listings-container');
              currentListings = listings;

              // Update listing count
              const showing = listings?.length || 0;
              const total = pagination?.totalCount || totalCount;
              updateListingCount(showing, total);

              if (!listings || listings.length === 0) {
                container.innerHTML = \`
                  <div class="empty-item-box">
                    <div class="empty-image-container">
                      <img src="/images/not-found.png" alt="No results found" />
                    </div>
                    <h2 class="empty-title">No result found</h2>
                    <p class="empty-description">There are no property listing.</p>
                    <button class="empty-button" onclick="window.location.reload()">Refresh</button>
                  </div>
                \`;
                return;
              }

              const listingsHtml = listings.map(listing => {
                const image = listing.image?.medium?.src || '/amenties-placeholder.png';
                const priceObject = listing.sale || listing.rent || listing.auction || null;
                const price = priceObject?.price?.text || '-';
                const psf = priceObject?.perSize?.text || '-';
                const propertyType = listing.type?.name || '';
                const propertyTypeColor = getPropertyTypeColor(propertyType);
                const listingUrl = \`https://www.propertygenie.com.my/property/\${listing.slug}\`;
                const bed = listing.room?.bed?.text || listing.room?.bedroom || 0;
                const bath = listing.room?.bath?.text || listing.room?.bathroom || 0;
                const size = listing.size?.floor?.text || listing.size?.land?.text || '-';

                return \`
                  <a class="listing-card" href="\${listingUrl}" target="_blank" rel="noopener noreferrer">
                    <img src="\${image}" alt="\${listing.name}" />
                    \${propertyType ? \`<div class="property-type-badge" style="background-color: \${propertyTypeColor};">\${propertyType}</div>\` : ''}
                    <div class="action-buttons">
                      <button class="action-button" onclick="handleShare(event, '\${listing.slug}', '\${listing.name.replace(/'/g, "\\'")}')">
                        📤
                      </button>
                    </div>
                    <div class="listing-overlay">
                      <h3>\${listing.name}</h3>
                      <p>\${listing.city?.name || '-'}, \${listing.postcode || '-'}, \${listing.state?.name || '-'}</p>
                      <div class="listing-details">
                        <div class="listing-detail-item">
                          🛏️ \${bed}
                        </div>
                        <div class="listing-detail-item">
                          🚿 \${bath}
                        </div>
                        <div class="listing-detail-item">
                          📏 \${size}
                        </div>
                        <div class="listing-detail-item">
                          📐 \${psf}
                        </div>
                      </div>
                      <p class="listing-price">\${price}</p>
                    </div>
                  </a>
                \`;
              }).join('');

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
                renderListings(data.items || [], data.pagination);
              } catch (error) {
                console.error('Error fetching listings:', error);
                container.innerHTML = \`
                  <div class="empty-item-box">
                    <div class="empty-image-container">
                      <img src="/images/not-found.png" alt="Error" />
                    </div>
                    <h2 class="empty-title">Failed to load listings</h2>
                    <p class="empty-description">Please try again later.</p>
                    <button class="empty-button" onclick="window.location.reload()">Refresh</button>
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

                  // Fetch with search keyword
                  if (currentTab === 'all' && !value && Object.keys(filterTypes).length === 0) {
                    // If no search and no filters on 'all' tab, use initial data
                    renderListings(initialData.listings);
                  } else {
                    fetchListings(currentTab, currentPage);
                  }
                }, 600);
              });
            }

            // Initialize filter options from commonData
            function initializeFilterOptions() {
              const commonData = initialData.commonData;
              if (!commonData || !commonData.filter) return;

              // Render Property Types with Categories
              const propertyTypeContainer = document.getElementById('property-type-container');
              const categories = commonData.filter.category?.items || [];
              if (propertyTypeContainer && categories.length > 0) {
                const categoriesHtml = categories.map(category => {
                  const categoryCode = category.code;
                  const categoryName = category.name;
                  const types = category.types?.items || [];

                  if (types.length === 0) return '';

                  const typesHtml = types.map(type => {
                    return \`<button class="filter-option" data-type="propertyType" data-value="\${type.code}">\${type.name}</button>\`;
                  }).join('');

                  return \`
                    <div class="property-category">
                      <div class="category-header" onclick="toggleCategory('\${categoryCode}')">
                        <input type="checkbox" class="category-checkbox" data-category="\${categoryCode}" onclick="handleCategoryCheckbox(event, '\${categoryCode}')">
                        <span class="category-title">\${categoryName}</span>
                      </div>
                      <div class="category-types" id="category-\${categoryCode}">
                        \${typesHtml}
                      </div>
                    </div>
                  \`;
                }).join('');
                propertyTypeContainer.innerHTML = categoriesHtml;
              }

              // Render bedrooms
              const bedroomsGrid = document.getElementById('bedrooms-grid');
              const bedrooms = commonData.filter.bedRoom?.items || [];
              if (bedroomsGrid && bedrooms.length > 0) {
                bedroomsGrid.innerHTML = bedrooms.map(item => {
                  const name = item.name || item.value;
                  const value = item.value;
                  return \`<button class="filter-option" data-type="bedroom" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render bathrooms
              const bathroomsGrid = document.getElementById('bathrooms-grid');
              const bathrooms = commonData.filter.bathRoom?.items || [];
              if (bathroomsGrid && bathrooms.length > 0) {
                bathroomsGrid.innerHTML = bathrooms.map(item => {
                  const name = item.name || item.value;
                  const value = item.value;
                  return \`<button class="filter-option" data-type="bathroom" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render tenure
              const tenureGrid = document.getElementById('tenure-grid');
              const tenures = commonData.filter.tenure?.items || [];
              if (tenureGrid && tenures.length > 0) {
                tenureGrid.innerHTML = tenures.map(item => {
                  const name = item.name || item.value;
                  const value = item.code || item.value;
                  return \`<button class="filter-option" data-type="tenure" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render floor levels
              const floorLevelGrid = document.getElementById('floor-level-grid');
              const floorLevels = commonData.filter.floorLevel?.items || [];
              if (floorLevelGrid && floorLevels.length > 0) {
                floorLevelGrid.innerHTML = floorLevels.map(item => {
                  const name = item.name || item.value;
                  const value = item.code || item.value;
                  return \`<button class="filter-option" data-type="floorLevel" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Render furnishing
              const furnishingGrid = document.getElementById('furnishing-grid');
              const furnishings = commonData.filter.furnishing?.items || [];
              if (furnishingGrid && furnishings.length > 0) {
                furnishingGrid.innerHTML = furnishings.map(item => {
                  const name = item.name || item.value;
                  const value = item.code || item.value;
                  return \`<button class="filter-option" data-type="furnishing" data-value="\${value}">\${name}</button>\`;
                }).join('');
              }

              // Add click handlers for filter options
              document.querySelectorAll('.filter-option').forEach(option => {
                option.addEventListener('click', (e) => {
                  e.currentTarget.classList.toggle('selected');
                });
              });
            }

            // Handle category checkbox
            window.handleCategoryCheckbox = function(event, categoryCode) {
              event.stopPropagation();
              const checkbox = event.target;
              const categoryTypes = document.querySelectorAll(\`#category-\${categoryCode} .filter-option\`);

              categoryTypes.forEach(typeBtn => {
                if (checkbox.checked) {
                  typeBtn.classList.add('selected');
                } else {
                  typeBtn.classList.remove('selected');
                }
              });
            };

            // Toggle category visibility (optional collapse feature)
            window.toggleCategory = function(categoryCode) {
              // You can add collapse/expand functionality here if needed
            };

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
                const minPrice = document.getElementById('min-price').value;
                const maxPrice = document.getElementById('max-price').value;

                const selectedPropertyTypes = Array.from(
                  document.querySelectorAll('.filter-option[data-type="propertyType"].selected')
                ).map(el => el.dataset.value).filter(v => v && v !== 'undefined');

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
                filterTypes = {};
                if (minPrice) filterTypes.minPrice = parseInt(minPrice);
                if (maxPrice) filterTypes.maxPrice = parseInt(maxPrice);
                if (selectedPropertyTypes.length > 0) filterTypes.types = selectedPropertyTypes;
                if (selectedBedrooms.length > 0) filterTypes.bedRooms = selectedBedrooms;
                if (selectedBathrooms.length > 0) filterTypes.bathRooms = selectedBathrooms;
                if (selectedTenures.length > 0) filterTypes.tenures = selectedTenures;
                if (selectedFloorLevels.length > 0) filterTypes.floorLevels = selectedFloorLevels;
                if (selectedFurnishings.length > 0) filterTypes.furnishings = selectedFurnishings;

                // Update badge count
                const filterCount = Object.keys(filterTypes).length;
                updateFilterBadge(filterCount);

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

                // Clear all category checkboxes
                document.querySelectorAll('.category-checkbox').forEach(checkbox => {
                  checkbox.checked = false;
                });

                // Clear filter object
                filterTypes = {};
                updateFilterBadge(0);

                // Close modal and reset to initial data
                closeModal();
                currentPage = 1;
                searchKeyword = '';
                document.getElementById('search-input').value = '';

                if (currentTab === 'all') {
                  renderListings(initialData.listings);
                } else {
                  fetchListings(currentTab, currentPage);
                }
              });
            }

            // Initialize filter options on page load
            initializeFilterOptions();

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

                // Use initial data for 'all' tab if no search/filters, fetch for others
                if (tabType === 'all' && !searchKeyword && Object.keys(filterTypes).length === 0) {
                  renderListings(initialData.listings);
                } else {
                  fetchListings(tabType, currentPage);
                }
              });
            });
          `
        }} />
      </body>
    </html>
  );
};
