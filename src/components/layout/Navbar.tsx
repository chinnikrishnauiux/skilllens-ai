import React, { useState } from 'react';
import { Sparkles, Menu, X, ArrowRight, User, Mic } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';

export const Navbar: React.FC = () => {
  const { currentRoute, setCurrentRoute, isAuthenticated, user, setIsVoiceModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: Array<{ label: string; route: PageRoute }> = [
    { label: 'Home', route: 'home' },
    { label: 'How It Works', route: 'how-it-works' },
    { label: 'Careers', route: 'careers' },
    { label: 'Skill Assessment', route: 'assessment' },
  ];

  const handleNav = (route: PageRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FFFFFF]/90 backdrop-blur-md border-b border-gray-100 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] flex items-center justify-center text-white shadow-md shadow-[#6C63FF]/20 group-hover:scale-105 transition duration-200">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#171A2B]">SkillLens</span>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] bg-clip-text text-transparent">
                AI
              </span>
            </div>
            <p className="text-[10px] text-gray-500 font-medium tracking-wide hidden sm:block">
              Career Gap Intelligence
            </p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => {
            const isActive = currentRoute === item.route;
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-[#6C63FF] font-semibold'
                    : 'text-[#6B7280] hover:text-[#171A2B]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Voice Assistant Shortcut */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#6C63FF] bg-[#6C63FF]/10 hover:bg-[#6C63FF]/20 border border-[#6C63FF]/20 transition"
            title="Ask Voice Coach"
          >
            <Mic className="w-3.5 h-3.5 text-[#6C63FF] animate-pulse" />
            <span>Voice Coach</span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNav('dashboard')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#0B1020] text-white hover:bg-black transition shadow-sm"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div
                onClick={() => handleNav('profile')}
                className="w-10 h-10 rounded-xl overflow-hidden cursor-pointer border border-gray-200 hover:ring-2 hover:ring-[#6C63FF] transition"
                title={user.name}
              >
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNav('login')}
                className="px-4 py-2.5 text-sm font-semibold text-[#171A2B] hover:text-[#6C63FF] transition"
              >
                Log In
              </button>
              <button
                onClick={() => handleNav('onboarding')}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 shadow-md shadow-[#6C63FF]/25 hover:shadow-lg transition"
              >
                Analyze My Skills
              </button>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-gray-600 hover:text-black hover:bg-gray-100 transition"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 bg-white border-b border-gray-200 shadow-xl space-y-3 animate-fadeIn">
          {navLinks.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNav(item.route)}
              className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#6C63FF]"
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-2">
            <button
              onClick={() => {
                setIsVoiceModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-[#6C63FF] bg-[#6C63FF]/10"
            >
              <Mic className="w-4 h-4" />
              <span>Launch Voice Coach</span>
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => handleNav('dashboard')}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#0B1020]"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleNav('login')}
                  className="w-full py-2.5 rounded-xl text-sm font-medium text-gray-700 bg-gray-100"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('onboarding')}
                  className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6]"
                >
                  Analyze My Skills
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
