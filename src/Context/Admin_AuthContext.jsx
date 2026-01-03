import React, { createContext, useContext, useEffect, useState } from "react";
import Clients from "../Services/Clients";

const Admin_AuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ refresh ke liye

  useEffect(() => {
    const savedUser = localStorage.getItem("plumbgo_admin_user");

    if (savedUser) {
      try {
        setAdmin(JSON.parse(savedUser));
      } catch (err) {
        console.error("Error parsing admin user:", err);
        localStorage.removeItem("plumbgo_admin_user");
        localStorage.removeItem("plumbgo_admin_token");
      }
    }

    setLoading(false); // ✅ ab context ready hai
  }, []);

  const login = async (email, password) => {
    const res = await Clients.post("/User/login", { email, password });

    const { user, token } = res.data;

    if (!user || user.role !== "admin") {
      throw new Error("Admin access required");
    }

    localStorage.setItem("plumbgo_admin_token", token);
    localStorage.setItem("plumbgo_admin_user", JSON.stringify(user));
    setAdmin(user);
  };

  const logout = () => {
    localStorage.removeItem("plumbgo_admin_token");
    localStorage.removeItem("plumbgo_admin_user");
    setAdmin(null);
  };

  return (
    <Admin_AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </Admin_AuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(Admin_AuthContext);
