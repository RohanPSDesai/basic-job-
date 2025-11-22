import React from 'react';
import { clsx } from 'clsx';
import { JobType, Tier } from '../types';

interface BadgeProps {
  type?: 'job' | 'tier' | 'status' | 'verified';
  value: string | JobType | Tier;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type = 'status', value, className }) => {
  let styles = "px-2.5 py-0.5 rounded-full text-xs font-medium border";

  if (type === 'job') {
    switch (value) {
      case JobType.FULL_TIME: styles += " bg-blue-50 text-blue-700 border-blue-200"; break;
      case JobType.GIG: styles += " bg-orange-50 text-orange-700 border-orange-200"; break;
      case JobType.GOVT: styles += " bg-red-50 text-red-700 border-red-200"; break;
      case JobType.INTERNSHIP: styles += " bg-purple-50 text-purple-700 border-purple-200"; break;
      case JobType.CONTRACT: styles += " bg-slate-50 text-slate-700 border-slate-200"; break;
      default: styles += " bg-gray-100 text-gray-800";
    }
  } else if (type === 'tier') {
     switch (value) {
      case Tier.PRIME: styles += " bg-indigo-100 text-indigo-800 border-indigo-300"; break;
      case Tier.PREMIUM: styles += " bg-amber-100 text-amber-800 border-amber-300"; break;
      case Tier.FEATURED: styles += " bg-teal-100 text-teal-800 border-teal-300"; break;
      default: styles += " bg-gray-100 text-gray-600";
     }
  } else if (type === 'verified') {
    styles += " bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1";
  }

  return (
    <span className={clsx(styles, className)}>
      {type === 'verified' && (
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      {value}
    </span>
  );
};
