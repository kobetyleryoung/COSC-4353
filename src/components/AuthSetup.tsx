import { useEffect } from 'react';
import { useAuth } from '../hooks/auth0';
import { setTokenGetter } from '../utils/apiClient';

/**
 * Component that configures the API client with Auth0 session token
 * Place this inside your Auth0Provider to enable automatic token injection
 */
export function AuthSetup() {
  const { getAccessToken, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('User authenticated - setting up session token getter');
      // Set up the token getter for all API calls
      setTokenGetter(getAccessToken);
    } else {
      console.log('User not authenticated - session token getter not configured');
    }
  }, [isAuthenticated, getAccessToken]);

  return null;
}
