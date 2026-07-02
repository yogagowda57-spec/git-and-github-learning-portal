import { Module, RepoState, Badge } from '../types';

export const INITIAL_REPO_STATE: RepoState = {
  isInitialized: false,
  workingDirectory: [],
  stagingArea: [],
  commits: [],
  currentBranch: 'main',
  branches: ['main'],
  remoteCommits: [],
  remoteBranches: []
};

export const ALL_BADGES: Badge[] = [
  {
    id: 'badge-init',
    title: 'Architect of Code',
    description: 'Successfully initialized your first Git repository with git init.',
    category: 'basics',
    icon: 'Hammer'
  },
  {
    id: 'badge-commit',
    title: 'Time Capsule Creator',
    description: 'Saved your first permanent snapshot using git commit.',
    category: 'history',
    icon: 'History'
  },
  {
    id: 'badge-branch',
    title: 'Multiverse Explorer',
    description: 'Created a parallel development reality using git branch.',
    category: 'branching',
    icon: 'GitBranch'
  },
  {
    id: 'badge-conflict',
    title: 'Diplomat of Code',
    description: 'Successfully resolved your first merge conflict.',
    category: 'branching',
    icon: 'ShieldCheck'
  },
  {
    id: 'badge-github',
    title: 'Global Citizen',
    description: 'Cloned a repository from GitHub to establish a remote link.',
    category: 'remote',
    icon: 'Globe'
  },
  {
    id: 'badge-stash',
    title: 'Secret Agent',
    description: 'Safely stashed away in-progress drafts for later use.',
    category: 'advanced',
    icon: 'Archive'
  },
  {
    id: 'badge-graduate',
    title: 'Git Grandmaster',
    description: 'Completed all core training modules in Git & GitHub Academy.',
    category: 'advanced',
    icon: 'Award'
  }
];

