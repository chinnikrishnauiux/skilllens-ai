import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Briefcase,
  FileText,
  Award,
  Edit3,
  CheckCircle2,
  Sparkles,
  Download,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Profile: React.FC = () => {
  const { user, setUser, selectedCareer, showToast } = useApp();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempName, setTempName] = useState(user.name);
  const [tempEducation, setTempEducation] = useState(user.education);
  const [tempExperience, setTempExperience] = useState(user.experience);

  const certifications = [
    { title: 'Google UX Design Professional Certificate', issuer: 'Coursera & Google', year: '2025' },
    { title: 'Interaction Design Foundation (IxDF) Member', issuer: 'IxDF', year: '2026' },
  ];

  const handleSaveProfile = () => {
    setUser((prev) => ({
      ...prev,
      name: tempName,
      education: tempEducation,
      experience: tempExperience,
    }));
    setIsEditModalOpen(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Profile Header Banner Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover ring-4 ring-[#6C63FF]/20 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] border-2 border-white rounded-full" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-[#171A2B]">{user.name}</h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#6C63FF]">
                  {user.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-gray-600">
                Target Role: <strong className="text-[#6C63FF]">{selectedCareer.title}</strong>
              </p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto">
            {/* Profile Completion Meter (85%) */}
            <div className="bg-[#F7F8FC] border border-gray-100 rounded-2xl p-3.5 w-full sm:w-56 space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-gray-500">Profile Completion</span>
                <span className="text-[#6C63FF]">{user.profileCompletion}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] rounded-full"
                  style={{ width: `${user.profileCompletion}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="px-5 py-2.5 bg-[#0B1020] hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Education & Experience */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-[#6C63FF]">
            <GraduationCap className="w-5 h-5" />
            <h3 className="font-bold text-base text-[#171A2B]">Education</h3>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 space-y-1">
            <p className="text-sm font-bold text-[#171A2B]">{user.education}</p>
            <p className="text-xs text-gray-500">Major in User Interface & Interaction Design</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 space-y-4 shadow-xs">
          <div className="flex items-center gap-2 text-[#6C63FF]">
            <Briefcase className="w-5 h-5" />
            <h3 className="font-bold text-base text-[#171A2B]">Experience</h3>
          </div>
          <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-100 space-y-1">
            <p className="text-sm font-bold text-[#171A2B]">{user.experience}</p>
            <p className="text-xs text-gray-500">Practical production workflows & design system tokens</p>
          </div>
        </div>
      </div>

      {/* Resume File & Skills Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-[#6C63FF]">
            <FileText className="w-5 h-5" />
            <h3 className="font-bold text-base text-[#171A2B]">Uploaded Resume & Evidence</h3>
          </div>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Verified by SkillLens AI
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-[#F7F8FC] border border-gray-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] flex items-center justify-center font-bold">
              PDF
            </div>
            <div>
              <p className="text-sm font-bold text-[#171A2B]">{user.resumeFileName}</p>
              <p className="text-xs text-gray-400">Parsed 8 key competencies & 2 portfolio projects</p>
            </div>
          </div>
          <button
            onClick={() => showToast('Resume downloaded successfully')}
            className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

        {/* Verified Skills Tags */}
        <div className="space-y-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Profile Competency Breakdown:
          </span>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((s, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-semibold flex items-center gap-2"
              >
                <span>{s.name}</span>
                <span className="text-[#6C63FF] font-extrabold">{s.level}%</span>
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-3 pt-2">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
            Certifications & Affiliations:
          </span>
          <div className="space-y-2">
            {certifications.map((c, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#F7F8FC] border border-gray-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#00C2A8]" />
                  <span className="font-bold text-[#171A2B]">{c.title}</span>
                </div>
                <span className="text-gray-400 font-medium">
                  {c.issuer} ({c.year})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-[#171A2B]">Edit Profile</h3>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-xl text-gray-400 hover:text-black"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Full Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Education</label>
                <input
                  type="text"
                  value={tempEducation}
                  onChange={(e) => setTempEducation(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600">Experience</label>
                <textarea
                  rows={3}
                  value={tempExperience}
                  onChange={(e) => setTempExperience(e.target.value)}
                  className="w-full p-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-6 py-2.5 bg-[#6C63FF] text-white rounded-xl text-xs font-bold hover:bg-[#5b52e0] transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
