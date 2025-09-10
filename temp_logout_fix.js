  // Logout: send POST request to logout endpoint
  const logout = async () => {
    try {
      // Send POST request to logout endpoint
      await fetch('/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      // Redirect to login page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Fallback: redirect anyway
      window.location.href = '/';
    }
  };
