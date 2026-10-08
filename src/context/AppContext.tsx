import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import {
  Career,
  ChatMessage,
  PageRoute,
  RecommendedProject,
  RoadmapTask,
  SkillGapItem,
  UserProfile,
  UserSkill,
  GapPriority,
  SyncStatus,
} from '../types';
import { CAREERS, DEFAULT_ROADMAP, INITIAL_USER_SKILLS, RECOMMENDED_PROJECTS } from '../data/careersData';

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  currentRoute: PageRoute;
  setCurrentRoute: (route: PageRoute) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  careers: Career[];
  selectedCareer: Career;
  setSelectedCareerId: (id: string) => void;
  skillGaps: SkillGapItem[];
  careerReadinessScore: number;
  priorityGapsCount: number;
  roadmap: RoadmapTask[];
  updateRoadmapTaskStatus: (taskId: string, status: RoadmapTask['status']) => void;
  projects: RecommendedProject[];
  updateProjectStatus: (projectId: string, status: RecommendedProject['status']) => void;
  updateUserSkill: (skillName: string, level: number) => void;
  addUserSkill: (newSkill: UserSkill) => void;
  chatMessages: ChatMessage[];
  addChatMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  clearChat: () => void;
  toast: ToastState | null;
  showToast: (message: string, type?: ToastState['type']) => void;
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (val: boolean) => void;
  isAnalyzing: boolean;
  runAIProfileAnalysis: () => Promise<void>;
  loginAsDemoUser: () => void;
  logout: () => void;

  // Network & Sync status
  isOnline: boolean;
  syncStatus: SyncStatus;
  pendingSyncCount: number;
  lastSyncedAt: Date | null;
  triggerManualSync: () => Promise<void>;
  isSimulatedOffline: boolean;
  toggleSimulateOffline: () => void;
  triggerSyncIssueTest: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_USER: UserProfile = {
  name: 'Ananya Sharma',
  email: 'ananya.sharma@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  status: 'Job Seeker',
  targetCareerId: 'ui-ux-designer',
  education: 'B.Des in Digital Experience Design, MIT Institute',
  experience: '1 year Junior Product Design Intern at SaaS Labs',
  resumeFileName: 'Ananya_Sharma_Product_Design_Resume.pdf',
  resumeText: `Ananya Sharma - UI/UX Designer & Product Thinker
Skills: Figma, Prototyping, Wireframing, User Research, Mobile UI, Visual Hierarchy, Basic HTML/CSS.
Experience:
- UI/UX Intern at SaaS Labs: Redesigned onboarding funnel, increasing activation by 14%. Created wireframes and responsive prototypes.
- Freelance: Designed brand identity and web application mockups for 3 early-stage startups.
Education: Bachelor of Design in Digital Experience.`,
  skills: INITIAL_USER_SKILLS,
  weeklyLearningHours: 18.6,
  weeklyStreakDays: 7,
  completedProjectsCount: 2,
  joinedDate: 'Jan 2026',
  notificationsEnabled: true,
  profileCompletion: 85,
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [roadmap, setRoadmap] = useState<RoadmapTask[]>(DEFAULT_ROADMAP);
  const [projects, setProjects] = useState<RecommendedProject[]>(RECOMMENDED_PROJECTS);
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: "Hello Ananya! 👋 I'm your SkillLens AI Career Coach. I've reviewed your target role (UI/UX Designer) and skill profile. You're currently at 72% Career Readiness with 4 priority gaps. What would you like to work on today?",
      timestamp: '10:00 AM',
    },
  ]);

  // Network and Sync States
  const [realIsOnline, setRealIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isSimulatedOffline, setIsSimulatedOffline] = useState<boolean>(false);
  const isOnline = realIsOnline && !isSimulatedOffline;

  const [syncStatus, setSyncStatus] = useState<SyncStatus>(isOnline ? 'synced' : 'offline');
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(new Date());

  // Load cached progress on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem('skilllens_cached_progress_v1');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.user) setUser(parsed.user);
        if (parsed.roadmap) setRoadmap(parsed.roadmap);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.chatMessages) setChatMessages(parsed.chatMessages);
        if (typeof parsed.pendingSyncCount === 'number') setPendingSyncCount(parsed.pendingSyncCount);
      }
    } catch (e) {
      console.warn('Failed to parse cached local progress:', e);
    }
  }, []);

  // Save current progress to localStorage whenever key data changes
  const saveToLocalCache = (
    nextUser = user,
    nextRoadmap = roadmap,
    nextProjects = projects,
    nextChat = chatMessages,
    additionalPending = 0
  ) => {
    try {
      const payload = {
        user: nextUser,
        roadmap: nextRoadmap,
        projects: nextProjects,
        chatMessages: nextChat,
        pendingSyncCount: !isOnline ? pendingSyncCount + additionalPending : 0,
        cachedAt: new Date().toISOString(),
      };
      localStorage.setItem('skilllens_cached_progress_v1', JSON.stringify(payload));
    } catch (e) {
      console.warn('Local storage write failed:', e);
    }
  };

  // Listen to browser network changes
  useEffect(() => {
    const handleOnline = () => {
      setRealIsOnline(true);
      if (!isSimulatedOffline) {
        handleBackOnlineSync();
      }
    };

    const handleOffline = () => {
      setRealIsOnline(false);
      setSyncStatus('offline');
      showToast('You are offline. Progress is safely saved locally.', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isSimulatedOffline, pendingSyncCount]);

  const handleBackOnlineSync = async () => {
    setSyncStatus('syncing');
    showToast('Reconnected! Syncing offline progress...', 'info');

    try {
      // Simulate/perform cloud sync
      await new Promise((resolve) => setTimeout(resolve, 1400));
      setPendingSyncCount(0);
      setLastSyncedAt(new Date());
      setSyncStatus('synced');
      saveToLocalCache(user, roadmap, projects, chatMessages, 0);
      showToast('All progress synchronized with cloud!', 'success');
    } catch (err) {
      setSyncStatus('sync_issue');
      showToast('Sync issue detected. Click retry to sync.', 'error');
    }
  };

  const triggerManualSync = async () => {
    if (!isOnline) {
      showToast('Cannot sync while offline. Local changes remain cached.', 'warning');
      return;
    }

    setSyncStatus('syncing');
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setPendingSyncCount(0);
      setLastSyncedAt(new Date());
      setSyncStatus('synced');
      saveToLocalCache(user, roadmap, projects, chatMessages, 0);
      showToast('Cloud sync complete!', 'success');
    } catch (err) {
      setSyncStatus('sync_issue');
      showToast('Sync failed. Please retry.', 'error');
    }
  };

  const toggleSimulateOffline = () => {
    if (isSimulatedOffline) {
      // Reconnect
      setIsSimulatedOffline(false);
      if (realIsOnline) {
        handleBackOnlineSync();
      }
    } else {
      // Go offline
      setIsSimulatedOffline(true);
      setSyncStatus('offline');
      showToast('Offline Mode active. All progress is cached locally.', 'warning');
    }
  };

  const triggerSyncIssueTest = () => {
    setSyncStatus('sync_issue');
    showToast('Sync issue simulated: unable to reach cloud server.', 'error');
  };

  const selectedCareer = useMemo(() => {
    return CAREERS.find((c) => c.id === user.targetCareerId) || CAREERS[0];
  }, [user.targetCareerId]);

  // Compute Skill Gaps dynamically: Gap = Required - Current
  const skillGaps = useMemo<SkillGapItem[]>(() => {
    return selectedCareer.requiredSkills.map((req, idx) => {
      const userSkill = user.skills.find(
        (s) => s.name.toLowerCase().trim() === req.name.toLowerCase().trim()
      );
      const currentLevel = userSkill ? userSkill.level : 20;
      const gap = Math.max(0, req.requiredLevel - currentLevel);

      let priority: GapPriority = 'Strong';
      if (gap >= 40) {
        priority = 'Critical Gap';
      } else if (gap >= 20) {
        priority = 'Priority';
      } else if (gap > 0) {
        priority = 'Developing';
      } else {
        priority = 'Strong';
      }

      // Calculate estimated learning hours to close gap
      const learningHoursNeeded = Math.round((gap / 10) * 2.5);

      const recommendedActions: string[] = [
        `Complete hands-on module on ${req.name}`,
        `Build a verified portfolio deliverable for ${req.name}`,
        `Review peer critiques and conduct usability testing`,
      ];

      return {
        id: `gap-${idx}-${req.name}`,
        name: req.name,
        category: req.category,
        currentLevel,
        requiredLevel: req.requiredLevel,
        gap,
        priority,
        importance: req.importance,
        learningHoursNeeded,
        description: req.description,
        recommendedActions,
      };
    });
  }, [selectedCareer, user.skills]);

  // Compute Career Readiness Score (Realistic weighted score)
  const careerReadinessScore = useMemo(() => {
    if (skillGaps.length === 0) return 72;
    let totalScore = 0;
    let totalMax = 0;

    for (const g of skillGaps) {
      const weight = g.importance === 'High' ? 1.5 : 1.0;
      const ratio = Math.min(1, g.currentLevel / g.requiredLevel);
      totalScore += ratio * 100 * weight;
      totalMax += 100 * weight;
    }

    const calculated = Math.round(totalScore / totalMax);
    // Align with benchmark
    return Math.min(98, Math.max(45, calculated));
  }, [skillGaps]);

  const priorityGapsCount = useMemo(() => {
    return skillGaps.filter((g) => g.priority === 'Critical Gap' || g.priority === 'Priority').length;
  }, [skillGaps]);

  const showToast = (message: string, type: ToastState['type'] = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const setSelectedCareerId = (id: string) => {
    setUser((prev) => ({ ...prev, targetCareerId: id }));
    showToast(`Target career updated to ${CAREERS.find((c) => c.id === id)?.title || 'new career'}`);
  };

  const updateUserSkill = (skillName: string, level: number) => {
    setUser((prev) => {
      const existing = prev.skills.find((s) => s.name === skillName);
      let updatedSkills: UserSkill[];
      if (existing) {
        updatedSkills = prev.skills.map((s) =>
          s.name === skillName ? { ...s, level: Math.min(100, Math.max(0, level)) } : s
        );
      } else {
        updatedSkills = [...prev.skills, { name: skillName, level, category: 'General' }];
      }
      const updatedUser = { ...prev, skills: updatedSkills };
      if (!isOnline) {
        setPendingSyncCount((c) => c + 1);
      }
      saveToLocalCache(updatedUser, roadmap, projects, chatMessages, 1);
      return updatedUser;
    });
  };

  const addUserSkill = (newSkill: UserSkill) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        skills: [...prev.skills.filter((s) => s.name !== newSkill.name), newSkill],
      };
      if (!isOnline) {
        setPendingSyncCount((c) => c + 1);
      }
      saveToLocalCache(updatedUser, roadmap, projects, chatMessages, 1);
      return updatedUser;
    });
    showToast(`Added ${newSkill.name} (${newSkill.level}%)`);
  };

  const updateRoadmapTaskStatus = (taskId: string, status: RoadmapTask['status']) => {
    setRoadmap((prev) => {
      const updated = prev.map((t) => (t.id === taskId ? { ...t, status } : t));
      if (!isOnline) {
        setPendingSyncCount((c) => c + 1);
      }
      saveToLocalCache(user, updated, projects, chatMessages, 1);
      return updated;
    });
    showToast(`Task marked as ${status}`, 'info');
  };

  const updateProjectStatus = (projectId: string, status: RecommendedProject['status']) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === projectId ? { ...p, status } : p));
      if (!isOnline) {
        setPendingSyncCount((c) => c + 1);
      }
      saveToLocalCache(user, roadmap, updated, chatMessages, 1);
      return updated;
    });
    showToast(`Project updated to ${status}`);
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}-${Math.random()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => {
      const updated = [...prev, newMsg];
      saveToLocalCache(user, roadmap, projects, updated, 0);
      return updated;
    });
  };

  const clearChat = () => {
    const resetMsgs: ChatMessage[] = [
      {
        id: `msg-${Date.now()}`,
        sender: 'ai',
        text: `Chat reset. I am ready to guide you on your ${selectedCareer.title} roadmap! What would you like to explore?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setChatMessages(resetMsgs);
    saveToLocalCache(user, roadmap, projects, resetMsgs, 0);
  };

  const runAIProfileAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate or call server analysis
      await new Promise((resolve) => setTimeout(resolve, 1400));
      saveToLocalCache(user, roadmap, projects, chatMessages, 0);
      showToast('AI Skill Gap Report successfully calculated!', 'success');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const loginAsDemoUser = () => {
    setIsAuthenticated(true);
    setUser(INITIAL_USER);
    setCurrentRoute('dashboard');
    saveToLocalCache(INITIAL_USER, DEFAULT_ROADMAP, RECOMMENDED_PROJECTS, chatMessages, 0);
    showToast('Welcome back, Ananya! 👋');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentRoute('home');
    showToast('Logged out successfully', 'info');
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        careers: CAREERS,
        selectedCareer,
        setSelectedCareerId,
        skillGaps,
        careerReadinessScore,
        priorityGapsCount,
        roadmap,
        updateRoadmapTaskStatus,
        projects,
        updateProjectStatus,
        updateUserSkill,
        addUserSkill,
        chatMessages,
        addChatMessage,
        clearChat,
        toast,
        showToast,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isAnalyzing,
        runAIProfileAnalysis,
        loginAsDemoUser,
        logout,

        // Network and Sync
        isOnline,
        syncStatus,
        pendingSyncCount,
        lastSyncedAt,
        triggerManualSync,
        isSimulatedOffline,
        toggleSimulateOffline,
        triggerSyncIssueTest,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
