import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Trophy,
  RotateCcw,
  Sparkles,
  Flame,
  ArrowRight,
  Clock,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Calculator,
  CreditCard,
  Bot,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { UserProfile, UserProgress, NavigationTab } from '../../types';
import { LESSONS_DATA } from '../../data/lessonsData';
import { BADGES_DATA } from '../../data/badgesData';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface ProgressViewProps {
  userProfile: UserProfile;
  userProgress: UserProgress;
  onResetProgress: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onOpenLesson: (lessonId: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  userProfile,
  userProgress,
  onResetProgress,
  onNavigateTab,
  onOpenLesson,
}) => {
  const [showResetModal, setShowResetModal] = useState(false);

  const totalLessons = LESSONS_DATA.length;
  const completedCount = userProgress.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const quizAttempts = userProgress.quizAttempts;
  const avgQuizScore =
    quizAttempts.length > 0
      ? Math.round(
          quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0) /
            quizAttempts.length
        )
      : 0;

  // Next recommended lesson
  const nextLesson =
    LESSONS_DATA.find((l) => !userProgress.completedLessonIds.includes(l.id)) ||
    LESSONS_DATA[0];

  // Topic-wise progress breakdown
  const topicCategories = [
    { id: 'budgeting', label: 'Budgeting & 50/30/20' },
    { id: 'saving', label: 'Emergency Savings' },
    { id: 'inflation', label: 'Inflation & Purchasing Power' },
    { id: 'interest', label: 'Simple & Compound Interest' },
    { id: 'credit', label: 'Credit Scores & Borrowing' },
  ];

  const getTopicProgress = (catId: string) => {
    const topicLessons = LESSONS_DATA.filter((l) => l.category === catId);
    if (topicLessons.length === 0) return 0;
    const completed = topicLessons.filter((l) =>
      userProgress.completedLessonIds.includes(l.id)
    ).length;
    return Math.round((completed / topicLessons.length) * 100);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-teal-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'Award':
        return <Award className="w-5 h-5 text-amber-600" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-blue-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-rose-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-emerald-700" />;
      default:
        return <Award className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 pb-12 max-w-5xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white p-6 md:p-8 rounded-3xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-400/20">
            <Trophy className="w-3.5 h-3.5" />
            <span>Learning Milestones & Certifications</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Financial IQ Progress Center
          </h2>
          <p className="mt-1 text-xs md:text-sm text-emerald-100/80 max-w-xl">
            Track your journey from financial beginner to confident money manager. Review your quiz scores,
            unlocked badges, and category masteries.
          </p>
        </div>

        <button
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/20 hover:border-rose-400/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer self-start md:self-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* 4 Overview Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Overall Completion
          </span>
          <p className="mt-2 text-3xl font-extrabold text-slate-900">{progressPercent}%</p>
          <div className="mt-3 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {completedCount} of {totalLessons} Lessons Done
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Average Quiz Score
          </span>
          <p className="mt-2 text-3xl font-extrabold text-teal-600">{avgQuizScore}%</p>
          <p className="mt-4 text-xs text-slate-500">
            Across {quizAttempts.length} attempted quizzes
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Active Streak
          </span>
          <p className="mt-2 text-3xl font-extrabold text-amber-500">
            {userProfile.streakDays} Days
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Consistent daily learning habit
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Badges Earned
          </span>
          <p className="mt-2 text-3xl font-extrabold text-purple-600">
            {userProgress.unlockedBadgeIds.length} / {BADGES_DATA.length}
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Achievements unlocked
          </p>
        </div>
      </div>

      {/* Topic Mastery Progress Bars */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Topic-Wise Concept Mastery
        </h3>
        <div className="space-y-4">
          {topicCategories.map((cat) => {
            const pct = getTopicProgress(cat.id);
            return (
              <div key={cat.id} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>{cat.label}</span>
                  <span className={pct === 100 ? 'text-emerald-700' : 'text-slate-500'}>
                    {pct}% Mastered
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      pct === 100
                        ? 'bg-emerald-500'
                        : pct > 0
                        ? 'bg-teal-500'
                        : 'bg-slate-300'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievement Badges Showcase */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">
              Achievement Badges & Milestones
            </h3>
            <p className="text-xs text-slate-500">
              Unlock badges as you complete lessons, ace quizzes, and ask questions
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200">
            {userProgress.unlockedBadgeIds.length} of {BADGES_DATA.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {BADGES_DATA.map((badge) => {
            const isUnlocked = userProgress.unlockedBadgeIds.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all text-center flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-emerald-50/20 border-emerald-200 shadow-2xs'
                    : 'bg-slate-50/70 border-slate-200 opacity-60 grayscale'
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs ${
                      isUnlocked ? 'bg-white border border-emerald-200' : 'bg-slate-200'
                    }`}
                  >
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm">{badge.title}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isUnlocked
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? 'Unlocked ✨' : badge.requirement}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quiz History Log */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base">
          Quiz Attempt History
        </h3>

        {quizAttempts.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No quizzes completed yet. Head over to the Quizzes tab to test your financial IQ!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase text-[11px] font-bold">
                  <th className="pb-3">Quiz Name</th>
                  <th className="pb-3">Score</th>
                  <th className="pb-3">Percentage</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quizAttempts.map((attempt) => (
                  <tr key={attempt.id} className="hover:bg-slate-50">
                    <td className="py-3 font-bold text-slate-800">{attempt.quizTitle}</td>
                    <td className="py-3 text-slate-600">
                      {attempt.score} / {attempt.totalQuestions}
                    </td>
                    <td className="py-3 font-extrabold text-emerald-700">
                      {attempt.percentage}%
                    </td>
                    <td className="py-3 text-slate-400">
                      {new Date(attempt.timestamp).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                          attempt.percentage >= 80
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {attempt.percentage >= 80 ? 'Mastered' : 'Reviewed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirmation Modal for Resetting Progress */}
      <ConfirmationModal
        isOpen={showResetModal}
        title="Reset All Learning Progress?"
        message="This will reset all your completed lessons, quiz scores, and achievement badges to zero. Are you sure you want to start fresh?"
        confirmLabel="Reset Progress"
        isDestructive={true}
        onConfirm={() => {
          onResetProgress();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
};
