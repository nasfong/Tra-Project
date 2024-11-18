import { useAuthStore } from '@/store/useStore';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes: React.FC = () => {
  const { token } = useAuthStore()
  return token ? <Outlet /> : <Navigate to="/login" />;
};
