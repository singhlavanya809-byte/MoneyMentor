/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/dashboard/DashboardView';
import { LearnView } from './components/learn/LearnView';
import { TutorView } from './components/tutor/TutorView';
import { CalculatorsView } from './components/calculators/CalculatorsView';
import { QuizzesView } from './components/quizzes/QuizzesView';
import { ProgressView } from './components/progress/ProgressView';
import { SettingsView } from './components/settings/SettingsView';
import {
  NavigationTab,
  UserProfile,
  UserProgress,
  ChatMessage,
  QuizAttempt,
  Currency,
} from './types';
import {
  getStoredProfile,
  saveStoredProfile,
  getStoredProgress,
  saveStoredProgress,
  getStoredChatHistory,
  saveStoredChatHistory,
  checkAndUpdateBadges,
  resetUserProgress,
  resetAllAppData,
} from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stored state
  const [userProfile, setUserProfile] = useState<UserProfile>(getStoredProfile);
  const [userProgress, setUserProgress] = useState<UserProgress>(getStoredProgress);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>(getStoredChatHistory);

  // Lesson & Tutor contextual state
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [tutorContextTopic, setTutorContextTopic] = useState<string | null>(null);
  const [isTutorLoading, setIsTutorLoading] = useState(false);

  // Sync profile changes to localStorage
  useEffect(() => {
    saveStoredProfile(userProfile);
  }, [userProfile]);

  // Sync progress changes to localStorage
  useEffect(() => {
    saveStoredProgress(userProgress);
  }, [userProgress]);

  // Sync chat changes to localStorage
  useEffect(() => {
    saveStoredChatHistory(chatHistory);
  }, [chatHistory]);

  // Handle AI Tutor Message
  const handleSendMessage = async (
    messageText: string,
    actionType: 'general' | 'clear' | 'quiz' | 'inr_example' = 'general',
    context?: string
  ) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newChat = [...chatHistory, userMsg];
    setChatHistory(newChat);
    setIsTutorLoading(true);

    try {
      const response = await fetch('/api/tutor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          conversationHistory: newChat.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          actionType,
          lessonContext: context || tutorContextTopic,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with ${response.status}`);
      }

      const data = await response.json();
      const aiReply = data.reply || "I couldn't generate a response. Please try asking again!";

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'model',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChatHistory((prev) => [...prev, aiMsg]);

      // Update progress & check badges
      setUserProgress((prev) => {
        const nextProgress = {
          ...prev,
          tutorQueriesAsked: prev.tutorQueriesAsked + 1,
        };
        const { updatedProgress } = checkAndUpdateBadges(nextProgress, {
          type: 'tutor_queried',
          streak: userProfile.streakDays,
        });
        return updatedProgress;
      });
    } catch (err: any) {
      console.error('Tutor chat error:', err);
      // Fallback message so user never sees a broken screen
      const fallbackMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'model',
        content:
          "⚠️ **Notice from MoneyMentor:** I had a temporary issue connecting to the AI server. Here is a quick educational summary:\n\n• **Core Principle:** In personal finance, always prioritize building a 3-6 month emergency fund, automating 20% savings into diversified assets, and beating 6% annual inflation.\n\nPlease check your internet connection or try asking again!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatHistory((prev) => [...prev, fallbackMsg]);
      throw err;
    } finally {
      setIsTutorLoading(false);
    }
  };

  // Open Lesson Handler
  const handleOpenLesson = (lessonId: string) => {
    setActiveLessonId(lessonId);
    setCurrentTab('learn');
  };

  // Toggle Lesson Completion
  const handleToggleLessonCompletion = (lessonId: string) => {
    setUserProgress((prev) => {
      const isAlreadyCompleted = prev.completedLessonIds.includes(lessonId);
      const newCompleted = isAlreadyCompleted
        ? prev.completedLessonIds.filter((id) => id !== lessonId)
        : [...prev.completedLessonIds, lessonId];

      const newProgress: UserProgress = {
        ...prev,
        completedLessonIds: newCompleted,
        studyMinutes: isAlreadyCompleted ? prev.studyMinutes : prev.studyMinutes + 15,
      };

      const { updatedProgress } = checkAndUpdateBadges(newProgress, {
        type: 'lesson_completed',
        lessonId,
        streak: userProfile.streakDays,
      });

      return updatedProgress;
    });
  };

  // Save Quiz Attempt
  const handleSaveQuizAttempt = (attempt: QuizAttempt) => {
    setUserProgress((prev) => {
      const updatedAttempts = [attempt, ...prev.quizAttempts];
      const newProgress: UserProgress = {
        ...prev,
        quizAttempts: updatedAttempts,
        totalQuestionsAnswered: prev.totalQuestionsAnswered + attempt.totalQuestions,
      };

      const { updatedProgress } = checkAndUpdateBadges(newProgress, {
        type: 'quiz_completed',
        quizScore: attempt.score,
        quizTotal: attempt.totalQuestions,
        streak: userProfile.streakDays,
      });

      return updatedProgress;
    });
  };

  // Run Calculator Simulation
  const handleSimulationRun = () => {
    setUserProgress((prev) => {
      const newProgress: UserProgress = {
        ...prev,
        calculatorSimulationsRun: prev.calculatorSimulationsRun + 1,
      };
      const { updatedProgress } = checkAndUpdateBadges(newProgress, {
        type: 'simulation_run',
        streak: userProfile.streakDays,
      });
      return updatedProgress;
    });
  };

  // Quick Ask from Navbar or Dashboard
  const handleQuickAsk = (prompt: string) => {
    setCurrentTab('tutor');
    handleSendMessage(prompt);
  };

  // Open Tutor with Topic Context
  const handleOpenTutorWithContext = (topicContext: string, prompt?: string) => {
    setTutorContextTopic(topicContext);
    setCurrentTab('tutor');
    if (prompt) {
      handleSendMessage(prompt, 'general', topicContext);
    }
  };

  // Currency Change Handler
  const handleCurrencyChange = (newCurrency: Currency) => {
    setUserProfile((prev) => ({ ...prev, currency: newCurrency }));
  };

  // Update Profile
  const handleUpdateProfile = (updated: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updated }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    const clean = resetUserProgress();
    setUserProgress(clean);
  };

  // Reset All App Data
  const handleResetAllData = () => {
    const { profile, progress } = resetAllAppData();
    setUserProfile(profile);
    setUserProgress(progress);
    setChatHistory(getStoredChatHistory());
    setCurrentTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'learn') setActiveLessonId(null);
        }}
        userProfile={userProfile}
        userProgress={userProgress}
        isMobileOpen={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar */}
        <Navbar
          currentTab={currentTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onNavigateToTab={(tab) => {
            setCurrentTab(tab);
            if (tab !== 'learn') setActiveLessonId(null);
          }}
          userProfile={userProfile}
          userProgress={userProgress}
          onCurrencyChange={handleCurrencyChange}
          onQuickAsk={handleQuickAsk}
        />

        {/* View Routing */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && (
            <DashboardView
              userProfile={userProfile}
              userProgress={userProgress}
              onNavigateTab={(tab) => {
                setCurrentTab(tab);
                if (tab !== 'learn') setActiveLessonId(null);
              }}
              onOpenLesson={handleOpenLesson}
              onQuickAskTutor={handleQuickAsk}
            />
          )}

          {currentTab === 'learn' && (
            <LearnView
              userProgress={userProgress}
              onToggleLessonCompletion={handleToggleLessonCompletion}
              onOpenTutorWithContext={handleOpenTutorWithContext}
              onNavigateTab={setCurrentTab}
              activeLessonId={activeLessonId}
              onSelectLessonId={setActiveLessonId}
            />
          )}

          {currentTab === 'tutor' && (
            <TutorView
              chatHistory={chatHistory}
              onSendMessage={handleSendMessage}
              isLoading={isTutorLoading}
              onClearHistory={() => {
                setChatHistory([]);
                localStorage.removeItem('moneymentor_chat_history_v1');
              }}
              activeContextTopic={tutorContextTopic}
              onClearContext={() => setTutorContextTopic(null)}
              userProgress={userProgress}
            />
          )}

          {currentTab === 'calculators' && (
            <CalculatorsView
              currency={userProfile.currency}
              onSimulationRun={handleSimulationRun}
              onAskTutorWithCalculation={(q) => handleOpenTutorWithContext('Compound Interest', q)}
            />
          )}

          {currentTab === 'quizzes' && (
            <QuizzesView
              userProgress={userProgress}
              onSaveQuizAttempt={handleSaveQuizAttempt}
              onNavigateLearn={() => setCurrentTab('learn')}
            />
          )}

          {currentTab === 'progress' && (
            <ProgressView
              userProfile={userProfile}
              userProgress={userProgress}
              onResetProgress={handleResetProgress}
              onNavigateTab={setCurrentTab}
              onOpenLesson={handleOpenLesson}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              userProfile={userProfile}
              onUpdateProfile={handleUpdateProfile}
              onResetAllData={handleResetAllData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
