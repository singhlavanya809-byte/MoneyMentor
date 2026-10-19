import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCw,
  Trophy,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
  ChevronLeft,
  Check,
  X,
  PieChart,
  ShieldCheck,
  TrendingUp,
  Calculator,
  CreditCard,
} from 'lucide-react';
import { Quiz, QuizAttempt, UserProgress } from '../../types';
import { QUIZZES_DATA } from '../../data/quizzesData';

interface QuizzesViewProps {
  userProgress: UserProgress;
  onSaveQuizAttempt: (attempt: QuizAttempt) => void;
  onNavigateLearn: () => void;
}

export const QuizzesView: React.FC<QuizzesViewProps> = ({
  userProgress,
  onSaveQuizAttempt,
  onNavigateLearn,
}) => {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<{ [questionId: string]: number }>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const handleStartQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeQuiz || isAnswerSubmitted) return;

    const currentQ = activeQuiz.questions[currentQuestionIndex];
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: selectedOption,
    }));
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;

    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      activeQuiz.questions.forEach((q) => {
        if (userAnswers[q.id] === q.correctIndex) {
          correctCount++;
        }
      });

      const percentage = Math.round((correctCount / activeQuiz.questions.length) * 100);
      const attempt: QuizAttempt = {
        id: `attempt-${Date.now()}`,
        quizId: activeQuiz.id,
        quizTitle: activeQuiz.title,
        score: correctCount,
        totalQuestions: activeQuiz.questions.length,
        percentage,
        timestamp: new Date().toISOString(),
        userAnswers,
      };

      onSaveQuizAttempt(attempt);
      setIsFinished(true);

      if (percentage >= 75) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleRetry = () => {
    if (!activeQuiz) return;
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers({});
    setIsFinished(false);
  };

  const handleBackToList = () => {
    setActiveQuiz(null);
    setIsFinished(false);
  };

  const getBestScore = (quizId: string) => {
    const attempts = userProgress.quizAttempts.filter((a) => a.quizId === quizId);
    if (attempts.length === 0) return null;
    return Math.max(...attempts.map((a) => a.percentage));
  };

  const getTopicIcon = (category: string) => {
    switch (category) {
      case 'budgeting':
        return <PieChart className="w-5 h-5 text-emerald-600" />;
      case 'saving':
        return <ShieldCheck className="w-5 h-5 text-teal-600" />;
      case 'inflation':
        return <TrendingUp className="w-5 h-5 text-amber-600" />;
      case 'interest':
        return <Calculator className="w-5 h-5 text-blue-600" />;
      case 'credit':
        return <CreditCard className="w-5 h-5 text-rose-600" />;
      default:
        return <Trophy className="w-5 h-5 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      {/* 1. QUIZ LIST VIEW */}
      {!activeQuiz && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-900 to-emerald-950 text-white p-6 md:p-8 rounded-3xl shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 text-xs font-semibold mb-3 border border-teal-400/20">
              <Award className="w-3.5 h-3.5" />
              <span>Interactive Knowledge Assessments</span>
            </div>
            <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
              Test Your Financial Wisdom
            </h2>
            <p className="mt-1 text-xs md:text-sm text-teal-100/80 max-w-xl">
              Sharpen your money instincts with bite-sized multiple choice quizzes. Instant feedback,
              detailed mathematical explanations, and verifiable progress.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {QUIZZES_DATA.map((quiz) => {
              const bestScore = getBestScore(quiz.id);
              const isComprehensive = quiz.category === 'comprehensive';
              return (
                <div
                  key={quiz.id}
                  className={`bg-white rounded-2xl border p-5 flex flex-col justify-between shadow-xs hover:shadow-md transition-all ${
                    isComprehensive
                      ? 'border-purple-300 bg-purple-50/15 md:col-span-2 lg:col-span-3'
                      : 'border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 capitalize">
                        {quiz.category}
                      </span>
                      {bestScore !== null ? (
                        <span
                          className={`text-xs font-extrabold px-2 py-0.5 rounded-md ${
                            bestScore >= 80
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          Best: {bestScore}%
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium">Unattempted</span>
                      )}
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 shrink-0">
                        {getTopicIcon(quiz.category)}
                      </div>
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                          {quiz.title}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {quiz.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400">
                      {quiz.questions.length} Questions • ~{quiz.timeLimitMinutes} mins
                    </span>

                    <button
                      onClick={() => handleStartQuiz(quiz)}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{bestScore !== null ? 'Retake Quiz' : 'Start Quiz'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. ACTIVE QUIZ RUNNER */}
      {activeQuiz && !isFinished && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <button
              onClick={handleBackToList}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Quizzes</span>
            </button>

            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800">
              Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100}%`,
              }}
            />
          </div>

          {/* Current Question */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              {activeQuiz.questions[currentQuestionIndex].topic}
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 leading-snug">
              {activeQuiz.questions[currentQuestionIndex].question}
            </h3>

            {/* Answer Options */}
            <div className="space-y-3 pt-2">
              {activeQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === activeQuiz.questions[currentQuestionIndex].correctIndex;

                let btnStyle =
                  'bg-slate-50 hover:bg-slate-100/80 text-slate-800 border-slate-200';

                if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 line-through';
                  } else {
                    btnStyle = 'bg-slate-50/50 border-slate-100 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle =
                    'bg-emerald-50/60 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-500/20';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-sm md:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs text-slate-600 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>

                    {isAnswerSubmitted && isCorrect && (
                      <Check className="w-5 h-5 text-emerald-600 stroke-3 shrink-0" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <X className="w-5 h-5 text-rose-600 stroke-3 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswerSubmitted && (
            <div
              className={`p-5 rounded-2xl text-xs md:text-sm leading-relaxed border animate-fade-in ${
                selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5">
                {selectedOption === activeQuiz.questions[currentQuestionIndex].correctIndex ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Correct Answer!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Incorrect Choice</span>
                  </>
                )}
              </div>
              <p className="text-slate-700">
                {activeQuiz.questions[currentQuestionIndex].explanation}
              </p>
            </div>
          )}

          {/* Bottom Navigation */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Pick your answer and click Submit to lock in your score.
            </span>

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs md:text-sm shadow-xs transition-all cursor-pointer"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>
                  {currentQuestionIndex < activeQuiz.questions.length - 1
                    ? 'Next Question'
                    : 'View Results'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. FINAL RESULTS SCREEN */}
      {activeQuiz && isFinished && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-10 space-y-8 text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              Quiz Completed!
            </h2>
            <p className="text-sm text-slate-500">{activeQuiz.title}</p>

            {/* Score Ring / Pill */}
            {(() => {
              let correct = 0;
              activeQuiz.questions.forEach((q) => {
                if (userAnswers[q.id] === q.correctIndex) correct++;
              });
              const pct = Math.round((correct / activeQuiz.questions.length) * 100);

              return (
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-4xl md:text-5xl font-black text-slate-900">
                    {pct}%
                  </span>
                  <p className="text-xs font-semibold text-slate-600">
                    You scored {correct} out of {activeQuiz.questions.length} questions correctly.
                  </p>
                  <p className="text-xs font-bold text-emerald-700">
                    {pct >= 80
                      ? '🌟 Mastery Achieved! Excellent conceptual grasp.'
                      : pct >= 50
                      ? '👍 Good Effort! Review the explanations to reach 100%.'
                      : '📚 Keep Practicing! Financial literacy takes repetition.'}
                  </p>
                </div>
              );
            })()}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs md:text-sm flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>Retry Quiz</span>
              </button>

              <button
                onClick={handleBackToList}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs md:text-sm shadow-xs transition-all cursor-pointer"
              >
                Choose Another Quiz
              </button>
            </div>
          </div>

          {/* Question Breakdown Accordion / List */}
          <div className="text-left pt-6 border-t border-slate-200 space-y-4">
            <h4 className="font-extrabold text-slate-900 text-base">
              Detailed Question Review
            </h4>

            <div className="space-y-3">
              {activeQuiz.questions.map((q, idx) => {
                const ans = userAnswers[q.id];
                const isCorrect = ans === q.correctIndex;
                return (
                  <div
                    key={q.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs md:text-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <p className="font-bold text-slate-900">
                        {idx + 1}. {q.question}
                      </p>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md shrink-0 ${
                          isCorrect
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-1">
                      <p>
                        <strong>Your answer:</strong> {q.options[ans]}
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-700 font-semibold">
                          <strong>Correct answer:</strong> {q.options[q.correctIndex]}
                        </p>
                      )}
                      <p className="text-slate-500 italic mt-1 bg-white p-2.5 rounded-xl border border-slate-100">
                        💡 {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
