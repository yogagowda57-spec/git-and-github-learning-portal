import React, { useState, useEffect } from 'react';
import { Lesson, RepoState, UserProgress } from '../types';
import Terminal from './Terminal';
import Visualizer from './Visualizer';
import AITutor from './AITutor';
import TopicIllustration from './TopicIllustration';
import { ALL_BADGES } from '../data/lessons';
import { BookOpen, HelpCircle, CheckCircle2, ChevronRight, ChevronLeft, Award, Sparkles, BrainCircuit, Play, ArrowRight, Zap, Coins, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LessonViewProps {
  key?: string;
  lesson: Lesson;
  progress: UserProgress;
  onLessonCompleted: (lessonId: string, xpEarned: number, coinsEarned: number, unlockedBadgeId?: string) => void;
  onBackToDashboard: () => void;
}

export default function LessonView({
  lesson,
  progress,
  onLessonCompleted,
  onBackToDashboard
}: LessonViewProps) {
  // Steps: 0 = Scenario & Why, 1 = Concept & Analogy, 2 = Quiz, 3 = Terminal Challenge, 4 = Celebration Summary
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedQuizIndex, setSelectedQuizIndex] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);
  
  // Terminal workspace state
  const [challengeState, setChallengeState] = useState<RepoState>({ ...lesson.terminalChallenge.startingState });
  const [challengeCommandHistory, setChallengeCommandHistory] = useState<string[]>([]);
  const [challengeSuccess, setChallengeSuccess] = useState(false);

  // Sync state if lesson changes
  useEffect(() => {
    setCurrentStep(0);
    setSelectedQuizIndex(null);
    setQuizSubmitted(false);
    setQuizIsCorrect(false);
    setChallengeState({ ...lesson.terminalChallenge.startingState });
    setChallengeCommandHistory([]);
    setChallengeSuccess(false);
  }, [lesson]);

  const handleQuizSubmit = () => {
    if (selectedQuizIndex === null) return;
    const isCorrect = selectedQuizIndex === lesson.quiz.correctAnswerIndex;
    setQuizIsCorrect(isCorrect);
    setQuizSubmitted(true);
  };

  const handleCommandExecuted = (cmd: string, updatedState: RepoState) => {
    // Record command history for this lesson
    const updatedHistory = [...challengeCommandHistory, cmd];
    setChallengeCommandHistory(updatedHistory);

    // Validate if challenge is completed
    const targetCmds = lesson.terminalChallenge.targetCommands;
    
    // Check command matching
    if (lesson.terminalChallenge.validationType === 'commands') {
      const isSequenceMatch = targetCmds.every((target, idx) => {
        const matchingCmd = updatedHistory[idx];
        return matchingCmd && matchingCmd.toLowerCase().trim().replace(/\s+/g, ' ') === target.toLowerCase().trim().replace(/\s+/g, ' ');
      });

      if (isSequenceMatch) {
        setChallengeSuccess(true);
        // Automatically warp to celebration slide after 1.5s
        setTimeout(() => {
          setCurrentStep(4);
        }, 1500);
      }
    }
  };

  const handleCompleteLesson = () => {
    // Determine if lesson unlocks a badge
    let badgeToUnlock: string | undefined = undefined;
    if (lesson.id === 'lesson-why-vc') badgeToUnlock = 'badge-init'; // first lesson!
    if (lesson.id === 'lesson-git-init') badgeToUnlock = 'badge-init';
    if (lesson.id === 'lesson-git-commit') badgeToUnlock = 'badge-commit';
    if (lesson.id === 'lesson-git-branch') badgeToUnlock = 'badge-branch';
    if (lesson.id === 'lesson-git-stash') badgeToUnlock = 'badge-stash';
    
    // Check if whole curriculum is done for Graduate badge
    const isCurriculumCompleted = progress.completedLessons.length + 1 >= 5; // e.g. finished 5 core lessons
    if (isCurriculumCompleted) {
      badgeToUnlock = 'badge-graduate';
    }

    onLessonCompleted(lesson.id, lesson.xpReward, lesson.coinReward, badgeToUnlock);
  };

  const progressPercent = Math.round((currentStep / 4) * 100);

  return (
    <div className="flex flex-col gap-6" id="lesson-page">
      {/* Lesson Header Nav */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800">
        <div>
          <button 
            onClick={onBackToDashboard}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold mb-1 flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Academy Roadmap
          </button>
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>{lesson.title}</span>
          </h2>
        </div>

        {/* Slider Indicator Tracker */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <div className="text-xs font-mono text-slate-400 font-semibold">
            Section Progress: <strong className="text-indigo-400">{currentStep + 1} / 5</strong>
          </div>
          <div className="w-44 h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-indigo-500 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Slide Carousel Layout */}
      <AnimatePresence mode="wait">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[480px]">
          {/* Main Slide Content Left Column */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl min-h-[460px]">
            
            {/* Step 0: Scenario & Why exists */}
            {currentStep === 0 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-400/10 border border-rose-400/20 px-2.5 py-1 rounded-full">
                    Step 1: The Real-World Scenario
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-3 font-sans leading-snug">The Story Behind the Concept</h3>
                </div>

                <div className="bg-slate-950/50 rounded-xl p-4.5 border border-slate-800 leading-relaxed text-sm text-slate-300 italic">
                  "{lesson.scenario}"
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-rose-950/10 rounded-xl p-4 border border-rose-900/20">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" /> The Problem
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{lesson.problem}</p>
                  </div>
                  <div className="bg-emerald-950/10 rounded-xl p-4 border border-emerald-900/20">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Why Git exists
                    </h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">{lesson.whyExists}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 1: Explanation & Example */}
            {currentStep === 1 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-400/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                    Step 2: Beginner-Friendly Explanation
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-3">Understanding the Mental Model</h3>
                </div>

                <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 flex flex-col gap-3">
                  <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{lesson.explanation}</p>
                </div>

                <div className="bg-slate-950/20 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">💡 Relatable Example</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{lesson.realWorldExample}</p>
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">⚠️ Key Concept Notes</h4>
                  <ul className="list-disc pl-5 text-xs text-slate-400 mt-1.5 flex flex-col gap-1 leading-relaxed">
                    {lesson.importantNotes.map((note, i) => (
                      <li key={i}>{note}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {/* Step 2: Interactive Quiz */}
            {currentStep === 2 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-5"
              >
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-full">
                    Step 3: Interactive Quiz
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-3">Test Your Understanding</h3>
                  <p className="text-xs text-slate-400 mt-1">Answer this question correctly to unlock the Terminal hands-on challenge!</p>
                </div>

                <div className="bg-slate-950/40 p-4.5 rounded-xl border border-slate-800/80 font-medium text-sm text-slate-200">
                  {lesson.quiz.question}
                </div>

                <div className="flex flex-col gap-3">
                  {lesson.quiz.options.map((opt, idx) => {
                    const isSelected = selectedQuizIndex === idx;
                    let optionColor = 'bg-slate-950 border-slate-800 hover:border-indigo-500/40';
                    
                    if (quizSubmitted) {
                      if (idx === lesson.quiz.correctAnswerIndex) {
                        optionColor = 'bg-emerald-950/20 border-emerald-500 text-emerald-300';
                      } else if (isSelected) {
                        optionColor = 'bg-rose-950/20 border-rose-500 text-rose-300';
                      } else {
                        optionColor = 'bg-slate-950/50 border-slate-900 opacity-60';
                      }
                    } else if (isSelected) {
                      optionColor = 'bg-indigo-950/20 border-indigo-500 text-indigo-300';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => !quizSubmitted && setSelectedQuizIndex(idx)}
                        disabled={quizSubmitted}
                        className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-center gap-3 cursor-pointer ${optionColor}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-700 flex items-center justify-center font-mono font-semibold text-[10px] bg-slate-900 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback Dialog */}
                {quizSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      quizIsCorrect 
                        ? 'bg-emerald-950/10 border-emerald-900/40 text-emerald-400' 
                        : 'bg-rose-950/10 border-rose-900/40 text-rose-400'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5 mb-1 text-sm">
                      {quizIsCorrect ? '🎉 Correct! Stellar work!' : '❌ Oops! Not quite correct.'}
                    </div>
                    <p>{lesson.quiz.explanation}</p>
                  </motion.div>
                )}

                {!quizSubmitted && (
                  <button
                    onClick={handleQuizSubmit}
                    disabled={selectedQuizIndex === null}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
                  >
                    Submit Answer
                  </button>
                )}
              </motion.div>
            )}

            {/* Step 3: Terminal challenge */}
            {currentStep === 3 && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-4 flex-1 justify-between"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full self-start">
                    Step 4: Hands-on Terminal Challenge
                  </span>
                  <h3 className="text-lg font-bold text-slate-100 mt-2">Active Sandbox Simulation</h3>
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 leading-relaxed text-xs text-slate-300">
                    <div className="font-bold text-emerald-400 uppercase tracking-wide text-[10px] mb-1.5 flex items-center gap-1">
                      <Play className="w-3.5 h-3.5" /> Instruction:
                    </div>
                    {lesson.terminalChallenge.instruction}
                  </div>
                </div>

                {/* Inline workspace splitter */}
                <div className="flex flex-col gap-4 mt-2">
                  <Terminal 
                    repoState={challengeState}
                    setRepoState={setChallengeState}
                    onCommandExecuted={handleCommandExecuted}
                    targetCommands={lesson.terminalChallenge.targetCommands}
                    currentCommandIndex={challengeCommandHistory.length}
                    hints={lesson.terminalChallenge.hints}
                  />
                  
                  {challengeSuccess && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl font-semibold flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
                      <span>Challenge Solved! Unlocking rewards...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 4: Celebration Summary */}
            {currentStep === 4 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-5 py-8"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl scale-125 animate-pulse"></div>
                  <div className="w-16 h-16 rounded-full bg-yellow-400 text-slate-950 flex items-center justify-center shadow-2xl relative border-4 border-yellow-200">
                    <Award className="w-9 h-9 animate-bounce" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-100">Congratulations!</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    You have mastered <strong className="text-indigo-400">{lesson.title}</strong>!
                  </p>
                </div>

                {/* Rewards widget banner */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs mt-2">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col items-center">
                    <Zap className="w-6 h-6 text-indigo-400 mb-1" />
                    <span className="text-base font-extrabold font-mono text-slate-200">+{lesson.xpReward}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">XP Earned</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center flex flex-col items-center">
                    <Coins className="w-6 h-6 text-yellow-400 mb-1" />
                    <span className="text-base font-extrabold font-mono text-slate-200">+{lesson.coinReward}</span>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Coins Earned</span>
                  </div>
                </div>

                {/* Summary points list */}
                <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 max-w-md w-full text-left">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Lesson Recap:</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    You learned how version control shields your code from accidental deletions. You practiced commands in the terminal simulator and tracked files as they moved visually from red untracked states to staged and safe committed milestones.
                  </p>
                </div>

                <button
                  onClick={handleCompleteLesson}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg hover:from-emerald-500 hover:to-teal-400 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Claim Rewards & Exit</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {/* Pagination Navigation Footer Controls */}
            {currentStep < 4 && (
              <div className="flex items-center justify-between border-t border-slate-800 pt-4 mt-6">
                <button
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold rounded-xl transition-colors cursor-pointer border border-slate-800 flex items-center gap-1.5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                {/* Conditional Next Slide Actions */}
                {currentStep === 2 ? (
                  <button
                    onClick={() => quizIsCorrect && setCurrentStep(3)}
                    disabled={!quizIsCorrect}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Proceed to Terminal Challenge</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : currentStep === 3 ? (
                  <button
                    onClick={() => challengeSuccess && setCurrentStep(4)}
                    disabled={!challengeSuccess}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-xs rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Proceed to Celebration</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Next Section</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

          </div>

          {/* Right Column Side Panel Widget Spacer */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Visual Repos State mapping panel */}
            {currentStep === 3 ? (
              <Visualizer repoState={challengeState} />
            ) : (
              <TopicIllustration lessonId={lesson.id} />
            )}
            
            {/* AI Assistant Chat Tutor Companion */}
            <AITutor currentLesson={lesson} />
          </div>
        </div>
      </AnimatePresence>
    </div>
  );
}
