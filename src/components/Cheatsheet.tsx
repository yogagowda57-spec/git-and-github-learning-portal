import { useState } from 'react';
import { Search, Copy, Check, Terminal, ExternalLink, Filter, Info } from 'lucide-react';

interface CheatCommand {
  command: string;
  description: string;
  category: 'basics' | 'history' | 'branching' | 'remote' | 'undo' | 'advanced';
  example: string;
}

const CHEAT_DATA: CheatCommand[] = [
  {
    command: 'git init',
    description: 'Initialize a local Git repository in your current directory.',
    category: 'basics',
    example: 'git init'
  },
  {
    command: 'git status',
    description: 'Check modified files, untracked files, and staged files.',
    category: 'basics',
    example: 'git status'
  },
  {
    command: 'git add <file>',
    description: 'Stage changes in a specific file. Use "." to stage all files.',
    category: 'basics',
    example: 'git add index.html\ngit add .'
  },
  {
    command: 'git commit -m "<message>"',
    description: 'Permanently save your staged snapshots with a text description.',
    category: 'history',
    example: 'git commit -m "Add shopping cart login features"'
  },
  {
    command: 'git log',
    description: 'Show commit history list in reverse chronological order.',
    category: 'history',
    example: 'git log\ngit log --oneline'
  },
  {
    command: 'git diff',
    description: 'Show differences in lines between your files and last commit.',
    category: 'history',
    example: 'git diff'
  },
  {
    command: 'git branch <branch-name>',
    description: 'Create a new branch pointing to your current HEAD commit.',
    category: 'branching',
    example: 'git branch feature-login'
  },
  {
    command: 'git checkout <branch-name>',
    description: 'Switch to a branch. Use "-b" flag to create and switch immediately.',
    category: 'branching',
    example: 'git checkout main\ngit checkout -b feature-lasers'
  },
  {
    command: 'git merge <branch-name>',
    description: 'Merge commits from another branch into your active branch.',
    category: 'branching',
    example: 'git checkout main\ngit merge feature-lasers'
  },
  {
    command: 'git clone <url>',
    description: 'Clone (download) a remote repository onto your computer.',
    category: 'remote',
    example: 'git clone https://github.com/friend/perfect-bread.git'
  },
  {
    command: 'git push <remote> <branch>',
    description: 'Upload local commits to a remote hosting platform like GitHub.',
    category: 'remote',
    example: 'git push origin main'
  },
  {
    command: 'git pull <remote> <branch>',
    description: 'Fetch and immediately merge changes from remote branch.',
    category: 'remote',
    example: 'git pull origin main'
  },
  {
    command: 'git restore <file>',
    description: 'Discard uncommitted changes in your working directory.',
    category: 'undo',
    example: 'git restore cookie-recipe.txt'
  },
  {
    command: 'git reset --hard <commit>',
    description: 'DANGEROUS: Wipes all modifications, resetting workspace to specified commit.',
    category: 'undo',
    example: 'git reset --hard a1b2c3d'
  },
  {
    command: 'git stash',
    description: 'Shelf current unstaged work and clean the directory.',
    category: 'advanced',
    example: 'git stash'
  },
  {
    command: 'git stash pop',
    description: 'Restore the most recently stashed changes back into directory.',
    category: 'advanced',
    example: 'git stash pop'
  }
];

export default function Cheatsheet() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const filtered = CHEAT_DATA.filter((item) => {
    const matchesSearch =
      item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All Commands' },
    { id: 'basics', label: 'Foundations' },
    { id: 'history', label: 'History & Logs' },
    { id: 'branching', label: 'Branch & Merge' },
    { id: 'remote', label: 'Remote & GitHub' },
    { id: 'undo', label: 'Undo Errors' },
    { id: 'advanced', label: 'Advanced Powers' }
  ];

  return (
    <div className="flex flex-col gap-5" id="cheatsheet-page">
      {/* Search Header Banner */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2 uppercase tracking-wide">
            <Terminal className="w-4.5 h-4.5 text-[#58a6ff]" />
            <span>Interactive Command Cheatsheet</span>
          </h2>
          <p className="text-xs text-[#8b949e] mt-1">
            Search, filter, and review syntax or quick analogies of essential Git operations.
          </p>
        </div>

        {/* Search Box */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
          <input
            type="text"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg pl-10 pr-4 py-2 text-xs text-white placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] transition-all"
            placeholder="Search commands or descriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer border transition-all ${
              activeCategory === cat.id
                ? 'bg-[#1f6feb1a] border-[#1f6feb] text-[#58a6ff] shadow-sm'
                : 'bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white hover:bg-[#21262d]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid of Command Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-16 text-[#8b949e] text-xs">
            No matching commands found. Try adjusting your filter parameters!
          </div>
        ) : (
          filtered.map((item, idx) => {
            const cardId = `cmd-${idx}`;
            return (
              <div 
                key={cardId}
                className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 flex flex-col justify-between gap-4 shadow hover:border-[#58a6ff]/50 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-[#58a6ff] bg-[#1f6feb1a] px-2.5 py-1 rounded-md border border-[#1f6feb4d]">
                      {item.category}
                    </span>
                    <button
                      onClick={() => handleCopy(item.command, cardId)}
                      className="text-[#8b949e] hover:text-white p-1 hover:bg-[#21262d] rounded-md transition-colors"
                      title="Copy to clipboard"
                    >
                      {copiedId === cardId ? <Check className="w-3.5 h-3.5 text-[#56d364]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                  
                  <h3 className="font-mono text-xs font-bold text-[#56d364] select-all mt-1">
                    {item.command}
                  </h3>
                  
                  <p className="text-xs text-[#8b949e] leading-relaxed font-sans mt-1">
                    {item.description}
                  </p>
                </div>

                {/* Example box code */}
                <div className="bg-[#0d1117] p-2.5 rounded-lg border border-[#30363d] font-mono text-[10px] text-[#c9d1d9]">
                  <div className="text-[8px] text-[#8b949e] uppercase tracking-wider font-bold mb-1 select-none">Example usage:</div>
                  <pre className="whitespace-pre-wrap">{item.example}</pre>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
