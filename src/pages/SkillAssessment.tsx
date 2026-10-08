import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight, Sparkles, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SkillAssessment: React.FC = () => {
  const { selectedCareer, user, updateUserSkill, setCurrentRoute, showToast } = useApp();
  const [assessmentStep, setAssessmentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const skillsToAssess = selectedCareer.requiredSkills.slice(0, 5);

  const handleRating = (skillName: string, rating: number) => {
    setAnswers((prev) => ({ ...prev, [skillName]: rating }));
  };

  const handleNext = () => {
    if (assessmentStep < skillsToAssess.length - 1) {
      setAssessmentStep((prev) => prev + 1);
    } else {
      // Save all updated skills
      Object.entries(answers).forEach(([name, level]) => {
        updateUserSkill(name, level);
      });
      setIsCompleted(true);
      showToast('Skill assessment completed! Gaps recalculated.');
    }
  };

  const currentSkill = skillsToAssess[assessmentStep];
  const currentRating = answers[currentSkill.name] ?? (user.skills.find(s => s.name === currentSkill.name)?.level ?? 50);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center space-y-3 mb-10">
        <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
          Diagnostic Evaluation
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#171A2B] tracking-tight">
          Assess Your Skills for {selectedCareer.title}
        </h1>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Rate your practical ability across key competencies. Our algorithm compares your scores against real industry benchmarks.
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm space-y-8">
          {/* Progress header */}
          <div className="flex items-center justify-between text-xs font-semibold text-gray-500 pb-4 border-b border-gray-100">
            <span>
              Skill {assessmentStep + 1} of {skillsToAssess.length}
            </span>
            <span className="text-[#6C63FF] font-bold">
              Target Benchmark: {currentSkill.requiredLevel}%
            </span>
          </div>

          {/* Skill Question Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#6C63FF]/10 text-[#6C63FF]">
                {currentSkill.category}
              </span>
              <span className="text-xs font-medium text-gray-400">
                Importance: {currentSkill.importance}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-[#171A2B]">{currentSkill.name}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{currentSkill.description}</p>
          </div>

          {/* Interactive Proficiency Slider */}
          <div className="p-6 rounded-2xl bg-[#F7F8FC] border border-gray-100 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-gray-600">Your Self-Assessed Level:</span>
              <span className="text-2xl font-extrabold text-[#6C63FF]">{currentRating}%</span>
            </div>

            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={currentRating}
              onChange={(e) => handleRating(currentSkill.name, Number(e.target.value))}
              className="w-full accent-[#6C63FF] cursor-pointer h-2 bg-gray-200 rounded-lg"
            />

            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>Novice (10-30%)</span>
              <span>Competent (40-60%)</span>
              <span>Advanced (70-85%)</span>
              <span>Mastery (90-100%)</span>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              onClick={() => setAssessmentStep((prev) => Math.max(0, prev - 1))}
              disabled={assessmentStep === 0}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-500 hover:text-black disabled:opacity-40 transition"
            >
              Previous Skill
            </button>

            <button
              onClick={handleNext}
              className="px-8 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 shadow-md shadow-[#6C63FF]/20 flex items-center gap-2"
            >
              <span>{assessmentStep === skillsToAssess.length - 1 ? 'Finish & Generate Report' : 'Next Skill'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Completed State */
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold text-[#171A2B]">
            Assessment Complete!
          </h2>
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Your skill proficiencies have been calibrated against {selectedCareer.title} standards. Your skill gap report and personalized roadmap are ready.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setCurrentRoute('skill-gaps')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold shadow-md shadow-[#6C63FF]/20"
            >
              View My Skill Gaps
            </button>
            <button
              onClick={() => setCurrentRoute('roadmap')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold"
            >
              Go to Career Roadmap
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
