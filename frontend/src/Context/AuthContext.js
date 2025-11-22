// src/Context/AuthContext.js
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  
  const [currentUser, setCurrentUser] = useState(null);

  // Predefined users (for demo purposes)
  const users = [
    { email: "admin@restaurant.com", password: "admin123", role: "admin" },
    { email: "customer@restaurant.com", password: "cust123", role: "customer" },
  ];

  const login = (email, password) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      // Redirect based on role
      if (user.role === "admin") navigate("/kitchen");
      else navigate("/menu");
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
