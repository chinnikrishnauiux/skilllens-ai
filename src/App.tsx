import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { VoiceCoachModal } from './components/voice/VoiceCoachModal';
import { NetworkStatusIndicator } from './components/network/NetworkStatusIndicator';
import { Toast } from './components/ui/Toast';

// Pages
import { Home } from './pages/Home';
import { HowItWorks } from './pages/HowItWorks';
import { Careers } from './pages/Careers';
import { SkillAssessment } from './pages/SkillAssessment';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Onboarding } from './pages/Onboarding';
import { Dashboard } from './pages/Dashboard';
import { SkillGapAnalysis } from './pages/SkillGapAnalysis';
import { CareerRoadmap } from './pages/CareerRoadmap';
import { RecommendedProjects } from './pages/RecommendedProjects';
import { Progress } from './pages/Progress';
import { AICareerCoach } from './pages/AICareerCoach';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

import { Mic } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, setIsVoiceModalOpen } = useApp();

  const isDashboardRoute = [
    'dashboard',
    'skill-gaps',
    'roadmap',
    'projects',
    'progress',
    'coach',
    'profile',
    'settings',
  ].includes(currentRoute);

  const renderDashboardPage = () => {
    switch (currentRoute) {
      case 'dashboard':
        return <Dashboard />;
      case 'skill-gaps':
        return <SkillGapAnalysis />;
      case 'roadmap':
        return <CareerRoadmap />;
      case 'projects':
        return <RecommendedProjects />;
      case 'progress':
        return <Progress />;
      case 'coach':
        return <AICareerCoach />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  const renderPublicPage = () => {
    switch (currentRoute) {
      case 'home':
        return <Home />;
      case 'how-it-works':
        return <HowItWorks />;
      case 'careers':
        return <Careers />;
      case 'assessment':
        return <SkillAssessment />;
      case 'login':
        return <Login />;
      case 'signup':
        return <SignUp />;
      case 'onboarding':
        return <Onboarding />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] text-[#171A2B] font-sans antialiased selection:bg-[#6C63FF]/20 selection:text-[#6C63FF]">
      {/* Network Status & Offline Sync Indicator */}
      <NetworkStatusIndicator />

      {isDashboardRoute ? (
        <DashboardLayout>{renderDashboardPage()}</DashboardLayout>
      ) : (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{renderPublicPage()}</main>
          <Footer />
        </div>
      )}

      {/* Global Floating Quick Voice Assistant Trigger */}
      <button
        onClick={() => setIsVoiceModalOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-tr from-[#6C63FF] to-[#00C2A8] text-white shadow-xl shadow-[#6C63FF]/30 hover:scale-105 transition-all group flex items-center gap-2.5 focus:outline-none"
        title="Launch Voice Coach"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
        </span>
        <Mic className="w-5 h-5 group-hover:scale-110 transition" />
        <span className="text-xs font-bold hidden sm:inline-block pr-1">
          Voice Coach
        </span>
      </button>

      {/* Voice Assistant Modal */}
      <VoiceCoachModal />

      {/* Notifications Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
