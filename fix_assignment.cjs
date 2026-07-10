const fs = require('fs');

let content = fs.readFileSync('src/components/CommunicationLabs.tsx', 'utf8');

const regex = /\{\/\* ---------------- DETAIL TUGAS \(ASSIGNMENT\) ---------------- \*\/\}\s*\{activeSubTab === 'assignment' && \(\s*<motion\.div[\s\S]*?<\/motion\.div>\s*\)\}/;

const fixedAssignment = `{/* ---------------- DETAIL TUGAS (ASSIGNMENT) ---------------- */}
                {activeSubTab === 'assignment' && (
                  <motion.div
                    key="assignment-tab"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="flex flex-col gap-5 max-w-6xl"
                  >
                    {/* Top Assignment Header */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 flex-wrap">
                        <span>Dashboard</span>
                        <span className="text-slate-300">›</span>
                        <span>Courses</span>
                        <span className="text-slate-300">›</span>
                        <span>UI/UX Design</span>
                        <span className="text-slate-300">›</span>
                        <span className="text-slate-700">Assignment 1</span>
                      </div>

                      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                          <div>
                            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                              Assignment 1: User Research & Persona
                            </h2>
                            <p className="text-sm font-medium text-slate-500 mt-1">
                              {currentAssessment?.title || 'Advanced UI/UX (CS-402)'}
                            </p>
                          </div>
                          <div className="bg-blue-50 text-blue-700 font-bold text-xs px-3 py-1.5 rounded-full shrink-0 border border-blue-100">
                            100 pts
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-x-16 gap-y-4 pt-4 border-t border-slate-100">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Lecturer</span>
                            <span className="text-sm font-semibold text-slate-800">Dr. Nadia Febriani</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Due Date</span>
                            <span className="text-sm font-semibold text-red-600">Oct 25, 2024, 23:59</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-xs font-bold text-slate-500">Status</span>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md flex items-center gap-1.5 w-fit shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              In Progress
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-5 items-start mt-2">
                      {/* Left Column: Instructions */}
                      <div className="md:col-span-3 space-y-4">
                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
                          <div className="flex items-center gap-2 text-slate-800 border-b border-slate-100 pb-3">
                            <FileText size={18} className="text-blue-600 shrink-0" />
                            <h3 className="text-lg font-bold text-slate-800">Instructions</h3>
                          </div>
                            
                          <div className="space-y-6">
                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed">
                              {currentAssessment?.moduleId === 'presentation' && "Buat dan upload rekaman video presentasi mengenai isu komunikasi strategis pilihan Anda. Presentasikan secara sistematis dengan durasi 10-20 menit. Sertakan slide pendukung dan outline topik."}
                              {currentAssessment?.moduleId === 'writing' && "Buat dan upload esai akademik mengenai analisis manajemen krisis humas perusahaan teknologi besar di Indonesia. Pastikan argumentasi Anda didukung oleh minimal 5 jurnal referensi ilmiah terakreditasi."}
                              {currentAssessment?.moduleId === 'fgd' && "Ikuti sesi FGD kelompok membahas solusi Smart Campus. Pastikan hadir pada jadwal yang ditentukan dan berkontribusi aktif dalam diskusi tim secara kondusif."}
                              {currentAssessment?.moduleId === 'simulation' && "Ikuti simulasi media interview sebagai PR Officer. Jawab seluruh pertanyaan kritis dari media massa mengenai isu kegagalan sistem data perusahaan secara taktis dan tenang."}
                            </p>

                            {/* Moved Details */}
                            <div className="space-y-4 pt-2">
                              {/* Tema & Kasus */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                                  <span className="text-[11px] font-black uppercase tracking-wider">Tema & Kasus</span>
                                </div>
                                <p className="text-sm font-semibold text-slate-800 leading-snug">
                                  Evaluasi strategi manajemen krisis PT KAI atas kasus tabrakan di Bekasi Timur (27 April 2026)
                                </p>
                              </div>

                              {/* Teori Acuan */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-amber-500 mb-1">
                                  <span className="text-[11px] font-black uppercase tracking-wider">Teori Acuan</span>
                                </div>
                                <ol className="text-[13px] font-medium text-slate-700 space-y-1 list-decimal pl-4">
                                  <li className="pl-1">Situational Crisis Communication Theory (SCCT) – Coombs</li>
                                  <li className="pl-1">Image Restoration Theory – Benoit</li>
                                </ol>
                              </div>

                              {/* Target Output */}
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-1.5 text-emerald-500 mb-1">
                                  <span className="text-[11px] font-black uppercase tracking-wider">Target Output</span>
                                </div>
                                <ul className="text-[13px] font-medium text-slate-700 space-y-1.5">
                                  <li className="flex gap-2 items-start">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                                    <span>Kemampuan mengidentifikasi isu krisis & menganalisis respons organisasi.</span>
                                  </li>
                                  <li className="flex gap-2 items-start">
                                    <span className="w-1 h-1 rounded-full bg-slate-400 shrink-0 mt-2"></span>
                                    <span>Kemampuan mengaitkan temuan dengan teori & memberikan rekomendasi strategis.</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-2.5 pt-4 border-t border-slate-100">
                              <span className="text-[12px] font-bold text-slate-800 block mb-2">Deliverables:</span>
                              <ul className="text-[13px] font-medium text-slate-600 space-y-2 list-disc pl-5">
                                <li className="pl-1">Conduct at least 3 user interviews with target demographics.</li>
                                <li className="pl-1">Create 2 detailed User Personas based on your findings.</li>
                                <li className="pl-1">Write a brief summary report (max 2 pages) highlighting key insights.</li>
                              </ul>
                            </div>
                            
                            <p className="text-[13px] font-medium text-slate-600 leading-relaxed pt-2">
                              Please submit all materials in a single PDF document. If you have video recordings of interviews, please include links in your report or upload a compressed MP4 file.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Column: Upload Zone */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 leading-tight">Create a new project</h3>
                            <button className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
                          </div>
                          <p className="text-[13px] font-medium text-slate-500">Drag and drop files to create a new project.</p>
                          
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">Project lead</label>
                            <div className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-slate-300 transition-colors w-[60%]">
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">SH</div>
                                <span className="text-sm font-medium text-slate-700">Sienna<br/>Hewitt</span>
                              </div>
                              <ChevronDown size={16} className="text-slate-400" />
                            </div>
                          </div>

                          {/* Drag and drop area */}
                          <div className="border-2 border-dashed border-blue-200 bg-[#f4f7fc] rounded-lg p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-blue-50 transition-colors mt-2">
                            <UploadCloud size={32} className="text-slate-500 mb-3" />
                            <p className="text-[13px] font-bold text-slate-800">Upload an project image(s)</p>
                            <p className="text-[12px] font-medium text-slate-500 mt-1">or, <span className="text-blue-600 font-bold hover:underline">click to browse</span> (4 MB max)</p>
                          </div>

                          {/* File List */}
                          <div className="space-y-4 pt-2">
                            {/* File 1 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-500 shrink-0">
                                    <Image size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none">Dashboard concept 01.jpeg</p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">840 KB</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#245ce0] h-full w-full"></div>
                              </div>
                            </div>
                            
                            {/* File 2 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-500 shrink-0">
                                    <Image size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none">Dashboard concept 02.jpeg</p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">764 KB</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#245ce0] h-full w-[85%]"></div>
                              </div>
                            </div>

                            {/* File 3 */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded flex items-center justify-center text-slate-500 shrink-0">
                                    <Image size={16} />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 leading-none">Dashboard concept 03.jpeg</p>
                                    <p className="text-[11px] font-medium text-slate-400 mt-1">906 KB</p>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
                              </div>
                              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-[#245ce0] h-full w-[35%]"></div>
                              </div>
                            </div>
                          </div>

                          {/* Add Collaborators */}
                          <div className="space-y-2 pt-4 border-t border-slate-100">
                            <label className="text-[13px] font-bold text-slate-800">Add Collaborators</label>
                            <div className="flex gap-2">
                              <input 
                                type="text" 
                                placeholder="Search by name or email..." 
                                className="flex-1 border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-500 placeholder-slate-400"
                              />
                              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm">
                                Send<br/>invites
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-6 mt-2 border-t border-slate-100">
                            <button className="flex items-center gap-1.5 text-[13px] font-bold text-slate-500 hover:text-slate-700">
                              <HelpCircle size={16} /> Need help?
                            </button>
                            <button className="bg-[#245ce0] text-white px-5 py-2.5 rounded-md text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm">
                              Submit Assignment
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}`;

if (regex.test(content)) {
    content = content.replace(regex, fixedAssignment);
    console.log("Assignment tab fixed successfully.");
    fs.writeFileSync('src/components/CommunicationLabs.tsx', content);
} else {
    console.log("Regex didn't match.");
}
