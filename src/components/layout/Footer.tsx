import React from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';

export const Footer: React.FC = () => {
  const { setCurrentRoute } = useApp();

  const handleRoute = (route: PageRoute) => {
    setCurrentRoute(route);
  };

  return (
    <footer className="bg-[#0B1020] text-gray-400 pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <div
              onClick={() => handleRoute('home')}
              className="flex items-center gap-3 cursor-pointer select-none group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00C2A8] flex items-center justify-center text-white shadow-lg">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">SkillLens</span>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] bg-clip-text text-transparent">
                  AI
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              AI-powered career clarity for the next generation of professionals. Discover what you're good at, identify your missing skills, and get a personalized roadmap to become job-ready.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-gray-400">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#00C2A8] animate-pulse" />
                Gemini 3.8 Intelligence Engine
              </span>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleRoute('assessment')} className="hover:text-white transition">
                  Skill Analysis
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('skill-gaps')} className="hover:text-white transition">
                  Skill Gap Detection
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('roadmap')} className="hover:text-white transition">
                  Career Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('coach')} className="hover:text-white transition">
                  AI Career Coach
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('projects')} className="hover:text-white transition">
                  Recommended Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Careers Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Careers</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleRoute('careers')} className="hover:text-white transition">
                  UI/UX Design
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('careers')} className="hover:text-white transition">
                  Frontend Development
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('careers')} className="hover:text-white transition">
                  Data Analytics
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('careers')} className="hover:text-white transition">
                  Product Management
                </button>
              </li>
              <li>
                <button onClick={() => handleRoute('careers')} className="hover:text-white transition">
                  AI Solutions Engineering
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => handleRoute('how-it-works')} className="hover:text-white transition">
                  How It Works
                </button>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Career Guides</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Benchmark Reports</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">API Documentation</span>
              </li>
              <li>
                <span className="text-gray-500 cursor-not-allowed">Privacy & Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
          <p>© 2026 SkillLens AI. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for the next generation of students, graduates & career switchers
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};
