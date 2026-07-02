export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface VirtualFile {
  name: string;
  content: string;
  status: 'untracked' | 'staged' | 'committed' | 'modified';
}

export interface Commit {
  id: string;
  parentIds: string[];
  message: string;
  files: { [filename: string]: string };
  branch: string;
}

export interface RepoState {
  isInitialized: boolean;
  workingDirectory: VirtualFile[];
  stagingArea: string[]; // list of file names staged
  commits: Commit[];
  currentBranch: string;
  branches: string[];
  remoteCommits: Commit[];
  remoteBranches: string[];
}

export interface TerminalChallenge {
  instruction: string;
  description: string;
  startingState: RepoState;
  // Either specific sequence of exact commands, or validation function based on final state
  targetCommands: string[];
  validationType: 'commands' | 'state';
  targetStateFilter?: (state: RepoState) => boolean;
  hints: string[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  scenario: string;
  problem: string;
  whyExists: string;
  explanation: string;
  realWorldExample: string;
  importantNotes: string[];
  quiz: QuizQuestion;
  terminalChallenge: TerminalChallenge;
  xpReward: number;
  coinReward: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  lessons: Lesson[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'basics' | 'history' | 'branching' | 'remote' | 'advanced';
  unlockedAt?: string;
  icon: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  target: number;
  current: number;
  completed: boolean;
  type: 'xp' | 'lessons' | 'sandbox' | 'streak';
}

export interface UserProgress {
  xp: number;
  coins: number;
  level: number;
  streak: number;
  lastActiveDate: string;
  completedLessons: string[]; // lesson ids
  unlockedBadges: string[]; // badge ids
  notes: { [lessonId: string]: string };
  bookmarks: string[]; // lesson or command ids
  completedMissions: string[];
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  avatarIcon: string;
  avatarColor: string;
}

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
