// components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRouterec = ({ children }) => {
  const refreshToken = Cookies.get('refreshToken');
  if (!refreshToken) {
    return <Navigate to="/access-deniedrec" />;
  }

  return children;
};

export default ProtectedRouterec;
