/**
 * API Client with Auth0 Session Token Authentication
 * Automatically attaches Auth0 session token to all API requests
 * Uses ID token from Auth0 for user authentication
 */

export const API_URL = 'http://localhost:8000';

// Store the token getter function (from Auth0)
let getAccessToken: (() => Promise<string>) | null = null;

export function setTokenGetter(getter: () => Promise<string>) {
  getAccessToken = getter;
}

/**
 * Base fetch wrapper with automatic Auth0 token injection
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Add Auth0 session token if available
  if (getAccessToken) {
    try {
      const token = await getAccessToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
        console.log('ID Token attached to request:', endpoint);
      } else {
        console.warn('No token received from Auth0 for:', endpoint);
      }
    } catch (error) {
      console.error('Failed to get ID token for:', endpoint, error);
      // Continue without token - let backend handle unauthorized requests
    }
  } else {
    console.warn('Token getter not configured - no token will be sent for:', endpoint);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ 
      detail: response.statusText 
    }));
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: url,
      error: error
    });
    const errorMessage = typeof error.detail === 'string' 
      ? error.detail 
      : JSON.stringify(error.detail || error);
    throw new Error(errorMessage);
  }

  // Handle empty responses (204, DELETE operations, etc.)
  if (response.status === 204 || response.headers.get('content-length') === '0') {
    return undefined as T;
  }

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return undefined as T;
}
