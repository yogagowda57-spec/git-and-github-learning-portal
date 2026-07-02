import { RepoState, VirtualFile, Commit } from '../types';
import { Folder, Inbox, Database, ArrowRight, Shield, Globe, Terminal, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface VisualizerProps {
  repoState: RepoState;
}

export default function Visualizer({ repoState }: VisualizerProps) {
  const { isInitialized, workingDirectory, stagingArea, commits, currentBranch, branches } = repoState;

  // Group files by status
  const untrackedFiles = workingDirectory.filter(f => f.status === 'untracked');
  const modifiedFiles = workingDirectory.filter(f => f.status === 'modified');
  const stagedFiles = workingDirectory.filter(f => f.status === 'staged');
  const committedFiles = workingDirectory.filter(f => f.status === 'committed');

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-xl flex flex-col gap-5" id="repo-visualizer">
      {/* Visualizer Header */}
      <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
        <div className="flex items-center gap-2">
          <Database className="w-4.5 h-4.5 text-[#58a6ff]" />
          <h3 className="font-bold text-xs uppercase tracking-wider text-white">Interactive Repository State</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 bg-[#1f6feb1a] text-[#58a6ff] rounded-md border border-[#1f6feb4d]">
            Branch: <strong className="font-bold">{isInitialized ? currentBranch : 'None'}</strong>
          </span>
          <span className={`w-2 h-2 rounded-full ${isInitialized ? 'bg-[#2ea043] animate-pulse' : 'bg-[#484f58]'}`}></span>
          <span className="text-[11px] font-mono text-[#8b949e] font-medium">
            {isInitialized ? 'Git Active' : 'Not Initialized'}
          </span>
        </div>
      </div>

      {!isInitialized ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-[#8b949e]">
          <Terminal className="w-10 h-10 text-[#30363d] mb-3 animate-pulse" />
          <p className="font-bold text-[#c9d1d9] text-xs">Git repository is not active.</p>
          <p className="text-[11px] max-w-xs mt-1.5 text-[#8b949e]">
            Type <code className="bg-[#0d1117] px-1.5 py-0.5 rounded border border-[#30363d] text-[#f78166] font-mono text-[10px]">git init</code> in the terminal to unlock the local workspace.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Column 1: Working Directory */}
          <div className="bg-[#0d1117] rounded-xl p-4 border border-[#30363d] flex flex-col gap-3 min-h-[220px]">
            <div className="flex items-center gap-1.5 text-white font-bold text-[10px] uppercase tracking-wider pb-2 border-b border-[#30363d]">
              <Folder className="w-3.5 h-3.5 text-[#e3b341]" />
              <span>Working Directory</span>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {workingDirectory.length === 0 ? (
                <div className="text-center py-8 text-xs text-[#484f58] font-mono italic">
                  No files exist
                </div>
              ) : (
                workingDirectory.map((file, i) => {
                  let badgeColor = 'bg-[#f74e27]/10 text-[#f78166] border-[#f74e27]/25';
                  let statusLabel = 'Untracked';
                  if (file.status === 'modified') {
                    badgeColor = 'bg-[#e3b341]/10 text-[#e3b341] border-[#e3b341]/25';
                    statusLabel = 'Modified';
                  } else if (file.status === 'staged') {
                    badgeColor = 'bg-[#1f6feb]/10 text-[#58a6ff] border-[#1f6feb]/25';
                    statusLabel = 'Staged';
                  } else if (file.status === 'committed') {
                    badgeColor = 'bg-[#238636]/10 text-[#56d364] border-[#238636]/25';
                    statusLabel = 'Committed';
                  }

                  return (
                    <motion.div 
                      key={file.name}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-2.5 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className={`w-3.5 h-3.5 ${file.status === 'untracked' ? 'text-[#f78166]' : 'text-[#8b949e]'}`} />
                        <div>
                          <div className="text-xs font-mono font-bold text-[#e6edf3]">{file.name}</div>
                          <div className="text-[10px] text-[#8b949e] italic max-w-[125px] truncate">{file.content}</div>
                        </div>
                      </div>
                      <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                        {statusLabel}
                      </span>
                    </motion.div>
                  );
                })
              )}
            </div>
            <div className="text-[9px] text-[#8b949e] leading-relaxed mt-2 font-mono bg-[#161b22] p-2 rounded-lg border border-[#30363d]/50">
              <span className="font-bold text-white block mb-0.5">Legend:</span>
              <span className="text-[#f78166]">● Untracked</span> | <span className="text-[#e3b341]">● Modified</span> | <span className="text-[#58a6ff]">● Staged</span> | <span className="text-[#56d364]">● Committed</span>
            </div>
          </div>

          {/* Column 2: Staging Area */}
          <div className="bg-[#0d1117] rounded-xl p-4 border border-[#30363d] flex flex-col gap-3 min-h-[220px] relative">
            <div className="flex items-center gap-1.5 text-white font-bold text-[10px] uppercase tracking-wider pb-2 border-b border-[#30363d]">
              <Inbox className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>Staging Area (Index)</span>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 justify-center">
              {stagedFiles.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-[#484f58] text-xs">
                  <Inbox className="w-7 h-7 text-[#30363d] mb-1.5" />
                  <p className="font-mono italic text-[#8b949e]">Staging index is empty</p>
                  <p className="text-[10px] mt-1.5 max-w-[160px] text-[#8b949e] leading-relaxed">
                    Use <strong className="text-white font-semibold">git add &lt;file&gt;</strong> to package files for a snapshot.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="text-[9px] font-mono text-[#56d364] font-bold mb-1 text-center bg-[#2386361a] py-1 rounded border border-[#2386364d]">
                    📦 READY TO COMMIT
                  </div>
                  {stagedFiles.map((file) => (
                    <motion.div 
                      key={file.name}
                      layoutId={`stage-${file.name}`}
                      className="p-2 rounded-lg bg-[#1f6feb10] border border-[#1f6feb33] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#58a6ff]" />
                        <span className="text-xs font-mono font-semibold text-[#58a6ff]">{file.name}</span>
                      </div>
                      <span className="text-[9px] font-bold font-mono text-[#58a6ff] bg-[#1f6feb26] px-1.5 py-0.5 rounded">Staged</span>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-[#21262d] border border-[#30363d] p-1 rounded-full shadow-lg">
              <ArrowRight className="w-3.5 h-3.5 text-[#8b949e]" />
            </div>
          </div>

          {/* Column 3: Local Vault & Commits */}
          <div className="bg-[#0d1117] rounded-xl p-4 border border-[#30363d] flex flex-col gap-3 min-h-[220px]">
            <div className="flex items-center gap-1.5 text-white font-bold text-[10px] uppercase tracking-wider pb-2 border-b border-[#30363d]">
              <Shield className="w-3.5 h-3.5 text-[#56d364]" />
              <span>Local Repo (Commits)</span>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
              {commits.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center text-[#484f58] text-xs">
                  <Database className="w-7 h-7 text-[#30363d] mb-1.5" />
                  <p className="font-mono italic text-[#8b949e]">No commits yet</p>
                  <p className="text-[10px] mt-1.5 max-w-[160px] text-[#8b949e] leading-relaxed">
                    Ready files inside the staging area, then type <strong className="text-white font-semibold">git commit</strong> to seal the vault.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 border-l-2 border-[#30363d] pl-4 ml-2.5 my-2 relative">
                  {commits.map((c, idx) => (
                    <div key={c.id} className="relative group">
                      {/* Node point */}
                      <div className="absolute -left-[23px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#58a6ff] border-2 border-[#0d1117] group-hover:scale-125 transition-transform" />
                      
                      <div className="p-2.5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#58a6ff] transition-colors flex flex-col gap-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#58a6ff] font-bold">{c.id}</span>
                          <span className="text-[#8b949e]">branch: {c.branch}</span>
                        </div>
                        <div className="text-xs text-[#e6edf3] font-medium font-sans leading-tight">
                          {c.message}
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {Object.keys(c.files).map(fn => (
                            <span key={fn} className="text-[9px] font-mono bg-[#0d1117] border border-[#30363d] text-[#8b949e] px-1 py-0.5 rounded">
                              {fn}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
