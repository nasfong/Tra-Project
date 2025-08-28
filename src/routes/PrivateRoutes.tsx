import { useAuthStore } from '@/store/useStore';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes: React.FC = () => {
  const { token, isTokenExpired, refreshToken, userProfile } = useAuthStore()

  useEffect(() => {
    if (!token) return;

    const now = Math.floor(Date.now() / 1000)
    const interval = setInterval(async () => {
      if (isTokenExpired()) {
        console.log('[Auth] Token expired or near expiry, refreshing...');
        await refreshToken();
      }
    }, (userProfile.exp - now) * 1000);
    return () => clearInterval(interval);
  }, [token, isTokenExpired, refreshToken, userProfile]);

  return token ? <Outlet /> : <Navigate to="/login" />;
};
