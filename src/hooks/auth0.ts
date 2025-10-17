import {useAuth0} from '@auth0/auth0-react';
import {v5 as uuidv5} from 'uuid';

export interface AuthUser {
  userId: string;
  email: string;
  name: string;
  picture?: string;
}

export function useAuth() {
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    loginWithRedirect, 
    logout, 
    getAccessTokenSilently 
  } = useAuth0();

  const UUID_NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';

  // Extract user ID from Auth0 user object
  const getUserId = (): string | null => {
    if (!user?.sub) return null;
    
    const uuid = uuidv5(user.sub, UUID_NAMESPACE);
    return uuid;
  };

  const authUser: AuthUser | null = user ? {
    userId: getUserId()!,
    email: user.email!,
    name: user.name!,
    picture: user.picture,
  } : null;

  return {
    user: authUser,
    isAuthenticated,
    isLoading,
    login: loginWithRedirect,
    logout: () => logout({ logoutParams: { returnTo: window.location.origin } }),
    getAccessToken: getAccessTokenSilently,
  };
}