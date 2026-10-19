import React, { useState } from 'react';
import {
  Menu,
  Bot,
  Flame,
  Award,
  Globe,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { NavigationTab, Currency, UserProfile, UserProgress } from '../../types';

interface NavbarProps {
  currentTab: NavigationTab;
  onOpenMobileMenu: () => void;
  onNavigateToTab: (tab: NavigationTab) => void;
  userProfile: UserProfile;
  userProgress: UserProgress;
  onCurrencyChange: (currency: Currency) => void;
  onQuickAsk: (prompt: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onOpenMobileMenu,
  onNavigateToTab,
  userProfile,
  userProgress,
  onCurrencyChange,
  onQuickAsk,
}) => {
  const [quickInput, setQuickInput] = useState('');
  const [showTipModal, setShowTipModal] = useState(false);

  const tabTitles: Record<NavigationTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: 'Dashboard Overview',
      subtitle: `Welcome back, ${userProfile.name}! Let's build your financial freedom.`,
    },
    learn: {
      title: 'Interactive Learning Library',
      subtitle: '6 fundamental modules covering budgeting, inflation, interest & credit.',
    },
    tutor: {
      title: 'AI Finance Tutor',
      subtitle: 'Ask any money question. Clear, beginner-friendly explanations powered by Gemini.',
    },
    calculators: {
      title: 'Financial Calculators',
      subtitle: 'Compound interest simulation, inflation loss projection & 50/30/20 allocator.',
    },
    quizzes: {
      title: 'Knowledge Quizzes',
      subtitle: 'Sharpen your financial instincts with instant feedback & explanations.',
    },
    progress: {
      title: 'Personal Learning Progress',
      subtitle: 'Track your milestones, quiz history, mastery metrics & unlock badges.',
    },
    settings: {
      title: 'Settings & Preferences',
      subtitle: 'Manage your profile, target savings, currency display & reset options.',
    },
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onQuickAsk(quickInput.trim());
    setQuickInput('');
  };

  const avgQuizScore =
    userProgress.quizAttempts.length > 0
      ? Math.round(
          userProgress.quizAttempts.reduce((acc, curr) => acc + curr.percentage, 0) /
            userProgress.quizAttempts.length
        )
      : 0;

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 md:hidden cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">
              {tabTitles[currentTab]?.title || 'MoneyMentor'}
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              {tabTitles[currentTab]?.subtitle || 'Financial Literacy AI'}
            </p>
          </div>
        </div>

        {/* Center: Quick AI Ask Input (Desktop) */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
          <form onSubmit={handleQuickSubmit} className="relative w-full">
            <input
              type="text"
              value={quickInput}
              onChange={(e) => setQuickInput(e.target.value)}
              placeholder="Ask AI Tutor: 'Explain inflation' or 'Compound interest'..."
              className="w-full bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs md:text-sm text-slate-900 placeholder:text-slate-400 pl-9 pr-20 py-2 rounded-xl border border-transparent focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-hidden"
            />
            <Bot className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
            <button
              type="submit"
              disabled={!quickInput.trim()}
              className="absolute right-1.5 top-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 transition-all cursor-pointer"
            >
              Ask AI
            </button>
          </form>
        </div>

        {/* Right: Badges & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Pill */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 text-amber-800 border border-amber-200/60 text-xs font-bold shadow-2xs">
            <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{userProfile.streakDays}d Streak</span>
          </div>

          {/* Average Quiz Score / IQ Badge */}
          {userProgress.quizAttempts.length > 0 && (
            <div
              onClick={() => onNavigateToTab('progress')}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold cursor-pointer hover:bg-emerald-100 transition-colors shadow-2xs"
              title="Average Quiz Score"
            >
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>{avgQuizScore}% Avg IQ</span>
            </div>
          )}

          {/* Currency Selector */}
          <div className="relative">
            <div className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200/70 border border-slate-200/80 rounded-xl px-2.5 py-1 transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <select
                value={userProfile.currency}
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-hidden cursor-pointer"
                aria-label="Select currency"
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="EUR">€ EUR</option>
              </select>
            </div>
          </div>

          {/* Quick AI Tutor Button for Mobile */}
          <button
            onClick={() => onNavigateToTab('tutor')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-sm shadow-emerald-600/20 hover:from-emerald-700 hover:to-teal-700 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>
        </div>
      </div>
    </header>
  );
};
