import { Badge } from '../types';

export const BADGES_DATA: Badge[] = [
  {
    id: 'badge-first-lesson',
    title: 'First Step',
    description: 'Completed your very first financial literacy lesson on MoneyMentor.',
    icon: 'BookOpen',
    category: 'lesson',
    requirement: 'Complete 1 lesson'
  },
  {
    id: 'badge-budget-boss',
    title: 'Budget Master',
    description: 'Mastered the 50/30/20 framework and expense tracking concepts.',
    icon: 'PieChart',
    category: 'lesson',
    requirement: 'Complete the Budgeting Basics lesson'
  },
  {
    id: 'badge-compound-wizard',
    title: 'Compound Wizard',
    description: 'Ran simulations with the compound interest calculator to unlock the 8th Wonder.',
    icon: 'Sparkles',
    category: 'calculator',
    requirement: 'Run 1 compound interest simulation'
  },
  {
    id: 'badge-quiz-novice',
    title: 'Quiz Contender',
    description: 'Completed your first financial knowledge check quiz.',
    icon: 'Award',
    category: 'quiz',
    requirement: 'Complete 1 topic quiz'
  },
  {
    id: 'badge-century-club',
    title: 'Century Club (100%)',
    description: 'Scored a perfect 100% on any topic quiz or the Financial IQ Championship.',
    icon: 'Trophy',
    category: 'quiz',
    requirement: 'Score 100% on any quiz'
  },
  {
    id: 'badge-ai-scholar',
    title: 'Curious Inquirer',
    description: 'Consulted the Gemini-powered MoneyMentor AI Tutor for personalized guidance.',
    icon: 'Bot',
    category: 'tutor',
    requirement: 'Ask at least 1 question to the AI tutor'
  },
  {
    id: 'badge-streak-keeper',
    title: 'Consistent Learner',
    description: 'Maintained a multi-day learning streak on MoneyMentor.',
    icon: 'Flame',
    category: 'streak',
    requirement: 'Achieve a 3-day learning streak'
  },
  {
    id: 'badge-financial-scholar',
    title: 'Financial Scholar',
    description: 'Completed all 6 core financial literacy lessons.',
    icon: 'GraduationCap',
    category: 'lesson',
    requirement: 'Complete all 6 learning lessons'
  }
];
