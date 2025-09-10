import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login: redirect to the backend init endpoint
  const login = () => {
    window.location.href = '/api/auth/init';
  };

  // Auth check: expects complex OAuth object structure
  const isAuthenticated = async () => {
    try {
      const res = await fetch('/api/auth/user', {
        credentials: 'include',
      });
      
      const data = await res.text();
      console.log('Auth response:', data);
      
      if (data && data !== 'null' && data.trim() !== '') {
        try {
          // Parse the complex OAuth JSON structure
          const userData = JSON.parse(data);
          console.log('Parsed user data:', userData);
          
          // Extract from the nested structure
          const principal = userData.principal;
          if (principal && principal.authorities && principal.authorities[0]) {
            const attributes = principal.authorities[0].attributes;
            console.log('User attributes:', attributes);
            
            setUser({
              name: attributes.name,
              employeeId: attributes.EmployeeID,
              email: attributes.email
            });
          } else {
            // Fallback parsing for simple structure
            setUser({ 
              name: userData.name || 'Unknown User',
              employeeId: userData.EmployeeID,
              email: userData.email
            });
          }
        } catch (parseErr) {
          console.log('Treating as plain string:', data);
          // Fallback to string if not JSON
          setUser({ name: data.trim() });
        }
      } else {
        console.log('No authentication data found');
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check error:', err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Logout: redirect to logout endpoint
  const logout = () => {
    window.location.href = "/logout";
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