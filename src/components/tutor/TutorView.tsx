import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Bot,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Calculator,
  Compass,
  Trash2,
  Lightbulb,
} from 'lucide-react';
import { ChatMessage, UserProgress } from '../../types';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface TutorViewProps {
  chatHistory: ChatMessage[];
  onSendMessage: (
    message: string,
    actionType?: 'general' | 'clear' | 'quiz' | 'inr_example',
    context?: string
  ) => Promise<void>;
  isLoading: boolean;
  onClearHistory: () => void;
  activeContextTopic?: string | null;
  onClearContext?: () => void;
  userProgress: UserProgress;
}

export const TutorView: React.FC<TutorViewProps> = ({
  chatHistory,
  onSendMessage,
  isLoading,
  onClearHistory,
  activeContextTopic,
  onClearContext,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showClearModal, setShowClearModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const suggestedPrompts = [
    'Explain inflation like I am 15',
    'How does compound interest work with ₹1,000/mo?',
    'What is a healthy CIBIL credit score?',
    'How should I divide ₹25,000 salary using 50/30/20?',
    'Simple interest vs Compound interest with ₹10,000',
    'What is an emergency fund and how much do I need?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const msg = inputText.trim();
    setInputText('');
    setErrorMessage(null);

    try {
      await onSendMessage(msg, 'general', activeContextTopic || undefined);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to send message. Please try again.');
    }
  };

  const handleActionClick = async (
    action: 'clear' | 'quiz' | 'inr_example',
    prevMsgContent: string
  ) => {
    if (isLoading) return;
    setErrorMessage(null);

    let queryText = '';
    if (action === 'clear') {
      queryText = `Please give a super clear, simple everyday analogy to explain this without any financial jargon: "${prevMsgContent.slice(0, 150)}..."`;
    } else if (action === 'quiz') {
      queryText = `Give me a quick 1-question multiple choice pop quiz to test if I understood your explanation: "${prevMsgContent.slice(0, 150)}..."`;
    } else if (action === 'inr_example') {
      queryText = `Please provide a step-by-step mathematical example using Indian Rupees (₹) for what we just discussed.`;
    }

    try {
      await onSendMessage(queryText, action, activeContextTopic || undefined);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to execute action. Please try again.');
    }
  };

  const handlePromptChipClick = async (prompt: string) => {
    if (isLoading) return;
    setInputText('');
    setErrorMessage(null);
    try {
      await onSendMessage(prompt, 'general', activeContextTopic || undefined);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Failed to send prompt.');
    }
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Format message content with bolding, lists, and code/currency highlights
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-2 leading-relaxed text-sm md:text-base">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1.5" />;
          }

          // Bullet points
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            const clean = line.replace(/^[•\-]\s*/, '');
            return (
              <div key={idx} className="flex items-start gap-2 ml-1">
                <span className="text-emerald-500 font-bold">•</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(clean) }} />
              </div>
            );
          }

          // Numbered lists (e.g. "1. ")
          if (/^\d+\.\s/.test(line.trim())) {
            return (
              <div key={idx} className="flex items-start gap-2 ml-1">
                <span className="text-emerald-600 font-bold shrink-0">{line.match(/^\d+\./)?.[0]}</span>
                <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line.replace(/^\d+\.\s*/, '')) }} />
              </div>
            );
          }

          // Headers
          if (line.trim().startsWith('###')) {
            return (
              <h5 key={idx} className="font-extrabold text-slate-900 text-sm md:text-base mt-2">
                {line.replace(/^###\s*/, '')}
              </h5>
            );
          }

          return (
            <p key={idx} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(line) }} />
          );
        })}
      </div>
    );
  };

  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/₹(\d+(?:,\d+)*(?:\.\d+)?)/g, '<span class="font-semibold text-emerald-700">₹$1</span>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-800 font-mono text-xs">$1</code>');
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Tutor Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-emerald-300 border border-white/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base md:text-lg">MoneyMentor AI Tutor</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-emerald-100/80">
              Interactive financial literacy guide for students & beginners
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeContextTopic && (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Topic: {activeContextTopic}</span>
              {onClearContext && (
                <button
                  onClick={onClearContext}
                  className="ml-1 text-emerald-400 hover:text-white text-xs cursor-pointer"
                  title="Clear topic context"
                >
                  ×
                </button>
              )}
            </div>
          )}

          <button
            onClick={() => setShowClearModal(true)}
            className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggested Quick Prompt Carousel */}
      <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Suggested:
        </span>
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handlePromptChipClick(prompt)}
            disabled={isLoading}
            className="text-xs font-semibold px-3 py-1 rounded-xl bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 shadow-2xs whitespace-nowrap transition-all cursor-pointer disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages Scroll Container */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-5 bg-slate-50/40">
        {chatHistory.map((message) => {
          const isUser = message.role === 'user';
          return (
            <div
              key={message.id}
              className={`flex items-start gap-3 md:gap-4 ${
                isUser ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                  isUser
                    ? 'bg-emerald-600 text-white font-bold text-sm'
                    : 'bg-gradient-to-tr from-emerald-800 to-teal-700 text-emerald-200'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[85%] md:max-w-2xl rounded-2xl p-4 md:p-5 shadow-xs transition-all ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-xs'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                }`}
              >
                {/* Text Content */}
                {isUser ? (
                  <p className="text-sm md:text-base font-medium whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                ) : (
                  <div>
                    {renderFormattedContent(message.content)}

                    {/* AI Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => handleActionClick('clear', message.content)}
                        disabled={isLoading}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Explain with a simple analogy"
                      >
                        <Lightbulb className="w-3.5 h-3.5" />
                        <span>Clear Explanation</span>
                      </button>

                      <button
                        onClick={() => handleActionClick('quiz', message.content)}
                        disabled={isLoading}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200/80 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Test your knowledge on this concept"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Test Your Knowledge</span>
                      </button>

                      <button
                        onClick={() => handleActionClick('inr_example', message.content)}
                        disabled={isLoading}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 transition-colors flex items-center gap-1 cursor-pointer"
                        title="Show step-by-step ₹ calculations"
                      >
                        <Calculator className="w-3.5 h-3.5" />
                        <span>INR Example</span>
                      </button>

                      <button
                        onClick={() => handleCopyText(message.id, message.content)}
                        className="text-xs font-semibold px-2 py-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors ml-auto flex items-center gap-1 cursor-pointer"
                        title="Copy to clipboard"
                      >
                        {copiedId === message.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                <div
                  className={`mt-1.5 text-[10px] font-medium ${
                    isUser ? 'text-emerald-200 text-right' : 'text-slate-400 text-left'
                  }`}
                >
                  {message.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-emerald-200 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 animate-spin" />
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs p-4 shadow-xs">
              <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1 text-slate-600 font-medium">MoneyMentor is typing...</span>
              </div>
            </div>
          </div>
        )}

        {/* Error message banner */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs font-bold hover:underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Form Bar */}
      <div className="p-4 bg-white border-t border-slate-200">
        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <textarea
            ref={inputRef}
            rows={2}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask MoneyMentor: 'How do I start a ₹500 SIP?', 'Explain inflation with an example'..."
            className="w-full resize-none bg-slate-50 focus:bg-white text-xs md:text-sm text-slate-900 placeholder:text-slate-400 p-3 pr-24 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-hidden"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="absolute right-2 bottom-3 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-bold text-xs md:text-sm flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        <p className="mt-2 text-[11px] text-slate-400 text-center">
          MoneyMentor provides financial literacy education. It is not registered investment advice.
        </p>
      </div>

      {/* Confirmation Modal for Clearing History */}
      <ConfirmationModal
        isOpen={showClearModal}
        title="Clear Tutor Conversation?"
        message="This will delete your current chat history with MoneyMentor AI tutor. This cannot be undone."
        confirmLabel="Clear Chat"
        isDestructive={true}
        onConfirm={() => {
          onClearHistory();
          setShowClearModal(false);
        }}
        onCancel={() => setShowClearModal(false)}
      />
    </div>
  );
};
