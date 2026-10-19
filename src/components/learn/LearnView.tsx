import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  Bot,
  HelpCircle,
  Lightbulb,
  Sparkles,
  Award,
  Filter,
  Check,
  X,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Calculator,
  CreditCard,
} from 'lucide-react';
import { Lesson, NavigationTab, UserProgress } from '../../types';
import { LESSONS_DATA } from '../../data/lessonsData';

interface LearnViewProps {
  userProgress: UserProgress;
  onToggleLessonCompletion: (lessonId: string) => void;
  onOpenTutorWithContext: (topicContext: string, prompt?: string) => void;
  onNavigateTab: (tab: NavigationTab) => void;
  activeLessonId?: string | null;
  onSelectLessonId?: (id: string | null) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  userProgress,
  onToggleLessonCompletion,
  onOpenTutorWithContext,
  onNavigateTab,
  activeLessonId,
  onSelectLessonId,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(
    activeLessonId ? LESSONS_DATA.find((l) => l.id === activeLessonId) || null : null
  );

  // In-lesson interactive knowledge-check state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmittedCheck, setHasSubmittedCheck] = useState<boolean>(false);

  // Sync prop changes
  React.useEffect(() => {
    if (activeLessonId) {
      const match = LESSONS_DATA.find((l) => l.id === activeLessonId);
      if (match) {
        setActiveLesson(match);
        setSelectedOption(null);
        setHasSubmittedCheck(false);
      }
    }
  }, [activeLessonId]);

  const categories = [
    { id: 'all', label: 'All Modules' },
    { id: 'budgeting', label: 'Budgeting' },
    { id: 'saving', label: 'Saving' },
    { id: 'inflation', label: 'Inflation' },
    { id: 'interest', label: 'Interest' },
    { id: 'credit', label: 'Credit Scores' },
  ];

  const filteredLessons = LESSONS_DATA.filter((lesson) => {
    if (selectedCategory === 'all') return true;
    return lesson.category === selectedCategory;
  });

  const getLessonIcon = (iconName: string) => {
    switch (iconName) {
      case 'PieChart':
        return <PieChart className="w-5 h-5 text-emerald-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'CreditCard':
        return <CreditCard className="w-5 h-5 text-rose-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-emerald-600" />;
    }
  };

