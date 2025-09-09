import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login: redirect to the backend init endpoint
  const login = () => {
    window.location.href = 'https://tour.aui.ma/api/auth/init';
  };

  // Auth check: expects plain string (user name) or 'null'
  const isAuthenticated = async () => {
    try {
      const res = await fetch('https://tour.aui.ma/api/auth/user', {
        credentials: 'include',
      });
      const data = await res.text(); // get raw string
      if (data && data !== 'null') {
        setUser({ name: data });
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout: call backend, clear storage, redirect to Microsoft logout
  const logout = () => {
    window.location.href = "https://tour.aui.ma/api/logout";
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);