import React, { useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Layers,
  Code2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RecommendedProject } from '../types';

export const RecommendedProjects: React.FC = () => {
  const { projects, updateProjectStatus, selectedCareer, setCurrentRoute } = useApp();
  const [selectedProject, setSelectedProject] = useState<RecommendedProject | null>(projects[0]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Portfolio Proof
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Don't just learn. Build.
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Recruiter-vetted projects designed specifically to bridge your priority skill gaps.
          </p>
        </div>

        <button
          onClick={() => setCurrentRoute('coach')}
          className="px-5 py-2.5 bg-[#0B1020] text-white hover:bg-black rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#00C2A8]" />
          <span>Ask AI to Critique Project</span>
        </button>
      </div>

      {/* Grid: Project Cards on Left, Active Project Blueprint on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List of Projects */}
        <div className="lg:col-span-5 space-y-4">
          {projects.map((proj) => {
            const isSelected = selectedProject?.id === proj.id;
            const isCompleted = proj.status === 'Completed';
            const isInProgress = proj.status === 'In Progress';

            return (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#6C63FF] ring-2 ring-[#6C63FF]/20 shadow-md'
                    : 'border-gray-200/80 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-[#6C63FF]">
                      {proj.difficulty}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">{proj.estimatedHours}</span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-700'
                        : isInProgress
                        ? 'bg-amber-50 text-amber-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {proj.status}
                  </span>
                </div>

                <h3 className="font-bold text-[#171A2B] text-base">{proj.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{proj.shortDesc}</p>

                {/* Target Gaps Addressed */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap gap-1">
                  {proj.targetGaps.map((gap, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700"
                    >
                      Bridges {gap}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Project Detailed Specification Pane */}
        {selectedProject && (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6C63FF]">
                  Project Blueprint & Execution Specs
                </span>
                <h2 className="text-2xl font-extrabold text-[#171A2B] mt-1">
                  {selectedProject.title}
                </h2>
              </div>

              {/* Status Selector */}
              <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
                {(['Not Started', 'In Progress', 'Completed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => updateProjectStatus(selectedProject.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      selectedProject.status === st
                        ? 'bg-white text-[#171A2B] shadow-xs'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {selectedProject.description}
            </p>

            {/* Target Skills Gained */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Skills Gained & Verified:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedProject.skillsGained.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl bg-gray-100 text-gray-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Required Deliverables Checklist */}
            <div className="space-y-3 p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100">
              <h4 className="text-xs font-bold text-[#171A2B] uppercase tracking-wider">
                Recruiter-Ready Deliverables:
              </h4>
              <div className="space-y-2">
                {selectedProject.deliverables.map((del, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-[#00C2A8] shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture / Execution Sprint Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Step-by-Step Architecture Sprint:
              </h4>
              <div className="space-y-2">
                {selectedProject.architectureBreakdown.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white border border-gray-200/80 text-xs flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-gray-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => updateProjectStatus(selectedProject.id, 'In Progress')}
                className="w-full sm:flex-1 py-3 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white rounded-xl text-xs font-bold hover:opacity-95 shadow-md shadow-[#6C63FF]/20 transition text-center"
              >
                Start This Project Sprint
              </button>
              <button
                onClick={() => setCurrentRoute('coach')}
                className="w-full sm:w-auto px-5 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition"
              >
                Ask Coach for Starter Assets
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
