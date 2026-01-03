import React from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "../Context/Admin_AuthContext";

const AdminProtectedRoute = ({ children }) => {
  const { admin, loading } = useAdminAuth();

  // 🔁 jab tak localStorage se user load ho raha, redirect mat karo
  if (loading) {
    return <div>Checking admin session...</div>; // yahan spinner laga sakte ho
  }

  // 👮 agar admin hi nahi mila
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // (optional) safety: role bhi check kar lo
  if (admin.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
