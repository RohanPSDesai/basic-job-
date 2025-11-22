export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  EMPLOYER = 'EMPLOYER',
  ADMIN = 'ADMIN'
}

export enum JobType {
  FULL_TIME = 'Full Time',
  CONTRACT = 'Contract',
  GIG = 'Gig / Daily',
  INTERNSHIP = 'Internship',
  GOVT = 'Government Notice'
}

export enum Tier {
  FREE = 'Free',
  FEATURED = 'Featured',
  PREMIUM = 'Premium',
  PRIME = 'Prime'
}

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
  verified: boolean;
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  resources?: string[];
}

export interface Roadmap {
  role: string;
  steps: RoadmapStep[];
  progress: number;
}

export interface CandidateProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  location: string;
  skills: Skill[];
  experience: number; // years
  roadmap: Roadmap | null;
  avatarUrl: string;
  resumeUrl?: string;
}

export interface CompanyProfile {
  id: string;
  name: string;
  industry: string;
  location: string;
  verified: boolean;
  logoUrl: string;
  tier: Tier;
  credits: {
    jobs: number;
    inquiries: number;
  };
}

export interface JobListing {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  title: string;
  type: JobType;
  location: string;
  salaryRange: string;
  postedAt: string;
  description: string;
  skills: string[];
  isFeatured: boolean;
  applicantsCount: number;
}
