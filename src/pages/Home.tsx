import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Target,
  Layers,
  MapPin,
  FolderGit2,
  Bot,
  Search,
  Check,
  ChevronRight,
  Flame,
  Clock,
  Briefcase,
  Play,
  ShieldCheck,
  Mic,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREERS } from '../data/careersData';
import { PageRoute } from '../types';

export const Home: React.FC = () => {
  const { setCurrentRoute, setSelectedCareerId, setIsVoiceModalOpen } = useApp();
  const [careerCategoryFilter, setCareerCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCareers = CAREERS.filter((c) => {
    const matchesCategory =
      careerCategoryFilter === 'All' || c.category === careerCategoryFilter;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-24 sm:space-y-32">
      {/* 6. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#6C63FF]/15 via-[#8B5CF6]/10 to-[#00C2A8]/10 blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#6C63FF]/20 shadow-xs shadow-[#6C63FF]/10 text-xs font-bold tracking-wider text-[#6C63FF] uppercase animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5 text-[#00C2A8]" />
              <span>AI-POWERED CAREER INTELLIGENCE</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-[#171A2B] tracking-tight leading-[1.1]">
              Turn your skills into your <span className="bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] bg-clip-text text-transparent">career roadmap.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
              Discover what you're good at, identify the skills you're missing, and get a personalized AI roadmap to become job-ready.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setCurrentRoute('onboarding')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 shadow-lg shadow-[#6C63FF]/30 hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>Analyze My Skills</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  const elem = document.getElementById('career-explorer');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-[#171A2B] bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition"
              >
                Explore Careers
              </button>
            </div>

            {/* Voice Prompt Teaser */}
            <div className="pt-2 flex items-center justify-center gap-2 text-xs font-medium text-gray-500">
              <span className="w-2 h-2 rounded-full bg-[#00C2A8] animate-ping" />
              <span>Interactive Voice Assistant available</span>
              <button
                onClick={() => setIsVoiceModalOpen(true)}
                className="text-[#6C63FF] hover:underline font-bold flex items-center gap-1 ml-1"
              >
                <Mic className="w-3.5 h-3.5" /> Try voice demo
              </button>
            </div>
          </div>

          {/* Hero Visual: Realistic Dashboard Preview with Floating Elements */}
          <div className="mt-14 relative max-w-5xl mx-auto">
            {/* Floating Element: 72% Career Ready */}
            <div className="absolute -top-6 -left-4 sm:-left-8 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-gray-100/80 flex items-center gap-3 animate-bounce-gentle">
              <div className="w-11 h-11 rounded-xl bg-[#00C2A8]/10 text-[#00C2A8] flex items-center justify-center font-extrabold text-lg">
                72%
              </div>
              <div>
                <p className="text-xs font-bold text-[#171A2B]">Career Ready</p>
                <p className="text-[11px] text-[#6B7280]">UI/UX Designer Target</p>
              </div>
            </div>

            {/* Floating Element: 4 Priority Skills */}
            <div className="absolute -bottom-6 -left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-gray-100/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#171A2B]">4 Priority Skills</p>
                <p className="text-[11px] text-[#6B7280]">Focus this week</p>
              </div>
            </div>

            {/* Floating Element: +12% This Month */}
            <div className="absolute -top-6 -right-4 sm:-right-8 z-20 bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-xl border border-gray-100/80 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center font-bold">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-600">+12% This Month</p>
                <p className="text-[11px] text-[#6B7280]">Velocity tracker</p>
              </div>
            </div>

            {/* Main Interactive Preview Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 shadow-2xl overflow-hidden p-6 sm:p-8">
              {/* Dashboard Preview Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gray-100 gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#6C63FF]">
                      Live Career Intelligence
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold">
                      Verified Benchmark
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#171A2B] mt-1">
                    Ananya’s UI/UX Skill Diagnostic
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentRoute('skill-gaps')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20 transition"
                  >
                    View Full Analysis
                  </button>
                  <button
                    onClick={() => setCurrentRoute('coach')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#0B1020] text-white hover:bg-black transition flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#00C2A8]" />
                    <span>Ask Coach</span>
                  </button>
                </div>
              </div>

              {/* Grid content inside preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                {/* Score Column */}
                <div className="bg-[#F7F8FC] rounded-2xl p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Readiness Score
                    </span>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-5xl font-extrabold text-[#171A2B]">72%</span>
                      <span className="text-xs font-bold text-emerald-600">+8% vs avg</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      4 priority skills need improvement before applying to mid-level roles.
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/60 mt-4 space-y-1.5 text-xs">
                    <div className="flex justify-between text-gray-600">
                      <span>Verified Skills</span>
                      <span className="font-bold text-[#171A2B]">8</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Identified Gaps</span>
                      <span className="font-bold text-rose-600">4</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Portfolio Projects</span>
                      <span className="font-bold text-[#171A2B]">2 completed</span>
                    </div>
                  </div>
                </div>

                {/* Skill Gap Comparison Bars */}
                <div className="md:col-span-2 space-y-3.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-500 pb-1">
                    <span>Key Target Competencies</span>
                    <span>Current vs Required</span>
                  </div>

                  {[
                    { name: 'Figma & Auto-layout', current: 85, required: 90, label: 'Strong', badge: 'bg-emerald-50 text-emerald-700' },
                    { name: 'UX Research & Discovery', current: 55, required: 85, label: 'Developing', badge: 'bg-indigo-50 text-indigo-700' },
                    { name: 'Design Systems Architecture', current: 35, required: 80, label: 'Critical Gap', badge: 'bg-rose-50 text-rose-700' },
                    { name: 'Interactive Prototyping', current: 70, required: 90, label: 'Developing', badge: 'bg-indigo-50 text-indigo-700' },
                    { name: 'Usability Testing (SUS)', current: 40, required: 75, label: 'Priority', badge: 'bg-amber-50 text-amber-700' },
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#171A2B]">{s.name}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.badge}`}>
                            {s.label}
                          </span>
                        </div>
                        <span className="font-medium text-gray-500">
                          {s.current}% <span className="text-gray-400">/ {s.required}%</span>
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
                        {/* Required marker */}
                        <div
                          className="absolute top-0 bottom-0 w-0.5 bg-gray-400 z-10"
                          style={{ left: `${s.required}%` }}
                          title={`Required: ${s.required}%`}
                        />
                        {/* Current progress */}
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${s.current}%`,
                            backgroundColor:
                              s.label === 'Critical Gap'
                                ? '#EF4444'
                                : s.label === 'Priority'
                                ? '#F59E0B'
                                : s.label === 'Developing'
                                ? '#6C63FF'
                                : '#22C55E',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Built for the next generation of professionals.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            {[
              'Students',
              'Graduates',
              'Job Seekers',
              'Career Switchers',
              'Young Professionals',
            ].map((cat, idx) => (
              <span
                key={idx}
                className="px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-[#171A2B] shadow-xs"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold text-[#00C2A8] uppercase tracking-wider">
              The Learning Trap
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Not sure what to learn next?
            </h2>
            <p className="text-gray-300 text-base leading-relaxed">
              Traditional courses sell hundreds of hours of video tutorials. But without a precise skill gap diagnosis, most learners stay unprepared for actual hiring interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-bold text-white">Too many skills</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Users don't know which skills actually matter for their target career versus nice-to-haves.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-bold text-white">No clear direction</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Users learn random tutorials without an end-to-end, milestone-driven structured career plan.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/20 text-[#6C63FF] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-bold text-white">Hard to measure progress</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Users don't know whether their effort is actually making them job-ready for live interview loops.
              </p>
            </div>
          </div>

          {/* Solution introduction */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-[#6C63FF]/20 to-[#00C2A8]/20 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-white text-base">
                SkillLens AI solves this with precision gap intelligence.
              </p>
              <p className="text-xs text-gray-300">
                Diagnose exact percentages, bridge gaps with verified deliverables, and track readiness.
              </p>
            </div>
            <button
              onClick={() => setCurrentRoute('assessment')}
              className="px-6 py-3 rounded-xl bg-white text-[#0B1020] text-sm font-bold hover:bg-gray-100 transition whitespace-nowrap"
            >
              Take Free Diagnostic
            </button>
          </div>
        </div>
      </section>

      {/* 9. HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
            From confusion to career clarity in 4 steps.
          </h2>
          <p className="text-base text-gray-500">
            A battle-tested framework helping over 18,000 learners bridge their career gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Build Your Profile',
              desc: 'Tell SkillLens AI about your education, experience and current skills, or simply upload your resume.',
            },
            {
              step: '02',
              title: 'Choose Your Career',
              desc: 'Select the career or job role you want to pursue from verified market benchmarks.',
            },
            {
              step: '03',
              title: 'Analyze Your Skill Gaps',
              desc: 'AI compares your current abilities with the requirements of your target role and computes exact gaps.',
            },
            {
              step: '04',
              title: 'Follow Your Roadmap',
              desc: 'Get a personalized learning and project roadmap with step-by-step verified deliverables.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 hover:shadow-lg hover:border-[#6C63FF]/40 transition group"
            >
              <span className="text-3xl font-extrabold bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] bg-clip-text text-transparent group-hover:scale-105 inline-block transition">
                {item.step}
              </span>
              <h3 className="text-lg font-bold text-[#171A2B]">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentRoute('onboarding')}
            className="px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 shadow-md shadow-[#6C63FF]/20"
          >
            Start My Analysis
          </button>
        </div>
      </section>

      {/* 10. FEATURE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
            Everything you need to become career-ready.
          </h2>
          <p className="text-base text-gray-500">
            A unified suite designed to guide you from initial assessment to job offers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: 'AI Skill Analysis',
              desc: 'Understand your current skill level through transparent rubric evaluations and automated resume ingestion.',
            },
            {
              icon: Layers,
              title: 'Skill Gap Detection',
              desc: 'Discover exactly what you are missing with formulaic gap metrics (Required Level − Current Level).',
            },
            {
              icon: Award,
              title: 'Career Readiness Score',
              desc: 'See how close you are to your target role with an honest, data-backed 0-100% readiness score.',
            },
            {
              icon: MapPin,
              title: 'Personalized Roadmap',
              desc: 'Get an AI-generated 8-week learning plan tailored to your available hours and largest leverage skills.',
            },
            {
              icon: FolderGit2,
              title: 'Project Recommendations',
              desc: 'Build hands-on portfolio projects that directly improve your missing skills and impress recruiters.',
            },
            {
              icon: Bot,
              title: 'AI Career Coach',
              desc: 'Ask questions, review case studies, and receive personalized text and live voice career guidance.',
            },
          ].map((f, idx) => {
            const Icon = f.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-3 hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#171A2B]">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 11. SKILL GAP VISUAL (Interactive Section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
              Transparent Gap Breakdown
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
              See exactly where you stand.
            </h2>
            <p className="text-gray-500 text-sm">
              Live comparison against market requirements for Senior Product & UX Designer roles.
            </p>
          </div>

          <div className="space-y-6">
            {[
              { name: 'Figma', current: 85, required: 90, status: 'Strong', badge: 'bg-emerald-50 text-emerald-700' },
              { name: 'UX Research', current: 55, required: 85, status: 'Developing', badge: 'bg-indigo-50 text-indigo-700' },
              { name: 'Design Systems', current: 35, required: 80, status: 'Critical Gap', badge: 'bg-rose-50 text-rose-700' },
              { name: 'Prototyping', current: 70, required: 90, status: 'Developing', badge: 'bg-indigo-50 text-indigo-700' },
              { name: 'Usability Testing', current: 40, required: 75, status: 'Priority', badge: 'bg-amber-50 text-amber-700' },
            ].map((skill, i) => (
              <div key={i} className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#171A2B] text-base">{skill.name}</span>
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${skill.badge}`}>
                      {skill.status}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-gray-500 flex items-center gap-3">
                    <span>
                      Current: <strong className="text-[#171A2B]">{skill.current}%</strong>
                    </span>
                    <span>
                      Required: <strong className="text-gray-700">{skill.required}%</strong>
                    </span>
                    <span className="text-rose-600 font-bold">
                      Gap: {skill.required - skill.current}%
                    </span>
                  </div>
                </div>

                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden relative">
                  {/* Required point */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-gray-600 z-10"
                    style={{ left: `${skill.required}%` }}
                    title={`Required benchmark: ${skill.required}%`}
                  />
                  {/* Current Fill */}
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: `${skill.current}%`,
                      backgroundColor:
                        skill.status === 'Critical Gap'
                          ? '#EF4444'
                          : skill.status === 'Priority'
                          ? '#F59E0B'
                          : skill.status === 'Developing'
                          ? '#6C63FF'
                          : '#22C55E',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
            <div className="flex items-center gap-4 text-xs font-medium text-gray-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" /> Strong
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#6C63FF]" /> Developing
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" /> Priority
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" /> Critical Gap
              </span>
            </div>
            <button
              onClick={() => setCurrentRoute('skill-gaps')}
              className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1"
            >
              Analyze Your Own Skills Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 12. CAREER READINESS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020] text-white rounded-3xl p-8 sm:p-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <span className="text-xs font-bold text-[#00C2A8] uppercase tracking-wider">
                Readiness Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Know when you're ready.
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                “You're making strong progress. Focus on 4 priority skills to improve your readiness.”
              </p>

              {/* 4 Key Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-2xl font-extrabold text-[#00C2A8]">+4</span>
                  <p className="text-xs text-gray-400 mt-1">Skills improved</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-2xl font-extrabold text-[#6C63FF]">18h</span>
                  <p className="text-xs text-gray-400 mt-1">Learning hours</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-2xl font-extrabold text-white">2</span>
                  <p className="text-xs text-gray-400 mt-1">Projects</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                  <span className="text-2xl font-extrabold text-amber-400 flex items-center justify-center gap-1">
                    <Flame className="w-5 h-5" /> 7d
                  </span>
                  <p className="text-xs text-gray-400 mt-1">Weekly streak</p>
                </div>
              </div>
            </div>

            {/* Circular Readiness Score Graphic */}
            <div className="flex flex-col items-center justify-center p-6">
              <div className="relative w-56 h-56 flex items-center justify-center">
                {/* SVG Radial ring */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="112"
                    cy="112"
                    r="92"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth="14"
                    fill="transparent"
                  />
                  <circle
                    cx="112"
                    cy="112"
                    r="92"
                    stroke="url(#gradient-circle)"
                    strokeWidth="14"
                    strokeDasharray={2 * Math.PI * 92}
                    strokeDashoffset={2 * Math.PI * 92 * (1 - 0.72)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                  <defs>
                    <linearGradient id="gradient-circle" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6C63FF" />
                      <stop offset="100%" stopColor="#00C2A8" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Inner Text */}
                <div className="absolute text-center space-y-1">
                  <span className="text-5xl font-extrabold tracking-tight">72%</span>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Career Readiness
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCurrentRoute('dashboard')}
                className="mt-6 px-6 py-2.5 rounded-xl bg-white text-[#0B1020] text-xs font-bold hover:bg-gray-100 transition"
              >
                Open Career Dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13. CAREER EXPLORER */}
      <section id="career-explorer" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
              Market Benchmarks
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
              Explore your next career.
            </h2>
            <p className="text-sm text-gray-500">
              Browse top roles with benchmarked skill criteria and live market compensation.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search careers..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Design', 'Technology', 'Marketing', 'Business', 'Data'].map((category) => (
            <button
              key={category}
              onClick={() => setCareerCategoryFilter(category)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                careerCategoryFilter === category
                  ? 'bg-[#6C63FF] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Career Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 hover:shadow-lg hover:border-[#6C63FF]/30 transition group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
                    {c.category}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {c.salaryRange}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-[#171A2B] mt-3 group-hover:text-[#6C63FF] transition">
                  {c.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                  {c.shortDesc}
                </p>

                {/* Average Skill Readiness Benchmark */}
                <div className="mt-4 p-3 rounded-xl bg-[#F7F8FC] border border-gray-100">
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600">Average Readiness Benchmark</span>
                    <span className="text-[#171A2B]">{c.readinessBenchmark}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00C2A8] rounded-full"
                      style={{ width: `${c.readinessBenchmark}%` }}
                    />
                  </div>
                </div>

                {/* Required Skills Chips */}
                <div className="mt-4 space-y-1.5">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Core Skills Required:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.requiredSkills.slice(0, 4).map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700"
                      >
                        {s.name} ({s.requiredLevel}%)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">
                  {c.requiredSkills.length} benchmark skills
                </span>
                <button
                  onClick={() => {
                    setSelectedCareerId(c.id);
                    setCurrentRoute('skill-gaps');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#171A2B] text-white hover:bg-[#6C63FF] transition flex items-center gap-1"
                >
                  <span>Explore Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 14. AI CAREER ASSISTANT SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B1020] via-[#12182D] to-[#1E1B4B] text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold text-[#00C2A8] uppercase tracking-wider">
              Always-On Coaching
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Your career questions, answered by AI.
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Trained on hiring manager expectations and real-world competency frameworks. Ask anything via text or live voice assistant.
            </p>
          </div>

          {/* Interactive Preview Conversation */}
          <div className="mt-8 max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
            {/* User message */}
            <div className="flex items-start justify-end gap-3">
              <div className="bg-[#6C63FF] text-white rounded-2xl rounded-tr-xs px-4 py-3 text-sm max-w-lg">
                <p className="font-medium">
                  “What should I learn next to become a UI/UX designer?”
                </p>
              </div>
            </div>

            {/* AI message */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#00C2A8] flex items-center justify-center text-[#0B1020] shrink-0 font-extrabold text-xs shadow-md">
                AI
              </div>
              <div className="bg-white/10 text-gray-200 rounded-2xl rounded-tl-xs p-5 text-sm max-w-xl space-y-3">
                <p>
                  You already have strong Figma fundamentals (85%). Your biggest opportunities to land interviews are <strong>Design Systems</strong>, <strong>UX Research</strong>, and <strong>Usability Testing</strong>.
                </p>
                <p className="text-white font-semibold">
                  Start with Design Systems this week.
                </p>
                <div>
                  <p className="text-xs font-bold text-[#00C2A8] uppercase tracking-wider mb-1">
                    Recommended Practice:
                  </p>
                  <ul className="space-y-1 text-xs text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8]" />
                      Build a component library with auto-layout
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8]" />
                      Create design tokens (colors, typography, spacing)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8]" />
                      Practice component variants & interactive states
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8]" />
                      Build responsive mobile and desktop components
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setCurrentRoute('coach')}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 text-white text-sm font-semibold shadow-lg shadow-[#6C63FF]/30 flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Talk to SkillLens AI</span>
            </button>
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 text-sm font-semibold flex items-center gap-2 transition"
            >
              <Mic className="w-4 h-4 text-[#00C2A8]" />
              <span>Launch Voice Assistant</span>
            </button>
          </div>
        </div>
      </section>

      {/* 15. ROADMAP SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Structured Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
            Your career. Your roadmap.
          </h2>
          <p className="text-sm text-gray-500">
            A milestone-driven 8-week sprint taking you from current ability to job interview readiness.
          </p>
        </div>

        {/* 8-Week Visual Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { week: 'Week 1', title: 'UX Research', state: 'Completed', color: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-50' },
            { week: 'Week 2', title: 'Advanced Figma', state: 'Completed', color: 'bg-emerald-500', badge: 'text-emerald-700 bg-emerald-50' },
            { week: 'Week 3', title: 'Design Systems', state: 'In Progress', color: 'bg-[#6C63FF]', badge: 'text-[#6C63FF] bg-indigo-50' },
            { week: 'Week 4', title: 'Responsive Design', state: 'Upcoming', color: 'bg-gray-300', badge: 'text-gray-600 bg-gray-100' },
            { week: 'Week 5', title: 'Usability Testing', state: 'Upcoming', color: 'bg-gray-300', badge: 'text-gray-600 bg-gray-100' },
            { week: 'Week 6', title: 'Portfolio Project', state: 'Upcoming', color: 'bg-gray-300', badge: 'text-gray-600 bg-gray-100' },
            { week: 'Week 7', title: 'Case Study', state: 'Upcoming', color: 'bg-gray-300', badge: 'text-gray-600 bg-gray-100' },
            { week: 'Week 8', title: 'Interview Prep', state: 'Upcoming', color: 'bg-gray-300', badge: 'text-gray-600 bg-gray-100' },
          ].map((w, idx) => (
            <div
              key={idx}
              onClick={() => setCurrentRoute('roadmap')}
              className="bg-white rounded-2xl border border-gray-200/80 p-5 space-y-3 cursor-pointer hover:border-[#6C63FF] hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-400 uppercase">{w.week}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${w.badge}`}>
                  {w.state}
                </span>
              </div>
              <h4 className="font-bold text-[#171A2B] text-base">{w.title}</h4>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${w.color}`}
                  style={{
                    width: w.state === 'Completed' ? '100%' : w.state === 'In Progress' ? '65%' : '0%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setCurrentRoute('roadmap')}
            className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center justify-center gap-1 mx-auto"
          >
            Explore Interactive Weekly Roadmap <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 16. PROJECT RECOMMENDATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
              Applied Proof
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
              Don't just learn. Build.
            </h2>
            <p className="text-sm text-gray-500">
              SkillLens AI recommends projects specifically designed to improve your skill gaps.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('projects')}
            className="px-6 py-2.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-[#171A2B] hover:bg-gray-50 transition"
          >
            Explore Projects
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project 1 */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 hover:shadow-lg transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  Intermediate
                </span>
                <span className="text-xs text-gray-500 font-medium">16 - 20 hrs</span>
              </div>
              <h3 className="text-xl font-bold text-[#171A2B]">AI Healthcare Dashboard</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Translate doctor diagnostic telemetry into high-contrast clinical dashboards with scalable tokens.
              </p>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Skills Gained:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Dashboard UI', 'Data Visualization', 'UX Research', 'Design Systems'].map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentRoute('projects')}
              className="w-full py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-[#6C63FF] transition"
            >
              View Project Specification
            </button>
          </div>

          {/* Project 2 */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 hover:shadow-lg transition flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                  Intermediate
                </span>
                <span className="text-xs text-gray-500 font-medium">14 - 18 hrs</span>
              </div>
              <h3 className="text-xl font-bold text-[#171A2B]">AI Finance Assistant</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Mobile budgeting companion with conversational wealth advisory and spring-physics prototypes.
              </p>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Skills Gained:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Mobile UX', 'AI Interaction', 'Prototyping', 'Information Architecture'].map((s, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentRoute('projects')}
              className="w-full py-2.5 rounded-xl bg-[#0B1020] text-white text-xs font-bold hover:bg-[#6C63FF] transition"
            >
              View Project Specification
            </button>
          </div>
        </div>
      </section>

      {/* 17. TESTIMONIAL SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Verified Outcomes
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
            Real stories from career builders.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 shadow-xs">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              “SkillLens helped me understand exactly what I was missing before applying for UI/UX jobs. In 6 weeks, I landed 3 interviews.”
            </p>
            <div className="pt-2 border-t border-gray-100">
              <p className="font-bold text-sm text-[#171A2B]">Ananya</p>
              <p className="text-xs text-gray-500">UI/UX Designer</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 shadow-xs">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              “I stopped jumping between random courses and finally had a structured roadmap. The hands-on project deliverables made all the difference.”
            </p>
            <div className="pt-2 border-t border-gray-100">
              <p className="font-bold text-sm text-[#171A2B]">Rahul</p>
              <p className="text-xs text-gray-500">Graduate</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-4 shadow-xs">
            <p className="text-sm text-gray-700 italic leading-relaxed">
              “The skill gap visualization made my career goals much clearer. I went from feeling lost in design tutorials to building a real token kit.”
            </p>
            <div className="pt-2 border-t border-gray-100">
              <p className="font-bold text-sm text-[#171A2B]">Priya</p>
              <p className="text-xs text-gray-500">Career Switcher</p>
            </div>
          </div>
        </div>
      </section>

      {/* 18. FINAL CTA SECTION (Strong dark section) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1020] text-white rounded-3xl p-10 sm:p-16 text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6C63FF]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00C2A8]/15 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">
            Your next career move starts with knowing where you stand.
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Analyze your skills, discover your gaps and build a personalized path to becoming job-ready.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setCurrentRoute('onboarding')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 shadow-xl shadow-[#6C63FF]/40 transition"
            >
              Analyze My Skills — It's Free
            </button>
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-base font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/15 transition flex items-center justify-center gap-2"
            >
              <Mic className="w-4 h-4 text-[#00C2A8]" />
              <span>Ask Voice Assistant</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
