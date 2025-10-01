import React from 'react';
import { Navigate } from 'react-router-dom';
import oauthService from '../services/oauthService';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = oauthService.isUserAuthenticated();

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
