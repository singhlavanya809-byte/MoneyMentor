import { UserProfile, UserProgress, ChatMessage, QuizAttempt } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'moneymentor_profile_v1',
  PROGRESS: 'moneymentor_progress_v1',
  CHAT_HISTORY: 'moneymentor_chat_history_v1',
};

const DEFAULT_PROFILE: UserProfile = {
  name: 'Lavanya',
  role: 'Student',
  monthlyGoal: 5000,
  streakDays: 4,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currency: 'INR',
  weeklyActivity: [25, 40, 15, 30, 45, 20, 35], // Mon-Sun study minutes
};

const DEFAULT_PROGRESS: UserProgress = {
  completedLessonIds: ['budgeting-basics'],
  quizAttempts: [
    {
      id: 'initial-sample-attempt',
      quizId: 'quiz-budgeting',
      quizTitle: 'Budgeting & 50/30/20 Mastery',
      score: 4,
      totalQuestions: 4,
      percentage: 100,
      timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      userAnswers: { b1: 1, b2: 1, b3: 1, b4: 1 },
    },
  ],
  unlockedBadgeIds: ['badge-first-lesson', 'badge-budget-boss', 'badge-century-club'],
  totalQuestionsAnswered: 4,
  calculatorSimulationsRun: 2,
  tutorQueriesAsked: 1,
  studyMinutes: 120,
};

export const getStoredProfile = (): UserProfile => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!data) return DEFAULT_PROFILE;
    return { ...DEFAULT_PROFILE, ...JSON.parse(data) };
  } catch {
    return DEFAULT_PROFILE;
  }
};

export const saveStoredProfile = (profile: UserProfile): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save user profile to localStorage', e);
  }
};

export const getStoredProgress = (): UserProgress => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!data) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
  } catch {
    return DEFAULT_PROGRESS;
  }
};

export const saveStoredProgress = (progress: UserProgress): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress to localStorage', e);
  }
};

export const getStoredChatHistory = (): ChatMessage[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    if (!data) {
      return [
        {
          id: 'welcome-tutor-msg',
          role: 'model',
          content:
            "👋 **Namaste & Welcome to MoneyMentor AI!** I'm your dedicated personal finance tutor.\n\nI break down complex concepts like **Budgeting**, **Inflation**, **Compound Interest**, and **Credit Scores** into simple, beginner-friendly explanations with real-world Indian Rupee examples.\n\nWhat would you like to explore today? You can pick a quick prompt below or ask anything!",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedQuestions: [
            'Explain inflation like I am 15',
            'How does compound interest work with ₹1,000/mo?',
            'What is a healthy CIBIL credit score?',
            'How should I budget my ₹30,000 monthly stipend?'
          ]
        }
      ];
    }
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveStoredChatHistory = (messages: ChatMessage[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save chat history to localStorage', e);
  }
};

export const checkAndUpdateBadges = (
  progress: UserProgress,
  event: {
    type: 'lesson_completed' | 'quiz_completed' | 'simulation_run' | 'tutor_queried';
    lessonId?: string;
    quizScore?: number;
    quizTotal?: number;
    streak?: number;
  }
): { newUnlocked: string[]; updatedProgress: UserProgress } => {
  const currentUnlocked = new Set(progress.unlockedBadgeIds);
  const newlyUnlocked: string[] = [];

  const unlock = (badgeId: string) => {
    if (!currentUnlocked.has(badgeId)) {
      currentUnlocked.add(badgeId);
      newlyUnlocked.push(badgeId);
    }
  };

  // Check lesson badges
  if (progress.completedLessonIds.length >= 1) unlock('badge-first-lesson');
  if (progress.completedLessonIds.includes('budgeting-basics')) unlock('badge-budget-boss');
  if (progress.completedLessonIds.length >= 6) unlock('badge-financial-scholar');

  // Check quiz badges
  if (progress.quizAttempts.length >= 1) unlock('badge-quiz-novice');
  if (event.type === 'quiz_completed' && event.quizScore && event.quizTotal && event.quizScore === event.quizTotal) {
    unlock('badge-century-club');
  }

  // Check calculator simulations
  if (progress.calculatorSimulationsRun >= 1) unlock('badge-compound-wizard');

  // Check tutor queries
  if (progress.tutorQueriesAsked >= 1) unlock('badge-ai-scholar');

  // Check streak
  if (event.streak && event.streak >= 3) unlock('badge-streak-keeper');

  const updatedProgress: UserProgress = {
    ...progress,
    unlockedBadgeIds: Array.from(currentUnlocked),
  };

  return { newUnlocked: newlyUnlocked, updatedProgress };
};

export const resetUserProgress = (): UserProgress => {
  const cleanProgress: UserProgress = {
    completedLessonIds: [],
    quizAttempts: [],
    unlockedBadgeIds: [],
    totalQuestionsAnswered: 0,
    calculatorSimulationsRun: 0,
    tutorQueriesAsked: 0,
    studyMinutes: 0,
  };
  saveStoredProgress(cleanProgress);
  return cleanProgress;
};

export const resetAllAppData = (): { profile: UserProfile; progress: UserProgress } => {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.CHAT_HISTORY);
  return {
    profile: DEFAULT_PROFILE,
    progress: DEFAULT_PROGRESS,
  };
};
