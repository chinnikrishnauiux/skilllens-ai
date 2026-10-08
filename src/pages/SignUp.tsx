import React, { useState } from 'react';
import { Sparkles, ArrowRight, User, Mail, Lock, Briefcase } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREERS } from '../data/careersData';
import { UserStatus } from '../types';

export const SignUp: React.FC = () => {
  const { setCurrentRoute, setUser, setIsAuthenticated, showToast } = useApp();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentStatus, setCurrentStatus] = useState<UserStatus>('Job Seeker');
  const [targetCareerId, setTargetCareerId] = useState('ui-ux-designer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      showToast('Please fill in your name and email', 'warning');
      return;
    }

    setUser((prev) => ({
      ...prev,
      name: fullName,
      email,
      status: currentStatus,
      targetCareerId,
    }));
    setIsAuthenticated(true);
    setCurrentRoute('onboarding');
    showToast('Account created! Welcome to your onboarding.', 'success');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200/80 p-8 shadow-sm space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="inline-flex w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] items-center justify-center text-white shadow-md shadow-[#6C63FF]/20 mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#171A2B]">Create your account</h1>
          <p className="text-xs text-gray-500">
            Join SkillLens AI and discover your career roadmap
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ananya Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ananya@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Current Status</label>
            <select
              value={currentStatus}
              onChange={(e) => setCurrentStatus(e.target.value as UserStatus)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            >
              <option value="Student">Student</option>
              <option value="Graduate">Graduate</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Professional">Professional</option>
              <option value="Career Switcher">Career Switcher</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-700">Target Career</label>
            <select
              value={targetCareerId}
              onChange={(e) => setTargetCareerId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
            >
              {CAREERS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.title} ({c.category})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] text-white text-sm font-semibold hover:opacity-95 shadow-md shadow-[#6C63FF]/20 transition flex items-center justify-center gap-2"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-gray-500">
          Already have an account?{' '}
          <button
            onClick={() => setCurrentRoute('login')}
            className="text-[#6C63FF] hover:underline font-bold"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};
