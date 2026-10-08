import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  Layers,
  FolderGit2,
  Clock,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Mic,
  ChevronRight,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Dashboard: React.FC = () => {
  const {
    user,
    selectedCareer,
    careerReadinessScore,
    skillGaps,
    priorityGapsCount,
    setCurrentRoute,
    setIsVoiceModalOpen,
  } = useApp();

  const readinessOverTime = [
    { week: 'Week 1', score: 48 },
    { week: 'Week 2', score: 56 },
    { week: 'Week 3', score: 61 },
    { week: 'Week 4', score: 68 },
    { week: 'Week 5', score: 72 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 22. HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Good morning, {user.name.split(' ')[0]} 👋
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Here's your career progress toward becoming a {selectedCareer.title}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#6C63FF] hover:bg-[#6C63FF]/5 transition flex items-center gap-1.5 shadow-xs"
          >
            <Mic className="w-4 h-4 text-[#6C63FF] animate-pulse" />
            <span>Voice Career Coach</span>
          </button>
          <button
            onClick={() => setCurrentRoute('roadmap')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#6C63FF]/20 flex items-center gap-1.5"
          >
            <span>Continue Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 22. MAIN SCORE CARD & KEY METRICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Readiness Score Card (Left 5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1020] via-[#12182D] to-[#1E1B4B] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#6C63FF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#00C2A8]/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00C2A8]">
                Career Readiness
              </span>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-400 border border-white/10">
                +12% This Month
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-6xl sm:text-7xl font-black tracking-tight text-white">
                {careerReadinessScore}%
              </span>
              <span className="text-sm font-semibold text-gray-300">
                / 100% Target
              </span>
            </div>

            <p className="text-sm text-gray-200 font-medium mt-3 leading-relaxed">
              <strong>{priorityGapsCount} priority skills</strong> need improvement before applying for open {selectedCareer.title} roles.
            </p>
          </div>

          <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => setCurrentRoute('skill-gaps')}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-[#0B1020] hover:bg-gray-100 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>View Skill Gaps</span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentRoute('coach')}
              className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 rounded-xl text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#00C2A8]" />
              <span>Ask AI Strategy</span>
            </button>
          </div>
        </div>

        {/* 4 Dashboard Cards: Current Skills (8), Missing Skills (4), Projects (2), Learning Progress (42%) */}
        <div className="lg:col-span-7 grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-3 shadow-xs hover:border-[#6C63FF]/30 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Current Skills
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#171A2B]">
                {user.skills.length}
              </span>
              <span className="text-xs text-emerald-600 font-bold">+2 verified</span>
            </div>
            <p className="text-xs text-gray-500">Evaluated on live rubric</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-3 shadow-xs hover:border-[#6C63FF]/30 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Missing Skills
              </span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-rose-600">
                {priorityGapsCount}
              </span>
              <span className="text-xs text-rose-600 font-bold">Requires focus</span>
            </div>
            <p className="text-xs text-gray-500">Design Systems & Research</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-3 shadow-xs hover:border-[#6C63FF]/30 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Projects
              </span>
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-[#6C63FF] flex items-center justify-center">
                <FolderGit2 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#171A2B]">
                {user.completedProjectsCount}
              </span>
              <span className="text-xs text-gray-400 font-medium">1 in progress</span>
            </div>
            <p className="text-xs text-gray-500">Applied portfolio pieces</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-3 shadow-xs hover:border-[#6C63FF]/30 transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Learning Progress
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#171A2B]">42%</span>
              <span className="text-xs text-amber-600 font-bold">Week 3 of 8</span>
            </div>
            <p className="text-xs text-gray-500">7-day active streak</p>
          </div>
        </div>
      </div>

      {/* 23. DASHBOARD CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Skill Gap Chart: Current vs Required (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#171A2B]">Skill Gap Chart</h3>
              <p className="text-xs text-gray-500">Current ability vs Required benchmark</p>
            </div>
            <button
              onClick={() => setCurrentRoute('skill-gaps')}
              className="text-xs font-bold text-[#6C63FF] hover:underline"
            >
              Detailed Breakdown →
            </button>
          </div>

          <div className="space-y-4 pt-1">
            {skillGaps.slice(0, 5).map((g) => (
              <div key={g.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#171A2B]">{g.name}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        g.priority === 'Critical Gap'
                          ? 'bg-rose-50 text-rose-700'
                          : g.priority === 'Priority'
                          ? 'bg-amber-50 text-amber-700'
                          : g.priority === 'Developing'
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {g.priority}
                    </span>
                  </div>
                  <span className="text-gray-500 font-medium">
                    {g.currentLevel}% <span className="text-gray-400">/ {g.requiredLevel}%</span>
                  </span>
                </div>

                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                  {/* Required indicator marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
                    style={{ left: `${g.requiredLevel}%` }}
                  />
                  {/* Current progress */}
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${g.currentLevel}%`,
                      backgroundColor:
                        g.priority === 'Critical Gap'
                          ? '#EF4444'
                          : g.priority === 'Priority'
                          ? '#F59E0B'
                          : g.priority === 'Developing'
                          ? '#6C63FF'
                          : '#22C55E',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Career Readiness Improvement Over Time (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xs space-y-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#171A2B]">Readiness Velocity</h3>
                <p className="text-xs text-gray-500">Progress over the last 5 weeks</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                +24% Overall
              </span>
            </div>

            {/* Visual Bar representation over time */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-gray-100">
              {readinessOverTime.map((item, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[11px] font-bold text-gray-600 group-hover:text-[#6C63FF] transition">
                    {item.score}%
                  </span>
                  <div
                    className="w-full bg-[#6C63FF]/20 group-hover:bg-[#6C63FF] rounded-t-lg transition-all duration-500"
                    style={{ height: `${(item.score / 100) * 110}px` }}
                  />
                  <span className="text-[10px] text-gray-400 font-semibold">{item.week}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 flex items-center justify-between text-xs text-gray-500">
            <span>Started: Week 1 (48%)</span>
            <span className="font-bold text-[#171A2B]">Current: Week 5 (72%)</span>
          </div>
        </div>
      </div>

      {/* Recommended Next Action Banner */}
      <div className="bg-gradient-to-r from-[#6C63FF]/10 via-[#00C2A8]/10 to-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6C63FF] text-white flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#6C63FF]">
              Recommended Next Sprint Action
            </p>
            <p className="text-sm font-bold text-[#171A2B]">
              Week 3: Design Systems & Token Architecture (In Progress)
            </p>
          </div>
        </div>
        <button
          onClick={() => setCurrentRoute('roadmap')}
          className="px-5 py-2.5 bg-[#0B1020] text-white hover:bg-black rounded-xl text-xs font-bold transition whitespace-nowrap"
        >
          Resume Practice Task
        </button>
      </div>
    </div>
  );
};
