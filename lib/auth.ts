import React from 'react';

// Utility to check if user is authenticated
export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'));
};

// HOC for protected routes
export function withAuth<P>(WrappedComponent: React.ComponentType<P>): React.FC<P> {
  const AuthComponent: React.FC<P> = (props) => {
    const isAuth = isAuthenticated();

    if (!isAuth) {
      if (typeof window !== 'undefined') {
        window.location.href = '/signin';
      }
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
}
