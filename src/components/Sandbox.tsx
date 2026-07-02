import { useState } from 'react';
import { RepoState } from '../types';
import Terminal from './Terminal';
import Visualizer from './Visualizer';
import AITutor from './AITutor';
import { Play, RotateCcw, AlertCircle, HelpCircle, TerminalSquare } from 'lucide-react';

const SANDBOX_START_STATE: RepoState = {
  isInitialized: true,
  workingDirectory: [
    { name: 'index.html', content: '<h1>My Kitten Sanctuary</h1>', status: 'untracked' },
    { name: 'styles.css', content: 'body { background: pink; }', status: 'untracked' },
    { name: 'app.js', content: 'console.log("Kittens loaded!");', status: 'untracked' }
  ],
  stagingArea: [],
  commits: [],
  currentBranch: 'main',
  branches: ['main'],
  remoteCommits: [],
  remoteBranches: []
};

export default function Sandbox() {
  const [sandboxState, setSandboxState] = useState<RepoState>({ ...SANDBOX_START_STATE });

  const handleResetSandbox = () => {
    if (confirm('Are you sure you want to reset your sandbox directory to its default starting state? This deletes any sandbox commits.')) {
      setSandboxState({ ...SANDBOX_START_STATE });
    }
  };

  return (
    <div className="flex flex-col gap-6" id="sandbox-view">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#161b22] p-4 rounded-xl border border-[#30363d]">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2 uppercase tracking-wide">
            <TerminalSquare className="w-4.5 h-4.5 text-[#58a6ff]" />
            <span>Git Sandbox Arena</span>
          </h2>
          <p className="text-xs text-[#8b949e] mt-1">
            Type any git commands you like! Watch your changes jump across different states of the visualizer below.
          </p>
        </div>
        <button
          onClick={handleResetSandbox}
          className="px-3.5 py-1.5 bg-[#0d1117] hover:bg-[#21262d] border border-[#30363d] text-xs text-[#f78166] hover:text-[#f74e27] font-semibold rounded-lg cursor-pointer transition-colors flex items-center gap-1.5 font-mono"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Sandbox
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visualizer & Terminal Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <Visualizer repoState={sandboxState} />
          
          <Terminal 
            repoState={sandboxState}
            setRepoState={setSandboxState}
          />
        </div>

        {/* AI Tutor Companion Column */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <AITutor />
          
          {/* Quick Sandbox Tip */}
          <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg text-xs leading-relaxed text-[#8b949e]">
            <h4 className="font-bold text-white mb-2 flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <HelpCircle className="w-4 h-4 text-[#58a6ff]" /> Sandbox Commands:
            </h4>
            <ul className="list-disc pl-4 flex flex-col gap-1.5 mt-1 font-mono text-[11px] text-[#c9d1d9]">
              <li>git status</li>
              <li>git add index.html</li>
              <li>git status</li>
              <li>git commit -m "My first commit!"</li>
              <li>git log</li>
              <li>git branch feature-kittens</li>
              <li>git checkout feature-kittens</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
