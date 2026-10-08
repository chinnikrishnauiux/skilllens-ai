import React, { useState } from 'react';
import {
  MapPin,
  CheckCircle2,
  Clock,
  Layers,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Flame,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RoadmapTask } from '../types';

export const CareerRoadmap: React.FC = () => {
  const { roadmap, updateRoadmapTaskStatus, selectedCareer, setCurrentRoute, setIsVoiceModalOpen } = useApp();
  const [expandedTask, setExpandedTask] = useState<string>('rm-3'); // Expand active task by default

  const toggleExpand = (id: string) => {
    setExpandedTask((prev) => (prev === id ? '' : id));
  };

  const completedCount = roadmap.filter((t) => t.status === 'Completed').length;
  const progressPercent = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
            Personalized Learning Pathway
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] tracking-tight">
            Your Personalized Roadmap
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            8-week milestone sprint calibrated for {selectedCareer.title}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center gap-3 shadow-xs">
            <span className="text-xs text-gray-500 font-medium">Sprint Completion:</span>
            <span className="text-sm font-extrabold text-[#6C63FF]">{progressPercent}%</span>
            <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="px-4 py-2.5 bg-[#0B1020] text-white hover:bg-black rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#00C2A8]" />
            <span>Roadmap Voice Review</span>
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="space-y-4">
        {roadmap.map((task) => {
          const isExpanded = expandedTask === task.id;
          const isCompleted = task.status === 'Completed';
          const isInProgress = task.status === 'In Progress';

          return (
            <div
              key={task.id}
              className={`bg-white rounded-3xl border transition-all ${
                isInProgress
                  ? 'border-[#6C63FF] ring-2 ring-[#6C63FF]/20 shadow-md'
                  : 'border-gray-200/80 hover:border-gray-300 shadow-xs'
              }`}
            >
              {/* Task Header Row */}
              <div
                onClick={() => toggleExpand(task.id)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center gap-4">
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-xs transition ${
                      isCompleted
                        ? 'bg-emerald-50 text-emerald-600'
                        : isInProgress
                        ? 'bg-[#6C63FF] text-white shadow-md shadow-[#6C63FF]/30'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `W${task.week}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#6C63FF]">
                        Week {task.week} • {task.skillTarget}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-700'
                            : isInProgress
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#171A2B] mt-0.5">
                      {task.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center">
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {task.duration}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-gray-100 font-medium">
                      {task.difficulty}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Collapsible Details Body */}
              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-gray-100 space-y-6">
                  <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Verified Learning Resources */}
                    <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 space-y-3">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-[#6C63FF]" />
                        Recommended Learning Resources:
                      </h4>
                      <div className="space-y-2">
                        {task.resources.map((res, i) => (
                          <div
                            key={i}
                            className="p-2.5 rounded-xl bg-white border border-gray-200/70 flex items-center justify-between text-xs hover:border-[#6C63FF]/30 transition"
                          >
                            <div className="space-y-0.5">
                              <p className="font-semibold text-[#171A2B]">{res.name}</p>
                              <span className="text-[10px] text-gray-400">
                                {res.type} • {res.duration}
                              </span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hands-on Practice Task */}
                    <div className="p-4 rounded-2xl bg-[#6C63FF]/5 border border-[#6C63FF]/20 space-y-3">
                      <h4 className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-[#6C63FF]" />
                        Verified Practice Deliverable:
                      </h4>
                      <p className="font-bold text-sm text-[#171A2B]">
                        {task.practiceTask.title}
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        {task.practiceTask.description}
                      </p>
                      <div className="p-2.5 rounded-xl bg-white/80 border border-[#6C63FF]/20 text-[11px] text-gray-700">
                        <strong className="text-[#6C63FF]">Deliverable: </strong>
                        {task.practiceTask.deliverable}
                      </div>
                    </div>
                  </div>

                  {/* Actions / Status Toggle */}
                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">Update Status:</span>
                      {(['Completed', 'In Progress', 'Upcoming'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={() => updateRoadmapTaskStatus(task.id, st)}
                          className={`text-xs px-3 py-1.5 rounded-xl font-bold transition ${
                            task.status === st
                              ? 'bg-[#171A2B] text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentRoute('projects')}
                      className="text-xs font-bold text-[#6C63FF] hover:underline flex items-center gap-1"
                    >
                      <span>Find Matching Portfolio Project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
