const fs = require('fs');

let content = fs.readFileSync('src/components/CommunicationLabs.tsx', 'utf8');

const regex = /\{\/\* Right Column: Upload Zone \*\/\}[\s\S]*?\{\/\* ---------------- LOG AKTIVITAS ---------------- \*\/\}/;

const rightCol = `{/* Right Column: Upload Zone */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-5">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-slate-900 leading-tight">Assignment Submission</h3>
                          </div>
                          <p className="text-[13px] font-medium text-slate-500">Drag and drop files to submit your assignment.</p>
                          
                          <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700">Ketua Kelompok</label>
                            <div 
                              className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2 bg-white cursor-pointer hover:border-slate-300 transition-colors w-full"
                              onClick={() => {
                                setTempSelectedMembers([...fgdParticipants]);
                                setMemberSearchQuery("");
                                setShowMemberModal(true);
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold">
                                  {loggedInUser?.name ? loggedInUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'SH'}
                                </div>
                                <span className="text-sm font-medium text-slate-700">{loggedInUser?.name || 'Sienna Hewitt'}</span>
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
                            <div 
                              className="flex gap-2 cursor-pointer group"
                              onClick={() => {
                                setTempSelectedMembers([...fgdParticipants]);
                                setMemberSearchQuery("");
                                setShowMemberModal(true);
                              }}
                            >
                              <div className="flex-1 border border-slate-200 rounded-md px-3 py-2.5 text-sm text-slate-400 bg-white group-hover:border-blue-400 transition-colors flex items-center">
                                Search by name or email...
                              </div>
                              <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50 shrink-0 shadow-sm pointer-events-none">
                                Send<br/>invites
                              </button>
                            </div>
                            {fgdParticipants.length > 0 && (
                               <div className="flex flex-wrap gap-2 pt-2">
                                 {fgdParticipants.map((p, idx) => (
                                    <div key={idx} className="flex items-center gap-1.5 p-1 pr-1.5 bg-slate-50 border border-slate-200 rounded-full hover:border-blue-200 transition-colors group/item">
                                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[10px] font-black text-blue-600 shrink-0 uppercase" title={p.name}>
                                        {p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                                      </div>
                                      <span className="text-[10px] font-semibold text-slate-700">{p.name}</span>
                                      <button 
                                        type="button"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setFgdParticipants(prev => prev.filter(item => item.name !== p.name));
                                        }}
                                        className="text-slate-400 hover:text-blue-600 hover:bg-slate-100 p-0.5 rounded-full cursor-pointer transition-colors"
                                      >
                                        <X size={12} strokeWidth={3} />
                                      </button>
                                    </div>
                                 ))}
                               </div>
                            )}
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
                )}

                {/* ---------------- LOG AKTIVITAS ---------------- */}`;

if (regex.test(content)) {
    content = content.replace(regex, rightCol);
    console.log("Right column fixed successfully.");
    fs.writeFileSync('src/components/CommunicationLabs.tsx', content);
} else {
    console.log("Regex didn't match.");
}
