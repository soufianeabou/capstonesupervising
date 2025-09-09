import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Mock data
const mockProjects = [
  { 
    id: 1, 
    studentName: "Soufiane Aboulhamam", 
    title: "AI in Education", 
    description: "Exploring AI models in learning platforms to enhance student engagement and personalized learning experiences.", 
    status: "Pending",
    submittedDate: "2024-03-15"
  },
  { 
    id: 2, 
    studentName: "Saad Ghajdaoui Alaoui", 
    title: "Blockchain Finance", 
    description: "Smart contracts for e-wallets and decentralized financial applications with enhanced security protocols.", 
    status: "Pending",
    submittedDate: "2024-03-14"
  },
  { 
    id: 3, 
    studentName: "Amina El Mansouri", 
    title: "IoT Healthcare System", 
    description: "Development of a comprehensive IoT-based patient monitoring system for remote healthcare delivery.", 
    status: "Accepted",
    submittedDate: "2024-03-10"
  },
  { 
    id: 4, 
    studentName: "Youssef Benali", 
    title: "Machine Learning Trading Bot", 
    description: "Automated trading system using deep learning algorithms for cryptocurrency market analysis and prediction.", 
    status: "Pending",
    submittedDate: "2024-03-16"
  },
  { 
    id: 5, 
    studentName: "Fatima Zahra Idrissi", 
    title: "Sustainable Energy Management", 
    description: "Smart grid optimization system for renewable energy distribution in urban environments.", 
    status: "Denied",
    submittedDate: "2024-03-12"
  }
];

// Enhanced Navbar Component
const Navbar = ({ supervisorName }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/auilogo.png" 
                alt="Al Akhawayn University" 
                className="h-10 w-auto mr-3"
              />
              <div>
                <span className="text-xl font-bold text-gray-900">AUI Portal</span>
                <p className="text-xs text-gray-500">Capstone Supervision</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-700">{supervisorName}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Enhanced Capstone Card Component
const CapstoneCard = ({ project, onStatusChange }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const getStatusBadge = (status) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1";
    switch (status) {
      case 'Pending':
        return `${baseClasses} bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200`;
      case 'Accepted':
        return `${baseClasses} bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200`;
      case 'Denied':
        return `${baseClasses} bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border border-gray-200`;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>;
      case 'Accepted':
        return <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>;
      case 'Denied':
        return <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>;
      default:
        return null;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleStatusChange = async (newStatus) => {
    setIsProcessing(true);
    // Simulate processing time for better UX
    setTimeout(() => {
      onStatusChange(project.id, newStatus);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 transform hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center space-x-2">
              <span>{project.title}</span>
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-gray-900">{project.studentName}</span>
              </p>
              <p className="text-sm text-gray-500 flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Submitted: {formatDate(project.submittedDate)}</span>
              </p>
            </div>
          </div>
          <span className={getStatusBadge(project.status)}>
            {getStatusIcon(project.status)}
            <span>{project.status}</span>
          </span>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
            {project.description}
          </p>
        </div>
        
        {project.status === 'Pending' && (
          <div className="flex space-x-3">
            <button
              onClick={() => handleStatusChange('Accepted')}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:scale-100 shadow-sm hover:shadow-md"
            >
              {isProcessing ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <span>✅</span>
                  <span>Accept</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleStatusChange('Denied')}
              disabled={isProcessing}
              className="flex-1 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105 disabled:scale-100 shadow-sm hover:shadow-md"
            >
              {isProcessing ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <>
                  <span>❌</span>
                  <span>Deny</span>
                </>
              )}
            </button>
          </div>
        )}

        {project.status !== 'Pending' && (
          <div className="text-center py-2">
            <span className="text-sm text-gray-500 font-medium">
              {project.status === 'Accepted' ? '✅ Project Approved' : '❌ Project Declined'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Enhanced Dashboard Component
const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState(mockProjects);
  const [filter, setFilter] = useState('All');

  const handleStatusChange = (projectId, newStatus) => {
    setProjects(prevProjects =>
      prevProjects.map(project =>
        project.id === projectId
          ? { ...project, status: newStatus }
          : project
      )
    );
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'All') return true;
    return project.status === filter;
  });

  const getStats = () => {
    const pending = projects.filter(p => p.status === 'Pending').length;
    const accepted = projects.filter(p => p.status === 'Accepted').length;
    const denied = projects.filter(p => p.status === 'Denied').length;
    return { pending, accepted, denied, total: projects.length };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/30">
      <Navbar supervisorName={user?.name || 'Supervisor'} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3">
            Capstone Project Supervision
          </h1>
          <p className="text-gray-600 text-lg">Review and approve student capstone project proposals</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Projects</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending Review</p>
                <p className="text-3xl font-bold">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Accepted</p>
                <p className="text-3xl font-bold">{stats.accepted}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500 to-rose-600 rounded-2xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm font-medium">Denied</p>
                <p className="text-3xl font-bold">{stats.denied}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Filter Tabs */}
        <div className="mb-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-2">
          <nav className="flex space-x-2">
            {['All', 'Pending', 'Accepted', 'Denied'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                  filter === status
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {status} {status !== 'All' && `(${status === 'Pending' ? stats.pending : status === 'Accepted' ? stats.accepted : stats.denied})`}
              </button>
            ))}
          </nav>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {filteredProjects.map((project) => (
            <CapstoneCard
              key={project.id}
              project={project}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500">No projects match the current filter criteria.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/auilogo.png" alt="AUI" className="h-8 w-auto" />
              <div>
                <p className="text-sm text-gray-600">Al Akhawayn University in Ifrane</p>
                <p className="text-xs text-gray-500">School of Science and Engineering</p>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              © 2024 AUI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
