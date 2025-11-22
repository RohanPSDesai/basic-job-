import React from 'react';
import { UserRole } from '../types';
import { Briefcase, UserCircle, LayoutDashboard, PlusCircle } from 'lucide-react';

interface NavbarProps {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ role, setRole, currentPath, navigate }) => {
  const isActive = (path: string) => currentPath === path ? "text-indigo-600 bg-indigo-50" : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50";

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2">
                 <Briefcase className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl text-gray-900">Nexus<span className="text-indigo-600">Jobs</span></span>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-4">
              <button onClick={() => navigate('/')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/')}`}>
                <LayoutDashboard className="w-4 h-4" /> Jobs
              </button>
              {role === UserRole.CANDIDATE && (
                <button onClick={() => navigate('/profile')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/profile')}`}>
                    <UserCircle className="w-4 h-4" /> Profile
                </button>
              )}
               {role === UserRole.EMPLOYER && (
                <button onClick={() => navigate('/post-job')} className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${isActive('/post-job')}`}>
                    <PlusCircle className="w-4 h-4" /> Post Job
                </button>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider hidden sm:block">View Mode:</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
                <button 
                    onClick={() => { setRole(UserRole.CANDIDATE); navigate('/'); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${role === UserRole.CANDIDATE ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Candidate
                </button>
                <button 
                    onClick={() => { setRole(UserRole.EMPLOYER); navigate('/post-job'); }}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${role === UserRole.EMPLOYER ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Employer
                </button>
            </div>
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {role === UserRole.CANDIDATE ? 'AR' : 'TN'}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
