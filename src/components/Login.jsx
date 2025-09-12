import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      console.log('Authenticated user object:', user);
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  const handleLogin = () => {
    setIsLoading(true);
    login();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: 'url(/auibg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      
      {/* Content */}
      <div className="max-w-md w-full relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* Header with AUI Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <img 
                src="/auilogo.png" 
                alt="Al Akhawayn University" 
                className="h-16 w-auto"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
              />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Capstone Project Supervision Portal</p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-700 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Info Box */}
          <div 
            className="relative overflow-hidden rounded-xl bg-blue-50/80 backdrop-blur-sm p-4 mb-6 border border-blue-200/50"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 p-2 rounded-full bg-blue-100/80">
                <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-semibold text-blue-800">Single Sign-On Enabled</h3>
                <p className="text-xs text-blue-700 mt-1">
                  Authenticate securely with your AUI Outlook account
                </p>
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-white font-semibold focus:outline-none transition-all duration-300 ease-in-out overflow-hidden transform hover:-translate-y-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 disabled:transform-none"
            style={{ 
              boxShadow: isLoading ? '0 5px 15px rgba(0,0,0,0.1)' : '0 10px 25px -5px rgba(59, 130, 246, 0.5)'
            }}
          >
            {/* Dynamic shine effect on hover */}
            <span 
              className="absolute top-0 left-0 w-full h-full transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            ></span>
            
            <span className="flex items-center justify-center">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Connect with Outlook</span>
                </>
              )}
            </span>
          </button>

          {/* Footer */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
              <span>© 2025</span>
              <span className="font-medium text-blue-700">Al Akhawayn University</span>
              <span>· Capstone Supervision System</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
