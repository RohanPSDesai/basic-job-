import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { JobBoard } from './pages/JobBoard';
import { Profile } from './pages/Profile';
import { PostJob } from './pages/PostJob';
import { UserRole } from './types';

const App: React.FC = () => {
  // Simple routing state instead of react-router-dom for standalone flexibility
  const [currentPath, setCurrentPath] = useState(window.location.hash.replace('#', '') || '/');
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CANDIDATE);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.replace('#', '') || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  const renderPage = () => {
    switch (currentPath) {
      case '/':
        return <JobBoard />;
      case '/profile':
        return <Profile />;
      case '/post-job':
        return <PostJob />;
      default:
        return <JobBoard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar 
        role={userRole} 
        setRole={setUserRole} 
        currentPath={currentPath}
        navigate={navigate}
      />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
