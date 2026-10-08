export type UserStatus = 'Student' | 'Graduate' | 'Job Seeker' | 'Professional' | 'Career Switcher';

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type GapPriority = 'Critical Gap' | 'Priority' | 'Developing' | 'Strong';

export type SyncStatus = 'synced' | 'syncing' | 'offline' | 'sync_issue';

export interface UserSkill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface SkillRequirement {
  name: string;
  requiredLevel: number; // 0-100
  category: string;
  importance: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface Career {
  id: string;
  title: string;
  category: 'Design' | 'Technology' | 'Data' | 'Marketing' | 'Business';
  shortDesc: string;
  description: string;
  salaryRange: string;
  growthRate: string;
  totalOpenings: string;
  requiredSkills: SkillRequirement[];
  icon: string;
  readinessBenchmark: number;
}

export interface SkillGapItem {
  id: string;
  name: string;
  category: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: GapPriority;
  importance: 'High' | 'Medium' | 'Low';
  learningHoursNeeded: number;
  description: string;
  recommendedActions: string[];
}

export interface RoadmapTask {
  id: string;
  week: number;
  title: string;
  skillTarget: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Completed' | 'In Progress' | 'Upcoming';
  resources: Array<{ name: string; type: 'Course' | 'Article' | 'Documentation' | 'Practice'; link: string; duration: string }>;
  practiceTask: {
    title: string;
    description: string;
    deliverable: string;
  };
}

export interface RecommendedProject {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedHours: string;
  targetGaps: string[];
  skillsGained: string[];
  deliverables: string[];
  architectureBreakdown: string[];
  status: 'Not Started' | 'In Progress' | 'Completed';
  liveDemoLink?: string;
  repoLink?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  status: UserStatus;
  targetCareerId: string;
  education: string;
  experience: string;
  resumeFileName?: string;
  resumeText?: string;
  skills: UserSkill[];
  weeklyLearningHours: number;
  weeklyStreakDays: number;
  completedProjectsCount: number;
  joinedDate: string;
  notificationsEnabled: boolean;
  profileCompletion: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  isVoice?: boolean;
}

export type PageRoute =
  | 'home'
  | 'how-it-works'
  | 'careers'
  | 'assessment'
  | 'login'
  | 'signup'
  | 'onboarding'
  | 'dashboard'
  | 'skill-gaps'
  | 'roadmap'
  | 'projects'
  | 'progress'
  | 'coach'
  | 'profile'
  | 'settings';
