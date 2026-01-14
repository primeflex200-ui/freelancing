// API utility functions for handling different environments

/**
 * Get the base URL for API calls
 * In development: uses localhost
 * In production: uses the current domain (e.g., https://www.stackweb.net or https://freelancingma.vercel.app)
 */
export function getApiBaseUrl(): string {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    return 'http://localhost:5000';
  }
  
  // Check if we're on localhost (development)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:5000';
  }
  
  // For all production deployments (Vercel, custom domain, etc.)
  // Use the current domain
  const baseUrl = window.location.origin;
  
  // Debug logging (only in development)
  if (window.location.hostname === 'localhost') {
    console.log('API Base URL:', baseUrl);
  }
  
  return baseUrl;
}

/**
 * Create a full API URL from a relative path
 * @param path - The API path (e.g., '/api/projects')
 * @returns Full URL for the API endpoint
 */
export function createApiUrl(path: string): string {
  const baseUrl = getApiBaseUrl();
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const fullUrl = `${baseUrl}${cleanPath}`;
  
  // Debug logging (only in development)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('API URL:', fullUrl);
  }
  
  return fullUrl;
}

/**
 * Enhanced fetch function that automatically handles API URLs
 * @param endpoint - The endpoint type (e.g., 'projects', 'admin')
 * @param options - Fetch options
 * @returns Promise<Response>
 */
export async function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const url = createApiUrl(`/api?endpoint=${endpoint}`);
  
  // Debug logging (only in development)
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    console.log('Making API request to:', url);
  }
  
  return fetch(url, options);
}