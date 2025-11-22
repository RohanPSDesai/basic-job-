import React from 'react';
import { JobListing } from '../types';
import { Badge } from './Badge';
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';

interface JobCardProps {
  job: JobListing;
  onApply: (id: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onApply }) => {
  return (
    <div className={`bg-white rounded-xl p-5 border hover:shadow-lg transition-shadow duration-200 ${job.isFeatured ? 'border-indigo-200 shadow-sm' : 'border-gray-100'}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-3">
          <img src={job.companyLogo} alt={job.companyName} className="w-12 h-12 rounded-lg object-cover bg-gray-50" />
          <div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.companyName}</p>
          </div>
        </div>
        {job.isFeatured && <Badge type="tier" value="Featured" />}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge type="job" value={job.type} />
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
          <MapPin className="w-3 h-3 mr-1" /> {job.location}
        </div>
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
          <DollarSign className="w-3 h-3 mr-1" /> {job.salaryRange}
        </div>
        <div className="flex items-center text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
           <Clock className="w-3 h-3 mr-1" /> {job.postedAt}
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {job.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-400 flex items-center">
          <Users className="w-3 h-3 mr-1" /> {job.applicantsCount} applied
        </div>
        <button 
          onClick={() => onApply(job.id)}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors"
        >
          View & Apply
        </button>
      </div>
    </div>
  );
};
