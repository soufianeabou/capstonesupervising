import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login: redirect to the backend init endpoint
  const login = () => {
    console.log('Redirecting to login...');
    window.location.href = 'https://tour.aui.ma/api/auth/init';
  };

  // Auth check: test different possible response formats
  const isAuthenticated = async () => {
    console.log('Starting authentication check...');
    try {
      const res = await fetch('https://tour.aui.ma/api/auth/user', {
        credentials: 'include',
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', [...res.headers.entries()]);
      
      const data = await res.text();
      console.log('Raw response data:', data);
      console.log('Response length:', data.length);
      console.log('Response type:', typeof data);
      
      if (data && data !== 'null' && data.trim() !== '') {
        console.log('Data exists, attempting to parse...');
        
        // Try to parse as JSON first
        try {
          const userData = JSON.parse(data);
          console.log('Successfully parsed JSON:', userData);
          
          // Check if it's the complex OAuth structure
          if (userData.principal && userData.principal.authorities && userData.principal.authorities[0]) {
            console.log('Found OAuth structure');
            const attributes = userData.principal.authorities[0].attributes;
            console.log('Extracted attributes:', attributes);
            
            const userObj = {
              name: attributes.name,
              employeeId: attributes.EmployeeID,
              email: attributes.email
            };
            console.log('Setting user object:', userObj);
            setUser(userObj);
          }
          // Check if it's a simple object
          else if (userData.name || userData.EmployeeID) {
            console.log('Found simple user object');
            const userObj = {
              name: userData.name,
              employeeId: userData.EmployeeID,
              email: userData.email
            };
            console.log('Setting simple user object:', userObj);
            setUser(userObj);
          }
          // If it's just a string name
          else if (typeof userData === 'string') {
            console.log('Found string response:', userData);
            setUser({ name: userData });
          }
          else {
            console.log('Unknown JSON structure:', userData);
            setUser({ name: 'Unknown User', data: userData });
          }
        } catch (parseErr) {
          console.log('Not JSON, treating as string:', parseErr);
          // If it's not JSON, treat as plain string (name)
          setUser({ name: data.trim() });
        }
      } else {
        console.log('No valid data, user not authenticated');
        setUser(null);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      setUser(null);
    } finally {
      console.log('Auth check complete, setting loading to false');
      setLoading(false);
    }
  };

  // Logout: redirect to logout endpoint
  const logout = () => {
    console.log('Logging out...');
    window.location.href = "https://tour.aui.ma/api/logout";
  };

  useEffect(() => {
    console.log('AuthProvider mounted, checking authentication...');
    isAuthenticated();
  }, []);

  // Log state changes
  useEffect(() => {
    console.log('User state changed:', user);
  }, [user]);

  useEffect(() => {
    console.log('Loading state changed:', loading);
  }, [loading]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);