import React, { useState } from 'react';
import {
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  X,
  ChevronRight,
  Sliders,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SkillGapItem } from '../types';

export const SkillGapAnalysis: React.FC = () => {
  const {
    skillGaps,
    selectedCareer,
    careerReadinessScore,
    updateUserSkill,
    setCurrentRoute,
    showToast,
  } = useApp();

  const [activePlanModal, setActivePlanModal] = useState<SkillGapItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<'All' | 'Critical' | 'Moderate' | 'Strong'>('All');

  const criticalGaps = skillGaps.filter((g) => g.priority === 'Critical Gap');
  const moderateGaps = skillGaps.filter((g) => g.priority === 'Priority' || g.priority === 'Developing');
  const strongSkills = skillGaps.filter((g) => g.priority === 'Strong');

  const displayedGaps = skillGaps.filter((g) => {
    if (filterCategory === 'Critical') return g.priority === 'Critical Gap';
    if (filterCategory === 'Moderate') return g.priority === 'Priority' || g.priority === 'Developing';
    if (filterCategory === 'Strong') return g.priority === 'Strong';
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Diagnostic Breakdown
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Your Skill Gaps
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Compared against benchmarked requirements for {selectedCareer.title}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white border border-gray-200 rounded-xl flex items-center gap-2 shadow-xs">
            <span className="text-xs text-gray-500">Readiness Score:</span>
            <span className="text-base font-extrabold text-[#6C63FF]">{careerReadinessScore}%</span>
          </div>
          <button
            onClick={() => setCurrentRoute('roadmap')}
            className="px-5 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold rounded-xl hover:opacity-95 shadow-md shadow-[#6C63FF]/20 flex items-center gap-1.5"
          >
            <span>Generate Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'All', label: `All Skills (${skillGaps.length})` },
          { id: 'Critical', label: `Critical Gaps (${criticalGaps.length})` },
          { id: 'Moderate', label: `Moderate Gaps (${moderateGaps.length})` },
          { id: 'Strong', label: `Strong Skills (${strongSkills.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterCategory(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              filterCategory === tab.id
                ? 'bg-[#6C63FF] text-white shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Skill Gap Cards List */}
      <div className="space-y-4">
        {displayedGaps.map((item) => {
          const isCritical = item.priority === 'Critical Gap';
          const isPriority = item.priority === 'Priority';
          const isDeveloping = item.priority === 'Developing';

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-6 shadow-xs hover:border-[#6C63FF]/40 transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-lg font-bold text-[#171A2B]">{item.name}</h3>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : isPriority
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : isDeveloping
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                          : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 max-w-2xl">{item.description}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-xs text-gray-400 font-medium">Gap Delta</span>
                    <p className={`text-base font-extrabold ${item.gap > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                      {item.gap > 0 ? `-${item.gap}%` : '0%'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActivePlanModal(item)}
                    className="px-4 py-2.5 rounded-xl bg-[#F7F8FC] hover:bg-[#6C63FF]/10 text-xs font-bold text-[#6C63FF] border border-gray-200 hover:border-[#6C63FF]/30 transition flex items-center gap-1.5"
                  >
                    <span>View Improvement Plan</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress & Target Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-600">
                  <span>Current: {item.currentLevel}%</span>
                  <span className="text-gray-400">Required: {item.requiredLevel}%</span>
                </div>

                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-gray-500 z-10"
                    style={{ left: `${item.requiredLevel}%` }}
                    title={`Required Benchmark: ${item.requiredLevel}%`}
                  />
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${item.currentLevel}%`,
                      backgroundColor:
                        isCritical
                          ? '#EF4444'
                          : isPriority
                          ? '#F59E0B'
                          : isDeveloping
                          ? '#6C63FF'
                          : '#22C55E',
                    }}
                  />
                </div>
              </div>

              {/* Interactive Simulator: Adjust Slider to test impact */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-500 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-gray-400" />
                  <span>Simulate skill improvement:</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={item.currentLevel}
                    onChange={(e) => {
                      updateUserSkill(item.name, Number(e.target.value));
                    }}
                    className="accent-[#6C63FF] w-32 h-1.5 cursor-pointer"
                  />
                  <span className="font-bold text-[#171A2B]">{item.currentLevel}%</span>
                </div>

                <div className="flex items-center gap-1.5 text-gray-400 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>~{item.learningHoursNeeded} hrs practice required to bridge</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Improvement Plan Modal */}
      {activePlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6C63FF]">
                  AI Improvement Plan
                </span>
                <h3 className="text-xl font-extrabold text-[#171A2B] mt-0.5">
                  Bridge Your {activePlanModal.name} Gap
                </h3>
              </div>
              <button
                onClick={() => setActivePlanModal(null)}
                className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Gap Metric Pill */}
            <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-500">Current vs Target</span>
                <p className="text-base font-extrabold text-[#171A2B]">
                  {activePlanModal.currentLevel}% → {activePlanModal.requiredLevel}%
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Estimated Effort</span>
                <p className="text-base font-extrabold text-[#6C63FF]">
                  ~{activePlanModal.learningHoursNeeded} hours
                </p>
              </div>
            </div>

            {/* Recommended Action Items */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Target Action Checklist:
              </h4>
              <div className="space-y-2">
                {activePlanModal.recommendedActions.map((act, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={() => {
                  setActivePlanModal(null);
                  setCurrentRoute('roadmap');
                }}
                className="flex-1 py-3 bg-[#6C63FF] hover:bg-[#5b52e0] text-white rounded-xl text-xs font-bold transition text-center"
              >
                Add to Weekly Roadmap
              </button>
              <button
                onClick={() => {
                  setActivePlanModal(null);
                  setCurrentRoute('coach');
                }}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
              >
                Ask Coach
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
