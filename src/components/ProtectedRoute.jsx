import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('ai_skillverse_auth') === 'true';

  if (!isAuthenticated) {
    // Redirect them to the / login page, but save the current location they were trying to go to
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
