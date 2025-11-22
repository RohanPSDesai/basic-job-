import React, { useState } from 'react';
import { MOCK_CANDIDATE } from '../constants';
import { Badge } from '../components/Badge';
import { generateCareerRoadmap } from '../services/geminiService';
import { Roadmap } from '../types';
import { User, Upload, Link as LinkIcon, MapPin, Sparkles, CheckCircle2, Circle } from 'lucide-react';

export const Profile: React.FC = () => {
  const [candidate, setCandidate] = useState(MOCK_CANDIDATE);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [targetRole, setTargetRole] = useState('');

  const handleGenerateRoadmap = async () => {
    if (!targetRole) return;
    setRoadmapLoading(true);
    const newRoadmap = await generateCareerRoadmap(targetRole);
    if (newRoadmap) {
      setCandidate({ ...candidate, roadmap: newRoadmap });
    }
    setRoadmapLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <img src={candidate.avatarUrl} alt={candidate.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-indigo-50" />
            <h2 className="text-xl font-bold text-gray-900">{candidate.name}</h2>
            <p className="text-indigo-600 font-medium text-sm">{candidate.role}</p>
            <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-2">
              <MapPin className="w-3 h-3" /> {candidate.location}
            </div>
            
            <div className="mt-6 flex flex-col gap-2">
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm">
                Edit Profile
              </button>
              <button className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm">
                View Public View
              </button>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Upload className="w-4 h-4 mr-2" /> Documents
            </h3>
            <div className="space-y-3">
              <div className="p-3 border border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="text-sm text-gray-600">Upload Resume (PDF)</span>
              </div>
              <div className="p-3 border border-dashed border-gray-300 rounded-lg text-center hover:bg-gray-50 cursor-pointer transition-colors">
                <span className="text-sm text-gray-600">Import Digilocker</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {candidate.skills.map((skill, idx) => (
                <span key={idx} className={`px-3 py-1 rounded-full text-xs font-medium border ${skill.verified ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                  {skill.name} {skill.verified && '✓'}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Roadmap & Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bio */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-2">About Me</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{candidate.bio}</p>
          </div>

          {/* AI Roadmap Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" /> AI Career Roadmap
              </h3>
            </div>

            {!candidate.roadmap ? (
              <div className="bg-purple-50 rounded-lg p-6 text-center border border-purple-100">
                <h4 className="font-medium text-purple-900 mb-2">Generate your personalized path</h4>
                <p className="text-sm text-purple-700 mb-4">Enter a job title you want to achieve (e.g., "Product Manager") and our AI will build a step-by-step guide.</p>
                <div className="flex max-w-md mx-auto gap-2">
                  <input 
                    type="text" 
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="Target Role (e.g. DevOps Engineer)"
                    className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 text-sm px-3 py-2 border"
                  />
                  <button 
                    onClick={handleGenerateRoadmap}
                    disabled={roadmapLoading || !targetRole}
                    className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                  >
                    {roadmapLoading ? 'Generating...' : 'Create'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                 <div className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg">
                    <span className="font-semibold text-gray-800">Goal: {candidate.roadmap.role}</span>
                    <button onClick={() => setCandidate({...candidate, roadmap: null})} className="text-xs text-red-500 hover:underline">Reset</button>
                 </div>
                 
                 <div className="relative border-l-2 border-indigo-100 ml-3 space-y-8 py-2">
                    {candidate.roadmap.steps.map((step, index) => (
                      <div key={step.id} className="ml-6 relative">
                        <span className="absolute -left-[31px] top-0 bg-white border-2 border-indigo-500 rounded-full w-4 h-4 flex items-center justify-center">
                          {step.status === 'completed' && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
                        </span>
                        <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                        <p className="text-sm text-gray-500 mt-1 mb-2">{step.description}</p>
                        {step.resources && (
                          <div className="flex flex-wrap gap-2">
                            {step.resources.map((res, i) => (
                              <span key={i} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                                {res}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                 </div>
              </div>
            )}
          </div>

          {/* Stats/Activity */}
          <div className="grid grid-cols-3 gap-4">
             <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-xs text-gray-500">Applications</div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-xs text-gray-500">Interviews</div>
             </div>
             <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-xs text-gray-500">Offers</div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};
