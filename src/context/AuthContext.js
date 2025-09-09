import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login: check if already authenticated first, otherwise redirect
  const login = async () => {
    console.log('Login called - checking auth status first...');
    try {
      const res = await fetch('https://tour.aui.ma/api/auth/user', {
        credentials: 'include',
      });
      const data = await res.text();
      console.log('Auth check in login:', data);
      
      if (data && data !== 'null' && data.trim() !== '') {
        // Already authenticated, parse and update state directly
        try {
          const userData = JSON.parse(data);
          console.log('Already authenticated, updating state:', userData);
          
          const principal = userData.principal;
          if (principal && principal.authorities && principal.authorities[0]) {
            const attributes = principal.authorities[0].attributes;
            setUser({
              name: attributes.name,
              employeeId: attributes.EmployeeID,
              email: attributes.email
            });
            console.log('User state updated with:', {
              name: attributes.name,
              employeeId: attributes.EmployeeID,
              email: attributes.email
            });
          } else {
            setUser({ 
              name: userData.name || 'Unknown User',
              employeeId: userData.EmployeeID 
            });
          }
          return; // Don't redirect, user is already authenticated
        } catch (parseErr) {
          console.error('Parse error in login:', parseErr);
          setUser({ name: data });
          return;
        }
      }
    } catch (err) {
      console.log('Not authenticated, proceeding with redirect:', err);
      // Not authenticated, proceed with redirect
    }
    
    // Redirect to login if not already authenticated
    console.log('Redirecting to login...');
    window.location.href = 'https://tour.aui.ma/api/auth/init';
  };

  // Auth check: Parse the full OAuth object to extract employeeId
  const isAuthenticated = async () => {
    try {
      console.log('🔍 Starting auth check...');
      const res = await fetch('https://tour.aui.ma/api/auth/user', {
        credentials: 'include',
      });
      console.log('📡 Response status:', res.status);
      
      const data = await res.text(); // get raw string
      console.log('📄 Raw response data:', data);
      console.log('📏 Data length:', data.length);
      console.log('📋 Data type:', typeof data);
      
      if (data && data !== 'null' && data.trim() !== '') {
        console.log('✅ Data exists, attempting to parse...');
        try {
          // Try to parse as JSON first (OAuth object)
          const userData = JSON.parse(data);
          console.log('🎯 Successfully parsed JSON:', userData);
          
          // Check if it has the expected OAuth structure
          if (userData.principal && userData.principal.authorities && userData.principal.authorities[0]) {
            console.log('🏛️ Found principal structure');
            const attributes = userData.principal.authorities[0].attributes;
            console.log('📋 Attributes found:', attributes);
            
            if (attributes && attributes.EmployeeID) {
              console.log('🎉 Found EmployeeID:', attributes.EmployeeID);
              setUser({
                name: attributes.name,
                employeeId: attributes.EmployeeID,
                email: attributes.email
              });
              console.log('✅ User set successfully:', {
                name: attributes.name,
                employeeId: attributes.EmployeeID,
                email: attributes.email
              });
            } else {
              console.log('❌ No EmployeeID in attributes');
              setUser({ name: attributes?.name || 'Unknown User' });
            }
          } else {
            console.log('🔍 No principal structure, checking direct properties');
            setUser({ 
              name: userData.name || 'Unknown User',
              employeeId: userData.EmployeeID 
            });
          }
        } catch (parseErr) {
          // If parsing fails, treat as plain string (fallback)
          console.log('⚠️ JSON parse failed, treating as plain string:', parseErr);
          console.log('📝 Setting user as plain string:', data);
          setUser({ name: data.trim() });
        }
      } else {
        console.log('❌ No valid data received');
        setUser(null);
      }
    } catch (err) {
      console.error('🚨 Auth check error:', err);
      setUser(null);
    } finally {
      setLoading(false);
      console.log('🏁 Auth check completed');
    }
  };

  // Logout: call backend, clear storage, redirect to Microsoft logout
  const logout = () => {
    window.location.href = "https://tour.aui.ma/api/logout";
  };

  useEffect(() => {
    isAuthenticated();
  }, []);

  console.log('🔄 AuthContext render - Current user state:', user);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
