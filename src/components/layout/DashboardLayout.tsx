import React from 'react';
import {
  LayoutDashboard,
  Target,
  MapPin,
  FolderGit2,
  TrendingUp,
  Sparkles,
  User,
  Settings,
  LogOut,
  Mic,
  ChevronDown,
  Bell,
  ArrowUpRight,
  ExternalLink,
  WifiOff,
  AlertTriangle,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const {
    currentRoute,
    setCurrentRoute,
    user,
    selectedCareer,
    careers,
    setSelectedCareerId,
    careerReadinessScore,
    setIsVoiceModalOpen,
    logout,
    isOnline,
    syncStatus,
    pendingSyncCount,
  } = useApp();

  const navigationItems: Array<{
    id: PageRoute;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'skill-gaps', label: 'Skill Gap Analysis', icon: Target, badge: '4 gaps' },
    { id: 'roadmap', label: 'Career Roadmap', icon: MapPin },
    { id: 'projects', label: 'Recommended Projects', icon: FolderGit2, badge: '2 active' },
    { id: 'progress', label: 'Progress & Stats', icon: TrendingUp },
    { id: 'coach', label: 'AI Career Coach', icon: Sparkles, badge: 'Voice' },
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200/80 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div
            onClick={() => setCurrentRoute('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-[#6C63FF]/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-[#171A2B]">SkillLens</span>
              <span className="font-extrabold text-lg tracking-tight text-[#6C63FF]"> AI</span>
            </div>
          </div>
          <button
            onClick={() => setCurrentRoute('home')}
            className="text-gray-400 hover:text-gray-600 p-1"
            title="View Public Site"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

        {/* User Mini Card */}
        <div className="p-4 mx-3 my-3 bg-[#F7F8FC] rounded-2xl border border-gray-100 flex items-center gap-3">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-[#6C63FF]/30"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#22C55E] border-2 border-white rounded-full" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#171A2B] truncate">{user.name}</p>
            <p className="text-[11px] text-[#6B7280] truncate">{selectedCareer.title}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-extrabold text-[#6C63FF]">{careerReadinessScore}%</span>
            <p className="text-[9px] text-gray-400 uppercase font-medium">Ready</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentRoute(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-[#6C63FF] text-white shadow-sm shadow-[#6C63FF]/30'
                    : 'text-[#6B7280] hover:bg-gray-100/70 hover:text-[#171A2B]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Voice'
                        ? 'bg-[#00C2A8]/10 text-[#00C2A8]'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Voice Assistant Shortcut Card */}
        <div className="p-4 mx-3 my-2 rounded-2xl bg-gradient-to-br from-[#0B1020] to-[#1E1B4B] text-white relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#00C2A8] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8] animate-ping" />
              Voice Coach
            </span>
            <Mic className="w-4 h-4 text-[#6C63FF]" />
          </div>
          <p className="text-xs text-gray-300 font-medium mb-3">
            Ask career questions & get real-time audio guidance
          </p>
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="w-full py-2 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-md transition"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Start Voice Guidance</span>
          </button>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-8">
        {/* Topbar Header */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="md:hidden flex items-center gap-2">
              <div
                onClick={() => setCurrentRoute('home')}
                className="w-8 h-8 rounded-lg bg-[#6C63FF] flex items-center justify-center text-white"
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-[#171A2B]">SkillLens</span>
            </div>

            {/* Target Career Switcher Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 hidden sm:inline">Target Career:</span>
              <div className="relative group">
                <select
                  value={selectedCareer.id}
                  onChange={(e) => setSelectedCareerId(e.target.value)}
                  className="appearance-none bg-gray-50 border border-gray-200 text-[#171A2B] text-xs font-bold rounded-xl pl-3 pr-8 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#6C63FF] cursor-pointer"
                >
                  {careers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Network Sync status pill */}
            <div
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                !isOnline
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : syncStatus === 'sync_issue'
                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                  : syncStatus === 'syncing'
                  ? 'bg-indigo-50 text-[#6C63FF] border-indigo-200'
                  : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}
              title={
                !isOnline
                  ? 'Offline: Changes are saved and cached locally on this device'
                  : syncStatus === 'sync_issue'
                  ? 'Sync issue detected: Local progress is preserved'
                  : 'All progress safely cached & cloud synced'
              }
            >
              {!isOnline ? (
                <WifiOff className="w-3 h-3 text-amber-700 animate-pulse" />
              ) : syncStatus === 'sync_issue' ? (
                <AlertTriangle className="w-3 h-3 text-rose-600" />
              ) : syncStatus === 'syncing' ? (
                <RefreshCw className="w-3 h-3 text-[#6C63FF] animate-spin" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              )}
              <span>
                {!isOnline
                  ? 'Offline (Cached)'
                  : syncStatus === 'sync_issue'
                  ? 'Sync Warning'
                  : syncStatus === 'syncing'
                  ? 'Syncing...'
                  : 'Progress Cached & Synced'}
              </span>
            </div>

            {/* Quick Voice Coach Pill */}
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20 border border-[#6C63FF]/20 transition"
            >
              <Mic className="w-3.5 h-3.5 text-[#6C63FF] animate-pulse" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>

            {/* Career Readiness Score Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#00C2A8]/10 text-[#00C2A8] border border-[#00C2A8]/20 rounded-full text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-[#00C2A8]" />
              <span>{careerReadinessScore}% Career Ready</span>
            </div>

            {/* User Avatar */}
            <div
              onClick={() => setCurrentRoute('profile')}
              className="w-8 h-8 rounded-xl overflow-hidden cursor-pointer ring-1 ring-gray-200 hover:ring-2 hover:ring-[#6C63FF] transition"
            >
              <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Page Inner Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
      </div>

      {/* Mobile Bottom Navigation (Responsive 390px requirement) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-2 py-2 flex items-center justify-around shadow-lg">
        {[
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'skill-gaps', label: 'Skills', icon: Target },
          { id: 'roadmap', label: 'Roadmap', icon: MapPin },
          { id: 'projects', label: 'Projects', icon: FolderGit2 },
          { id: 'coach', label: 'AI Coach', icon: Sparkles },
          { id: 'profile', label: 'Profile', icon: User },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = currentRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentRoute(item.id as PageRoute)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                isActive ? 'text-[#6C63FF]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
