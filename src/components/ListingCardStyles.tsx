import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

/**
 * ListingCard Styles Component
 * Provides CSS styling for property listing cards
 * Used for both server-side and client-side rendered listing cards
 */
export const ListingCardStyles: FC = () => {
  return (
    <Style>{css`
      /* Listings Grid */
      .listings-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1rem;
        margin-top: 2rem;
      }

      /* Listing Card */
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

      /* Action Buttons */
      .action-buttons {
        position: absolute;
        top: 12px;
        right: 12px;
        display: none; /* Temporarily hidden */
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

      /* Property Type Badge */
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

      /* Listing Overlay */
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

      /* Listing Details */
      .listing-details {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
        margin: 0.5rem 0;
      }

      .listing-detail-item {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
      }

      p.listing-price {
        font-size: 1.3rem;
        font-weight: 600;
        margin-top: 0.5rem;
      }

      /* Responsive Styles */
      @media (max-width: 1200px) {
        .listings-grid {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 768px) {
        .listings-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 480px) {
        .listings-grid {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    `}</Style>
  );
};
