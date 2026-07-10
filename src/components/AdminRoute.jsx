import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('ai_skillverse_auth') === 'true';
  const role = localStorage.getItem('ai_skillverse_role');

  if (!isAuthenticated || role !== 'admin') {
    // Redirect non-admins to dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
