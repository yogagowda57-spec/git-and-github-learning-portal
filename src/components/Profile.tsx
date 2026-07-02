import { useState } from 'react';
import { UserProgress, Badge, UserProfile } from '../types';
import { ALL_BADGES } from '../data/lessons';
import { 
  Trophy, Award, Calendar, Share2, Mail, Download, CheckCircle, Star, 
  Sparkles, Printer, User, Terminal, Code, ShieldCheck, Cpu, Rocket, Save, Settings
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProfileProps {
  progress: UserProgress;
  profile: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

const AVAILABLE_ICONS = [
  { id: 'terminal', label: 'Terminal', icon: Terminal },
  { id: 'code', label: 'Code Dev', icon: Code },
  { id: 'shield', label: 'Shield', icon: ShieldCheck },
  { id: 'cpu', label: 'Core CPU', icon: Cpu },
  { id: 'sparkles', label: 'Sparkles', icon: Sparkles },
  { id: 'rocket', label: 'Rocket', icon: Rocket },
  { id: 'user', label: 'Cadet Profile', icon: User },
];

const AVAILABLE_COLORS = [
  { id: 'blue', label: 'Cosmic Blue', class: 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20' },
  { id: 'green', label: 'Git Green', class: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20' },
  { id: 'amber', label: 'XP Amber', class: 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20' },
  { id: 'rose', label: 'Cherry Red', class: 'bg-rose-500/10 border-rose-500/30 text-rose-400 hover:bg-rose-500/20' },
  { id: 'purple', label: 'Neon Purple', class: 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-purple-500/20' },
  { id: 'teal', label: 'Ocean Teal', class: 'bg-teal-500/10 border-teal-500/30 text-teal-400 hover:bg-teal-500/20' },
];

function getAvatarIcon(iconName: string) {
  switch (iconName) {
    case 'terminal': return Terminal;
    case 'code': return Code;
    case 'shield': return ShieldCheck;
    case 'cpu': return Cpu;
    case 'sparkles': return Sparkles;
    case 'rocket': return Rocket;
    default: return User;
  }
}

function getAvatarColorClasses(colorName: string) {
  switch (colorName) {
    case 'green': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    case 'amber': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    case 'rose': return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
    case 'purple': return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    case 'teal': return 'bg-teal-500/10 border-teal-500/30 text-teal-400';
    default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
  }
}

export default function Profile({ progress, profile, onSaveProfile }: ProfileProps) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const completedCount = progress.completedLessons.length;
  const isEligibleForCertificate = completedCount >= 5;

  // Calculate stats
  const currentLevel = Math.floor(progress.xp / 300) + 1;
  const xpNeededForNext = currentLevel * 300;
  const previousLevelXp = (currentLevel - 1) * 300;
  const xpProgressPercent = Math.min(
    100,
    Math.max(0, ((progress.xp - previousLevelXp) / (xpNeededForNext - previousLevelXp)) * 100)
  );

  const handlePrint = () => {
    window.print();
  };

  const handleProfileUpdate = (fields: Partial<UserProfile>) => {
    onSaveProfile({
      ...profile,
      ...fields
    });
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6" id="profile-view">
      {/* Upper Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Card 1: Main Identity Card */}
        <div className="lg:col-span-1 bg-[#161b22] border border-[#30363d] rounded-xl p-6 flex flex-col items-center text-center gap-4 shadow-xl">
          <div className="relative">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center border shadow-inner relative ${getAvatarColorClasses(profile.avatarColor)}`}>
              {(() => {
                const IconComp = getAvatarIcon(profile.avatarIcon);
                return <IconComp className="w-10 h-10" />;
              })()}
              <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#e3b341] text-slate-950 flex items-center justify-center border-2 border-[#161b22] font-bold text-xs font-mono">
                {currentLevel}
              </span>
            </div>
          </div>

          <div className="w-full">
            <h2 className="text-lg font-extrabold text-white font-sans truncate">{profile.name}</h2>
            <div className="text-xs text-[#58a6ff] font-mono mt-0.5">{profile.role}</div>
            
            <p className="text-[11px] text-[#8b949e] italic mt-2.5 max-w-xs mx-auto px-4 leading-normal bg-[#0d1117] py-2 rounded-lg border border-[#30363d]/50">
              "{profile.bio}"
            </p>

            <div className="text-[10px] text-[#8b949e] mt-3 flex items-center justify-center gap-1.5 font-mono">
              <Mail className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span className="truncate max-w-[180px]">{profile.email}</span>
            </div>
          </div>

          {/* XP detail lines */}
          <div className="w-full mt-2 pt-4 border-t border-[#30363d]">
            <div className="flex items-center justify-between font-bold font-mono text-[9px] text-[#8b949e] uppercase tracking-wider mb-1.5">
              <span>Level Progress</span>
              <span className="text-[#58a6ff]">{progress.xp} Total XP</span>
            </div>
            <div className="w-full h-2 bg-[#0d1117] rounded-full overflow-hidden border border-[#30363d]">
              <div 
                className="h-full bg-[#2ea043]"
                style={{ width: `${xpProgressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Card 2: Interactive Profile Settings and Customizer */}
        <div className="lg:col-span-2 bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-[#30363d] pb-2">
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-[#58a6ff]" /> PROFILE SETTINGS & AVATAR
              </h3>
              {saveToast && (
                <span className="text-[9px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 animate-pulse">
                  ✓ Profile Saved!
                </span>
              )}
            </div>

            {/* Editing Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8b949e] mb-1 font-mono">Graduation Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={(e) => handleProfileUpdate({ name: e.target.value })}
                  placeholder="Enter full name"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8b949e] mb-1 font-mono">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => handleProfileUpdate({ email: e.target.value })}
                  placeholder="email@example.com"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8b949e] mb-1 font-mono">Academy Role Title</label>
                <input 
                  type="text" 
                  value={profile.role}
                  onChange={(e) => handleProfileUpdate({ role: e.target.value })}
                  placeholder="e.g. Branch Master"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#58a6ff]"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8b949e] mb-1 font-mono">Motto / Status Bio</label>
                <input 
                  type="text" 
                  value={profile.bio}
                  onChange={(e) => handleProfileUpdate({ bio: e.target.value })}
                  placeholder="e.g. Ready to commit!"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#58a6ff]"
                />
              </div>
            </div>

            {/* Custom Avatar Selectors */}
            <div className="mt-2 flex flex-col gap-3">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8b949e] mb-1.5 font-mono">Choose Avatar Icon</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_ICONS.map((item) => {
                    const IconComp = item.icon;
                    const isSelected = profile.avatarIcon === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleProfileUpdate({ avatarIcon: item.id })}
                        title={item.label}
                        className={`w-8 h-8 rounded-lg border flex items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                          isSelected
                            ? 'bg-[#1f6feb]/20 border-[#1f6feb] text-[#58a6ff]'
                            : 'bg-[#0d1117] border-[#30363d] text-[#8b949e] hover:text-white'
                        }`}
                      >
                        <IconComp className="w-4.5 h-4.5" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold tracking-wider text-[#8b949e] mb-1.5 font-mono">Choose Avatar Theme Color</label>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_COLORS.map((col) => {
                    const isSelected = profile.avatarColor === col.id;
                    return (
                      <button
                        key={col.id}
                        onClick={() => handleProfileUpdate({ avatarColor: col.id })}
                        title={col.label}
                        className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-lg border transition-all cursor-pointer ${col.class} ${
                          isSelected ? 'scale-105 ring-2 ring-[#58a6ff]/50' : 'opacity-70'
                        }`}
                      >
                        {col.label.split(' ')[1]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#30363d] pt-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] text-[#8b949e] max-w-sm leading-relaxed">
              Solve terminal challenges to unlock and claim your print-ready certificate of Git Mastery once you complete at least 5 core curriculum modules.
            </p>
            <button
              disabled={!isEligibleForCertificate}
              onClick={() => setShowCertificate(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-[#238636] hover:bg-[#2ea043] border border-[#30363d] disabled:bg-[#21262d] disabled:text-[#484f58] disabled:border-[#30363d] disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg shadow-lg cursor-pointer transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>Claim Completion Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Badges Trophy cabinet detail row */}
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-6 shadow-xl">
        <h3 className="font-semibold text-white text-xs uppercase tracking-wider border-b border-[#30363d] pb-3 flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-[#e3b341]" /> TROPHY CABINET ACHIEVEMENTS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = progress.unlockedBadges.includes(badge.id);
            return (
              <div 
                key={badge.id}
                className={`p-4 rounded-lg border transition-all flex items-center gap-4 ${
                  isUnlocked
                    ? 'bg-[#1f6feb]/5 border-[#1f6feb33] text-[#c9d1d9]'
                    : 'bg-[#0d1117] border-[#30363d] text-[#484f58]'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${
                  isUnlocked ? 'bg-[#e3b341]/10 border-[#e3b341]/30 text-[#e3b341]' : 'bg-[#161b22] border-[#30363d] text-[#484f58]'
                }`}>
                  <Trophy className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-[#484f58]'}`}>
                    {badge.title}
                  </div>
                  <div className="text-[10px] text-[#8b949e] leading-normal mt-0.5">
                    {badge.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 print:p-0 overflow-y-auto">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-xl p-6 max-w-4xl w-full flex flex-col gap-6 print:border-none print:bg-white print:text-black">
            {/* Action Bar */}
            <div className="flex items-center justify-between border-b border-[#30363d] pb-4 print:hidden">
              <div className="flex items-center gap-1.5 text-white">
                <Sparkles className="w-4 h-4 text-[#e3b341]" />
                <span className="font-bold text-xs uppercase tracking-wider">Cadet graduation credential</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-[#238636] hover:bg-[#2ea043] border border-[#30363d] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print Certificate
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2 bg-[#161b22] hover:bg-[#21262d] text-[#8b949e] hover:text-white font-bold text-xs rounded-lg cursor-pointer border border-[#30363d]"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Certificate Canvas Sheet */}
            <div className="bg-[#161b22] border-8 border-[#30363d] rounded-xl p-10 md:p-16 text-center relative flex flex-col items-center justify-center gap-6 print:border-[#30363d] print:bg-white print:text-slate-900">
              {/* Elegant frame lines */}
              <div className="absolute inset-2 border border-[#30363d]/30 rounded-lg pointer-events-none"></div>

              <div className="flex flex-col items-center gap-3">
                <Award className="w-14 h-14 text-[#e3b341] mb-2 fill-[#e3b341]/10" />
                <h1 className="text-2xl font-black font-serif tracking-tight text-white print:text-slate-900">
                  Certificate of Achievement
                </h1>
                <div className="h-0.5 w-20 bg-[#58a6ff] my-1"></div>
                <p className="text-[10px] uppercase tracking-widest font-mono text-[#58a6ff] font-bold">
                  GIT & GITHUB ACADEMY
                </p>
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <p className="text-xs text-[#8b949e] italic">This credential certifies that</p>
                <h2 className="text-xl font-bold text-white tracking-wide font-sans underline decoration-[#1f6feb] decoration-wavy underline-offset-8 py-2 print:text-slate-900">
                  {profile.name}
                </h2>
                <p className="text-xs text-[#8b949e] max-w-md mx-auto leading-relaxed mt-2">
                  has successfully completed the complete training curriculum, mastering local initialization, file staging, repositories, branch switches, merges, and remote interactions.
                </p>
              </div>

              {/* Signature row */}
              <div className="grid grid-cols-2 gap-12 mt-8 w-full max-w-lg border-t border-[#30363d] pt-6">
                <div>
                  <div className="font-serif italic text-sm text-white print:text-slate-900">Turing</div>
                  <div className="text-[10px] text-[#8b949e] font-mono mt-1">Git AI Mentor Sign-off</div>
                </div>
                <div>
                  <div className="font-mono text-xs text-white print:text-slate-900">
                    {new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <div className="text-[10px] text-[#8b949e] font-mono mt-1">Completion Date</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