  const handleOpenLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
    setSelectedOption(null);
    setHasSubmittedCheck(false);
    if (onSelectLessonId) onSelectLessonId(lesson.id);
  };

  const handleCloseLesson = () => {
    setActiveLesson(null);
    if (onSelectLessonId) onSelectLessonId(null);
  };

  const handleCheckKnowledge = () => {
    if (selectedOption === null) return;
    setHasSubmittedCheck(true);
    if (activeLesson && selectedOption === activeLesson.knowledgeCheck.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    }
  };

  const handleToggleComplete = (lessonId: string) => {
    const isCompleted = userProgress.completedLessonIds.includes(lessonId);
    onToggleLessonCompletion(lessonId);
    if (!isCompleted) {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Category Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 md:p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400 mr-1 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Showing {filteredLessons.length} of {LESSONS_DATA.length} core lessons
        </div>
      </div>

      {/* Lesson Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLessons.map((lesson, index) => {
          const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
          return (
            <div
              key={lesson.id}
              className={`bg-white rounded-2xl border transition-all flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                isCompleted
                  ? 'border-emerald-200 bg-emerald-50/15'
                  : 'border-slate-200 hover:border-emerald-300'
              }`}
            >
              {/* Card Header */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 capitalize">
                    {lesson.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {lesson.readTimeMinutes} min
                    </span>

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                        <Check className="w-3 h-3 stroke-3" />
                        Done
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                    {getLessonIcon(lesson.icon)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>
                </div>

                {/* Key Objective Preview */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                    Core Focus
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    🎯 {lesson.objectives[0]}
                  </p>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleToggleComplete(lesson.id)}
                  className={`text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isCompleted
                      ? 'text-emerald-700 hover:text-emerald-800'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                >
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      isCompleted ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'
                    }`}
                  />
                  <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
                </button>

                <button
                  onClick={() => handleOpenLesson(lesson)}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1"
                >
                  <span>{isCompleted ? 'Review' : 'Start'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lesson Reader Modal */}
      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
            {/* Modal Header */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  {getLessonIcon(activeLesson.icon)}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">
                    {activeLesson.category} • {activeLesson.difficulty}
                  </span>
                  <h2 className="text-lg md:text-xl font-extrabold text-slate-900 leading-tight">
                    {activeLesson.title}
                  </h2>
                </div>
              </div>

              <button
                onClick={handleCloseLesson}
                className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Close lesson"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1">
              {/* Learning Objectives Box */}
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-700" />
                  What You Will Learn
                </h4>
                <ul className="space-y-1.5 text-xs md:text-sm text-emerald-950">
                  {activeLesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overview */}
              <div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
                  {activeLesson.overview}
                </p>
              </div>

              {/* Key Concept Blocks */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Key Principles
                </h4>
                <div className="grid grid-cols-1 gap-3">
                  {activeLesson.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80"
                    >
                      <h5 className="font-bold text-slate-900 text-sm">{concept.title}</h5>
                      <p className="mt-1 text-xs md:text-sm text-slate-600 leading-relaxed">
                        {concept.description}
                      </p>
                      {concept.highlight && (
                        <div className="mt-2 text-xs font-semibold text-emerald-700 bg-emerald-100/50 px-2.5 py-1 rounded-lg inline-block">
                          💡 {concept.highlight}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Relatable Indian Rupee (₹) Real-world Example */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🇮🇳</span>
                  <h4 className="text-sm font-bold text-teal-950">
                    Relatable Real-World Scenario
                  </h4>
                </div>
                <p className="text-xs md:text-sm text-slate-700 mb-2 font-medium">
                  {activeLesson.relatableExample.scenario}
                </p>
                {activeLesson.relatableExample.calculation && (
                  <div className="my-2 p-3 rounded-xl bg-white/80 border border-teal-200 font-mono text-xs text-slate-800 whitespace-pre-line leading-relaxed">
                    {activeLesson.relatableExample.calculation}
                  </div>
                )}
                <p className="text-xs font-semibold text-teal-800 mt-2">
                  ✨ <strong>Key Takeaway:</strong> {activeLesson.relatableExample.takeaway}
                </p>
              </div>

              {/* Pro Tip */}
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    MoneyMentor Pro-Tip
                  </h5>
                  <p className="mt-1 text-xs md:text-sm text-amber-950 leading-relaxed">
                    {activeLesson.proTip}
                  </p>
                </div>
              </div>

              {/* In-Lesson Interactive Knowledge-Check Question */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-lg space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Knowledge Check
                  </span>
                  <span className="text-xs text-slate-400">1 Quick Question</span>
                </div>

                <p className="text-sm font-bold text-white leading-relaxed">
                  {activeLesson.knowledgeCheck.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {activeLesson.knowledgeCheck.options.map((option, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === activeLesson.knowledgeCheck.correctIndex;
                    let optionStyle = 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700';

                    if (hasSubmittedCheck) {
                      if (isCorrect) {
                        optionStyle = 'bg-emerald-600/90 text-white border-emerald-500 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'bg-rose-600/80 text-white border-rose-500 line-through';
                      } else {
                        optionStyle = 'bg-slate-800/40 text-slate-500 border-slate-700/50';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-emerald-950 text-emerald-200 border-emerald-500 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        disabled={hasSubmittedCheck}
                        onClick={() => setSelectedOption(optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {hasSubmittedCheck && isCorrect && (
                          <Check className="w-4 h-4 text-emerald-300 stroke-3" />
                        )}
                        {hasSubmittedCheck && isSelected && !isCorrect && (
                          <X className="w-4 h-4 text-rose-300 stroke-3" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Submit / Feedback */}
                {!hasSubmittedCheck ? (
                  <button
                    onClick={handleCheckKnowledge}
                    disabled={selectedOption === null}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-40 text-slate-950 font-bold text-xs md:text-sm transition-all cursor-pointer"
                  >
                    Check Answer
                  </button>
                ) : (
                  <div
                    className={`p-3.5 rounded-xl text-xs md:text-sm leading-relaxed ${
                      selectedOption === activeLesson.knowledgeCheck.correctIndex
                        ? 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-200'
                        : 'bg-rose-950/80 border border-rose-500/50 text-rose-200'
                    }`}
                  >
                    <p className="font-bold mb-1">
                      {selectedOption === activeLesson.knowledgeCheck.correctIndex
                        ? '🎉 Spot on! Great understanding.'
                        : '💡 Close, but let’s review:'}
                    </p>
                    <p>{activeLesson.knowledgeCheck.explanation}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Sticky Actions */}
            <div className="sticky bottom-0 bg-white/95 backdrop-blur-md px-6 py-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    onOpenTutorWithContext(
                      activeLesson.topic,
                      `Explain ${activeLesson.title} in simpler terms with another everyday example.`
                    )
                  }
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Bot className="w-4 h-4 text-emerald-600" />
                  <span>Ask AI Tutor</span>
                </button>

                <button
                  onClick={() => {
                    handleCloseLesson();
                    onNavigateTab('quizzes');
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-teal-600" />
                  <span>Take Quiz</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleComplete(activeLesson.id)}
                  className={`px-5 py-2 rounded-xl text-xs md:text-sm font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
                    userProgress.completedLessonIds.includes(activeLesson.id)
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {userProgress.completedLessonIds.includes(activeLesson.id)
                      ? 'Lesson Completed ✓'
                      : 'Mark Lesson as Complete'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
