import React, { useState } from 'react';
import { JobType, Tier } from '../types';
import { MOCK_COMPANY } from '../constants';
import { Badge } from '../components/Badge';
import { generateJobDescription } from '../services/geminiService';
import { Sparkles, Briefcase, DollarSign, MapPin } from 'lucide-react';

export const PostJob: React.FC = () => {
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState('');
  const [jobType, setJobType] = useState<JobType>(JobType.FULL_TIME);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAIGenerate = async () => {
    if (!title || !skills) {
      alert("Please enter a Job Title and Skills first.");
      return;
    }
    setIsGenerating(true);
    const skillList = skills.split(',').map(s => s.trim());
    const generated = await generateJobDescription(title, skillList);
    setDescription(generated);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-end">
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Post a New Job</h1>
            <p className="text-gray-500">Reach thousands of candidates on Nexus.</p>
        </div>
        <div className="text-right">
            <Badge type="tier" value={MOCK_COMPANY.tier} />
            <p className="text-xs text-gray-500 mt-1">{MOCK_COMPANY.credits.jobs} job credits remaining</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" 
                  placeholder="e.g. Senior Product Designer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
              <select 
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
              >
                {Object.values(JobType).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="e.g. Remote or New York" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Salary / Rate</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input type="text" className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" placeholder="e.g. $100k or $50/hr" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Required Skills (comma separated)</label>
            <input 
              type="text" 
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2" 
              placeholder="e.g. React, Figma, Communication"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <button 
                    type="button"
                    onClick={handleAIGenerate}
                    className="text-xs flex items-center gap-1 text-indigo-600 font-medium hover:text-indigo-800"
                >
                    <Sparkles className="w-3 h-3" /> 
                    {isGenerating ? 'Writing...' : 'Auto-generate with AI'}
                </button>
            </div>
            <textarea 
              rows={6} 
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
              placeholder="Describe the role responsibilities and requirements..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
            <button type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Save Draft
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 shadow-sm">
                Publish Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
