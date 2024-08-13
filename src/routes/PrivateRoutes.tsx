import { useAuth } from '@/context/useAuth';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes: React.FC = () => {
  const { state: { isAuthenticated } } = useAuth()
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
