/**
 * Agent-specific API utility functions
 * Matches the Next.js implementation for agent profiles
 */

const DEFAULT_API_BASE = 'https://api.propertygenie.com.my';

export interface AgentContact {
  value: string;
  type: {
    code: string;
  } | string;
}

export interface AgentMetadata {
  activeListingCount?: number;
  activeSaleListingCount?: number;
  activeRentListingCount?: number;
  activeAuctionListingCount?: number;
  mobileVerify?: boolean;
  renVerify?: boolean;
}

export interface AgentProfile {
  id: string;
  name: string;
  slug: string;
  description?: string;
  licenseNumber?: string;
  publisherName?: string;
  publisherRegistrationNumber?: string;
  contacts?: AgentContact[];
  image?: {
    medium?: {
      src?: string;
    };
  };
  metadata?: AgentMetadata;
}

export interface AgentListing {
  id: string;
  title: string;
  description?: string;
  price: string;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  images: string[];
  featured?: boolean;
  sale?: any;
  rent?: any;
  auction?: any;
  wishlist?: boolean;
}

export interface AgentListingsResponse {
  items: AgentListing[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Fetch agent profile by slug
 * Matches: GET /v1/account/${slug}
 */
export async function fetchAgentProfileBySlug(
  slug: string,
  apiBaseUrl?: string,
  authToken?: string
): Promise<AgentProfile> {
  const baseUrl = apiBaseUrl || DEFAULT_API_BASE;
  const headers: Record<string, string> = {};

  if (authToken) {
    headers['x-auth-token'] = authToken;
  }

  const response = await fetch(`${baseUrl}/v1/account/${slug}`, {
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch agent profile: ${response.statusText}`);
  }

  const data = await response.json();
  return data.item || data;
}

/**
 * Fetch sale listings for an agent
 * Matches: GET /v1/agent/${slug}/listings (sale)
 */
export async function fetchAgentSaleListings(
  slug: string,
  options?: {
    page?: number;
    limit?: number;
    keyword?: string;
    types?: any;
  },
  apiBaseUrl?: string,
  authToken?: string
): Promise<AgentListingsResponse> {
  const baseUrl = apiBaseUrl || DEFAULT_API_BASE;
  const params = new URLSearchParams();

  if (options?.page) params.append('page', options.page.toString());
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.keyword) params.append('keyword', options.keyword);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['x-auth-token'] = authToken;
  }

  const url = `${baseUrl}/v1/agent/${slug}/sale-listings?${params.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      keyword: options?.keyword || '',
      ...options?.types,
      types: [],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sale listings: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    items: data.items || [],
    total: data.pagination?.total || 0,
    page: data.pagination?.page || 1,
    limit: data.pagination?.limit || 12,
  };
}

/**
 * Fetch rent listings for an agent
 */
export async function fetchAgentRentListings(
  slug: string,
  options?: {
    page?: number;
    limit?: number;
    keyword?: string;
    types?: any;
  },
  apiBaseUrl?: string,
  authToken?: string
): Promise<AgentListingsResponse> {
  const baseUrl = apiBaseUrl || DEFAULT_API_BASE;
  const params = new URLSearchParams();

  if (options?.page) params.append('page', options.page.toString());
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.keyword) params.append('keyword', options.keyword);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['x-auth-token'] = authToken;
  }

  const url = `${baseUrl}/v1/agent/${slug}/rent-listings?${params.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      keyword: options?.keyword || '',
      ...options?.types,
      types: [],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch rent listings: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    items: data.items || [],
    total: data.pagination?.total || 0,
    page: data.pagination?.page || 1,
    limit: data.pagination?.limit || 12,
  };
}

/**
 * Fetch auction listings for an agent
 */
export async function fetchAgentAuctionListings(
  slug: string,
  options?: {
    page?: number;
    limit?: number;
    keyword?: string;
    types?: any;
  },
  apiBaseUrl?: string,
  authToken?: string
): Promise<AgentListingsResponse> {
  const baseUrl = apiBaseUrl || DEFAULT_API_BASE;
  const params = new URLSearchParams();

  if (options?.page) params.append('page', options.page.toString());
  if (options?.limit) params.append('limit', options.limit.toString());
  if (options?.keyword) params.append('keyword', options.keyword);

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['x-auth-token'] = authToken;
  }

  const url = `${baseUrl}/v1/agent/${slug}/auction-listings?${params.toString()}`;

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      keyword: options?.keyword || '',
      ...options?.types,
      types: [],
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch auction listings: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    items: data.items || [],
    total: data.pagination?.total || 0,
    page: data.pagination?.page || 1,
    limit: data.pagination?.limit || 12,
  };
}

/**
 * Helper function to get agent contact value by type
 */
export function getAgentContact(
  contacts: AgentContact[] = [],
  typeCode: string
): string {
  const contact = contacts.find((item) => {
    const type = typeof item.type === 'string' ? item.type : item.type?.code;
    return type === typeCode;
  });
  return contact?.value || '';
}

/**
 * Helper to get license label (REN/REA/PEA)
 */
export function getLicenseLabel(licenseNumber?: string): string {
  if (!licenseNumber) return 'License No.';

  const upperLicense = licenseNumber.toUpperCase();
  if (upperLicense.includes('REN')) return 'REN:';
  if (upperLicense.includes('REA')) return 'REA:';
  if (upperLicense.includes('PEA')) return 'PEA:';

  return 'License No.:';
}

/**
 * Helper to format contact number (hide middle digits for non-authenticated users)
 */
export function formatContactNumber(contact: string, hideDigits: boolean = true): string {
  if (!hideDigits || !contact) return contact;

  // Format: +60123456789 -> +6012****789
  if (contact.length > 6) {
    const prefix = contact.slice(0, -6);
    const suffix = contact.slice(-3);
    return `${prefix}****${suffix}`;
  }

  return contact;
}
