import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, 
  Sparkles, 
  Clock, 
  CheckCircle, 
  ExternalLink, 
  Building, 
  Users, 
  Search, 
  Check, 
  X, 
  ArrowRight,
  TrendingUp,
  Briefcase,
  Trophy,
  DollarSign
} from 'lucide-react';

interface Scholarship {
  id: string;
  title: string;
  category: 'Academic Merit' | 'Financial Need' | 'International' | 'Research Grant';
  provider: string;
  badgeText: string;
  badgeColor: string; // Tailwind class
  matchScore: number;
  stipend: string;
  requirements: string;
  tags: string[];
  deadline: string;
  daysLeft?: number;
  featured: boolean;
  isEndingSoon: boolean;
  closeDate?: string;
}

export function Scholarships() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);
  const [showProgressView, setShowProgressView] = useState<boolean>(false);
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [searchFocused, setSearchFocused] = useState<boolean>(false);

  // Full-featured sample scholarships with rich data as requested
  const allScholarships: Scholarship[] = [
    {
      id: 'sch-1',
      title: 'Global Leadership Fellowship 2025',
      category: 'Academic Merit',
      provider: 'World Economic Forum & Oxford',
      badgeText: 'MERIT BASED',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      matchScore: 96,
      stipend: 'Full Tuition + $2,000 Stipend',
      requirements: 'GPA > 3.8, Leadership portfolio',
      tags: ['Ivy League Standard', 'Research Focus'],
      deadline: '15 May 2025',
      featured: true,
      isEndingSoon: false
    },
    {
      id: 'sch-2',
      title: 'Future AI Research Scholarship',
      category: 'Research Grant',
      provider: 'DeepMind Academic Program',
      badgeText: 'RESEARCH GRANT',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
      matchScore: 89,
      stipend: '$15,000 Research Funding',
      requirements: 'CS Major, Published paper',
      tags: ['STEM Priority', 'Mentorship Included'],
      deadline: '02 Jun 2025',
      featured: true,
      isEndingSoon: false
    },
    {
      id: 'sch-3',
      title: 'National Science Foundation Grant',
      category: 'Research Grant',
      provider: 'Government of Canada',
      badgeText: 'RESEARCH CATEGORY',
      badgeColor: 'bg-blue-50 text-blue-800 border-blue-200',
      matchScore: 92,
      stipend: '$25,000 Grant Support',
      requirements: 'Research Proposal, Master candidate',
      tags: ['SST Fellowship', 'Global Lab Access'],
      deadline: '15 Mar 2025',
      daysLeft: 5,
      closeDate: 'March 15',
      featured: false,
      isEndingSoon: true
    },
    {
      id: 'sch-4',
      title: 'Diversity in Tech Scholarship',
      category: 'Financial Need',
      provider: 'Google Education',
      badgeText: 'PROFESSIONAL DEVELOPMENT',
      badgeColor: 'bg-purple-50 text-purple-800 border-purple-200',
      matchScore: 87,
      stipend: '$10,000 Tuition Waiver',
      requirements: 'Financial background, Underrepresented group',
      tags: ['Tech Priority', 'Google Intern Track'],
      deadline: '19 Mar 2025',
      daysLeft: 9,
      closeDate: 'March 19',
      featured: false,
      isEndingSoon: true
    },
    {
      id: 'sch-5',
      title: 'ASEAN Excellence International Award',
      category: 'International',
      provider: 'Hanyang International Office',
      badgeText: 'INTERNATIONAL',
      badgeColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      matchScore: 95,
      stipend: '100% Tuition + Free Campus Dorm',
      requirements: 'ASEAN Citizenship, IELTS > 6.5',
      tags: ['South Korea', 'ASEAN Network'],
      deadline: '28 May 2025',
      featured: true,
      isEndingSoon: false
    },
    {
      id: 'sch-6',
      title: 'Tanoto Foundation Academic Champion',
      category: 'Academic Merit',
      provider: 'Tanoto Foundation Indonesia',
      badgeText: 'ACADEMIC MERIT',
      badgeColor: 'bg-teal-50 text-teal-800 border-teal-200',
      matchScore: 94,
      stipend: 'Full Tuition Support + Monthly Allowance',
      requirements: 'GPA > 3.5, Commitment to service',
      tags: ['Local Partner', 'Leadership Program'],
      deadline: '30 Apr 2025',
      featured: false,
      isEndingSoon: false
    },
    {
      id: 'sch-7',
      title: 'Djarum Beasiswa Plus Ganjil',
      category: 'Academic Merit',
      provider: 'Djarum Foundation',
      badgeText: 'MERIT BASED',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
      matchScore: 91,
      stipend: 'Rp 1,000,000 per Month + Character Building',
      requirements: 'Semester 5 student, GPA > 3.2',
      tags: ['Soft Skills', 'Indonesian Network'],
      deadline: '24 Mar 2025',
      daysLeft: 14,
      closeDate: 'March 24',
      featured: false,
      isEndingSoon: true
    },
    {
      id: 'sch-8',
      title: 'Global Korea Scholarship (GKS) 2025',
      category: 'International',
      provider: 'NIIED South Korea Government',
      badgeText: 'GOVERNMENT SPONSORED',
      badgeColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      matchScore: 93,
      stipend: 'Full Airfare + Monthly Stipend + Lang Center',
      requirements: 'Under age 25, Outstanding academic record',
      tags: ['Full Cover', 'South Korea Govt'],
      deadline: '12 May 2025',
      featured: true,
      isEndingSoon: false
    }
  ];

  // Applications status list for tracking view
  const initialApplications = [
    {
      id: 'sch-1',
      title: 'Global Leadership Fellowship 2025',
      provider: 'World Economic Forum & Oxford',
      status: 'Under Review',
      statusColor: 'bg-blue-100 text-blue-800',
      dateApplied: '12 Jan 2026',
      progressPct: 60
    },
    {
      id: 'sch-5',
      title: 'ASEAN Excellence International Award',
      provider: 'Hanyang International Office',
      status: 'Interview Scheduled',
      statusColor: 'bg-amber-100 text-amber-800',
      dateApplied: '04 Feb 2026',
      progressPct: 80
    },
    {
      id: 'sch-6',
      title: 'Tanoto Foundation Academic Champion',
      provider: 'Tanoto Foundation Indonesia',
      status: 'Submitted',
      statusColor: 'bg-slate-100 text-slate-700',
      dateApplied: '20 Feb 2026',
      progressPct: 40
    }
  ];

  const categories = ['All', 'Academic Merit', 'Financial Need', 'International', 'Research Grant'];

  const handleApply = (id: string) => {
    if (!appliedIds.includes(id)) {
      setAppliedIds(prev => [...prev, id]);
    }
  };

  const filteredScholarships = allScholarships.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.requirements.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredList = filteredScholarships.filter(item => item.featured);
  const endingSoonList = filteredScholarships.filter(item => item.isEndingSoon);

  return (
    <div className="flex flex-col h-full bg-white text-[#172B4D] overflow-y-auto custom-scrollbar p-1">
      
      {/* Upper Navigation Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 font-display">
            Scholarships
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Access elite educational pathways, research grants, and international fellowships matched to your student twin DNA.
          </p>
        </div>
        
        <button 
          onClick={() => setShowProgressView(true)}
          className="inline-flex items-center gap-1.5 text-xs font-black text-[#0052CC] hover:text-[#0747A6] transition-colors self-start sm:self-auto uppercase tracking-wider cursor-pointer py-1.5"
        >
          View Application Progress <ArrowRight size={14} />
        </button>
      </div>

      {/* Categories & Search Panel */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8">
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-full cursor-pointer transition-all ${
                  active 
                    ? 'bg-[#0052CC] text-white shadow-sm' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Custom Search Bar with focus state */}
        <div className="relative w-full md:w-72">
          <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors ${searchFocused ? 'text-[#0052CC]' : 'text-slate-400'}`}>
            <Search size={14} />
          </div>
          <input
            type="text"
            placeholder="Search scholarships or requirements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-[#0052CC] focus:ring-1 focus:ring-[#0052CC] transition-all text-slate-900"
          />
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recommended & Main Columns */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Section: Recommended For You */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-[#0052CC]" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-display">
                Recommended For You
              </h3>
            </div>

            {featuredList.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center text-slate-500 font-medium text-xs">
                No recommended scholarships match your search query. Try switching filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featuredList.map((item) => (
                  <motion.div
                    key={item.id}
                    layoutId={`sch-card-${item.id}`}
                    className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between hover:shadow-md transition-all relative overflow-hidden"
                    style={{ boxShadow: '0 1px 1px rgba(9,30,66,0.15), 0 0 0 1px rgba(9,30,66,0.05)' }}
                  >
                    {/* Top Section */}
                    <div>
                      <div className="flex justify-between items-start gap-4 mb-3">
                        <span className={`text-[9px] font-black tracking-wider uppercase px-2.5 py-1 rounded-sm border ${item.badgeColor}`}>
                          {item.badgeText}
                        </span>
                        <div className="text-right">
                          <span className="text-lg font-black text-[#0052CC] block leading-none">{item.matchScore}%</span>
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tight block mt-0.5">Match</span>
                        </div>
                      </div>

                      <h4 className="text-base font-black text-slate-950 leading-tight tracking-tight hover:text-[#0052CC] transition-colors cursor-pointer" onClick={() => setSelectedScholarship(item)}>
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-500 mt-1 mb-4">{item.provider}</p>

                      {/* Details Strip */}
                      <div className="space-y-2.5 border-t border-slate-100 pt-3.5 mb-4">
                        <div className="flex items-center gap-2.5 text-xs text-slate-700">
                          <span className="text-slate-400 font-bold">💵</span>
                          <span className="font-semibold">{item.stipend}</span>
                        </div>
                        <div className="flex items-start gap-2.5 text-xs text-slate-600">
                          <CheckCircle size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-medium leading-normal">{item.requirements}</span>
                        </div>
                      </div>

                      {/* Badges / Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {item.tags.map(tag => (
                          <span key={tag} className="bg-blue-50/50 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-sm border border-blue-100">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                      <div className="text-[11px] font-medium text-slate-500">
                        Deadline: <span className="font-bold text-slate-800">{item.deadline}</span>
                      </div>
                      <button 
                        onClick={() => setSelectedScholarship(item)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0052CC] hover:underline cursor-pointer"
                      >
                        See Details <ExternalLink size={11} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Section: All Scholarships Available */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award size={16} className="text-slate-600" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-display">
                All Available Programs
              </h3>
            </div>

            <div className="space-y-4">
              {filteredScholarships.filter(item => !item.featured && !item.isEndingSoon).length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center text-slate-400 font-medium text-xs">
                  No other active programs match your active filters.
                </div>
              ) : (
                filteredScholarships.filter(item => !item.featured && !item.isEndingSoon).map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-sm transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-sm border ${item.badgeColor}`}>
                          {item.badgeText}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">• {item.category}</span>
                      </div>
                      <h4 className="text-[15px] font-bold text-slate-900 leading-tight">
                        {item.title}
                      </h4>
                      <p className="text-xs font-bold text-slate-500">{item.provider}</p>
                      
                      <div className="flex flex-wrap gap-4 mt-2.5 text-[11px] font-medium text-slate-600">
                        <div>💵 <span className="font-bold text-slate-800">{item.stipend}</span></div>
                        <div>✓ <span className="text-slate-500">{item.requirements}</span></div>
                      </div>
                    </div>

                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0 shrink-0">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-500">Match score: <span className="text-[#0052CC] font-black">{item.matchScore}%</span></span>
                        <div className="text-[10px] text-slate-400 font-medium">Deadline: {item.deadline}</div>
                      </div>
                      <button 
                        onClick={() => setSelectedScholarship(item)}
                        className="px-4 py-1.5 bg-[#0052CC] hover:bg-[#0747A6] text-white text-xs font-black uppercase rounded-sm transition-colors cursor-pointer"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Sidebar Column: Ending Soon */}
        <div className="space-y-8">
          
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-rose-500" />
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-display">
                Ending Soon (≤ 14 Days)
              </h3>
            </div>

            {endingSoonList.length === 0 ? (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 text-center text-slate-500 font-medium text-xs">
                No soon-closing scholarships match your selection.
              </div>
            ) : (
              <div className="space-y-4">
                {endingSoonList.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-slate-200 rounded-lg p-4 hover:shadow-sm transition-all"
                    style={{ boxShadow: '0 1px 1px rgba(9,30,66,0.15), 0 0 0 1px rgba(9,30,66,0.05)' }}
                  >
                    <div className="flex gap-3.5">
                      <div className="w-10 h-10 rounded bg-blue-50/80 flex items-center justify-center text-[#0052CC] shrink-0 border border-blue-100">
                        {item.title.includes('Foundation') ? <Building size={18} /> : <Users size={18} />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-slate-950 truncate leading-tight">
                          {item.title}
                        </h4>
                        <p className="text-[10px] font-bold text-slate-500 truncate mt-0.5">
                          {item.provider} • {item.badgeText}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3.5 pt-2 border-t border-slate-100">
                          <div className="text-[10px] font-bold text-rose-600">
                            {item.daysLeft} Days Left <span className="text-slate-400 font-medium">(Closes {item.closeDate})</span>
                          </div>
                          
                          <button
                            onClick={() => {
                              if (appliedIds.includes(item.id)) return;
                              handleApply(item.id);
                            }}
                            disabled={appliedIds.includes(item.id)}
                            className={`px-3 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                              appliedIds.includes(item.id)
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-[#0052CC] hover:bg-[#0747A6] text-white'
                            }`}
                          >
                            {appliedIds.includes(item.id) ? 'Applied ✓' : 'Apply Now'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick FAQ / Helper Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2.5">
              Twin Matching Insights
            </h4>
            <p className="text-xs text-slate-600 font-medium leading-relaxed mb-3">
              Scholarship recommendations are continuously calculated by correlating your current Academic Standings, Communication Labs scores, and Career Planning target nodes.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                <CheckCircle size={12} className="text-emerald-500" />
                <span>GPA correlation active</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700 font-bold">
                <CheckCircle size={12} className="text-emerald-500" />
                <span>FGD Performance weighting applied</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Slide-over View Application Progress Modal */}
      <AnimatePresence>
        {showProgressView && (
          <div className="fixed inset-0 z-50 overflow-hidden font-sans">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProgressView(false)}
              className="absolute inset-0 bg-slate-950/40"
            />
            
            {/* Slide content panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between"
              >
                {/* Header */}
                <div className="px-5 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest font-display">
                      Application Progress
                    </h3>
                    <p className="text-xs text-slate-500 font-bold mt-0.5">Active pathways log</p>
                  </div>
                  <button 
                    onClick={() => setShowProgressView(false)}
                    className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Body Content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-5">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-[#0052CC] font-semibold leading-relaxed">
                    Once submitted, our AI Academic Hub monitors target portal gateways and automatically syncs transcript updates back into your Student Profile.
                  </div>

                  <div className="space-y-4">
                    {initialApplications.map(app => (
                      <div key={app.id} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start gap-4 mb-2">
                          <h4 className="text-xs font-black text-slate-950 leading-tight">
                            {app.title}
                          </h4>
                          <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm ${app.statusColor}`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500">{app.provider}</p>
                        
                        {/* Progress Bar */}
                        <div className="mt-4">
                          <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                            <span>Stage Progress</span>
                            <span>{app.progressPct}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#0052CC] rounded-full transition-all duration-500" 
                              style={{ width: `${app.progressPct}%` }}
                            />
                          </div>
                        </div>

                        <div className="mt-3 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                          Applied: {app.dateApplied}
                        </div>
                      </div>
                    ))}

                    {/* Show live applied items dynamically */}
                    {appliedIds.map(id => {
                      const details = allScholarships.find(s => s.id === id);
                      if (!details) return null;
                      return (
                        <div key={id} className="bg-emerald-50/40 border border-emerald-200 rounded-lg p-4">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <h4 className="text-xs font-black text-slate-950 leading-tight">
                              {details.title}
                            </h4>
                            <span className="text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm bg-emerald-100 text-emerald-800">
                              Submitted (Just Now)
                            </span>
                          </div>
                          <p className="text-[10px] font-bold text-slate-500">{details.provider}</p>
                          
                          {/* Progress Bar */}
                          <div className="mt-4">
                            <div className="flex justify-between text-[10px] text-slate-500 font-bold mb-1">
                              <span>Stage Progress</span>
                              <span>20%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '20%' }} />
                            </div>
                          </div>

                          <div className="mt-3 text-[9px] text-slate-400 font-bold uppercase tracking-tight">
                            Applied: Today (10 July 2026)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer panel */}
                <div className="p-5 border-t border-slate-200 bg-slate-50 text-center">
                  <p className="text-[11px] text-slate-500 font-semibold mb-1">Need help with recommendations?</p>
                  <button className="text-xs font-black text-[#0052CC] hover:underline cursor-pointer">
                    Contact Academic Advisor
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Scholarship Detail Modal */}
      <AnimatePresence>
        {selectedScholarship && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScholarship(null)}
              className="absolute inset-0 bg-slate-950/40"
            />
            
            {/* Modal Body */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden z-10 border border-slate-200"
            >
              {/* Top Cover */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-start bg-slate-50">
                <div>
                  <span className={`text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-sm border ${selectedScholarship.badgeColor} mb-2 inline-block`}>
                    {selectedScholarship.badgeText}
                  </span>
                  <h3 className="text-lg font-black text-slate-950 leading-tight">
                    {selectedScholarship.title}
                  </h3>
                  <p className="text-xs font-bold text-[#0052CC] mt-1">{selectedScholarship.provider}</p>
                </div>
                <button 
                  onClick={() => setSelectedScholarship(null)}
                  className="p-1.5 rounded-full hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 text-xs text-slate-700 font-medium">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1">
                    Scholarship Value & Benefit
                  </h4>
                  <p className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    💵 {selectedScholarship.stipend}
                  </p>
                </div>

                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
                    Eligibility & Academic Requirements
                  </h4>
                  <div className="bg-slate-50 border border-slate-200 rounded p-3 text-slate-700 space-y-2">
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{selectedScholarship.requirements}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>Must maintain high academic stands (minimum GPA 3.5 equivalent).</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>FGD Communication Proficiency must match Excellent or above.</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-blue-50/50 p-3 rounded border border-blue-100">
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider block">
                      AI Twin Compatibility Rating
                    </span>
                    <span className="text-sm font-black text-[#0052CC]">
                      {selectedScholarship.matchScore}% DNA Match Correlation
                    </span>
                  </div>
                  <TrendingUp size={20} className="text-[#0052CC]" />
                </div>

                <div className="flex justify-between text-xs text-slate-500 pt-2 font-bold uppercase tracking-wide">
                  <span>Category: {selectedScholarship.category}</span>
                  <span>Deadline: {selectedScholarship.deadline}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50">
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 bg-white hover:bg-slate-50 text-xs font-bold cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleApply(selectedScholarship.id);
                    setSelectedScholarship(null);
                  }}
                  disabled={appliedIds.includes(selectedScholarship.id)}
                  className={`px-5 py-2 rounded text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                    appliedIds.includes(selectedScholarship.id)
                      ? 'bg-emerald-500 text-white cursor-default'
                      : 'bg-[#0052CC] hover:bg-[#0747A6] text-white shadow-sm'
                  }`}
                >
                  {appliedIds.includes(selectedScholarship.id) ? 'Applied ✓' : 'Submit Application'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
