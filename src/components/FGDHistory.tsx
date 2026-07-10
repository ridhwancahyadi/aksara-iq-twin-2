import { useState, useMemo } from 'react';
import { BentoCard } from './BentoCard';
import { Meeting, View } from '../types';
import { Search, Calendar, Clock, ArrowRight, Database, ChevronRight, Award } from 'lucide-react';

interface FGDHistoryProps {
  setView: (view: View) => void;
}

export function FGDHistory({ setView }: FGDHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const meetings: Meeting[] = [
    { id: '1', date: '2026-06-23', topic: 'Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur (27 April 2026)', duration: '17 min' },
    { id: '2', date: '2026-06-20', topic: 'Unpad Digital Economics Curriculum Review', duration: '45 min' },
    { id: '3', date: '2026-06-15', topic: 'Industry Needs & Academic Pathway Alignment', duration: '60 min' },
  ];

  const filteredMeetings = useMemo(() => {
    if (!searchTerm) return meetings;
    return meetings.filter(m => m.topic.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto w-full h-full">
      <BentoCard title="FGD Archive Logs" className="col-span-3 row-span-6 flex flex-col h-full overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs text-text-sub mt-1">
            Access past Focus Group Discussions (FGD) sessions and their AI-processed feedback report indices.
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-2.5 text-text-sub" />
          <input
            type="text"
            placeholder="Search topic keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-border focus:outline-none focus:ring-1 focus:ring-primary text-text-main bg-slate-50"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto border border-border rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-slate-50 text-[11px] text-text-sub uppercase tracking-wider font-semibold">
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4">FGD Topic Description</th>
              <th className="py-3 px-4">Duration</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMeetings.map((m) => (
              <tr 
                key={m.id} 
                className="border-b border-border/50 hover:bg-slate-50/50 transition cursor-pointer"
                onClick={() => setView('playback')}
              >
                <td className="py-4 px-4 text-xs font-medium text-text-main whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-text-sub" />
                    {m.date}
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="max-w-md lg:max-w-xl">
                    <div className="text-xs font-bold text-text-main line-clamp-2">{m.topic}</div>
                    <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded-full mt-1.5">
                      <Database size={9} /> AI Index Available
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4 text-xs font-mono text-text-sub">
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-text-sub" />
                    {m.duration}
                  </div>
                </td>
                <td className="py-4 px-4 text-right whitespace-nowrap">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setView('playback');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:text-blue-700 hover:underline transition"
                  >
                    View Analysis <ChevronRight size={14} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredMeetings.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-xs text-text-sub">
                  No matching FGD sessions found in the archive log database.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </BentoCard>
    </div>
  );
}
