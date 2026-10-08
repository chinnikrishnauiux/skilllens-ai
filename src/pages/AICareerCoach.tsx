import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  Paperclip,
  RotateCcw,
  Bot,
  User,
  Volume2,
  VolumeX,
  Radio,
  Clock,
  ChevronRight,
  MessageSquare,
  Plus,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AICareerCoach: React.FC = () => {
  const {
    chatMessages,
    addChatMessage,
    clearChat,
    user,
    selectedCareer,
    skillGaps,
    setIsVoiceModalOpen,
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const suggestedQuestions = [
    'What should I learn next?',
    'Am I ready for a UI/UX job?',
    'Suggest a project for me.',
    'How can I improve my portfolio?',
    'What are interviewers asking for Design Systems?',
  ];

  const recentConversations = [
    { id: 'c1', title: 'Design Systems Token Architecture', time: 'Today' },
    { id: 'c2', title: 'Portfolio Project Scope Review', time: 'Yesterday' },
    { id: 'c3', title: 'Usability Testing SUS Calibration', time: '3 days ago' },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuery;
    if (!text.trim() || isTyping) return;

    setInputQuery('');
    addChatMessage({ sender: 'user', text });
    setIsTyping(true);

    try {
      const response = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userProfile: user,
          targetCareer: selectedCareer.title,
          skillGaps: skillGaps.slice(0, 4),
          history: chatMessages.slice(-6),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          addChatMessage({ sender: 'ai', text: data.reply });
          return;
        }
      }

      // Fallback
      addChatMessage({
        sender: 'ai',
        text: `Based on your ${selectedCareer.title} goals, focus on bridging your ${skillGaps[0]?.name || 'Design Systems'} gap this week.`,
      });
    } catch (err) {
      console.error('Coach chat error:', err);
      addChatMessage({
        sender: 'ai',
        text: `I've analyzed your ${selectedCareer.title} profile. Start with Design Systems components this week to maximize your career readiness.`,
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleSpeakText = async (msgId: string, textToSpeak: string) => {
    if (speakingMessageId === msgId) {
      // Stop current playback
      if (audioRef.current) audioRef.current.pause();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    setSpeakingMessageId(msgId);

    try {
      const res = await fetch('/api/coach/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textToSpeak, voiceName: 'Zephyr' }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          audioRef.current = audio;
          audio.onended = () => setSpeakingMessageId(null);
          audio.onerror = () => fallbackSpeak(textToSpeak);
          await audio.play();
          return;
        }
      }
      fallbackSpeak(textToSpeak);
    } catch (e) {
      fallbackSpeak(textToSpeak);
    }
  };

  const fallbackSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setSpeakingMessageId(null);
      return;
    }
    window.speechSynthesis.cancel();
    const clean = text.replace(/[*_#`~[\]()]/g, '').slice(0, 300);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-[calc(100vh-140px)] min-h-[580px] bg-white rounded-3xl border border-gray-200/80 shadow-xs flex flex-col md:flex-row overflow-hidden animate-fadeIn">
      {/* 27. SIDEBAR: Recent Conversations */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-gray-100 bg-[#F7F8FC] p-4 shrink-0 justify-between">
        <div className="space-y-4">
          <button
            onClick={clearChat}
            className="w-full py-2.5 px-3 bg-white border border-gray-200 hover:border-[#6C63FF] rounded-xl text-xs font-bold text-[#171A2B] hover:text-[#6C63FF] flex items-center justify-center gap-2 transition shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>New Conversation</span>
          </button>

          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">
              Recent Threads
            </span>
            {recentConversations.map((thread) => (
              <div
                key={thread.id}
                className="p-2.5 rounded-xl hover:bg-white text-xs font-medium text-gray-700 hover:text-[#6C63FF] cursor-pointer transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 truncate">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#6C63FF]" />
                  <span className="truncate">{thread.title}</span>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0">{thread.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Voice Assistant Callout Card */}
        <div className="p-4 rounded-2xl bg-[#0B1020] text-white space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#00C2A8] uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C2A8] animate-ping" />
              Voice Mode
            </span>
            <Radio className="w-4 h-4 text-[#6C63FF]" />
          </div>
          <p className="text-xs text-gray-300">
            Have a live spoken conversation with your AI career coach.
          </p>
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="w-full py-2 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-md"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Open Voice Assistant</span>
          </button>
        </div>
      </aside>

      {/* 27. MAIN AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="p-4 sm:px-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00C2A8] flex items-center justify-center text-white shadow-md shadow-[#6C63FF]/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-extrabold text-base text-[#171A2B]">SkillLens AI</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-gray-500">
                Personalized Career Coach for {user.name} ({selectedCareer.title})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVoiceModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] hover:bg-[#6C63FF]/20 text-xs font-bold flex items-center gap-1.5 transition"
              title="Launch Live Voice Mode"
            >
              <Mic className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voice Assistant</span>
            </button>
            <button
              onClick={clearChat}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
              title="Reset Chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#F7F8FC]/50">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeakingThis = speakingMessageId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1 shadow-sm">
                    AI
                  </div>
                )}

                <div
                  className={`max-w-xl rounded-2xl p-4 text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#6C63FF] text-white rounded-tr-xs shadow-xs'
                      : 'bg-white border border-gray-200/80 text-gray-800 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  <div className="mt-2 flex items-center justify-between text-[10px] pt-1 opacity-70 border-t border-black/5">
                    <span>{msg.timestamp}</span>
                    {!isUser && (
                      <button
                        onClick={() => handleSpeakText(msg.id, msg.text)}
                        className="flex items-center gap-1 text-[#6C63FF] hover:underline font-bold"
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-500" />
                            <span className="text-rose-500">Stop Voice</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 mt-1 ring-1 ring-gray-200">
                    <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#6C63FF] to-[#00C2A8] flex items-center justify-center text-white text-xs font-bold">
                AI
              </div>
              <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-bounce delay-200" />
                <span className="text-gray-400 ml-1">Analyzing skill gaps & formulating strategy...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions Chips */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 overflow-x-auto shrink-0 flex items-center gap-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
            Suggested:
          </span>
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs whitespace-nowrap bg-gray-100 hover:bg-[#6C63FF]/10 text-gray-700 hover:text-[#6C63FF] px-3 py-1.5 rounded-full border border-gray-200/80 transition"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2 bg-[#F7F8FC] border border-gray-200 rounded-2xl px-3 py-2 focus-within:ring-2 focus-within:ring-[#6C63FF] focus-within:border-transparent transition">
            <button
              type="button"
              onClick={() => alert('Portfolio file upload ready for review!')}
              className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-200/60 transition"
              title="Attach File or Case Study"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder="Ask SkillLens AI anything about your career..."
              className="flex-1 bg-transparent text-sm text-[#171A2B] placeholder-gray-400 focus:outline-none px-2"
            />

            {/* Voice Assistant launcher button */}
            <button
              type="button"
              onClick={() => setIsVoiceModalOpen(true)}
              className="p-1.5 text-[#6C63FF] hover:bg-[#6C63FF]/10 rounded-lg transition"
              title="Speak with Voice Assistant"
            >
              <Mic className="w-4 h-4 animate-pulse" />
            </button>

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputQuery.trim() || isTyping}
              className="p-2 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] disabled:opacity-40 text-white rounded-xl shadow-xs transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
