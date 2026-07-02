import React from 'react';
import { motion } from 'motion/react';
import { 
  Database, Hammer, FileCheck, FolderHeart, ShieldCheck, 
  History, GitBranch, GitMerge, Globe, RotateCcw, Archive, Cookie, RefreshCw
} from 'lucide-react';

interface TopicIllustrationProps {
  lessonId: string;
}

export default function TopicIllustration({ lessonId }: TopicIllustrationProps) {
  // Select illustration elements based on lesson topic
  const renderContent = () => {
    switch (lessonId) {
      case 'lesson-why-vc':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            {/* Background image to set the bakery atmosphere with blur */}
            <img 
              src="https://picsum.photos/seed/bakerycookie/600/350?blur=2" 
              alt="Bakery concept"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            {/* Animated interactive SVG layers */}
            <div className="z-10 flex flex-col items-center gap-4">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center text-amber-400 shadow-lg"
              >
                <Cookie className="w-8 h-8" />
              </motion.div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Recipe Time-Machine</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Safely jump between nut-free drafts and premium experimental recipe revisions without destroying history!
                </p>
              </div>

              {/* Version track visualizer */}
              <div className="flex items-center gap-2.5 mt-2 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[9px] font-mono text-slate-300">v1.0 (Nut-free Original)</span>
                <span className="text-slate-500">→</span>
                <span className="text-[9px] font-mono text-rose-400 line-through">v1.1 (Nuts Crash)</span>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-init':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/securityvault/600/350?blur=2" 
              alt="Vault concept"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-4">
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.05, 1], opacity: 1 }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-16 h-16 rounded-full bg-indigo-500/10 border-2 border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-xl shadow-indigo-500/5"
              >
                <Database className="w-8 h-8" />
              </motion.div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Initializing .git Vault</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Creates a hidden tracker database right inside your project directory to record file states.
                </p>
              </div>

              {/* Glowing camera scanning animation */}
              <div className="w-32 h-1 bg-slate-800 rounded relative overflow-hidden">
                <motion.div 
                  animate={{ x: [-40, 80, -40] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  className="w-12 h-full bg-gradient-to-r from-transparent via-indigo-400 to-transparent"
                />
              </div>
            </div>
          </div>
        );

      case 'lesson-git-status':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/checklist/600/350?blur=2" 
              alt="Radar Status"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-4 w-full px-4">
              <div className="flex gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-8 h-8 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 text-[10px] font-bold font-mono"
                  title="Untracked state"
                >
                  U
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                  className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-[10px] font-bold font-mono"
                  title="Modified state"
                >
                  M
                </motion.div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
                  className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-[10px] font-bold font-mono"
                  title="Staged state"
                >
                  S
                </motion.div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Git Radar & Status Report</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Audit which changes are untracked (red), modified (yellow), or ready to package (green).
                </p>
              </div>

              {/* Status bar */}
              <div className="w-full max-w-[200px] flex flex-col gap-1 bg-slate-950/80 p-2 rounded border border-slate-800 font-mono text-[8px] text-left">
                <div className="text-rose-400">● untracked: about-kittens.txt</div>
                <div className="text-emerald-400">● staged: logo.png</div>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-add':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/cargoadd/600/350?blur=2" 
              alt="Packing Box"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded bg-slate-800 border border-slate-700 flex items-center justify-center text-[#8b949e] font-mono text-[10px]">
                  Work
                </div>
                <motion.div 
                  animate={{ x: [0, 40, 0] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  className="text-indigo-400 text-xs font-bold"
                >
                  git add ➔
                </motion.div>
                <div className="w-12 h-12 rounded bg-indigo-950/40 border-2 border-dashed border-indigo-500/50 flex flex-col items-center justify-center text-indigo-400 text-[9px] font-bold">
                  <span>Staged</span>
                  <span className="text-[8px] text-indigo-300">Box</span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Staging Cargo Crate</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Pack items selectively into the staging crate. They won't ship to history until you seal the box.
                </p>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-commit':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/steelbox/600/350?blur=2" 
              alt="Safe Snapshots"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-3">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
                className="w-14 h-14 rounded-xl bg-emerald-500/10 border-2 border-emerald-500/30 flex flex-col items-center justify-center text-emerald-400 shadow-xl"
              >
                <ShieldCheck className="w-7 h-7" />
              </motion.div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Sealed Vault Commit</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Saves a locked, cryptographic snapshot hash forever. Build your bulletproof timeline.
                </p>
              </div>

              {/* SHA marker */}
              <div className="px-2.5 py-1 bg-emerald-950/50 rounded border border-emerald-900/40 text-[9px] font-mono text-emerald-300">
                commit a1b2c3d (HEAD)
              </div>
            </div>
          </div>
        );

      case 'lesson-git-log':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/historytimeline/600/350?blur=2" 
              alt="Timeline History"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-4 w-full">
              <div className="flex flex-col gap-1.5 w-full max-w-[220px]">
                {/* Visual log nodes */}
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-950/80 p-1.5 rounded border border-slate-800 flex items-center justify-between text-[8px] font-mono text-left"
                >
                  <span className="text-emerald-400 font-bold">f7e8d9c</span>
                  <span className="text-slate-400 truncate max-w-[120px]">Add kitten details</span>
                </motion.div>
                <div className="w-0.5 h-2 bg-slate-700 mx-auto"></div>
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-950/80 p-1.5 rounded border border-slate-800 flex items-center justify-between text-[8px] font-mono text-left"
                >
                  <span className="text-emerald-400 font-bold">a1b2c3d</span>
                  <span className="text-slate-400 truncate max-w-[120px]">Initial commit</span>
                </motion.div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Chronological Ledger Log</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Flip through the chapters of your repository to see exactly who did what, and when.
                </p>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-branch':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/multiverse/600/350?blur=2" 
              alt="Parallel Universes"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-3">
              {/* Branch graphic */}
              <div className="relative w-40 h-16 flex items-center justify-center">
                {/* Main line */}
                <div className="absolute left-0 right-0 h-1 bg-slate-700 top-8 rounded"></div>
                {/* Branch line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                  className="absolute left-16 h-1 bg-indigo-500 origin-left -rotate-30 top-8 rounded"
                  style={{ transformOrigin: 'left center' }}
                ></motion.div>
                <div className="absolute left-16 w-3 h-3 rounded-full bg-slate-400 top-7 border border-slate-900"></div>
                <div className="absolute right-6 w-3 h-3 rounded-full bg-indigo-400 top-2.5 border border-slate-900 animate-pulse"></div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Parallel Highways (Branches)</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Safely isolate unstable feature development, and test without risking production.
                </p>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-merge':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/unification/600/350?blur=2" 
              alt="Highway Merge"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-3">
              {/* Merge graphic */}
              <div className="relative w-40 h-16 flex items-center justify-center">
                <div className="absolute left-0 right-0 h-1 bg-slate-700 top-8 rounded"></div>
                <div className="absolute left-6 h-1 bg-indigo-500 w-16 -rotate-30 top-8 rounded-l origin-left"></div>
                {/* Flowing connection indicator */}
                <motion.div 
                  animate={{ x: [0, 80] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute left-10 w-2 h-2 rounded-full bg-yellow-400 shadow shadow-yellow-400 top-3"
                ></motion.div>
                <div className="absolute right-12 w-3.5 h-3.5 rounded-full bg-emerald-400 top-7 border border-slate-900 animate-ping"></div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Seamless Integration (Merge)</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Gently unify parallel draft timelines back into your primary stable production branch.
                </p>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-clone':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/downloadlink/600/350?blur=2" 
              alt="Download Concept"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-4">
              <div className="flex items-center gap-5">
                <Globe className="w-8 h-8 text-sky-400 animate-pulse" />
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-slate-500 text-sm font-bold"
                >
                  ⬇ ⬇
                </motion.div>
                <Database className="w-8 h-8 text-emerald-400" />
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Remote Cloning Connection</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Downloads an entire repository catalog (with all history timelines) to your desk catalog.
                </p>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-restore':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/magiceraser/600/350?blur=2" 
              alt="Magic Eraser"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-4">
              <motion.div 
                animate={{ x: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg"
              >
                <RotateCcw className="w-6 h-6" />
              </motion.div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Local History Restore (Ctrl+Z)</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Erase accidental coffee-spill code mess in a second. Revert instantly back to the last clean commit!
                </p>
              </div>
            </div>
          </div>
        );

      case 'lesson-git-stash':
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <img 
              src="https://picsum.photos/seed/secretbox/600/350?blur=2" 
              alt="Desk Drawer"
              className="absolute inset-0 w-full h-full object-cover opacity-15 rounded-xl pointer-events-none"
              referrerPolicy="no-referrer"
            />
            
            <div className="z-10 flex flex-col items-center gap-3">
              <motion.div 
                animate={{ y: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-xl"
              >
                <Archive className="w-7 h-7" />
              </motion.div>
              
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">The Secret Stash Drawer</h4>
                <p className="text-[10px] text-slate-400 mt-1 max-w-[220px] mx-auto leading-relaxed">
                  Temporarily sweep away dirty workspace files to a locked shelf, clean up, and restore them anytime.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="relative flex flex-col items-center justify-center p-4 h-full text-center">
            <div className="z-10 flex flex-col items-center gap-4">
              <RefreshCw className="w-12 h-12 text-slate-500 animate-spin" />
              <h4 className="text-xs font-bold text-slate-400">Loading Interactive Concept...</h4>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-xl aspect-video w-full flex flex-col relative" id="topic-illustration">
      {/* Visual content container */}
      <div className="flex-1">
        {renderContent()}
      </div>
      
      {/* Lower Caption Ribbon */}
      <div className="h-8 bg-[#0d1117]/80 backdrop-blur-sm border-t border-[#30363d] px-3.5 flex items-center justify-between text-[9px] font-mono text-[#8b949e]">
        <span>GIT ACADEMY SIMULATION</span>
        <span className="text-[#2ea043] font-bold">● VISUAL GRAPHIC STABLE</span>
      </div>
    </div>
  );
}
