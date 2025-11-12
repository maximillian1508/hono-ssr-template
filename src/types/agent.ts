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
 * Helper to get license label (REN/REA/PEA/E)
 * @param licenseNumber - The license number to check
 * @param withNo - Whether to include "no:" suffix (default: true)
 */
export function getLicenseLabel(licenseNumber?: string, withNo: boolean = true): string {
  if (!licenseNumber || licenseNumber.trim() === '') {
    return withNo ? 'REN. no: -' : 'REN -';
  }

  const upperLicense = licenseNumber.toUpperCase();

  if (upperLicense.includes('PEA')) return withNo ? 'PEA. no:' : 'PEA';
  if (upperLicense.includes('REA')) return withNo ? 'REA. no:' : 'REA';
  if (upperLicense.includes('REN')) return withNo ? 'REN. no:' : 'REN';
  if (upperLicense.startsWith('E')) return withNo ? 'E. no:' : 'E';

  return withNo ? 'REN. no:' : 'REN';
}

/**
 * Format contact number to always show masked version
 * Masks the last 4 digits of the phone number
 */
export function formatContactNumber(number: string | null): string | undefined {
  if (number === null || !number) {
    return undefined;
  }

  // Replace last 4 digits with ****
  return number.replace(/\d{4}$/, '****');
}
