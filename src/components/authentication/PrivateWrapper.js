import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const PrivateWrapper = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper
