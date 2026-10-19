export type NavigationTab =
  | 'dashboard'
  | 'learn'
  | 'tutor'
  | 'calculators'
  | 'quizzes'
  | 'progress'
  | 'settings';

export type Currency = 'INR' | 'USD' | 'EUR';

export interface UserProfile {
  name: string;
  role: 'Student' | 'Beginner Saver' | 'Young Professional' | 'Aspiring Investor';
  monthlyGoal: number;
  streakDays: number;
  lastActiveDate: string;
  currency: Currency;
  weeklyActivity: number[]; // Study minutes per day [Mon, Tue, Wed, Thu, Fri, Sat, Sun]
}

export interface LessonObjective {
  id: string;
  text: string;
}

export interface LessonKnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  topic: string;
  title: string;
  subtitle: string;
  category: 'budgeting' | 'saving' | 'inflation' | 'interest' | 'credit';
  readTimeMinutes: number;
  difficulty: 'Beginner' | 'Intermediate';
  icon: string;
  objectives: string[];
  overview: string;
  keyConcepts: {
    title: string;
    description: string;
    highlight?: string;
  }[];
  relatableExample: {
    scenario: string;
    calculation?: string;
    takeaway: string;
  };
  proTip: string;
  knowledgeCheck: LessonKnowledgeCheck;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface Quiz {
  id: string;
  title: string;
  topic: string;
  category: 'budgeting' | 'saving' | 'inflation' | 'interest' | 'credit' | 'comprehensive';
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  timestamp: string;
  userAnswers: { [questionId: string]: number };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'lesson' | 'quiz' | 'streak' | 'calculator' | 'tutor';
  unlockedAt?: string;
  requirement: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  actionTag?: 'clear' | 'quiz' | 'inr_example';
  suggestedQuestions?: string[];
}

export interface UserProgress {
  completedLessonIds: string[];
  quizAttempts: QuizAttempt[];
  unlockedBadgeIds: string[];
  totalQuestionsAnswered: number;
  calculatorSimulationsRun: number;
  tutorQueriesAsked: number;
  studyMinutes: number;
}
