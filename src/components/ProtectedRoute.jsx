// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children }) => {
  const refreshToken = Cookies.get('userrefreshToken');

  if (!refreshToken) {
    return <Navigate to="/access-denied" />;
  }

  return children;
};

export default ProtectedRoute;
