import React, { useState } from 'react';
import {
  BookOpen,
  Award,
  Flame,
  Bot,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  Play,
  RotateCw,
  Clock,
  Compass,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { NavigationTab, UserProfile, UserProgress, Currency } from '../../types';
import { LESSONS_DATA } from '../../data/lessonsData';
import { FINANCIAL_TIPS } from '../../data/tipsData';
import { formatCurrency } from '../../utils/formatters';

interface DashboardViewProps {
  userProfile: UserProfile;
  userProgress: UserProgress;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenLesson: (lessonId: string) => void;
  onQuickAskTutor: (prompt: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  userProgress,
  onNavigateTab,
  onOpenLesson,
  onQuickAskTutor,
}) => {
  const [tipIndex, setTipIndex] = useState(0);
  const currentTip = FINANCIAL_TIPS[tipIndex % FINANCIAL_TIPS.length];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % FINANCIAL_TIPS.length);
  };

  const totalLessons = LESSONS_DATA.length;
  const completedLessonsCount = userProgress.completedLessonIds.length;
  const progressPercent = Math.round((completedLessonsCount / totalLessons) * 100);

  // Compute average quiz score
  const quizAttempts = userProgress.quizAttempts;
  const averageQuizScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0) /
            quizAttempts.length
        )
      : 0;

  // Find next recommended lesson (first incomplete one, or budgeting)
  const nextLesson =
    LESSONS_DATA.find((l) => !userProgress.completedLessonIds.includes(l.id)) ||
    LESSONS_DATA[0];

  // Weekly study activity data
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activityData = daysOfWeek.map((day, idx) => ({
    day,
    minutes: userProfile.weeklyActivity[idx] || 0,
  }));

  const starterPrompts = [
    'Explain inflation like I am 15',
    'How does compound interest work with ₹1,000/mo?',
    'What is a healthy CIBIL credit score?',
    'Explain the 50/30/20 budget with ₹30,000',
  ];

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-12 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 text-xs font-semibold mb-3 backdrop-blur-xs border border-emerald-400/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Financial Freedom for Beginners & Students</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {userProfile.name}! 👋
            </h2>
            <p className="mt-2 text-emerald-100/90 text-sm md:text-base leading-relaxed">
              "An investment in knowledge pays the best interest." You have completed{' '}
              <strong className="text-white font-bold">{completedLessonsCount} of {totalLessons}</strong> core
              lessons. Ready to strengthen your financial IQ today?
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenLesson(nextLesson.id)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-900 font-bold text-sm shadow-md hover:bg-emerald-50 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 fill-emerald-900" />
                <span>Continue: {nextLesson.title.split(':')[0]}</span>
              </button>

              <button
                onClick={() => onNavigateTab('tutor')}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700/60 hover:bg-emerald-700 text-white font-semibold text-sm border border-emerald-500/30 transition-all cursor-pointer"
              >
                <Bot className="w-4 h-4" />
                <span>Ask AI Tutor</span>
              </button>
            </div>
          </div>

          {/* Quick Streak & Progress Visual */}
          <div className="shrink-0 flex md:flex-col items-center justify-center gap-4 bg-emerald-950/40 p-4 rounded-2xl border border-emerald-500/20 backdrop-blur-xs">
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-amber-500/20 text-amber-300 mb-1">
                <Flame className="w-6 h-6 fill-amber-400 stroke-amber-200 animate-pulse" />
              </div>
              <p className="text-2xl font-black text-white">{userProfile.streakDays} Days</p>
              <p className="text-xs text-emerald-300 font-medium">Daily Streak</p>
            </div>

            <div className="h-px md:w-full bg-emerald-700/50 hidden md:block" />

            <div className="text-center">
              <p className="text-2xl font-black text-emerald-300">{progressPercent}%</p>
              <p className="text-xs text-emerald-200 font-medium">Mastery</p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Card 1: Lessons Completed */}
        <div
          onClick={() => onNavigateTab('learn')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Lessons Completed
            </span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {completedLessonsCount}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ {totalLessons}</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>{progressPercent}% Complete</span>
            <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
              View all <ArrowRight className="w-3 h-3" />
            </span>
          </p>
        </div>

        {/* Card 2: Quizzes Taken & Avg Score */}
        <div
          onClick={() => onNavigateTab('quizzes')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Avg Quiz Score
            </span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {averageQuizScore}%
            </span>
            <span className="text-xs px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold">
              {quizAttempts.length} Taken
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500 leading-normal">
            {averageQuizScore >= 80
              ? 'Excellent performance! High financial retention.'
              : averageQuizScore > 0
              ? 'Great start! Keep testing concepts to sharpen skills.'
              : 'Take your first quiz to calculate average IQ.'}
          </p>
        </div>

        {/* Card 3: Learning Streak */}
        <div
          onClick={() => onNavigateTab('progress')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Learning Streak
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">
              {userProfile.streakDays}
            </span>
            <span className="text-sm font-semibold text-slate-500">Days Active</span>
          </div>
          <p className="mt-3 text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Study logged today. Streak is safe!
          </p>
        </div>

        {/* Card 4: Financial IQ Level */}
        <div
          onClick={() => onNavigateTab('progress')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Financial IQ Level
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:scale-110 transition-transform">
              <Compass className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 truncate">
              {completedLessonsCount >= 5
                ? 'Level 4: Maestro'
                : completedLessonsCount >= 3
                ? 'Level 3: Strategic'
                : completedLessonsCount >= 1
                ? 'Level 2: Apprentice'
                : 'Level 1: Novice'}
            </span>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            {userProgress.unlockedBadgeIds.length} Badges Unlocked • {userProgress.studyMinutes} Mins
          </p>
        </div>
      </div>

      {/* Main Grid: Weekly Activity Chart + Recommended Lesson & Daily Tip */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Weekly Learning Activity</h3>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                  Daily Study Time
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Your focused minutes dedicated to financial lessons and calculators
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                This Week: {activityData.reduce((acc, c) => acc + c.minutes, 0)} mins
              </span>
            </div>
          </div>

          {/* Recharts Bar Chart */}
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  unit="m"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    border: 'none',
                    fontSize: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  }}
                  formatter={(value: any) => [`${value} minutes`, 'Study Time']}
                />
                <Bar
                  dataKey="minutes"
                  fill="#059669"
                  radius={[8, 8, 2, 2]}
                  animationDuration={1000}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Consistent 15-20 min daily sessions yield highest retention.</span>
            <span className="text-emerald-700 font-semibold cursor-pointer" onClick={() => onNavigateTab('learn')}>
              Explore all topics →
            </span>
          </div>
        </div>

        {/* Right Column: Daily Tip & Recommended Lesson */}
        <div className="space-y-6">
          {/* Daily Financial Tip Card */}
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-white p-5 rounded-2xl border border-amber-200/80 shadow-xs relative">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white shadow-2xs">
                  <Lightbulb className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  Daily Financial Tip
                </span>
              </div>
              <button
                onClick={handleNextTip}
                className="p-1.5 text-amber-700 hover:text-amber-900 hover:bg-amber-100/60 rounded-lg transition-colors cursor-pointer"
                title="Shuffle next tip"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
              {currentTip.category} • {currentTip.readTime}
            </span>

            <h4 className="mt-2 text-sm font-bold text-slate-900">{currentTip.title}</h4>
            <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{currentTip.tip}</p>

            <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px] text-amber-800 font-medium">
              <span>💡 {currentTip.authorNote}</span>
            </div>
          </div>

          {/* Recommended Next Lesson Spotlight */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Up Next for You
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                {nextLesson.difficulty}
              </span>
            </div>

            <h4 className="text-base font-bold text-slate-900">{nextLesson.title}</h4>
            <p className="mt-1 text-xs text-slate-600 line-clamp-2">{nextLesson.subtitle}</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{nextLesson.readTimeMinutes} min read</span>
              </div>

              <button
                onClick={() => onOpenLesson(nextLesson.id)}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <span>Start Lesson</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Tutor Entry Point Widget */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 p-6 rounded-3xl border border-emerald-200/70 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/30 shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Ask MoneyMentor AI Tutor
                </h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-200/60 text-emerald-900">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="mt-1 text-xs md:text-sm text-slate-600 max-w-xl">
                Have a question about budgeting, saving, compound interest, inflation, or credit scores?
                Ask right here for simplified beginner-friendly explanations with Indian Rupee examples.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('tutor')}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition-all cursor-pointer whitespace-nowrap self-start md:self-center"
          >
            Open Full Chat →
          </button>
        </div>

        {/* Suggested Quick Prompt Chips */}
        <div className="mt-5 pt-4 border-t border-emerald-200/50 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Quick prompts:</span>
          {starterPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => onQuickAskTutor(prompt)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100/70 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 shadow-2xs transition-all cursor-pointer"
            >
              💬 "{prompt}"
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
