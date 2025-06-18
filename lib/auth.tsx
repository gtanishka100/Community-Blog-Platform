// lib/auth.ts
import React from 'react';

export const isAuthenticated = () => {
  if (typeof window === 'undefined') return false;
  return !!(localStorage.getItem('accessToken') && localStorage.getItem('refreshToken'));
};

export const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const AuthComponent: React.FC<P> = (props) => {
    const isAuth = isAuthenticated();

    if (!isAuth && typeof window !== 'undefined') {
      window.location.href = '/signin';
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};
