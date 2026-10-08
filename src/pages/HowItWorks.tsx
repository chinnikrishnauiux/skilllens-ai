import React from 'react';
import { ArrowRight, CheckCircle2, XCircle, Sparkles, Target, Layers, Bot, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HowItWorks: React.FC = () => {
  const { setCurrentRoute } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
          The Science of Career Readiness
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171A2B] tracking-tight">
          How SkillLens AI Works
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          Traditional learning tells you to watch 100 hours of videos. SkillLens AI uses empirical skill gap diagnostics to tell you exactly what 3 skills will get you hired.
        </p>
      </div>

      {/* 4 Deep-Dive Steps */}
      <div className="space-y-12">
        {[
          {
            step: '01',
            title: 'Build Your Profile & Ingest Experience',
            badge: 'Diagnostic Input',
            desc: 'Provide your education, current skillset, and upload your resume. Our parsing engine breaks your profile down into verified competencies rather than vague buzzwords.',
            bullets: [
              'Extracts verified skills from projects, courses, and jobs',
              'Assesses initial proficiency across 0-100% scale',
              'Considers your background: Student, Graduate, Job Seeker, or Switcher',
            ],
          },
          {
            step: '02',
            title: 'Select Your Target Role Benchmark',
            badge: 'Market Calibration',
            desc: 'Pick your dream role. We benchmark your profile against live, vetted industry criteria established across 150,000+ real job requisitions.',
            bullets: [
              'Real salary and open role demand tracking',
              'Weights high-importance skills higher in your readiness score',
              'Identifies both technical and soft skill criteria',
            ],
          },
          {
            step: '03',
            title: 'Mathematical Skill Gap Computation',
            badge: 'Gap Intelligence',
            desc: 'Our engine computes: Skill Gap = Required Level − Current Level. Skills are categorized into Critical Gaps, Priority, Developing, and Strong.',
            bullets: [
              'No generic grades: transparent percentage deltas',
              'Automatic prioritization based on recruiter screening filters',
              'Generates honest Career Readiness Percentage (e.g. 72%)',
            ],
          },
          {
            step: '04',
            title: 'Personalized Roadmap & Project Execution',
            badge: 'Applied Action',
            desc: 'Follow an 8-week weekly roadmap with verified practice deliverables and high-impact portfolio projects designed to close your specific gaps.',
            bullets: [
              'Practice tasks with concrete deliverables (Figma kits, PRDs, Apps)',
              'Interactive progress tracking with weekly streak motivation',
              '24/7 AI Career Coach with text & live voice assistance',
            ],
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
          >
            <div className="md:col-span-3 text-center md:text-left">
              <span className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] bg-clip-text text-transparent">
                {item.step}
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-[#00C2A8] mt-2">
                {item.badge}
              </p>
            </div>

            <div className="md:col-span-9 space-y-4">
              <h3 className="text-2xl font-bold text-[#171A2B]">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              <ul className="space-y-2 pt-2">
                {item.bullets.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison: Without vs With SkillLens */}
      <div className="bg-[#0B1020] text-white rounded-3xl p-8 sm:p-14 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-[#00C2A8] uppercase tracking-wider">
            Why It Works
          </span>
          <h2 className="text-3xl font-extrabold tracking-tight">
            Old Way vs SkillLens AI
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Old way */}
          <div className="bg-white/5 border border-rose-500/20 rounded-2xl p-6 space-y-4">
            <h4 className="text-lg font-bold text-rose-400 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-400" /> The Traditional Path
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                Binge-watching 60 hours of video courses without building
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                No idea which skills are actually tested in job interviews
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                Submitting 150 generic resumes without knowing your gap score
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">•</span>
                Cookie-cutter portfolio projects identical to thousands of students
              </li>
            </ul>
          </div>

          {/* SkillLens Way */}
          <div className="bg-white/5 border border-emerald-500/20 rounded-2xl p-6 space-y-4">
            <h4 className="text-lg font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" /> The SkillLens AI Path
            </h4>
            <ul className="space-y-3 text-xs text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                Laser-focused sprint on your 4 critical gaps only
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                Honest Career Readiness metric (e.g. 72% → 85%+)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                High-leverage portfolio projects proving business impact
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">•</span>
                24/7 personalized AI career coach with live voice advice
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentRoute('onboarding')}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white text-sm font-semibold hover:opacity-95 shadow-lg shadow-[#6C63FF]/30"
          >
            Start Your Free Analysis Now
          </button>
        </div>
      </div>
    </div>
  );
};
