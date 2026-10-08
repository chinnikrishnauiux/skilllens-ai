import React, { useState } from 'react';
import { Search, ArrowRight, CheckCircle2, TrendingUp, DollarSign, Briefcase, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CAREERS } from '../data/careersData';
import { Career } from '../types';

export const Careers: React.FC = () => {
  const { setSelectedCareerId, setCurrentRoute, user } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCareerDetail, setActiveCareerDetail] = useState<Career | null>(CAREERS[0]);

  const categories = ['All', 'Design', 'Technology', 'Data', 'Marketing', 'Business'];

  const filtered = CAREERS.filter((c) => {
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#6C63FF] uppercase tracking-wider">
          Market Career Database
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#171A2B] tracking-tight">
          Explore Target Careers
        </h1>
        <p className="text-base text-gray-500">
          Discover vetted competency rubrics, compensation benchmarks, and expected skill levels for modern tech and design roles.
        </p>
      </div>

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-[#6C63FF] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search roles or skills..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
          />
        </div>
      </div>

      {/* 2-Column Explorer: List on Left, Active Detail Modal/Pane on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left List */}
        <div className="lg:col-span-5 space-y-4">
          {filtered.map((career) => {
            const isSelected = activeCareerDetail?.id === career.id;
            const isUserTarget = user.targetCareerId === career.id;
            return (
              <div
                key={career.id}
                onClick={() => setActiveCareerDetail(career)}
                className={`p-5 rounded-2xl bg-white border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-[#6C63FF] ring-2 ring-[#6C63FF]/20 shadow-md'
                    : 'border-gray-200/80 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center justify-between pb-2">
                  <span className="text-[11px] font-bold text-[#6C63FF] uppercase tracking-wider">
                    {career.category}
                  </span>
                  {isUserTarget && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                      CURRENT TARGET
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-[#171A2B] text-lg">{career.title}</h3>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{career.shortDesc}</p>
                <div className="mt-3 flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
                  <span className="font-semibold text-emerald-600">{career.salaryRange}</span>
                  <span className="text-gray-400 font-medium">{career.growthRate}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Detail Pane */}
        {activeCareerDetail && (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-sm space-y-6 sticky top-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6C63FF]">
                  {activeCareerDetail.category} Role Blueprint
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#171A2B] mt-1">
                  {activeCareerDetail.title}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedCareerId(activeCareerDetail.id);
                  setCurrentRoute('skill-gaps');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-95 shadow-md shadow-[#6C63FF]/20 flex items-center gap-2"
              >
                <span>Set as My Target Career</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {activeCareerDetail.description}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium">Avg Salary</span>
                <p className="text-xs sm:text-sm font-bold text-emerald-600 mt-0.5">
                  {activeCareerDetail.salaryRange}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium">Market Growth</span>
                <p className="text-xs sm:text-sm font-bold text-[#6C63FF] mt-0.5">
                  {activeCareerDetail.growthRate}
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 text-center">
                <span className="text-xs text-gray-500 font-medium">Job Demand</span>
                <p className="text-xs sm:text-sm font-bold text-[#171A2B] mt-0.5">
                  {activeCareerDetail.totalOpenings}
                </p>
              </div>
            </div>

            {/* Required Skills Matrix */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Benchmarked Skill Expectations ({activeCareerDetail.requiredSkills.length} competencies):
              </h4>
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
                {activeCareerDetail.requiredSkills.map((req, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#F7F8FC] border border-gray-100 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#171A2B]">{req.name}</span>
                        <span className="text-[10px] text-gray-400 bg-white px-2 py-0.5 rounded-md border border-gray-200">
                          {req.category}
                        </span>
                      </div>
                      <span className="font-extrabold text-[#6C63FF]">{req.requiredLevel}%</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-normal">{req.description}</p>
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#6C63FF] to-[#00C2A8] rounded-full"
                        style={{ width: `${req.requiredLevel}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  setSelectedCareerId(activeCareerDetail.id);
                  setCurrentRoute('skill-gaps');
                }}
                className="w-full py-3 rounded-xl bg-[#0B1020] hover:bg-black text-white text-xs font-bold transition text-center"
              >
                Analyze My Skill Gaps for {activeCareerDetail.title}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
