import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Paperclip, 
  Mic, 
  FileText, 
  PlayCircle, 
  Plus, 
  MessageSquare, 
  Sparkles, 
  Trash2, 
  HelpCircle, 
  ChevronRight, 
  Compass, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  time: string;
  text: string;
  richContent?: {
    type: 'article' | 'video' | 'link';
    title: string;
    description: string;
    durationOrType: string;
  }[];
}

interface ChatSession {
  id: string;
  title: string;
  category: 'Terbaru' | 'Kemarin' | 'Sebelumnya';
  messages: ChatMessage[];
  suggestions: string[];
}

export function AksaraAI() {
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Initial list of Indonesian Communication Science sessions
  const [sessions, setSessions] = useState<ChatSession[]>([
    {
      id: '1',
      title: 'Relevansi Agenda Setting di Algoritma TikTok',
      category: 'Terbaru',
      suggestions: ['Teori Framing Media', 'Efek Echo Chamber', 'Literasi FYP'],
      messages: [
        {
          id: 'm1_1',
          sender: 'ai',
          time: '09:15',
          text: 'Halo John! Teori Agenda Setting tradisional menyatakan bahwa media massa menyaring informasi untuk menentukan apa yang penting bagi publik. Namun di era TikTok, fungsi gatekeeping ini diambil alih oleh algoritma FYP (For You Page) yang menyesuaikan konten secara otomatis berdasarkan ketertarikan Anda.'
        },
        {
          id: 'm1_2',
          sender: 'user',
          time: '09:17',
          text: 'Apakah pergeseran ini membuat efek media massa menjadi lebih kuat atau lebih lemah?'
        },
        {
          id: 'm1_3',
          sender: 'ai',
          time: '09:18',
          text: 'Sangat menarik! Efeknya menjadi lebih terfragmentasi namun terpersonalisasi secara mendalam. Komunitas mikro mengalami efek "Echo Chamber" yang sangat kuat, sementara masyarakat luas kehilangan satu agenda publik tunggal yang dulu didominasi stasiun TV atau koran nasional.',
          richContent: [
            {
              type: 'article',
              title: 'Analisis Agenda Setting Modern di Era Komparasi FYP',
              description: 'Jurnal riset mengenai pergeseran kontrol opini publik dari institusi berita ke sistem rekomendasi berbasis AI.',
              durationOrType: 'Jurnal Ilmiah'
            },
            {
              type: 'video',
              title: 'How TikTok Algorithmic Loops Reframe Political Agenda',
              description: 'Video penjelasan mengenai mekanisme amplifikasi opini publik di media sosial kontemporer.',
              durationOrType: 'Video • 12 Menit'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'Manajemen Krisis Reputasi Humas Kampus',
      category: 'Terbaru',
      suggestions: ['Golden Hours Humas', 'Manajemen Isu Hoaks', 'Audit Komunikasi'],
      messages: [
        {
          id: 'm2_1',
          sender: 'ai',
          time: 'Kemarin',
          text: 'Selamat pagi John! Mengenai studi kasus krisis reputasi Universitas akibat penyebaran berita tidak benar (hoaks), prinsip utama Humas adalah transparansi, respon cepat (Golden Hours), dan empati. Di era digital, keterlambatan merespons 1 jam saja dapat melipatgandakan sentimen negatif publik hingga 200%.'
        },
        {
          id: 'm2_2',
          sender: 'user',
          time: 'Kemarin',
          text: 'Bagaimana langkah konkret menangani hoaks yang telanjur viral di kalangan mahasiswa?'
        },
        {
          id: 'm2_3',
          sender: 'ai',
          time: 'Kemarin',
          text: 'Langkah taktis yang direkomendasikan:\n1. Rilis klarifikasi resmi bermodel "Fakta vs Mitos" dengan desain infografis yang mudah dibagikan.\n2. Kolaborasi dengan perwakilan BEM sebagai duta informasi internal.\n3. Optimalkan SEO rilis pers kampus agar menempati peringkat teratas pencarian Google.'
        }
      ]
    },
    {
      id: '3',
      title: 'Efek Jarum Hipodermik di Era Media Sosial',
      category: 'Terbaru',
      suggestions: ['Model Alir Dua Tahap', 'Audiens Aktif (Uses & Grats)', 'Faktor Kognitif'],
      messages: [
        {
          id: 'm3_1',
          sender: 'ai',
          time: '08:30 AM',
          text: 'Halo! Teori Jarum Hipodermik (Magic Bullet Theory) berasumsi bahwa media memiliki kekuatan absolut untuk langsung menyuntikkan pesan ke dalam pikiran audiens yang pasif. Walaupun sudah banyak didebat karena adanya model Audiens Aktif, dalam kondisi kepanikan sosial atau polarisasi ekstrem, teori ini masih sering terlihat relevan.'
        }
      ]
    },
    {
      id: '4',
      title: 'Komunikasi Politik Pasca-Kebenaran (Post-Truth)',
      category: 'Sebelumnya',
      suggestions: ['Framing Berita Politik', 'Fact-checking Indonesia', 'Emosi vs Fakta'],
      messages: [
        {
          id: 'm4_1',
          sender: 'ai',
          time: '3 Hari Lalu',
          text: 'Halo John! Di era post-truth, opini publik lebih banyak dipengaruhi oleh daya tarik emosional dan keyakinan pribadi dibanding fakta objektif. Kampanye politik modern sering kali memanfaatkan bias konfirmasi audiens untuk memenangkan simpati.'
        }
      ]
    },
    {
      id: '5',
      title: 'Pelanggaran Kode Etik Jurnalistik Penyamaran',
      category: 'Sebelumnya',
      suggestions: ['Pasal 4 KEJ', 'Metode Undercover', 'Kasus Pers Nasional'],
      messages: [
        {
          id: 'm5_1',
          sender: 'ai',
          time: '4 Hari Lalu',
          text: 'Halo! Metode jurnalisme investigasi dengan penyamaran (undercover) atau kamera tersembunyi diatur secara ketat. Pasal 4 Kode Etik Jurnalistik menyatakan jurnalis tidak boleh menggunakan cara-cara curang, kecuali untuk kepentingan publik yang luar biasa penting dan tidak bisa diungkap dengan cara biasa.'
        }
      ]
    }
  ]);

  const [activeSessionId, setActiveSessionId] = useState<string>('1');

  // Find the active session
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Handle New Session
  const handleNewSession = () => {
    const newId = (sessions.length + 1).toString();
    const newSession: ChatSession = {
      id: newId,
      title: `Diskusi Ilmu Komunikasi Baru ${sessions.length + 1}`,
      category: 'Terbaru',
      suggestions: ['Model Komunikasi Shannon-Weaver', 'Komunikasi Organisasi', 'Teori Semiotika Roland Barthes'],
      messages: [
        {
          id: `m${newId}_1`,
          sender: 'ai',
          time: 'Sekarang',
          text: 'Halo! Saya Aksara AI, asisten akademik Anda dalam Ilmu Komunikasi. Sesi diskusi baru telah dibuat. Apa topik komunikasi yang ingin kita bedah bersama hari ini? (misal: semiotika, dinamika kelompok, retorika, atau strategi Humas)'
        }
      ]
    };

    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
  };

  // Handle Send Message
  const handleSendMessage = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    // Append user message
    const userMessage: ChatMessage = {
      id: `u_${Date.now()}`,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: messageText
    };

    const updatedMessages = [...activeSession.messages, userMessage];
    
    // Update active session with user message
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        // Update title if it was a default title
        const isDefaultTitle = s.title.startsWith('Diskusi Ilmu Komunikasi Baru');
        const newTitle = isDefaultTitle ? (messageText.length > 40 ? messageText.substring(0, 40) + '...' : messageText) : s.title;
        return {
          ...s,
          title: newTitle,
          messages: updatedMessages
        };
      }
      return s;
    }));

    setInput('');

    // Simulate AI response after a short delay
    setTimeout(() => {
      const commAnswers = [
        `Pertanyaan kritis yang luar biasa, John! Jika dihubungkan dengan mata kuliah Ilmu Komunikasi kita, ini erat kaitannya dengan hambatan sosiokultural di mana pesan sering mengalami distorsi akibat perbedaan persepsi budaya.`,
        `Dalam konteks komunikasi massa, tanggapan Anda sangat valid. Hal ini selaras dengan Teori Uses and Gratifications yang menekankan bahwa audiens secara aktif memilih media yang memenuhi kepuasan psikologis mereka.`,
        `Terima kasih atas masukannya! Mari kita telaah dari perspektif teori kritis (Mazhab Frankfurt), di mana industri budaya sering kali mereproduksi hegemoni nilai tertentu melalui konten-konten media populer sehari-hari.`,
        `Analisis yang tajam! Dari kacamata PR strategis, langkah ini akan memperkuat citra positif karena mengedepankan komunikasi dua arah yang simetris (Two-Way Symmetrical Model) dari James Grunig.`
      ];

      const randomAnswer = commAnswers[Math.floor(Math.random() * commAnswers.length)];

      const aiMessage: ChatMessage = {
        id: `ai_${Date.now()}`,
        sender: 'ai',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: randomAnswer,
        richContent: Math.random() > 0.5 ? [
          {
            type: 'article',
            title: 'Teori-Teori Komunikasi Kontemporer & Studi Kasus',
            description: 'Panduan komprehensif mengenai penerapan kerangka komunikasi klasik pada media digital modern.',
            durationOrType: 'Materi Kuliah'
          }
        ] : undefined
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...updatedMessages, aiMessage]
          };
        }
        return s;
      }));
    }, 800);
  };

  // Handle Suggestion Click
  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  // Handle Delete Session
  const handleDeleteSession = (idToDelete: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const filtered = sessions.filter(s => s.id !== idToDelete);
    setSessions(filtered);
    if (activeSessionId === idToDelete && filtered.length > 0) {
      setActiveSessionId(filtered[0].id);
    }
  };

  return (
    <div className="flex h-full bg-[#FAFBFD] overflow-hidden select-none relative">
      
      {/* ----------------- LEFT SIDEBAR: CHAT HISTORY (GEMINI STYLE) ----------------- */}
      <div className={`
        ${sidebarOpen ? 'translate-x-0 w-80' : '-translate-x-full w-0 md:w-16'} 
        transition-all duration-300 ease-in-out shrink-0 bg-white text-slate-600 h-full flex flex-col z-30 border-r border-slate-200 relative
      `}>
        
        {/* Toggle Button for Desktop when open */}
        <div className="p-4 flex items-center justify-between border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="text-blue-600" size={18} />
            <span className="text-xs font-black tracking-wider uppercase text-slate-700">Aksara AI</span>
          </div>
        </div>

        {/* NEW SESSION BUTTON */}
        <div className="p-4">
          <button
            onClick={handleNewSession}
            className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center gap-3 text-sm font-bold text-slate-700 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_12px_rgba(59,130,246,0.15)] group cursor-pointer"
          >
            <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Plus size={14} className="stroke-[3px]" />
            </div>
            <span>Sesi Diskusi Baru</span>
          </button>
        </div>

        {/* CHAT SESSIONS HISTORY LIST */}
        <div className="flex-1 overflow-y-auto px-2 pb-6 space-y-4 scrollbar-hide">
          
          {/* Category: Terbaru */}
          <div>
            <div className="px-3 mb-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
              <Clock size={10} />
              <span>Terbaru</span>
            </div>
            <div className="space-y-1">
              {sessions.filter(s => s.category === 'Terbaru').map(session => {
                const isActive = session.id === activeSessionId;
                return (
                  <div
                    key={session.id}
                    onClick={() => setActiveSessionId(session.id)}
                    className={`group w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 text-xs font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-blue-100 text-blue-900 border border-blue-200 shadow-sm' 
                        : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <MessageSquare size={14} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                      <span className="truncate leading-tight">{session.title}</span>
                    </div>
                    {sessions.length > 1 && (
                      <button 
                        onClick={(e) => handleDeleteSession(session.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-rose-500 transition-all cursor-pointer"
                        title="Hapus Diskusi"
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category: Sebelumnya */}
          {sessions.some(s => s.category === 'Sebelumnya') && (
            <div>
              <div className="px-3 mb-2 flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500">
                <Compass size={10} />
                <span>Sebelumnya</span>
              </div>
              <div className="space-y-1">
                {sessions.filter(s => s.category === 'Sebelumnya').map(session => {
                  const isActive = session.id === activeSessionId;
                  return (
                    <div
                      key={session.id}
                      onClick={() => setActiveSessionId(session.id)}
                      className={`group w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 text-xs font-bold transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-100 text-blue-900 border border-blue-200 shadow-sm' 
                          : 'text-slate-600 hover:bg-slate-100 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <MessageSquare size={14} className={isActive ? 'text-blue-600' : 'text-slate-400'} />
                        <span className="truncate leading-tight">{session.title}</span>
                      </div>
                      {sessions.length > 1 && (
                        <button 
                          onClick={(e) => handleDeleteSession(session.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-200 rounded-md text-slate-400 hover:text-rose-500 transition-all cursor-pointer"
                          title="Hapus Diskusi"
                        >
                          <Trash2 size={12} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>

        {/* SIDEBAR FOOTER CLIENT LOGO */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-bold">
          <div className="flex items-center gap-1.5">
            <BookOpen size={10} className="text-slate-400" />
            <span>Academic LMS v2.5</span>
          </div>
          <span className="text-slate-500">ID: John Tosh</span>
        </div>
      </div>

      {/* Toggle Button for Sidebar when closed */}
      {!sidebarOpen && (
        <button 
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 z-40 p-2 bg-white text-slate-700 rounded-xl shadow-lg border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer flex items-center justify-center"
          title="Tampilkan Sidebar"
        >
          <Menu size={18} />
        </button>
      )}

      {/* ----------------- RIGHT SIDEBAR: ACTIVE CHAT SCREEN ----------------- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Chat Area Header info */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            {/* Pad left space if sidebar is closed */}
            {!sidebarOpen && <div className="w-10" />}
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 text-blue-700 flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-black text-slate-800">Aksara AI</h2>
                <span className="text-[8px] font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded border border-blue-100">PRO MODEL</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold leading-none mt-0.5">Asisten Pengetahuan Ilmu Komunikasi Anda</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <Sparkles size={12} className="text-amber-500" />
            <span>Topik: <strong className="text-slate-700">{activeSession.title}</strong></span>
          </div>
        </div>

        {/* ACTIVE CONVERSATION CONTAINER */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FAFBFD]">
          
          {activeSession.messages.map((msg) => {
            const isAI = msg.sender === 'ai';
            return (
              <div 
                key={msg.id} 
                className={`flex gap-4 max-w-4xl ${!isAI ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                {isAI ? (
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <Bot size={20} />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256" 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Message Box */}
                <div className={`flex flex-col ${!isAI ? 'items-end' : ''}`}>
                  
                  {/* Sender & Timestamp */}
                  <div className={`flex items-center gap-2 mb-1.5 ${!isAI ? 'flex-row-reverse' : ''}`}>
                    <span className="text-xs font-black text-slate-700">
                      {isAI ? 'Aksara AI' : 'John Tosh'}
                    </span>
                    <span className="text-[9px] text-slate-400 font-medium">
                      {msg.time}
                    </span>
                  </div>

                  {/* Text Container */}
                  <div className={`p-4 rounded-2xl shadow-xs border ${
                    isAI 
                      ? 'bg-white border-slate-200/80 rounded-tl-sm text-slate-700' 
                      : 'bg-blue-700 border-blue-800 text-white rounded-tr-sm'
                  }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line font-medium">
                      {msg.text}
                    </p>

                    {/* Rich Content Attachment Card */}
                    {isAI && msg.richContent && msg.richContent.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-100">
                        {msg.richContent.map((item, idx) => (
                          <div 
                            key={idx} 
                            className="border border-slate-200 bg-[#F8FAFC] rounded-xl p-3.5 hover:border-blue-300 hover:bg-blue-50/20 transition-all cursor-pointer group"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                                {item.type === 'video' ? <PlayCircle size={16} /> : <FileText size={16} />}
                              </div>
                              <span className="text-[8px] font-black uppercase text-slate-500 bg-white border border-slate-100 px-1.5 py-0.5 rounded">
                                {item.durationOrType}
                              </span>
                            </div>
                            <h4 className="text-xs font-black text-slate-800 mb-0.5 group-hover:text-blue-700 transition-colors line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                  </div>

                </div>
              </div>
            );
          })}

        </div>

        {/* BOTTOM INPUT & SUGGESTIONS BAR */}
        <div className="bg-white border-t border-slate-200 p-4 lg:px-8 lg:py-6 shrink-0">
          <div className="max-w-4xl mx-auto">
            
            {/* Dynamic Suggestions based on active session */}
            {activeSession.suggestions && activeSession.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {activeSession.suggestions.map((suggestion, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3.5 py-1.5 rounded-full border border-slate-200 text-xs font-extrabold text-slate-600 hover:border-blue-600 hover:text-blue-700 transition-all bg-white hover:bg-blue-50/10 shadow-xs cursor-pointer flex items-center gap-1"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight size={10} className="text-slate-400 group-hover:text-blue-700" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Realtime TextInput Bar */}
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Tanyakan teori komunikasi, kasus humas, atau panduan jurnalistik..." 
                className="w-full pl-6 pr-28 py-3.5 bg-white border-2 border-slate-200 rounded-2xl text-sm font-semibold focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all shadow-xs placeholder-slate-400"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer">
                  <Paperclip size={16} />
                </button>
                <button className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer">
                  <Mic size={16} />
                </button>
                <button 
                  onClick={() => handleSendMessage()}
                  className="w-9 h-9 rounded-xl bg-blue-700 text-white flex items-center justify-center shadow-md hover:bg-blue-800 transition-all cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
            
            <p className="text-center text-[9px] text-slate-400 font-bold mt-2.5">
              Aksara AI dirancang khusus untuk mendukung kurikulum Ilmu Komunikasi. Verifikasi info akademik penting Anda tetap disarankan.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
