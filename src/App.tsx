import { useState, useEffect } from 'react';
import { UserProgress, Lesson, UserProfile } from './types';
import Dashboard from './components/Dashboard';
import LessonView from './components/LessonView';
import Sandbox from './components/Sandbox';
import Cheatsheet from './components/Cheatsheet';
import Profile from './components/Profile';
import AboutWeb from './components/AboutWeb';
import { MODULES } from './data/lessons';
import { 
  BookOpen, Terminal, FileText, Trophy, Settings, Sparkles, Flame, Coins, Zap, Star, Menu, X, RotateCcw,
  User, Code, ShieldCheck, Cpu, Rocket, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const LOCAL_STORAGE_KEY = 'git_academy_progress_data';
const PROFILE_LOCAL_STORAGE_KEY = 'git_academy_profile_data';

const DEFAULT_PROFILE: UserProfile = {
  name: 'Git Academy Cadet',
  email: 'yogagowda57@gmail.com',
  role: 'Git Apprentice',
  bio: 'Ready to write some history! 🚀',
  avatarIcon: 'terminal',
  avatarColor: 'blue'
};

export function getAvatarIcon(iconName: string) {
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

export function getAvatarColorClasses(colorName: string) {
  switch (colorName) {
    case 'green': return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';
    case 'amber': return 'bg-amber-500/10 border-amber-500/30 text-amber-400';
    case 'rose': return 'bg-rose-500/10 border-rose-500/30 text-rose-400';
    case 'purple': return 'bg-purple-500/10 border-purple-500/30 text-purple-400';
    case 'teal': return 'bg-teal-500/10 border-teal-500/30 text-teal-400';
    default: return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
  }
}

const DEFAULT_PROGRESS: UserProgress = {
  xp: 0,
  coins: 0,
  level: 1,
  streak: 0,
  lastActiveDate: '',
  completedLessons: [],
  unlockedBadges: [],
  notes: {},
  bookmarks: [],
  completedMissions: []
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [activeTab, setActiveTab] = useState<'roadmap' | 'sandbox' | 'cheatsheet' | 'profile' | 'about'>('roadmap');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unlockedBadgeNotification, setUnlockedBadgeNotification] = useState<string | null>(null);

  const activeModule = activeLesson ? MODULES.find(m => m.id === activeLesson.moduleId) : null;

  // Load progress and profile on mount
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed: UserProgress = JSON.parse(saved);
        
        // Calculate streak decay on load
        if (parsed.lastActiveDate) {
          const todayStr = new Date().toDateString();
          const d1 = new Date(parsed.lastActiveDate);
          const d2 = new Date(todayStr);
          d1.setHours(0, 0, 0, 0);
          d2.setHours(0, 0, 0, 0);
          const diffTime = d2.getTime() - d1.getTime();
          const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays > 1) {
            // Streak broken! Reset to 0
            parsed.streak = 0;
          }
        } else {
          parsed.streak = 0;
        }

        setProgress(parsed);
      } catch (err) {
        console.error('Failed to parse progress data:', err);
      }
    }

    const savedProfile = localStorage.getItem(PROFILE_LOCAL_STORAGE_KEY);
    if (savedProfile) {
      try {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
      } catch (err) {
        console.error('Failed to parse profile data:', err);
      }
    }
  }, []);

  // Sync progress back to localstorage
  const saveProgress = (updated: UserProgress) => {
    setProgress(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const saveProfile = (updated: UserProfile) => {
    setProfile(updated);
    localStorage.setItem(PROFILE_LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  const handleLessonCompleted = (lessonId: string, xpReward: number, coinReward: number, unlockedBadgeId?: string) => {
    const completed = [...new Set([...progress.completedLessons, lessonId])];
    const unlockedBadges = [...progress.unlockedBadges];
    
    if (unlockedBadgeId && !unlockedBadges.includes(unlockedBadgeId)) {
      unlockedBadges.push(unlockedBadgeId);
      // Trigger temporary animated overlay notification
      setUnlockedBadgeNotification(unlockedBadgeId);
    }

    // Streak calculation upon completion
    const todayStr = new Date().toDateString();
    let newStreak = progress.streak;

    if (!progress.lastActiveDate) {
      newStreak = 1;
    } else {
      const d1 = new Date(progress.lastActiveDate);
      const d2 = new Date(todayStr);
      d1.setHours(0, 0, 0, 0);
      d2.setHours(0, 0, 0, 0);
      const diffTime = d2.getTime() - d1.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Active yesterday, increment streak
        newStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken, reset and start fresh at 1
        newStreak = 1;
      } else if (diffDays === 0) {
        // Already active today, streak stays the same (no double-incrementing on the same day)
        if (newStreak === 0) {
          newStreak = 1;
        }
      }
    }

    const updatedProgress: UserProgress = {
      ...progress,
      completedLessons: completed,
      xp: progress.xp + xpReward,
      coins: progress.coins + coinReward,
      unlockedBadges,
      streak: newStreak,
      lastActiveDate: todayStr
    };

    saveProgress(updatedProgress);
    setActiveLesson(null); // Return back to dashboard roadmap
  };

  const handleResetProgress = () => {
    saveProgress(DEFAULT_PROGRESS);
    setActiveLesson(null);
    setActiveTab('roadmap');
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex font-sans select-none overflow-x-hidden antialiased" id="git-academy-root">
      
      {/* Drawer Overlay for Mobile Sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
        ></div>
      )}

      {/* Sidebar Navigation Panel */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-[#161b22] border-r border-[#30363d] z-40 transform lg:transform-none transition-transform duration-300 flex flex-col justify-between ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div>
          {/* Logo Brand Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-[#30363d] bg-[#0d1117]/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-[#f74e27] rounded flex items-center justify-center shadow-md shadow-rose-600/20 shrink-0">
                <Terminal className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-sm tracking-tight text-white font-sans leading-none">
                  Git<strong className="text-[#f78166]">Master</strong>
                </span>
                <span className="text-[9px] text-[#8b949e] font-mono tracking-wider mt-1 leading-none">
                  audinex_tech
                </span>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-[#8b949e] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation link group list */}
          <nav className="p-4 flex flex-col gap-1.5">
            <button
              onClick={() => { setActiveTab('roadmap'); setActiveLesson(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'roadmap' && !activeLesson
                  ? 'bg-[#1f6feb1a] text-[#58a6ff] border border-[#1f6feb4d]'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Interactive Roadmap</span>
            </button>

            <button
              onClick={() => { setActiveTab('sandbox'); setActiveLesson(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-[#1f6feb1a] text-[#58a6ff] border border-[#1f6feb4d]'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
              }`}
            >
              <Terminal className="w-4 h-4 shrink-0" />
              <span>Sandbox Arena</span>
            </button>

            <button
              onClick={() => { setActiveTab('cheatsheet'); setActiveLesson(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'cheatsheet'
                  ? 'bg-[#1f6feb1a] text-[#58a6ff] border border-[#1f6feb4d]'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              <span>Interactive Cheatsheet</span>
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setActiveLesson(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-[#1f6feb1a] text-[#58a6ff] border border-[#1f6feb4d]'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
              }`}
            >
              <Trophy className="w-4 h-4 shrink-0" />
              <span>Trophy cabinet</span>
            </button>

            <button
              onClick={() => { setActiveTab('about'); setActiveLesson(null); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-[#1f6feb1a] text-[#58a6ff] border border-[#1f6feb4d]'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]'
              }`}
            >
              <HelpCircle className="w-4 h-4 shrink-0" />
              <span>About Web</span>
            </button>
          </nav>
        </div>

        {/* User simple status badge */}
        <div className="p-4 border-t border-[#30363d] bg-[#0d1117]/40">
          <button 
            onClick={() => { setActiveTab('profile'); setActiveLesson(null); setSidebarOpen(false); }}
            className="w-full flex items-center gap-3 bg-[#0d1117] hover:bg-[#161b22] transition-colors p-3 rounded-xl border border-[#30363d] text-left cursor-pointer group"
          >
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all group-hover:scale-105 ${getAvatarColorClasses(profile.avatarColor)}`}>
              {(() => {
                const IconComponent = getAvatarIcon(profile.avatarIcon);
                return <IconComponent className="w-4 h-4" />;
              })()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-white truncate">{profile.name}</div>
              <div className="text-[9px] text-[#8b949e] mt-0.5 truncate">{profile.role}</div>
            </div>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        
        {/* Global Toolbar Header */}
        <header className="h-16 border-b border-[#30363d] bg-[#161b22]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 shrink-0">
          <div className="flex items-center">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-[#21262d] rounded-lg text-[#8b949e] hover:text-white cursor-pointer mr-2 border border-transparent hover:border-[#30363d]"
            >
              <Menu className="w-5 h-5" />
            </button>

            {activeLesson && activeModule && (
              <div className="hidden md:flex items-center gap-2 text-xs text-[#8b949e] font-sans ml-2 border-l border-[#30363d] pl-4">
                <span>{activeModule.title}</span>
                <span className="text-[#30363d]">/</span>
                <span className="text-white font-semibold">{activeLesson.title}</span>
              </div>
            )}

            {!activeLesson && (
              <div className="hidden md:flex items-center gap-2 text-xs text-[#8b949e] font-sans ml-2 border-l border-[#30363d] pl-4">
                <span className="text-white font-semibold capitalize">
                  {activeTab === 'roadmap' ? 'Learning Roadmap' : activeTab === 'sandbox' ? 'Sandbox Arena' : activeTab === 'cheatsheet' ? 'Command Cheatsheet' : 'Trophy cabinet'}
                </span>
              </div>
            )}
          </div>

          {/* User Score Stats indicators */}
          <div className="flex items-center gap-2.5 sm:gap-5 ml-auto font-mono text-[10px] sm:text-xs font-bold shrink-0">
            <div className="flex items-center gap-1 text-[#c9d1d9]" title="Total XP">
              <Zap className="w-3.5 h-3.5 text-[#58a6ff]" />
              <span>{progress.xp} <span className="hidden sm:inline">XP</span></span>
            </div>
            <div className="flex items-center gap-1 text-[#c9d1d9]" title="Total Coins">
              <Coins className="w-3.5 h-3.5 text-[#e3b341]" />
              <span>{progress.coins}</span>
            </div>
            <div className="flex items-center gap-1 text-[#c9d1d9] bg-[#2ea0431a] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md border border-[#2386364d]" title="Current Streak">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#56d364] fill-[#56d364]" />
              <span>{progress.streak}<span className="hidden sm:inline"> Day Streak</span><span className="sm:hidden">d</span></span>
            </div>
          </div>
        </header>

        {/* Dynamic Screen View routing panel */}
        <div className="flex-1 p-6 md:p-8 select-text">
          <AnimatePresence mode="wait">
            {activeLesson ? (
              <LessonView
                key={`lesson-${activeLesson.id}`}
                lesson={activeLesson}
                progress={progress}
                onLessonCompleted={handleLessonCompleted}
                onBackToDashboard={() => setActiveLesson(null)}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {activeTab === 'roadmap' && (
                  <Dashboard
                    progress={progress}
                    onSelectLesson={(lesson) => setActiveLesson(lesson)}
                    onResetProgress={handleResetProgress}
                  />
                )}
                {activeTab === 'sandbox' && <Sandbox />}
                {activeTab === 'cheatsheet' && <Cheatsheet />}
                {activeTab === 'profile' && (
                  <Profile 
                    progress={progress} 
                    profile={profile}
                    onSaveProfile={saveProfile}
                  />
                )}
                {activeTab === 'about' && <AboutWeb />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Temporary Unlocked Badge celebration dialog */}
      {unlockedBadgeNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 animate-fade-in select-none">
          <div className="bg-slate-900 border border-indigo-500/30 max-w-sm w-full p-6 rounded-2xl text-center shadow-2xl flex flex-col items-center gap-4 relative">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-400 rounded-t-2xl"></div>
            <div className="w-16 h-16 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 flex items-center justify-center text-xl shadow-inner animate-bounce mt-2">
              <Trophy className="w-8 h-8 fill-yellow-400/10" />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">Trophy achievement unlocked</span>
              <h3 className="font-extrabold text-base text-slate-100 mt-1">Badge Unlocked!</h3>
              <p className="text-xs text-slate-400 leading-normal mt-1.5">
                Excellent! You earned the badge for successfully tackling this Git milestone. View it in your cabinet.
              </p>
            </div>

            <button
              onClick={() => setUnlockedBadgeNotification(null)}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow cursor-pointer transition-all"
            >
              Awesome, thanks!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
