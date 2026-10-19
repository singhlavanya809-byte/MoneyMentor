import React from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  Calculator,
  HelpCircle,
  BarChart3,
  Settings,
  Sparkles,
  Flame,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { NavigationTab, UserProfile, UserProgress } from '../../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  userProfile: UserProfile;
  userProgress: UserProgress;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  userProfile,
  userProgress,
  isMobileOpen,
  onCloseMobile,
}) => {
  const navItems: Array<{
    id: NavigationTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }> = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    {
      id: 'learn',
      label: 'Learn Library',
      icon: BookOpen,
      badge: `${userProgress.completedLessonIds.length}/6`,
    },
    { id: 'tutor', label: 'AI Finance Tutor', icon: Bot, badge: 'Gemini' },
    { id: 'calculators', label: 'Calculators', icon: Calculator },
    { id: 'quizzes', label: 'Quizzes', icon: HelpCircle },
    { id: 'progress', label: 'My Progress', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    onSelectTab(tab);
    onCloseMobile();
  };

  const progressPercent = Math.round((userProgress.completedLessonIds.length / 6) * 100);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen w-72 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-600/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                  MoneyMentor
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  AI
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Financial Literacy Platform</p>
            </div>
          </div>

          {/* Quick Streak Pill */}
          <div className="mt-4 p-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/70 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500 text-white shadow-xs">
                <Flame className="w-4 h-4 fill-amber-300 stroke-amber-100 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">{userProfile.streakDays}-Day Streak!</p>
                <p className="text-[11px] text-emerald-700 font-medium">Keep the momentum going</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200 shadow-2xs">
              Active
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-400 uppercase mb-2">
            Menu
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'Gemini'
                        ? 'bg-teal-50 text-teal-700 border border-teal-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile & Progress Summary */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60">
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Course Progress
              </span>
              <span className="font-bold text-emerald-700">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div
            onClick={() => handleNavClick('settings')}
            className="flex items-center justify-between p-2 rounded-xl hover:bg-white hover:shadow-2xs transition-all cursor-pointer border border-transparent hover:border-slate-200"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shadow-2xs">
                {userProfile.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-xs font-bold text-slate-800 truncate">{userProfile.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{userProfile.role}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>
    </>
  );
};
