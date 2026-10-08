import React from 'react';
import {
  TrendingUp,
  Clock,
  Flame,
  Award,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Progress: React.FC = () => {
  const { user, selectedCareer, careerReadinessScore, setCurrentRoute } = useApp();

  const weeklyHoursData = [
    { day: 'Mon', hours: 3.2 },
    { day: 'Tue', hours: 2.8 },
    { day: 'Wed', hours: 4.1 },
    { day: 'Thu', hours: 3.5 },
    { day: 'Fri', hours: 2.0 },
    { day: 'Sat', hours: 1.5 },
    { day: 'Sun', hours: 1.5 },
  ];

  const milestones = [
    { title: 'Passed Figma Advanced Architecture', date: 'Yesterday', category: 'Skill Benchmark', status: 'Completed' },
    { title: 'Completed AI Healthcare Dashboard Sprint 1', date: '3 days ago', category: 'Project', status: 'Completed' },
    { title: 'Closed 20% Gap in Heuristic UX Auditing', date: 'Oct 2, 2026', category: 'Competency', status: 'Completed' },
    { title: 'Started 7-Day Continuous Practice Streak', date: 'Sep 28, 2026', category: 'Habit', status: 'Completed' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Velocity & Performance
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Your Progress
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Real-time analytics tracking your trajectory toward {selectedCareer.title}.
          </p>
        </div>

        <button
          onClick={() => setCurrentRoute('coach')}
          className="px-5 py-2.5 bg-[#0B1020] text-white hover:bg-black rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00C2A8]" />
          <span>Ask AI Performance Review</span>
        </button>
      </div>

      {/* 26. TOP METRICS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Career Readiness</span>
          <p className="text-2xl font-extrabold text-[#6C63FF]">{careerReadinessScore}%</p>
          <p className="text-[10px] text-emerald-600 font-bold">+12% this month</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Improvement</span>
          <p className="text-2xl font-extrabold text-emerald-600">+12%</p>
          <p className="text-[10px] text-gray-400 font-medium">Since baseline</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Skills Improved</span>
          <p className="text-2xl font-extrabold text-[#171A2B]">4</p>
          <p className="text-[10px] text-gray-400 font-medium">Verified rubrics</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Learning Hours</span>
          <p className="text-2xl font-extrabold text-[#171A2B]">18h 40m</p>
          <p className="text-[10px] text-gray-400 font-medium">This week</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Projects Done</span>
          <p className="text-2xl font-extrabold text-[#171A2B]">{user.completedProjectsCount}</p>
          <p className="text-[10px] text-gray-400 font-medium">1 in flight</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200/80 p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Current Streak</span>
          <p className="text-2xl font-extrabold text-amber-500 flex items-center gap-1">
            <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
            7 days
          </p>
          <p className="text-[10px] text-gray-400 font-medium">Personal record</p>
        </div>
      </div>

      {/* CHARTS: Weekly Learning Hours & Competency Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Hours Bar Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-[#171A2B]">Weekly Study Hours</h3>
              <p className="text-xs text-gray-500">18.6 total hours dedicated this week</p>
            </div>
            <span className="text-xs font-bold text-[#6C63FF] bg-[#6C63FF]/10 px-2.5 py-1 rounded-full">
              Pace: 2.6h / day
            </span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-gray-100">
            {weeklyHoursData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[11px] font-bold text-gray-500 group-hover:text-[#6C63FF] transition">
                  {d.hours}h
                </span>
                <div
                  className="w-full bg-gradient-to-t from-[#6C63FF] to-[#8B5CF6] rounded-t-lg transition-all duration-500 hover:opacity-90"
                  style={{ height: `${(d.hours / 4.5) * 120}px` }}
                />
                <span className="text-[11px] font-semibold text-gray-400">{d.day}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            💡 <strong>AI Coach Insight:</strong> Maintaining 2.5+ hours of focused deliberate practice per day reduces your time-to-job readiness from 14 weeks down to 6 weeks.
          </p>
        </div>

        {/* Historical Milestones Tracker (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#171A2B]">Verified Milestones</h3>
            <span className="text-xs text-emerald-600 font-bold">4 Verified</span>
          </div>

          <div className="space-y-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#171A2B]">{m.title}</p>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-0.5">
                    <span>{m.category}</span>
                    <span>•</span>
                    <span>{m.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
