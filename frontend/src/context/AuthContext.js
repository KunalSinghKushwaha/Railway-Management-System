import React, { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api"; // Import API functions

// Create AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State for user authentication
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when app loads
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Function to handle user registration
  const register = async (userData) => {
    try {
      const data = await registerUser(userData);
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider }; 