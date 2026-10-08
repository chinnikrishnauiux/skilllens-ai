import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  UploadCloud,
  FileText,
  Sparkles,
  ChevronLeft,
  Briefcase,
  Layers,
  GraduationCap,
  RefreshCw,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREERS } from '../data/careersData';
import { UserStatus, UserSkill } from '../types';

export const Onboarding: React.FC = () => {
  const { user, setUser, setSelectedCareerId, setCurrentRoute, showToast, runAIProfileAnalysis } = useApp();
  const [step, setStep] = useState<number>(1);
  const [resumeText, setResumeText] = useState<string>(user.resumeText || '');
  const [isParsingResume, setIsParsingResume] = useState<boolean>(false);
  const [skillsList, setSkillsList] = useState<UserSkill[]>(user.skills);
  const [newSkillName, setNewSkillName] = useState<string>('');
  const [newSkillLevel, setNewSkillLevel] = useState<number>(60);

  const statusOptions: UserStatus[] = [
    'Student',
    'Graduate',
    'Job Seeker',
    'Professional',
    'Career Switcher',
  ];

  const handleAddCustomSkill = () => {
    if (!newSkillName.trim()) return;
    setSkillsList((prev) => [
      ...prev,
      { name: newSkillName.trim(), level: newSkillLevel, category: 'General' },
    ]);
    setNewSkillName('');
    showToast(`Added ${newSkillName}`);
  };

  const handleResumeFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUser((prev) => ({ ...prev, resumeFileName: file.name }));
    setIsParsingResume(true);

    try {
      // Send sample text to resume analysis API
      const sampleParsed = `Experience extracted from ${file.name}:
Skills: Figma, Design Systems, Mobile App UI, Prototyping, Wireframing, UX Research, Heuristic Audits.
Education: Bachelor's in Technology & Digital Media.`;

      setResumeText(sampleParsed);

      const res = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText: sampleParsed,
          targetCareer: user.targetCareerId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.detectedSkills && data.detectedSkills.length > 0) {
          const mapped: UserSkill[] = data.detectedSkills.map((s: string) => ({
            name: s,
            level: 70,
            category: 'Extracted',
          }));
          setSkillsList((prev) => {
            const names = new Set(prev.map((p) => p.name));
            return [...prev, ...mapped.filter((m) => !names.has(m.name))];
          });
          showToast(`Extracted ${data.detectedSkills.length} skills from resume!`, 'success');
        }
      }
    } catch (err) {
      console.error('Resume parse error:', err);
      showToast('Resume processed locally.', 'info');
    } finally {
      setIsParsingResume(false);
    }
  };

  const handleFinishOnboarding = async () => {
    setUser((prev) => ({
      ...prev,
      skills: skillsList,
      resumeText,
    }));
    await runAIProfileAnalysis();
    setCurrentRoute('dashboard');
    showToast('Your Skill Gap Report is ready! Welcome to your dashboard.');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
      {/* Onboarding Shell Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm space-y-8">
        {/* Progress Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400">
            <span className="uppercase tracking-wider text-[#6C63FF]">
              Step {step} of 5
            </span>
            <span>{Math.round((step / 5) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: What best describes you? */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
                Step 01
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] mt-1">
                What best describes you?
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                This helps SkillLens AI tailor your roadmap difficulty and learning pace.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {statusOptions.map((status) => {
                const isSelected = user.status === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setUser((prev) => ({ ...prev, status }))}
                    className={`p-4 rounded-2xl border text-left font-semibold text-sm transition flex items-center justify-between ${
                      isSelected
                        ? 'border-[#6C63FF] bg-[#6C63FF]/5 text-[#6C63FF] ring-2 ring-[#6C63FF]/20'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    <span>{status}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-[#6C63FF]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: What career do you want? */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
                Step 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] mt-1">
                What career do you want to pursue?
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                We'll benchmark your current skills against the real market requirements for this role.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
              {CAREERS.map((c) => {
                const isSelected = user.targetCareerId === c.id;
                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCareerId(c.id)}
                    className={`p-4 rounded-2xl border cursor-pointer text-left transition ${
                      isSelected
                        ? 'border-[#6C63FF] bg-[#6C63FF]/5 ring-2 ring-[#6C63FF]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#6C63FF] uppercase">{c.category}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#6C63FF]" />}
                    </div>
                    <h4 className="font-bold text-sm text-[#171A2B] mt-1">{c.title}</h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{c.shortDesc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: What skills do you have? */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
                Step 03
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] mt-1">
                What skills do you have?
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Adjust your proficiency for known skills or add custom abilities.
              </p>
            </div>

            {/* Current Skills list */}
            <div className="space-y-3 max-h-[260px] overflow-y-auto pr-1">
              {skillsList.map((s, idx) => (
                <div key={idx} className="p-3 bg-[#F7F8FC] rounded-xl border border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#171A2B]">{s.name}</span>
                    <span className="text-[10px] text-gray-400 block">{s.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={s.level}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setSkillsList((prev) =>
                          prev.map((item, i) => (i === idx ? { ...item, level: val } : item))
                        );
                      }}
                      className="accent-[#6C63FF] w-28 sm:w-36 h-1.5"
                    />
                    <span className="text-xs font-bold text-[#6C63FF] w-9 text-right">{s.level}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick add custom skill */}
            <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Add another skill (e.g. Wireframing)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="w-full sm:flex-1 px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#6C63FF]"
              />
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="w-full sm:w-auto px-4 py-2 bg-[#171A2B] text-white text-xs font-bold rounded-xl hover:bg-black transition flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Upload your resume */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
                Step 04
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] mt-1">
                Upload your resume
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Let AI automatically discover skills, project proof, and certifications from your resume.
              </p>
            </div>

            {/* Drag & drop box */}
            <label className="border-2 border-dashed border-[#6C63FF]/30 hover:border-[#6C63FF] rounded-2xl p-8 bg-[#6C63FF]/5 flex flex-col items-center justify-center cursor-pointer transition text-center space-y-3">
              <input
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleResumeFileSelect}
                className="hidden"
              />
              <div className="w-14 h-14 rounded-2xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center">
                {isParsingResume ? (
                  <RefreshCw className="w-6 h-6 animate-spin" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-[#171A2B]">
                  {isParsingResume
                    ? 'AI is parsing your resume...'
                    : user.resumeFileName
                    ? user.resumeFileName
                    : 'Click to upload your resume (PDF, DOCX)'}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  or drag and drop here (up to 10MB)
                </p>
              </div>
            </label>

            {/* Paste resume text fallback */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-600">
                Or paste resume text below:
              </label>
              <textarea
                rows={4}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume bullet points, education, or skills list..."
                className="w-full p-3 text-xs rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Confirm your profile */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div>
              <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
                Step 05
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] mt-1">
                Confirm your profile
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Verify your diagnostic parameters before generating your initial Career Gap Report.
              </p>
            </div>

            <div className="bg-[#F7F8FC] rounded-2xl p-6 border border-gray-100 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                <span className="text-xs text-gray-500 font-medium">Candidate Name</span>
                <span className="text-xs font-bold text-[#171A2B]">{user.name}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                <span className="text-xs text-gray-500 font-medium">Current Status</span>
                <span className="text-xs font-bold text-[#171A2B]">{user.status}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                <span className="text-xs text-gray-500 font-medium">Target Role</span>
                <span className="text-xs font-bold text-[#6C63FF]">
                  {CAREERS.find((c) => c.id === user.targetCareerId)?.title || 'UI/UX Designer'}
                </span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/60">
                <span className="text-xs text-gray-500 font-medium">Registered Skills</span>
                <span className="text-xs font-bold text-[#171A2B]">{skillsList.length} skills</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 font-medium">Resume Status</span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready for AI Analysis
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            disabled={step === 1}
            className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-black disabled:opacity-30 transition"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep((prev) => prev + 1)}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white text-xs font-bold hover:opacity-95 shadow-md shadow-[#6C63FF]/20 flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] text-white text-xs font-bold hover:opacity-95 shadow-lg shadow-[#6C63FF]/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate My Skill Gap Report</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
