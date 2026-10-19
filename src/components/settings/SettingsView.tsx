import React, { useState } from 'react';
import {
  User,
  Globe,
  Target,
  Shield,
  RotateCcw,
  Sparkles,
  Info,
  Check,
  Save,
  Trash2,
} from 'lucide-react';
import { UserProfile, Currency } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface SettingsViewProps {
  userProfile: UserProfile;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onResetAllData: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  onResetAllData,
}) => {
  const [name, setName] = useState(userProfile.name);
  const [role, setRole] = useState(userProfile.role);
  const [monthlyGoal, setMonthlyGoal] = useState(userProfile.monthlyGoal);
  const [currency, setCurrency] = useState<Currency>(userProfile.currency);
  const [isSaved, setIsSaved] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const roles: Array<UserProfile['role']> = [
    'Student',
    'Beginner Saver',
    'Young Professional',
    'Aspiring Investor',
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name: name.trim() || 'Learner',
      role,
      monthlyGoal: Math.max(0, monthlyGoal),
      currency,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <form onSubmit={handleSave} className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">User Profile & Preferences</h2>
          <p className="text-xs text-slate-500 mt-1">
            Customize your learning persona and financial tracking goals
          </p>
        </div>

        {/* Name & Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Display Name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="w-full p-2.5 pl-9 rounded-xl border border-slate-200 text-xs md:text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-hidden"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Financial Stage / Persona</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserProfile['role'])}
              className="w-full p-2.5 rounded-xl border border-slate-200 text-xs md:text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-hidden bg-white cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Currency & Monthly Goal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Preferred Currency</label>
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="w-full p-2.5 pl-9 rounded-xl border border-slate-200 text-xs md:text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-hidden bg-white cursor-pointer"
              >
                <option value="INR">₹ INR (Indian Rupee - Default)</option>
                <option value="USD">$ USD (US Dollar)</option>
                <option value="EUR">€ EUR (Euro)</option>
              </select>
              <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Monthly Savings Target</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="500"
                value={monthlyGoal}
                onChange={(e) => setMonthlyGoal(Number(e.target.value))}
                className="w-full p-2.5 pl-9 rounded-xl border border-slate-200 text-xs md:text-sm font-semibold text-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-hidden"
              />
              <Target className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-2 flex items-center justify-between">
          {isSaved ? (
            <span className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              Preferences saved successfully!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Updates will persist in your browser.</span>
          )}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>

      {/* Privacy & Storage Guarantee */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Local Privacy Guarantee</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          MoneyMentor stores your learning progress, quiz attempts, and settings strictly in your browser’s{' '}
          <code className="text-slate-800 bg-slate-200 px-1 py-0.5 rounded text-[11px]">localStorage</code>.
          We never ask for bank credentials, credit card numbers, or passwords. Your data stays entirely in your hands.
        </p>
      </div>

      {/* Educational Disclaimer */}
      <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-6 space-y-2">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
          <Info className="w-4 h-4 text-amber-600" />
          <span>Educational Disclaimer</span>
        </div>
        <p className="text-xs text-amber-950/80 leading-relaxed">
          MoneyMentor is built solely for educational purposes. All content, simulations, formulas, and AI responses are intended to teach foundational financial principles. They do not constitute personalized investment, legal, or tax advisory.
        </p>
      </div>

      {/* Danger Zone: Reset All Data */}
      <div className="bg-white rounded-3xl border border-rose-200 p-6 space-y-4">
        <div>
          <h3 className="font-extrabold text-rose-900 text-sm">Reset All App Data</h3>
          <p className="text-xs text-rose-700/80 mt-0.5">
            Clear all profile records, chat history, progress, badges, and restore factory defaults.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowResetModal(true)}
          className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Trash2 className="w-4 h-4" />
          <span>Reset Everything to Default</span>
        </button>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showResetModal}
        title="Reset All MoneyMentor Data?"
        message="This will completely clear your learning progress, chat conversations, custom profile settings, and restored defaults. Are you sure you want to proceed?"
        confirmLabel="Reset All Data"
        isDestructive={true}
        onConfirm={() => {
          onResetAllData();
          setShowResetModal(false);
        }}
        onCancel={() => setShowResetModal(false)}
      />
    </div>
  );
};
