// API utility functions for handling different environments

/**
 * Get the base URL for API calls
 * In development: uses localhost
 * In production: uses the current domain
 */
export function getApiBaseUrl(): string {
  // Check if we're in development mode
  if (import.meta.env.DEV) {
    return 'http://localhost:5000';
  }
  
  // In production, use the current domain
  return window.location.origin;
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
  return `${baseUrl}${cleanPath}`;
}

/**
 * Enhanced fetch function that automatically handles API URLs
 * @param path - The API path (e.g., '/api/projects')
 * @param options - Fetch options
 * @returns Promise<Response>
 */
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = createApiUrl(path);
  return fetch(url, options);
}