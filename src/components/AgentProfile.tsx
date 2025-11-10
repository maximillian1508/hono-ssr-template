import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';
import type { AgentApiResponse } from '../types/agent';
import { getLicenseLabel, formatContactNumber } from '../types/agent';
import { Header } from './Header';
import { HeaderCompensation } from './HeaderCompensation';

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
    return colorMap[typeName] || '#3462F4';
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
            align-items: center;
            text-align: center;
            height: 45vh;
            max-height: 400px;
            background-color: #3462F4;
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
            grid-area:image;
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
            border: 1px solid #3462F4;
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
            background-color: #3462F4;
            border-radius: 50%;
            color: white;
            text-align: center;
            line-height: 24px;
            font-size: 14px;
          }

          .details-container {
            margin-top: 175px;
            margin-left: 2rem;
            grid-area: details;
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
            padding: 0;
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
            color: #3462F4;
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
            padding: 0.75rem 1rem;
            background-color: #3462F4;
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
            border-color: #3462F4;
            background: #eef2ff;
          }

          .filter-option.selected {
            border-color: #3462F4;
            background: #eef2ff;
            color: #3462F4;
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
            border-color: #3462F4;
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
            color: #3462F4;
            border: 1.5px solid #3462F4;
          }

          .footer-button.outline:hover {
            background: #eef2ff;
          }

          .footer-button.primary {
            background: #3462F4;
            color: white;
          }

          .footer-button.primary:hover {
            background: #5558eb;
          }

          /* Share Modal Specific Styles */
          .share-modal-content {
            padding: 1.5rem;
          }

          .share-button-container {
            display: flex;
            flex-wrap: wrap;
            gap: 1.5rem;
            justify-content: center;
            margin: 1.5rem 0;
          }

          .share-button {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: transform 0.2s;
            background: none;
            border: none;
            padding: 0;
          }

          .share-button:hover {
            transform: scale(1.1);
          }

          .share-icon {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .share-icon svg {
            width: 24px;
            height: 24px;
            fill: white;
          }

          .share-label {
            font-size: 0.75rem;
            color: #666;
          }

          .share-divider {
            margin: 1.5rem 0;
            opacity: 1;
            border-color: #dddddd;
            position: relative;
            text-align: center;
          }

          .share-divider::before {
            content: 'OR';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 0 1rem;
            font-size: 0.875rem;
            color: #666;
          }

          .copy-link-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-top: 1rem;
          }

          .copy-link-text {
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
            color: #333;
          }

          .copy-link-box {
            display: flex;
            align-items: center;
            width: 100%;
            padding: 0.75rem 1rem;
            border: 1.5px solid #2c2c2c;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .copy-link-box:hover {
            background-color: #f9fafb;
          }

          .copy-link-url {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 0.875rem;
            color: #333;
          }

          .copy-icon {
            margin-left: 0.5rem;
            color: #3462F4;
            font-size: 1.25rem;
          }

          .toast {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            background-color: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10001;
            animation: slideUp 0.3s ease-out;
            display: none;
          }

          .toast.show {
            display: block;
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
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
            border-bottom-color: #3462F4;
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
        <Header />

        {/* Spacer for fixed header */}
        <HeaderCompensation />

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
                <button class="contact-btn" id="share-button">Share</button>
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
                    // Helper to check if object has properties
                    const isNotEmpty = (obj: any) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

                    // Get price object - prioritize sale, then rent, then auction (only if not empty)
                    const priceObject = isNotEmpty(listing.sale)
                      ? listing.sale
                      : isNotEmpty(listing.rent)
                      ? listing.rent
                      : isNotEmpty(listing.auction)
                      ? listing.auction
                      : null;
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

        {/* Share Modal */}
        <div class="modal-overlay" id="share-modal">
          <div class="modal-container" style="max-width: 500px;">
            <div class="modal-header">
              <h2 class="modal-title">Share Social</h2>
              <button class="close-button" id="close-share-modal">✕</button>
            </div>

            <div class="share-modal-content">
              <div class="share-button-container">
                {/* Facebook */}
                <button class="share-button" data-platform="facebook">
                  <div class="share-icon" style="background-color: #1877F2;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  <span class="share-label">Facebook</span>
                </button>

                {/* WhatsApp */}
                <button class="share-button" data-platform="whatsapp">
                  <div class="share-icon" style="background-color: #25D366;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <span class="share-label">WhatsApp</span>
                </button>

                {/* Telegram */}
                <button class="share-button" data-platform="telegram">
                  <div class="share-icon" style="background-color: #0088cc;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                    </svg>
                  </div>
                  <span class="share-label">Telegram</span>
                </button>

                {/* LinkedIn */}
                <button class="share-button" data-platform="linkedin">
                  <div class="share-icon" style="background-color: #0077B5;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <span class="share-label">LinkedIn</span>
                </button>

                {/* Line */}
                <button class="share-button" data-platform="line">
                  <div class="share-icon" style="background-color: #00B900;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                    </svg>
                  </div>
                  <span class="share-label">Line</span>
                </button>

                {/* Pinterest */}
                <button class="share-button" data-platform="pinterest">
                  <div class="share-icon" style="background-color: #E60023;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                    </svg>
                  </div>
                  <span class="share-label">Pinterest</span>
                </button>

                {/* Facebook Messenger */}
                <button class="share-button" data-platform="messenger">
                  <div class="share-icon" style="background-color: #0084FF;">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                    </svg>
                  </div>
                  <span class="share-label">Messenger</span>
                </button>
              </div>

              <hr class="share-divider" />

              <div class="copy-link-container">
                <div style="width: 100%;">
                  <p class="copy-link-text">Click Below To Copy Link</p>
                  <div class="copy-link-box" id="copy-link-btn">
                    <span class="copy-link-url" id="share-url"></span>
                    <span class="copy-icon">📋</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        <div class="toast" id="toast"></div>

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
              return colorMap[typeName] || '#3462F4';
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

                // Helper to check if object has properties
                const isNotEmpty = (obj) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

                // Get price object - prioritize sale, then rent, then auction (only if not empty)
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

            // ===== Share Modal Functionality =====
            const shareModal = document.getElementById('share-modal');
            const shareButton = document.getElementById('share-button');
            const closeShareModalBtn = document.getElementById('close-share-modal');
            const shareUrlElement = document.getElementById('share-url');
            const copyLinkBtn = document.getElementById('copy-link-btn');
            const toast = document.getElementById('toast');

            // Get current page URL
            const currentUrl = window.location.href;

            // Set the share URL
            if (shareUrlElement) {
              shareUrlElement.textContent = currentUrl;
            }

            // Show toast notification
            function showToast(message) {
              if (toast) {
                toast.textContent = message;
                toast.classList.add('show');
                setTimeout(() => {
                  toast.classList.remove('show');
                }, 3000);
              }
            }

            // Open share modal
            if (shareButton) {
              shareButton.addEventListener('click', () => {
                shareModal.classList.add('active');
                document.body.style.overflow = 'hidden';
              });
            }

            // Close share modal
            function closeShareModal() {
              shareModal.classList.remove('active');
              document.body.style.overflow = '';
            }

            if (closeShareModalBtn) {
              closeShareModalBtn.addEventListener('click', closeShareModal);
            }

            // Close on overlay click
            if (shareModal) {
              shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                  closeShareModal();
                }
              });
            }

            // Copy link functionality
            if (copyLinkBtn) {
              copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(currentUrl).then(() => {
                  showToast('Successfully Copy!');
                }).catch(err => {
                  console.error('Could not copy text:', err);
                  showToast('Failed to copy!');
                });
              });
            }

            // Share platform handlers
            const shareButtons = document.querySelectorAll('.share-button[data-platform]');
            const agentName = '${name.replace(/'/g, "\\'")}';
            const shareTitle = \`\${agentName} from ${publisherName.replace(/'/g, "\\'")}\`;

            shareButtons.forEach(button => {
              button.addEventListener('click', () => {
                const platform = button.dataset.platform;
                let shareUrl = '';

                switch (platform) {
                  case 'facebook':
                    shareUrl = \`https://www.facebook.com/sharer/sharer.php?u=\${encodeURIComponent(currentUrl)}\`;
                    break;
                  case 'whatsapp':
                    shareUrl = \`https://wa.me/?text=\${encodeURIComponent(shareTitle + ' - ' + currentUrl)}\`;
                    break;
                  case 'telegram':
                    shareUrl = \`https://t.me/share/url?url=\${encodeURIComponent(currentUrl)}&text=\${encodeURIComponent(shareTitle)}\`;
                    break;
                  case 'linkedin':
                    shareUrl = \`https://www.linkedin.com/sharing/share-offsite/?url=\${encodeURIComponent(currentUrl)}\`;
                    break;
                  case 'line':
                    shareUrl = \`https://social-plugins.line.me/lineit/share?url=\${encodeURIComponent(currentUrl)}\`;
                    break;
                  case 'pinterest':
                    shareUrl = \`https://pinterest.com/pin/create/button/?url=\${encodeURIComponent(currentUrl)}&description=\${encodeURIComponent(shareTitle)}\`;
                    break;
                  case 'messenger':
                    shareUrl = \`fb-messenger://share/?link=\${encodeURIComponent(currentUrl)}\`;
                    break;
                  default:
                    return;
                }

                // Close modal before opening share window
                closeShareModal();

                // Open share window
                window.open(shareUrl, '_blank', 'width=600,height=400');
              });
            });
          `
        }} />
      </body>
    </html>
  );
};
