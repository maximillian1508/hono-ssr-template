import type { FC } from 'hono/jsx';

interface ListingCardProps {
  listing: any;
  onShareClick?: string; // JavaScript onclick handler as string
}

/**
 * ListingCard Component
 * Displays a property listing card with image, details, and actions
 */
export const ListingCard: FC<ListingCardProps> = ({ listing, onShareClick }) => {
  // Helper to check if object has properties
  const isNotEmpty = (obj: any) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

  // Get price object - prioritize sale, then rent, then auction
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

  const bed = listing.room?.bed?.text || listing.room?.bedroom || 0;
  const bath = listing.room?.bath?.text || listing.room?.bathroom || 0;
  const size = listing.size?.floor?.text || listing.size?.land?.text || '-';

  return (
    <a class="listing-card" href={listingHref} target="_blank" rel="noopener noreferrer">
      <img
        src={listing.image?.medium?.src || '/images/amenties-placeholder.png'}
        alt={listing.name}
      />
      {propertyType && (
        <div class="property-type-badge" style={`background-color: ${getPropertyTypeColor(propertyType)};`}>
          {propertyType}
        </div>
      )}
      <div class="action-buttons">
        <button
          class="action-button"
          data-action="share"
          data-slug={listing.slug}
          onclick={onShareClick || `handleShare(event, '${listing.slug}', '${listing.name.replace(/'/g, "\\'")}')`}
        >
          📤
        </button>
      </div>
      <div class="listing-overlay">
        <h3>{listing.name}</h3>
        <p>{listing.city?.name}, {listing.postcode}, {listing.state?.name}</p>
        <div class="listing-details">
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="BedIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;">
              <path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6h2v-2h16v2h2v-6c0-.88-.39-1.67-1-2.22M14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1M5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5z"></path>
            </svg>
            {bed}
          </div>
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShowerIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;">
              <circle cx="8" cy="17" r="1"></circle>
              <circle cx="12" cy="17" r="1"></circle>
              <circle cx="16" cy="17" r="1"></circle>
              <path d="M13 5.08V3h-2v2.08C7.61 5.57 5 8.47 5 12v2h14v-2c0-3.53-2.61-6.43-6-6.92"></path>
              <circle cx="8" cy="20" r="1"></circle>
              <circle cx="12" cy="20" r="1"></circle>
              <circle cx="16" cy="20" r="1"></circle>
            </svg>
            {bath}
          </div>
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SquareFootIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;">
              <path d="m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"></path>
            </svg>
            {size}
          </div>
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SquareFootIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;">
              <path d="m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"></path>
            </svg>
            {psf}
          </div>
        </div>
        <p class="listing-price">
          {formattedPrice}
        </p>
      </div>
    </a>
  );
};

/**
 * Helper function to generate listing card HTML for client-side rendering
 * Returns an HTML string that can be used in client-side JavaScript
 */
export function generateListingCardHTML(listing: any): string {
  // Helper to check if object has properties
  const isNotEmpty = (obj: any) => obj && typeof obj === 'object' && Object.keys(obj).length > 0;

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

  const propertyTypeColors: Record<string, string> = {
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
  const listingUrl = `https://www.propertygenie.com.my/property/${listing.slug}`;
  const image = listing.image?.medium?.src || '/images/amenties-placeholder.png';
  const bed = listing.room?.bed?.text || listing.room?.bedroom || 0;
  const bath = listing.room?.bath?.text || listing.room?.bathroom || 0;
  const size = listing.size?.floor?.text || listing.size?.land?.text || '-';

  return `
    <a class="listing-card" href="${listingUrl}" target="_blank" rel="noopener noreferrer">
      <img src="${image}" alt="${listing.name}" />
      ${propertyType ? `<div class="property-type-badge" style="background-color: ${propertyTypeColor};">${propertyType}</div>` : ''}
      <div class="action-buttons">
        <button class="action-button" onclick="handleShare(event, '${listing.slug}', '${listing.name.replace(/'/g, "\\'")}')">
          📤
        </button>
      </div>
      <div class="listing-overlay">
        <h3>${listing.name}</h3>
        <p>${listing.city?.name || '-'}, ${listing.postcode || '-'}, ${listing.state?.name || '-'}</p>
        <div class="listing-details">
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="BedIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><path d="M21 10.78V8c0-1.65-1.35-3-3-3h-4c-.77 0-1.47.3-2 .78-.53-.48-1.23-.78-2-.78H6C4.35 5 3 6.35 3 8v2.78c-.61.55-1 1.34-1 2.22v6h2v-2h16v2h2v-6c0-.88-.39-1.67-1-2.22M14 7h4c.55 0 1 .45 1 1v2h-6V8c0-.55.45-1 1-1M5 8c0-.55.45-1 1-1h4c.55 0 1 .45 1 1v2H5z"></path></svg>
            ${bed}
          </div>
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ShowerIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><circle cx="8" cy="17" r="1"></circle><circle cx="12" cy="17" r="1"></circle><circle cx="16" cy="17" r="1"></circle><path d="M13 5.08V3h-2v2.08C7.61 5.57 5 8.47 5 12v2h14v-2c0-3.53-2.61-6.43-6-6.92"></path><circle cx="8" cy="20" r="1"></circle><circle cx="12" cy="20" r="1"></circle><circle cx="16" cy="20" r="1"></circle></svg>
            ${bath}
          </div>
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SquareFootIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><path d="m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"></path></svg>
            ${size}
          </div>
          <div class="listing-detail-item">
            <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="SquareFootIcon" style="width: 1em; height: 1em; margin-right: 4px; vertical-align: middle; fill: #ffffff;"><path d="m17.66 17.66-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L9.7 9.7l-1.06 1.06-.71-.71 1.06-1.06-1.94-1.94-1.06 1.06-.71-.71 1.06-1.06L4 4v14c0 1.1.9 2 2 2h14zM7 17v-5.76L12.76 17z"></path></svg>
            ${psf}
          </div>
        </div>
        <p class="listing-price">${price}</p>
      </div>
    </a>
  `;
}
