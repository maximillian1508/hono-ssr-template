import type { FC } from 'hono/jsx';
import { css, Style } from 'hono/css';

interface FilterModalProps {
  commonData: any;
}

/**
 * Filter Modal Component for Property Listings
 * Provides filtering by price, property type, bedrooms, bathrooms, etc.
 */
export const FilterModal: FC<FilterModalProps> = ({ commonData }) => {
  return (
    <>
      <Style>{css`
        /* Filter Modal Styles */
        .filter-modal-overlay {
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

        .filter-modal-overlay.active {
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

        .filter-modal-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 900px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          animation: slideIn 0.3s ease-out;
        }

        .filter-modal-header {
          padding: 24px 24px 16px;
          border-bottom: 1px solid #f1f1f1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: white;
          z-index: 10;
          border-radius: 16px 16px 0 0;
        }

        .filter-modal-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .filter-modal-close-button {
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          color: #6b7280;
          transition: all 0.2s;
        }

        .filter-modal-close-button:hover {
          background: #f3f4f6;
          color: #000;
        }

        .filter-modal-content {
          padding: 24px 24px 0 24px;
          overflow-y: auto;
          flex: 1;
          overscroll-behavior: contain;
        }

        .filter-modal-section {
          margin-bottom: 2rem;
        }

        .filter-modal-section-title {
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

        .filter-modal-price-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .filter-modal-price-input-wrapper {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-modal-price-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #111827;
        }

        .filter-modal-price-select {
          padding: 0.75rem 1rem;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.875rem;
          background: white;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-modal-price-select:focus {
          outline: none;
          border-color: #3462F4;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }

        .filter-modal-footer {
          padding: 1.25rem 1.5rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          gap: 0.75rem;
        }

        .filter-modal-footer-button {
          flex: 1;
          padding: 0.875rem 1.5rem;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          border: none;
        }

        .filter-modal-footer-button.outline {
          background: white;
          color: #3462F4;
          border: 1.5px solid #3462F4;
        }

        .filter-modal-footer-button.outline:hover {
          background: #eef2ff;
        }

        .filter-modal-footer-button.primary {
          background: #3462F4;
          color: white;
        }

        .filter-modal-footer-button.primary:hover {
          background: #5558eb;
        }

        /* Property Type Category Styles */
        .filter-modal-property-category-label {
          font-size: 0.875rem;
          color: #666;
          margin-bottom: 0.75rem;
          margin-top: 0.5rem;
        }

        .filter-modal-checkbox-section {
          max-height: 300px;
          overflow-y: auto;
        }

        .filter-modal-checkbox-section::-webkit-scrollbar {
          width: 6px;
        }

        .filter-modal-checkbox-section::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 3px;
        }

        .filter-modal-checkbox-section::-webkit-scrollbar-thumb {
          background: #3462F4;
          border-radius: 3px;
        }

        .filter-modal-checkbox-group {
          margin-bottom: 1rem;
        }

        .filter-modal-parent-checkbox-label {
          display: flex;
          align-items: center;
          font-weight: 600;
          font-size: 0.875rem;
          color: #111827;
          margin: 0.5rem 0;
          cursor: pointer;
        }

        .filter-modal-parent-checkbox-label:hover {
          color: #3462F4;
        }

        .filter-modal-child-checkbox-label {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin: 0.375rem 0 0.375rem 1.75rem;
          cursor: pointer;
        }

        .filter-modal-child-checkbox-label:hover {
          color: #3462F4;
        }

        .filter-modal-styled-checkbox {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 4px;
          border: 1.5px solid #6b7280;
          margin-right: 10px;
          background-color: transparent;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .filter-modal-styled-checkbox.checked {
          border-color: #3462F4;
          background-color: #3462F4;
        }

        .filter-modal-styled-checkbox.checked::after {
          content: '✓';
          color: white;
          font-size: 14px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .filter-modal-container {
            width: 100%;
            max-width: 100%;
            border-radius: 0;
            max-height: 100vh;
          }

          .filter-modal-header {
            padding: 16px;
            border-radius: 0;
          }

          .filter-modal-content {
            padding: 16px 16px 0 16px;
          }

          .filter-modal-footer {
            padding: 12px 16px;
          }

          .filter-modal-price-inputs {
            grid-template-columns: 1fr;
          }

          .filter-modal-checkbox-section {
            max-height: 250px;
          }

          .filter-modal-child-checkbox-label {
            margin-left: 1.5rem;
          }
        }
      `}</Style>

      {/* Filter Modal */}
      <div class="filter-modal-overlay" id="filter-modal">
        <div class="filter-modal-container">
          <div class="filter-modal-header">
            <h2 class="filter-modal-title">
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="TuneIcon" style="font-size: 20px; fill: #000000; vertical-align: middle; margin-right: 8px;"><path d="M3 17v2h6v-2zM3 5v2h10V5zm10 16v-2h8v-2h-8v-2h-2v6zM7 9v2H3v2h4v2h2V9zm14 4v-2H11v2zm-6-4h2V7h4V5h-4V3h-2z"></path></svg>
              Filter Properties
            </h2>
            <button class="filter-modal-close-button" id="close-modal" aria-label="Close Filter Modal">
              <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon" style="font-size: 20px;"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
            </button>
          </div>

          <div class="filter-modal-content">
            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Price Range</h3>
              <div class="filter-modal-price-inputs">
                <div class="filter-modal-price-input-wrapper">
                  <label class="filter-modal-price-label">Minimum Price</label>
                  <select class="filter-modal-price-select" id="min-price">
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
                <div class="filter-modal-price-input-wrapper">
                  <label class="filter-modal-price-label">Maximum Price</label>
                  <select class="filter-modal-price-select" id="max-price">
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

            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Property Type</h3>
              <div class="filter-grid" id="property-type-grid"></div>
            </div>

            <div class="filter-modal-section" id="property-categories-section" style="display: none;">
              <h3 class="filter-modal-section-title">Property Categories</h3>
              <div class="filter-modal-property-category-label">Select Property Types</div>
              <div class="filter-modal-checkbox-section" id="property-categories-container"></div>
            </div>

            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Bedrooms</h3>
              <div class="filter-grid" id="bedrooms-grid"></div>
            </div>

            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Bathrooms</h3>
              <div class="filter-grid" id="bathrooms-grid"></div>
            </div>

            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Tenure</h3>
              <div class="filter-grid" id="tenure-grid"></div>
            </div>

            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Floor Level</h3>
              <div class="filter-grid" id="floor-level-grid"></div>
            </div>

            <div class="filter-modal-section">
              <h3 class="filter-modal-section-title">Furnishing</h3>
              <div class="filter-grid" id="furnishing-grid"></div>
            </div>
          </div>


          <div class="filter-modal-footer">
            <button class="filter-modal-footer-button outline" id="clear-filters" aria-label="Clear All Filters">Clear All</button>
            <button class="filter-modal-footer-button primary" id="apply-filters" aria-label="Apply Filters">Find Properties</button>
          </div>
        </div>
      </div>
    </>
  );
};
