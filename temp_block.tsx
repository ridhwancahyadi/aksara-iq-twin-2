          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Competency Gaps */}
            <section className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-slate-200">
                <h2 className="font-semibold text-xs tracking-wider uppercase text-blue-900 mb-1">TARGET KOMPETENSI PRIORITAS</h2>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <p className="text-sm text-slate-600">Berdasarkan aspirasimu + analisis gap CPL</p>
                  <div className="flex items-center gap-3 text-[10px] font-medium text-slate-600">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-600"></div> Kritis (Gap &gt;= 25)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div> Perlu Perhatian (Gap 15-24)</div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div> Sesuai Target (Gap &lt; 15)</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {[
                  {
                    id: 1,
                    title: 'Komunikasi Strategis',
                    level: 2,
                    cpl: 'CPL-C.4',
                    target: 4,
                    gap: 28,
                    desc: 'dibutuhkan di 92% posisi Communication Strategist & PR Officer industri komunikasi. Disarankan menyelesaikan modul',
                    courses: ['Metode Riset Kualitatif Komunikasi', 'Audience Research']
                  },
                  {
                    id: 2,
                    title: 'Analitik & Data',
                    level: 2,
                    cpl: 'CPL-B.5',
                    target: 4,
                    gap: 25,
                    desc: 'dibutuhkan untuk merancang kampanye yang terukur secara komprehensif. Disarankan menyelesaikan modul',
                    courses: ['Manajemen Kampanye PR', 'Digital Analytics']
                  },
                  {
                    id: 3,
                    title: 'Kreasi Pesan Kreatif',
                    level: 3,
                    cpl: 'CPL-B.3',
                    target: 4,
                    gap: 20,
                    desc: 'sangat penting untuk distribusi konten di berbagai platform digital. Disarankan mengikuti',
                    courses: ['Workshop Multimedia Lanjutan']
                  },
                  {
                    id: 4,
                    title: 'Riset Komunikasi',
                    level: 3,
                    cpl: 'CPL-C.2',
                    target: 4,
                    gap: 15,
                    desc: 'dasar pengambilan keputusan berbasis bukti di setiap kampanye. Disarankan mengikuti',
                    courses: ['Statistik Sosial Terapan']
                  },
                  {
                    id: 5,
                    title: 'Teori Komunikasi',
                    level: 4,
                    cpl: 'CPL-A.2',
                    target: 4,
                    gap: 8,
                    desc: 'memberikan landasan berpikir strategis yang kuat. Disarankan membaca',
                    courses: ['Jurnal Kajian Komunikasi Kontemporer']
                  }
                ].map((item, index) => {
                  const isExpanded = expandedGap === item.id;
                  const isCritical = item.gap >= 25;
                  const isAttention = item.gap >= 15 && item.gap < 25;
                  const indicatorColor = isCritical ? 'bg-rose-600' : isAttention ? 'bg-orange-400' : 'bg-yellow-400';
                  const badgeColor = isCritical ? 'bg-rose-100 text-rose-700' : isAttention ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700';
                  
                  return (
                    <div key={item.id} className="border-b border-slate-100 last:border-b-0">
                      <button 
                        onClick={() => setExpandedGap(isExpanded ? null : item.id)}
                        className="w-full text-left p-6 hover:bg-slate-50 transition-colors flex items-start gap-4"
                      >
                        <div className={`w-1.5 h-10 rounded-full ${indicatorColor} shrink-0 mt-1`}></div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-slate-900 mb-1.5">{item.title}</h3>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded font-medium">Level {item.level}</span>
                            <ArrowRight size={12} className="text-slate-400" />
                            <span className="bg-blue-900 text-white px-2 py-0.5 rounded font-medium">Target {item.cpl}: {item.target}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0 mt-1">
                          <span className={`px-3 py-1 rounded font-semibold text-sm ${badgeColor}`}>
                            Gap {item.gap} poin
                          </span>
                          {isExpanded ? <ChevronUp size={20} className="text-slate-400" /> : <ChevronDown size={20} className="text-slate-400" />}
                        </div>
                      </button>
                      
                      {isExpanded && (
                        <div className="px-6 pb-6 pt-0 ml-5 animate-in fade-in slide-in-from-top-2">
                          <div className="bg-white border border-slate-100 p-4 rounded-xl flex items-start gap-3 mt-2 shadow-sm">
                            <Sparkles size={18} className="text-blue-900 shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                                <span className="font-bold text-slate-900">{item.cpl}</span> {item.desc}{' '}
                                {item.courses.map((course, idx) => (
                                  <span key={course}>
                                    <span className="font-bold text-slate-900 underline underline-offset-2">{course}</span>
                                    {idx < item.courses.length - 1 ? ' dan kursus ' : '.'}
                                  </span>
                                ))}
                              </p>
                              <a href="#recommendations" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-900 hover:text-blue-700 transition-colors">
                                Lihat Rekomendasi
                                <ArrowUpRight size={16} />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Barriers */}
            <section className="flex flex-col gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 h-full flex flex-col">
                <h2 className="font-semibold text-xs tracking-wider uppercase text-blue-900 mb-1">HAMBATAN TERIDENTIFIKASI</h2>
                <p className="text-sm text-slate-600 mb-6">Setiap hambatan adalah peluang tumbuh</p>
                <div className="space-y-4 flex-1">
                  {selectedHurdles.length > 0 ? (
                    selectedHurdles.map(hurdleId => {
                      const hurdle = hurdles.find(h => h.id === hurdleId);
                      if (!hurdle) return null;
                      return (
                        <div key={hurdle.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors cursor-pointer group">
                          <p className="font-semibold text-lg text-slate-900 mb-2">{hurdle.label}</p>
                          <div className="flex gap-2 text-slate-600">
                            <Lightbulb size={16} className="text-sky-700 shrink-0 mt-0.5" />
                            <p className="text-sm italic leading-tight">Ikuti kelas atau program relevan untuk mengatasi hambatan ini.</p>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <>
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors cursor-pointer group">
                        <p className="font-semibold text-lg text-slate-900 mb-2">Kurang pengalaman riset lapangan</p>
                        <div className="flex gap-2 text-slate-600">
                          <Lightbulb size={16} className="text-sky-700 shrink-0" />
                          <p className="text-sm italic leading-tight">Ikuti program magang riset atau capstone project berbasis data primer</p>
                        </div>
                      </div>
                      <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 hover:border-blue-900 transition-colors cursor-pointer group">
                        <p className="font-semibold text-lg text-slate-900 mb-2">Ragu dengan public speaking</p>
                        <div className="flex gap-2 text-slate-600">
                          <Lightbulb size={16} className="text-sky-700 shrink-0" />
                          <p className="text-sm italic leading-tight">Bergabung dengan komunitas debat atau kelas presentasi mingguan</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-100 flex gap-3">
                  <BrainCircuit size={20} className="text-blue-800 shrink-0" />
                  <p className="text-[11px] font-medium text-blue-800 leading-relaxed">AI mengidentifikasi ini dari sesi brainstorming-mu — kamu bisa mengeditnya kapan saja.</p>
                </div>
              </div>
            </section>
          </div>