export const MODULES: Module[] = [
  {
    id: 'module-basics',
    title: '1. Git Foundations',
    description: 'Master the core mental models of version control, local states, and initializing files.',
    icon: 'BookOpen',
    lessons: [
      {
        id: 'lesson-why-vc',
        moduleId: 'module-basics',
        title: 'Why Version Control Exists',
        description: 'Understand the core chaos that Git solves through a real-life bakery scenario.',
        scenario: 'Imagine you are running a famous bakery. You are writing down your secret recipe for the ultimate chocolate chip cookies. You want to try adding nuts to the recipe. You edit your only text file "cookie-recipe.txt". But wait! A client arrives who is allergic to nuts. You need to immediately cook the old, nut-free version! But you already erased it. Oh no, you have lost the perfect recipe forever!',
        problem: 'Overwriting files directly destroys their past states. Creating files like "recipe_final.txt", "recipe_final_v2_really_final.txt" leads to an unmanageable mess where no one knows which copy contains what changes.',
        whyExists: 'Git is like a high-fidelity time machine for your folders. It lets you work in a clean working room, review your work in a staging room, and lock your finished masterpieces inside a secure vault (repository) where they can never be lost.',
        explanation: 'In Git, you work with three key environments:\n1. **Working Directory**: Your actual folder on your computer where you edit files.\n2. **Staging Area**: A preview box where you prepare your drafts before saving them.\n3. **Local Repository**: The safe vault where Git saves your progress forever as encrypted snapshots called "commits".',
        realWorldExample: 'Think of writing an essay: Your notebook is your Working Directory. Using a sticky note to mark a draft you are ready to scan is the Staging Area. Photocopying that marked draft and storing it in a labeled folder is committing it to your Repository.',
        importantNotes: [
          'Git tracks changes, not just files.',
          'No Internet is required to use Git! It runs entirely on your local machine.',
          'The Working Directory is untracked until we explicitly tell Git to watch it.'
        ],
        quiz: {
          question: 'What is the "Staging Area" in Git?',
          options: [
            'A folder on GitHub where your code is hosted publicly.',
            'A temporary preparation area where you select and preview which edits to include in your next save.',
            'A backup program that runs when your computer crashes.'
          ],
          correctAnswerIndex: 1,
          explanation: 'The staging area serves as a drafting board or packing crate. You choose exactly which modifications go into the safe next.'
        },
        terminalChallenge: {
          instruction: 'Type "git" in the simulator to verify that the Git tool is installed on your virtual system.',
          description: 'Type "git" into the console to see the available options and start your journey.',
          startingState: { ...INITIAL_REPO_STATE },
          targetCommands: ['git'],
          validationType: 'commands',
          hints: ['Simply type "git" and press Enter.']
        },
        xpReward: 100,
        coinReward: 20
      },
      {
        id: 'lesson-git-init',
        moduleId: 'module-basics',
        title: 'Initializing: git init',
        description: 'Establish a new repository in an empty folder to start tracking your files.',
        scenario: 'You have just started a new software project: a secret app for finding stray kittens. You create a folder named "kitten-finder". Right now, this is just a standard folder on your computer. Git does not know it exists and is not watching it yet. You need to activate Git inside this folder so it can start running its magic.',
        problem: 'Folders do not automatically track history. Without activating Git, any change you make is irreversible.',
        whyExists: 'The "git init" command tells Git to initialize a hidden ".git" vault folder inside your current directory. This hidden vault will store every piece of history, every branch, and every line of code you ever save.',
        explanation: 'When you run "git init", Git creates a local workspace. You get a default main track (usually named "main" or "master"). Git is now ready to begin monitoring your work.',
        realWorldExample: 'Running "git init" is like installing a security camera and placing a filing cabinet in a brand new office space.',
        importantNotes: [
          'You only need to run "git init" ONCE per project.',
          'It creates a hidden directory named ".git" that holds all Git configuration.'
        ],
        quiz: {
          question: 'What happens when you run "git init"?',
          options: [
            'It uploads your folder to GitHub automatically.',
            'It creates a hidden ".git" directory and activates Git tracking in your current folder.',
            'It deletes all files in the directory to start fresh.'
          ],
          correctAnswerIndex: 1,
          explanation: 'The command "git init" initializes the hidden tracking database without touching or deleting your existing files.'
        },
        terminalChallenge: {
          instruction: 'Initialize a brand new Git repository in your workspace.',
          description: 'Create a Git repository by typing the initialization command in the console.',
          startingState: { ...INITIAL_REPO_STATE },
          targetCommands: ['git init'],
          validationType: 'commands',
          hints: ['The command to initialize a repository is "git init".']
        },
        xpReward: 120,
        coinReward: 25
      },
      {
        id: 'lesson-git-status',
        moduleId: 'module-basics',
        title: 'Checking Status: git status',
        description: 'See which files Git is tracking, which are untracked, and what is ready to commit.',
        scenario: 'You have written a file "about-kittens.txt" inside your kitty finder project. But you are not sure if Git is watching it yet. Did you stage it? Did you commit it? You need a quick, reliable way to ask Git: "What is going on in my project right now?"',
        problem: 'It is impossible to see which files are saved or modified just by looking at a standard folder. You need an official report.',
        whyExists: 'The "git status" command is your absolute best friend. It gives you a complete overview of files that have been modified, files that are untracked, and files currently sitting in the staging area.',
        explanation: 'When you run "git status", Git inspects your folder and reports:\n- **Untracked files** (marked in Red): Files Git sees but has never been told to watch.\n- **Staged files** (marked in Green): Files ready to be permanently committed.\n- **No commits yet**: Indicates a fresh repository.',
        realWorldExample: 'Think of "git status" as looking at a shipping manifest to see what items are still lying on the floor (untracked) versus packed in crates (staged).',
        importantNotes: [
          'Run "git status" constantly! It is completely safe and does not modify any files.',
          'It shows you helpful tips on how to add or restore files right in the output.'
        ],
        quiz: {
          question: 'If a file is listed as "Untracked" in red under "git status", what does it mean?',
          options: [
            'The file has a syntax error.',
            'Git knows the file exists in the folder, but has not been told to keep track of its changes.',
            'The file has been safely backed up to the cloud.'
          ],
          correctAnswerIndex: 1,
          explanation: 'Untracked means the file exists locally, but Git is ignoring it until you add it to the staging area.'
        },
        terminalChallenge: {
          instruction: 'Check the status of your newly initialized repository to see if there are any files.',
          description: 'Type the command to query the current status of your Git workspace.',
          startingState: {
            isInitialized: true,
            workingDirectory: [{ name: 'about-kittens.txt', content: 'Kittens are fluffy.', status: 'untracked' }],
            stagingArea: [],
            commits: [],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git status'],
          validationType: 'commands',
          hints: ['Use the "git status" command.']
        },
        xpReward: 110,
        coinReward: 20
      },
      {
        id: 'lesson-git-add',
        moduleId: 'module-basics',
        title: 'Staging Work: git add',
        description: 'Move files from your working directory into the Staging Area to prep them for saving.',
        scenario: 'You have updated "about-kittens.txt" and also created a beautiful photo asset "logo.png". You want to save "about-kittens.txt" in your next snapshot, but "logo.png" is still unfinished. You need a way to selectively pack ONLY the finished about page into your next snapshot.',
        problem: 'Directly saving the entire directory records your half-done drafts. You need a buffer zone to choose what is saved.',
        whyExists: 'The "git add" command copies files into the Staging Area. It lets you hand-select which files are grouped together for the next official save point.',
        explanation: 'To stage a single file: `git add about-kittens.txt`.\nTo stage ALL modified and untracked files in the folder: `git add .` (the dot represents the current directory).',
        realWorldExample: 'Staging is like placing specific items into a shipping crate. You can add items, swap them, or remove them. The box does not ship until you close and label it (commit).',
        importantNotes: [
          'If you modify a file AFTER adding it to stage, you must run "git add" again to stage the new edits!',
          'Staging is the mandatory bridge between your Working Directory and a permanent Commit.'
        ],
        quiz: {
          question: 'How do you stage all modified and untracked files in your folder at once?',
          options: [
            'git stage all',
            'git add .',
            'git commit --all'
          ],
          correctAnswerIndex: 1,
          explanation: 'The command "git add ." stages the entire current directory recursively, including all files and folders.'
        },
        terminalChallenge: {
          instruction: 'Stage the untracked file "about-kittens.txt" so that it is ready for your next commit.',
          description: 'Use git add to stage the specific kitten about file.',
          startingState: {
            isInitialized: true,
            workingDirectory: [{ name: 'about-kittens.txt', content: 'Kittens are fluffy.', status: 'untracked' }],
            stagingArea: [],
            commits: [],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git add about-kittens.txt'],
          validationType: 'commands',
          hints: ['Type "git add about-kittens.txt" exactly as instructed.']
        },
        xpReward: 130,
        coinReward: 25
      }
    ]
  },
  {
    id: 'module-history',
    title: '2. Commits & History',
    description: 'Learn how to create bulletproof save points and inspect your code timeline.',
    icon: 'History',
    lessons: [
      {
        id: 'lesson-git-commit',
        moduleId: 'module-history',
        title: 'Saving Snapshots: git commit',
        description: 'Permanently lock in your staged changes with a descriptive history message.',
        scenario: 'Your "about-kittens.txt" draft is perfect and sitting in the Staging Area. Now, you want to record it permanently. You want your colleagues to see exactly what you saved today: "Added fluffy kittens description". You need to seal this package with an official stamp.',
        problem: 'If your computer crashes or a file gets corrupted, unstaged and uncommitted files can be permanently lost. Commits are secure snapshots that live forever.',
        whyExists: 'The "git commit" command creates an immutable, encrypted snapshot of the staged files. Every commit gets a unique cryptographic signature (like `a1b2c3d`) and an author label, building a perfect, tamper-proof timeline of your work.',
        explanation: 'Always include a short commit message explaining WHAT you changed: `git commit -m "Add fluffy kittens description"`. The `-m` flag stands for "message". Keep messages in the present tense, e.g., "Add feature" rather than "Added feature".',
        realWorldExample: 'Committing is like locking a safe box and giving it a unique label in your warehouse registry. If you ever make a mistake in the future, you can instantly warp back to this exact safe box.',
        importantNotes: [
          'A commit ONLY saves files that are currently staged.',
          'Commit messages are mandatory. Git will refuse to commit without one.',
          'Good commit messages make collaboration a breeze.'
        ],
        quiz: {
          question: 'What does the "-m" flag stand for in "git commit -m"?',
          options: [
            'Modified: indicates we modified existing files.',
            'Main: locks the commit to the main branch.',
            'Message: allows you to attach a descriptive text label to the commit.'
          ],
          correctAnswerIndex: 2,
          explanation: 'The "-m" flag stands for message, which is the readable label you give to your save point.'
        },
        terminalChallenge: {
          instruction: 'Commit your staged files with the message "Add kitten description".',
          description: 'Type the commit command with the exact message specified.',
          startingState: {
            isInitialized: true,
            workingDirectory: [{ name: 'about-kittens.txt', content: 'Kittens are fluffy.', status: 'staged' }],
            stagingArea: ['about-kittens.txt'],
            commits: [],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git commit -m "Add kitten description"'],
          validationType: 'commands',
          hints: ['Use: git commit -m "Add kitten description"']
        },
        xpReward: 150,
        coinReward: 30
      },
      {
        id: 'lesson-git-log',
        moduleId: 'module-history',
        title: 'Reviewing History: git log',
        description: 'Travel through time and view the chronologically ordered list of all saves.',
        scenario: 'Your project is a week old. You have made 10 different commits. Suddenly, a bug appears in the kitten tracker! You ask yourself: "Who wrote this code? When was this change made? What did the project look like 3 days ago?" You need to read your project’s journal.',
        problem: 'Folders normally only show the current state of files. They do not maintain a list of past events or authors.',
        whyExists: 'The "git log" command prints a beautifully organized list of all past commits in reverse chronological order (newest first), showing the SHA-1 hash, author, date, and description.',
        explanation: 'Run `git log` to see the detailed list.\nUse `git log --oneline` for a ultra-clean, compact, single-line list of commits that is easy to scan quickly.',
        realWorldExample: 'Running "git log" is like checking your bank statement to see every single deposit and withdrawal since the account was initialized.',
        importantNotes: [
          'Press "q" to exit the log view if the list is long!',
          'Each commit hash is unique, allowing you to reference specific milestones.'
        ],
        quiz: {
          question: 'What does "git log --oneline" do?',
          options: [
            'It forces Git to only display the very first commit of the project.',
            'It displays a compressed, single-line summary of commits for easy scanning.',
            'It deletes all lines of code except one.'
          ],
          correctAnswerIndex: 1,
          explanation: '"--oneline" is a highly popular formatting flag that compresses each commit to its short SHA hash and message on a single line.'
        },
        terminalChallenge: {
          instruction: 'View the commit logs for your repository.',
          description: 'Use the log command to view the commit history.',
          startingState: {
            isInitialized: true,
            workingDirectory: [{ name: 'about-kittens.txt', content: 'Kittens are fluffy.', status: 'committed' }],
            stagingArea: [],
            commits: [
              { id: 'a1b2c3d', parentIds: [], message: 'Initial commit', files: {}, branch: 'main' },
              { id: 'f7e8d9c', parentIds: ['a1b2c3d'], message: 'Add kitten description', files: { 'about-kittens.txt': 'Kittens are fluffy.' }, branch: 'main' }
            ],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git log'],
          validationType: 'commands',
          hints: ['Use the "git log" command to list your snapshots.']
        },
        xpReward: 120,
        coinReward: 20
      }
    ]
  },
  {
    id: 'module-branches',
    title: '3. Branching & Merging',
    description: 'Learn to build separate features in parallel realities and combine them seamlessly.',
    icon: 'GitBranch',
    lessons: [
      {
        id: 'lesson-git-branch',
        moduleId: 'module-branches',
        title: 'Parallel Realities: git branch',
        description: 'Create and switch between branches to experiment without breaking your main app.',
        scenario: 'Your kitten app is running perfectly in production. Now, you want to build a crazy experimental feature: "Lasers for Kittens". But this feature might take days, and it might break your existing code! If you work on the main branch, users will experience a broken app.',
        problem: 'Working on a single shared codebase makes experimenting dangerous and halts everyone else’s work.',
        whyExists: 'Branches are lightweight pointers to a timeline of commits. Creating a branch spawns a parallel universe. You can build, test, and even destroy this branch without ever touching the stable "main" branch.',
        explanation: 'To create a new branch: `git branch feature-lasers`.\nTo switch to that branch: `git checkout feature-lasers` (or the newer `git switch feature-lasers`).\nTo create and switch instantly: `git checkout -b feature-lasers`.',
        realWorldExample: 'Imagine writing a book. You want to test a crazy plot twist. Instead of rewriting your main manuscript, you make a photocopy of the current pages and write your twist in a separate binder. If it works, you replace the pages; if not, you throw the photocopy away.',
        importantNotes: [
          'The branch you are currently on is marked with an asterisk (*) in git status or git branch.',
          'You can have hundreds of local branches. They are practically free in terms of disk space!'
        ],
        quiz: {
          question: 'Which command creates a new branch named "feature-login" AND switches to it immediately?',
          options: [
            'git branch feature-login',
            'git checkout -b feature-login',
            'git merge feature-login'
          ],
          correctAnswerIndex: 1,
          explanation: 'The "-b" flag tells checkout to create the branch first before performing the switch, combining two commands into one.'
        },
        terminalChallenge: {
          instruction: 'Create a new branch named "feature-lasers" to begin work on your experiment.',
          description: 'Type the branch creation command in the console.',
          startingState: {
            isInitialized: true,
            workingDirectory: [],
            stagingArea: [],
            commits: [{ id: 'a1b2c3d', parentIds: [], message: 'Initial commit', files: {}, branch: 'main' }],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git branch feature-lasers'],
          validationType: 'commands',
          hints: ['Use: git branch feature-lasers']
        },
        xpReward: 140,
        coinReward: 25
      },
      {
        id: 'lesson-git-merge',
        moduleId: 'module-branches',
        title: 'Merging Roads: git merge',
        description: 'Bring your completed experiments back into the main branch.',
        scenario: 'You have finished building the "Lasers for Kittens" feature on your separate branch. It works flawlessly and has been tested. Now, you want to bring these finished upgrades back into the "main" branch so that your users can finally play with laser-guided kittens!',
        problem: 'Keeping code separated on a branch forever defeats the purpose. You need a safe way to combine parallel timelines.',
        whyExists: 'The "git merge" command takes commits from another branch and merges them into your current active branch. If there are no conflicting changes, Git does this automatically using a "fast-forward" or a automatic merge commit.',
        explanation: '1. Always switch to the branch you want to merge INTO first: `git checkout main`.\n2. Run the merge command, pointing to the branch holding the updates: `git merge feature-lasers`.',
        realWorldExample: 'Merging is like taking the chapters you drafted in your separate binder and putting them into the main manuscript.',
        importantNotes: [
          'Before merging, make sure your working directory is clean (all changes committed).',
          'After a successful merge, you can safely delete the feature branch using "git branch -d feature-lasers".'
        ],
        quiz: {
          question: 'What is the correct sequence of steps to merge "feature-login" into the "main" branch?',
          options: [
            'git checkout feature-login, then git merge main',
            'git checkout main, then git merge feature-login',
            'git branch merge feature-login'
          ],
          correctAnswerIndex: 1,
          explanation: 'You must first stand on the branch that should receive the changes (main), and then merge the donor branch (feature-login) into it.'
        },
        terminalChallenge: {
          instruction: 'Switch to the "main" branch and merge the changes from the completed "feature-lasers" branch.',
          description: 'First checkout main, then merge feature-lasers.',
          startingState: {
            isInitialized: true,
            workingDirectory: [],
            stagingArea: [],
            commits: [
              { id: 'a1b2c3d', parentIds: [], message: 'Initial commit', files: {}, branch: 'main' },
              { id: 'b2c3d4e', parentIds: ['a1b2c3d'], message: 'Add lasers feature', files: { 'lasers.txt': 'Activated.' }, branch: 'feature-lasers' }
            ],
            currentBranch: 'feature-lasers',
            branches: ['main', 'feature-lasers'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git checkout main', 'git merge feature-lasers'],
          validationType: 'commands',
          hints: ['Run "git checkout main" first, then run "git merge feature-lasers".']
        },
        xpReward: 160,
        coinReward: 35
      }
    ]
  },
  {
    id: 'module-remote',
    title: '4. Remotes & GitHub',
    description: 'Learn to link local projects to the cloud, collaborate globally, and clone foreign repos.',
    icon: 'Globe',
    lessons: [
      {
        id: 'lesson-git-clone',
        moduleId: 'module-remote',
        title: 'Downloading Code: git clone',
        description: 'Download an existing repository from GitHub onto your local machine to work on it.',
        scenario: 'Your friend has started an amazing project on GitHub: a repository for baking the perfect bread. You want to contribute to it! You have the link: "https://github.com/friend/perfect-bread". You need to download the entire history, branches, and files onto your laptop so you can start editing.',
        problem: 'Manually downloading a ZIP file from GitHub doesn’t link your folder to the Git repository. You lose the ability to easily fetch or push updates.',
        whyExists: 'The "git clone" command copies an existing repository from the cloud, establishes a secure connection to the remote server, and automatically configures a shortcut tracker named "origin".',
        explanation: 'Simply call `git clone <repository-url>`. This creates a new folder locally containing the entire timeline of the project, completely initialized and ready to go.',
        realWorldExample: 'Cloning is like creating an exact duplicate of a library catalog and shipping all books and historical logs straight to your home desk.',
        importantNotes: [
          'Cloning automatically runs "git init" for you under the hood.',
          'It sets up a remote pointer called "origin" referencing the original cloud repo.'
        ],
        quiz: {
          question: 'What does "git clone" do?',
          options: [
            'It creates a copy of an existing remote Git repository on your local computer.',
            'It duplicates a file within your folder.',
            'It sends your local changes to a friend’s computer directly.'
          ],
          correctAnswerIndex: 0,
          explanation: '"git clone" downloads the entire repository, including all files, branches, and commit histories, from a remote hosting service like GitHub.'
        },
        terminalChallenge: {
          instruction: 'Clone the repository "https://github.com/friend/perfect-bread" to start collaborating.',
          description: 'Type the clone command with the given URL.',
          startingState: { ...INITIAL_REPO_STATE },
          targetCommands: ['git clone https://github.com/friend/perfect-bread'],
          validationType: 'commands',
          hints: ['Type: git clone https://github.com/friend/perfect-bread']
        },
        xpReward: 150,
        coinReward: 30
      }
    ]
  },
  {
    id: 'module-time-travel',
    title: '5. Time Travel & Tools',
    description: 'Learn how to undo mistakes, stash away work-in-progress drafts, and stay in control.',
    icon: 'Archive',
    lessons: [
      {
        id: 'lesson-git-restore',
        moduleId: 'module-time-travel',
        title: 'Undoing Changes: git restore',
        description: 'Discard uncommitted local edits and restore your files to their last committed state.',
        scenario: 'You were editing your cookie recipe "cookie-recipe.txt". You accidentally spilled hot chocolate on your keyboard, typing thousands of random characters and destroying your file! You haven’t committed this mess yet. You want to immediately discard these local changes and reset the recipe to how it looked in your last safe commit.',
        problem: 'Without an undo feature, local mistakes inside the working directory force you to manually rewrite and fix errors.',
        whyExists: 'The "git restore" command is your local "Ctrl+Z". It fetches the clean copy of the file from your last commit and replaces the messy local draft, wiping away your errors instantly.',
        explanation: 'To discard local changes in a file: `git restore cookie-recipe.txt`.\n(In older Git versions, you might see `git checkout -- cookie-recipe.txt` used for this).',
        realWorldExample: 'Think of tearing up a messy draft sheet and taking out a clean print copy from your filing cabinet.',
        importantNotes: [
          'WARNING: Git restore is irreversible! Since the changes were never committed, they are deleted forever.',
          'Use git status first to confirm which file you want to restore.'
        ],
        quiz: {
          question: 'Which command discards local, uncommitted changes in "recipe.txt"?',
          options: [
            'git commit recipe.txt',
            'git restore recipe.txt',
            'git delete recipe.txt'
          ],
          correctAnswerIndex: 1,
          explanation: '"git restore recipe.txt" resets the file back to the state it was in at the last commit.'
        },
        terminalChallenge: {
          instruction: 'Discard the accidental modifications in "cookie-recipe.txt" using restore.',
          description: 'Restore cookie-recipe.txt to erase local uncommitted edits.',
          startingState: {
            isInitialized: true,
            workingDirectory: [{ name: 'cookie-recipe.txt', content: 'Messy spilled drink keyboard spam!!!', status: 'modified' }],
            stagingArea: [],
            commits: [{ id: 'a1b2c3d', parentIds: [], message: 'Add perfect recipe', files: { 'cookie-recipe.txt': 'Flour, sugar, butter.' }, branch: 'main' }],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git restore cookie-recipe.txt'],
          validationType: 'commands',
          hints: ['Run "git restore cookie-recipe.txt".']
        },
        xpReward: 140,
        coinReward: 25
      },
      {
        id: 'lesson-git-stash',
        moduleId: 'module-time-travel',
        title: 'Stashing Work: git stash',
        description: 'Temporarily shelve your current modified files so you can switch branches cleanly.',
        scenario: 'You are half-way through coding a new checkout feature in "cart.txt". Suddenly, a critical production bug is reported on "main"! You need to switch to main immediately to fix it. But Git refuses to let you checkout because your unstaged draft "cart.txt" would conflict. You don’t want to commit a half-broken draft just to switch branches!',
        problem: 'Committing half-finished, non-working code clutter the timeline. But you cannot switch branches with dirty files.',
        whyExists: 'The "git stash" command takes your modified, untracked files, saves them on a secure temporary shelf, and cleans your working directory back to the last commit. You can then do your urgent bugfix, and later retrieve your drafts from the shelf.',
        explanation: '1. To save drafts to the shelf: `git stash`.\n2. To retrieve them later: `git stash pop` (which applies the drafts and deletes them from the stash shelf).',
        realWorldExample: 'Stashing is like putting all your current papers and tools into a temporary desk drawer so you can wipe the table clean and host a meeting. After the meeting, you open the drawer and pull all your tools back out.',
        importantNotes: [
          'You can stash changes multiple times. They are saved in a stack.',
          'Use "git stash list" to see your stored shelves.'
        ],
        quiz: {
          question: 'What is the command to retrieve stashed changes and apply them back to your workspace?',
          options: [
            'git stash restore',
            'git stash pop',
            'git stash commit'
          ],
          correctAnswerIndex: 1,
          explanation: '"git stash pop" pops the top stash off the stash list, applying it directly back to your working directory.'
        },
        terminalChallenge: {
          instruction: 'Stash your current half-done changes so you have a clean workspace.',
          description: 'Shelve your modifications in your repository.',
          startingState: {
            isInitialized: true,
            workingDirectory: [{ name: 'cart.txt', content: 'Draft of cart features.', status: 'modified' }],
            stagingArea: [],
            commits: [{ id: 'a1b2c3d', parentIds: [], message: 'Initial commit', files: {}, branch: 'main' }],
            currentBranch: 'main',
            branches: ['main'],
            remoteCommits: [],
            remoteBranches: []
          },
          targetCommands: ['git stash'],
          validationType: 'commands',
          hints: ['Type "git stash" in the terminal.']
        },
        xpReward: 160,
        coinReward: 30
      }
    ]
  }
];
