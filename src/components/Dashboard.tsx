import { UserProgress, Module, Lesson } from '../types';
import { MODULES, ALL_BADGES } from '../data/lessons';
import { Trophy, Flame, Coins, Zap, Star, ShieldCheck, Lock, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';

interface DashboardProps {
  progress: UserProgress;
  onSelectLesson: (lesson: Lesson) => void;
  onResetProgress: () => void;
}

export default function Dashboard({ progress, onSelectLesson, onResetProgress }: DashboardProps) {
  // Get next active lesson (first uncompleted lesson)
  const getNextLesson = (): { lesson: Lesson; module: Module } | null => {
    for (const mod of MODULES) {
      for (const les of mod.lessons) {
        if (!progress.completedLessons.includes(les.id)) {
          return { lesson: les, module: mod };
        }
      }
    }
    // All completed
    if (MODULES.length > 0 && MODULES[0].lessons.length > 0) {
      return { lesson: MODULES[0].lessons[0], module: MODULES[0] };
    }
    return null;
  };

  const nextActive = getNextLesson();

  // Simple Level Formula: Level = Floor(XP / 300) + 1
  const currentLevel = Math.floor(progress.xp / 300) + 1;
  const xpNeededForNext = currentLevel * 300;
  const previousLevelXp = (currentLevel - 1) * 300;
  const xpProgressPercent = Math.min(
    100,
    Math.max(0, ((progress.xp - previousLevelXp) / (xpNeededForNext - previousLevelXp)) * 100)
  );

  // Missions Mock Database
  const missions = [
    { id: 'm1', title: 'Daily Explorer', desc: 'Complete 1 Git Lesson today', target: 1, current: progress.completedLessons.length > 0 ? 1 : 0, reward: 50, type: 'lessons' },
    { id: 'm2', title: 'XP Collector', desc: 'Accumulate 250 XP', target: 250, current: Math.min(250, progress.xp), reward: 80, type: 'xp' },
    { id: 'm3', title: 'Commit Maestro', desc: 'Solve a history or branch challenge', target: 1, current: progress.completedLessons.filter(id => id.includes('commit') || id.includes('branch')).length > 0 ? 1 : 0, reward: 100, type: 'sandbox' }
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6" id="dashboard-view">
      {/* Left Column: Progress Roadmap Tree */}
      <div className="xl:col-span-2 flex flex-col gap-6">
        {/* Welcome Banner */}
        <div className="bg-[#161b22] rounded-xl p-6 border border-[#30363d] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="absolute right-0 top-0 w-32 h-32 bg-[#58a6ff]/5 rounded-full blur-3xl"></div>
          <div className="flex-1">
            <span className="text-[10px] font-mono font-bold text-[#58a6ff] uppercase tracking-wider bg-[#1f6feb1a] border border-[#1f6feb4d] px-2.5 py-1 rounded-md">
              CADET STATUS ACTIVE
            </span>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mt-3">
              Welcome back, Cadet! <Star className="w-4.5 h-4.5 text-[#e3b341] fill-[#e3b341]" />
            </h2>
            <p className="text-[#8b949e] text-xs mt-1.5 max-w-md leading-relaxed">
              Step onto the bridge. Your journey to mastering distributed version control starts here. Run commands, unlock branches, and earn credentials.
            </p>
            {nextActive && (
              <button
                onClick={() => onSelectLesson(nextActive.lesson)}
                className="mt-4 px-4 py-2.5 bg-[#238636] hover:bg-[#2ea043] border border-[#30363d] text-white font-bold text-xs rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Resume Lesson: {nextActive.lesson.title}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Level Stats Block */}
          <div className="bg-[#0d1117] p-5 rounded-xl border border-[#30363d] shrink-0 w-full md:w-64">
            <div className="flex items-center justify-between font-mono font-semibold text-xs text-[#8b949e]">
              <span>LEVEL {currentLevel}</span>
              <span className="text-[#58a6ff]">{progress.xp} / {xpNeededForNext} XP</span>
            </div>
            {/* XP progress bar */}
            <div className="w-full h-2.5 bg-[#161b22] rounded-full mt-2.5 overflow-hidden border border-[#30363d]">
              <div 
                className="h-full bg-[#238636] rounded-full transition-all duration-500"
                style={{ width: `${xpProgressPercent}%` }}
              ></div>
            </div>
            <div className="text-[10px] text-[#8b949e] mt-2 font-mono text-right">
              {xpNeededForNext - progress.xp} XP to next milestone
            </div>
          </div>
        </div>

        {/* Modules Roadmap Node Tree */}
        <div className="flex flex-col gap-6">
          {MODULES.map((module, mIdx) => {
            const moduleCompletedLessons = module.lessons.filter(les => progress.completedLessons.includes(les.id));
            const modulePercent = module.lessons.length > 0
              ? Math.round((moduleCompletedLessons.length / module.lessons.length) * 100)
              : 0;

            return (
              <div key={module.id} className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex flex-col gap-5">
                {/* Module Heading */}
                <div className="flex items-center justify-between border-b border-[#30363d] pb-3">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-[#8b949e] uppercase tracking-wider">
                      MODULE 0{mIdx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      {module.title}
                    </h3>
                    <p className="text-xs text-[#8b949e] mt-0.5">{module.description}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#2ea043] bg-[#2386361a] border border-[#2386364d] px-2.5 py-1 rounded-md">
                    {modulePercent}% Complete
                  </span>
                </div>

                {/* Vertical roadmap layout (alternating node alignment) */}
                <div className="flex flex-col items-center gap-6 py-6 relative">
                  {/* Tree trunk connecting line */}
                  <div className="absolute top-0 bottom-0 w-0.5 bg-[#30363d] z-0"></div>

                  {module.lessons.map((lesson, lIdx) => {
                    const isCompleted = progress.completedLessons.includes(lesson.id);
                    // A lesson is active (unlocked) if it is completed, OR if the preceding lesson in the module was completed.
                    let isUnlocked = false;
                    if (lIdx === 0) {
                      if (mIdx === 0) {
                        isUnlocked = true;
                      } else {
                        // Unlocked if previous module is done
                        const prevModule = MODULES[mIdx - 1];
                        isUnlocked = prevModule.lessons.every(l => progress.completedLessons.includes(l.id));
                      }
                    } else {
                      isUnlocked = progress.completedLessons.includes(module.lessons[lIdx - 1].id);
                    }

                    // Alternating alignment offset for node map look
                    const alignClass = lIdx % 2 === 0 ? 'md:translate-x-16' : 'md:-translate-x-16';

                    return (
                      <div 
                        key={lesson.id} 
                        className={`z-10 flex flex-col items-center gap-2 max-w-xs transition-transform hover:scale-105 ${alignClass}`}
                      >
                        {/* Node Round Button */}
                        <button
                          onClick={() => isUnlocked && onSelectLesson(lesson)}
                          disabled={!isUnlocked}
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-lg cursor-pointer relative transition-all active:scale-95 ${
                            isCompleted
                              ? 'bg-[#238636] border-[#56d364] text-white hover:bg-[#2ea043]'
                              : isUnlocked
                                ? 'bg-[#1f6feb] border-[#58a6ff] text-white hover:bg-[#388bfd] animate-pulse'
                                : 'bg-[#21262d] border-[#30363d] text-[#484f58] cursor-not-allowed'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-5 h-5 fill-white text-[#238636]" />
                          ) : isUnlocked ? (
                            <Star className="w-4 h-4 fill-white text-[#58a6ff]" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                          
                          {/* Small reward badge tag */}
                          {isUnlocked && !isCompleted && (
                            <span className="absolute -top-1 -right-2 px-1.5 py-0.5 bg-[#e3b341] border border-yellow-200 text-slate-950 font-mono text-[8px] font-bold rounded-full">
                              +{lesson.xpReward}XP
                            </span>
                          )}
                        </button>

                        {/* Node Details Text */}
                        <div className="text-center">
                          <div className={`text-xs font-bold leading-tight ${isUnlocked ? 'text-white' : 'text-[#484f58]'}`}>
                            {lesson.title}
                          </div>
                          <div className="text-[10px] text-[#8b949e] max-w-[150px] truncate mx-auto mt-0.5">
                            {lesson.description}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Gamification Widgets / Sidebar */}
      <div className="flex flex-col gap-6">
        {/* Quick Stats Panel */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex flex-col gap-4">
          <h3 className="font-semibold text-white text-xs uppercase tracking-wider border-b border-[#30363d] pb-2 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-[#e3b341]" /> YOUR ACADEMY BALANCE
          </h3>
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center flex flex-col items-center">
              <Zap className="w-4.5 h-4.5 text-[#58a6ff] mb-1" />
              <div className="font-bold font-mono text-sm text-[#e6edf3]">{progress.xp}</div>
              <div className="text-[8px] text-[#8b949e] font-semibold uppercase tracking-wider">XP</div>
            </div>
            <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center flex flex-col items-center">
              <Coins className="w-4.5 h-4.5 text-[#e3b341] mb-1" />
              <div className="font-bold font-mono text-sm text-[#e6edf3]">{progress.coins}</div>
              <div className="text-[8px] text-[#8b949e] font-semibold uppercase tracking-wider">Coins</div>
            </div>
            <div className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] text-center flex flex-col items-center">
              <Flame className="w-4.5 h-4.5 text-[#f78166] mb-1" />
              <div className="font-bold font-mono text-sm text-[#e6edf3]">{progress.streak}d</div>
              <div className="text-[8px] text-[#8b949e] font-semibold uppercase tracking-wider">Streak</div>
            </div>
          </div>
        </div>

        {/* Daily Missions Widget */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex flex-col gap-4">
          <h3 className="font-semibold text-white text-xs uppercase tracking-wider border-b border-[#30363d] pb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#58a6ff]" /> ACTIVE MISSIONS
          </h3>
          <div className="flex flex-col gap-3">
            {missions.map((m) => {
              const percent = Math.min(100, Math.round((m.current / m.target) * 100));
              return (
                <div key={m.id} className="bg-[#0d1117] p-3 rounded-lg border border-[#30363d] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#e6edf3]">{m.title}</div>
                      <div className="text-[10px] text-[#8b949e] mt-0.5">{m.desc}</div>
                    </div>
                    <span className="text-[9px] font-mono font-bold text-[#e3b341] bg-[#e3b341]/10 px-1.5 py-0.5 rounded border border-[#e3b341]/25">
                      +{m.reward} XP
                    </span>
                  </div>
                  {/* Progress Line */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex-1 h-1.5 bg-[#161b22] rounded-full overflow-hidden border border-[#30363d]">
                      <div 
                        className="h-full bg-[#238636]"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <span className="text-[9px] font-mono text-[#8b949e] font-bold shrink-0">
                      {m.current}/{m.target}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unlocked Badges Trophy Cabinet */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-xl p-5 shadow-lg flex flex-col gap-4">
          <h3 className="font-semibold text-white text-xs uppercase tracking-wider border-b border-[#30363d] pb-2 flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-[#e3b341]" /> TROPHY CABINET
          </h3>
          
          <div className="grid grid-cols-4 gap-2.5">
            {ALL_BADGES.map((badge) => {
              const isUnlocked = progress.unlockedBadges.includes(badge.id);
              return (
                <div 
                  key={badge.id}
                  title={`${badge.title}: ${badge.description}`}
                  className={`aspect-square rounded-lg border flex flex-col items-center justify-center p-1.5 transition-all hover:scale-105 ${
                    isUnlocked
                      ? 'bg-[#1f6feb]/10 border-[#1f6feb] text-[#e3b341]'
                      : 'bg-[#0d1117] border-[#30363d] text-[#484f58]'
                  }`}
                >
                  <Trophy className={`w-4 h-4 ${isUnlocked ? 'fill-[#e3b341]/10' : ''}`} />
                  <div className={`text-[8px] mt-1 font-bold font-sans text-center truncate max-w-full ${isUnlocked ? 'text-[#c9d1d9]' : 'text-[#484f58]'}`}>
                    {badge.title.split(' ')[0]}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-[#8b949e] text-center font-medium italic mt-1">
            Solve terminal lesson challenges to unlock rare badges!
          </p>
        </div>

        {/* Safety Reset button */}
        <div className="text-center mt-2">
          <button 
            onClick={() => {
              if (confirm('Are you sure you want to completely reset your Git learning progress? This wipes XP and badges.')) {
                onResetProgress();
              }
            }}
            className="text-[10px] text-[#f78166] hover:text-[#f74e27] hover:underline cursor-pointer font-mono"
          >
            Reset Progress Data
          </button>
        </div>
      </div>
    </div>
  );
}
