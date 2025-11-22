import React, { useState, useMemo } from 'react';
import { MOCK_JOBS } from '../constants';
import { JobCard } from '../components/JobCard';
import { JobType, JobListing } from '../types';
import { Search, Filter, Briefcase } from 'lucide-react';

export const JobBoard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<JobType | 'All'>('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'All' || job.type === selectedType;
      const matchesLoc = selectedLocation === 'All' || (selectedLocation === 'Remote' ? job.location === 'Remote' : job.location !== 'Remote');
      
      return matchesSearch && matchesType && matchesLoc;
    });
  }, [searchTerm, selectedType, selectedLocation]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Find Your Next Opportunity</h1>
          <p className="text-gray-500 mt-1">Explore {MOCK_JOBS.length}+ active listings from verified companies.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm sticky top-4">
            <div className="flex items-center gap-2 mb-4 font-semibold text-gray-800">
              <Filter className="w-4 h-4" /> Filters
            </div>

            {/* Search */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 uppercase mb-1 block">Search</label>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Title or Company" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Job Type */}
            <div className="mb-4">
              <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Job Type</label>
              <div className="space-y-2">
                {['All', ...Object.values(JobType)].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="jobType"
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type as JobType | 'All')}
                      className="text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">Location</label>
              <select 
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg p-2.5"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="All">Any Location</option>
                <option value="Remote">Remote Only</option>
                <option value="Onsite">On-site</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="lg:col-span-3">
          <div className="grid gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <JobCard key={job.id} job={job} onApply={(id) => alert(`Applying to job ${id}`)} />
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
