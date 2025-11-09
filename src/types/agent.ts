/**
 * Types for the agent profile API response
 */

export interface AgentApiResponse {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: {
    medium?: {
      src: string;
    };
  };
  licenseName?: string;
  licenseNumber?: string;
  contact?: {
    items: Array<{
      value: string;
      type: {
        code: string;
        name: string;
      };
    }>;
  };
  publisher?: {
    id: string;
    name: string;
    registrationNumber?: string;
  };
  _metadata?: {
    activeListingCount?: number;
    activeRentListingCount?: number;
    activeSaleListingCount?: number;
    activeAuctionListingCount?: number;
    isRenVerified?: boolean;
    isMobileVerified?: boolean;
  };
  galleryImages?: Array<{
    medium?: {
      src: string;
    };
  }>;
  listings?: Array<any>;
}

/**
 * Helper to get license label (REN/REA/PEA)
 */
export function getLicenseLabel(licenseNumber?: string): string {
  if (!licenseNumber) return 'License No.:';

  const upperLicense = licenseNumber.toUpperCase();
  if (upperLicense.includes('REN')) return 'REN:';
  if (upperLicense.includes('REA')) return 'REA:';
  if (upperLicense.includes('PEA')) return 'PEA:';

  return 'License No.:';
}

/**
 * Format contact number to always show masked version
 */
export function formatContactNumber(contact: string): string {
  if (!contact || contact.length <= 6) return contact;

  // Format: +60123456789 -> +6012****789
  const prefix = contact.slice(0, -6);
  const suffix = contact.slice(-3);
  return `${prefix}****${suffix}`;
}
