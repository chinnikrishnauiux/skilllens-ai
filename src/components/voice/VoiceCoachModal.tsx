import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, Send, RefreshCw, Radio } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VoiceCoachModal: React.FC = () => {
  const { isVoiceModalOpen, setIsVoiceModalOpen, user, selectedCareer, skillGaps, addChatMessage } = useApp();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [lastAiResponse, setLastAiResponse] = useState<string>(
    "Hello Ananya! I'm your SkillLens Voice Career Coach. Ask me anything about your skill gaps, portfolio projects, or what to learn next."
  );
  const [speechSupported, setSpeechSupported] = useState<boolean>(true);
  const [audioMuted, setAudioMuted] = useState<boolean>(false);

  const recognitionRef = useRef<any>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (e) {
      console.warn('Speech recognition init error:', e);
      setSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (_) {}
      }
      stopAudioPlayback();
    };
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      alert('Speech recognition is not supported in this browser. You can type in the prompt below.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      stopAudioPlayback();
      setTranscript('');
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.error('Error starting recognition:', err);
      }
    }
  };

  const stopAudioPlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const playTTS = async (textToSpeak: string) => {
    if (audioMuted) return;
    stopAudioPlayback();
    setIsSpeaking(true);

    try {
      // 1. Attempt server-side Gemini Flash TTS first
      const response = await fetch('/api/coach/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToSpeak,
          voiceName: 'Zephyr',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.audioBase64) {
          const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
          audioPlayerRef.current = audio;
          audio.onended = () => setIsSpeaking(false);
          audio.onerror = () => fallbackBrowserSpeech(textToSpeak);
          await audio.play();
          return;
        }
      }
      // If server TTS returned error or no audio, fallback
      fallbackBrowserSpeech(textToSpeak);
    } catch (e) {
      console.warn('TTS request error, using browser speech synthesis fallback:', e);
      fallbackBrowserSpeech(textToSpeak);
    }
  };

  const fallbackBrowserSpeech = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`~[\]()]/g, '').slice(0, 320);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Pick pleasant English voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
    if (naturalVoice) utterance.voice = naturalVoice;

    window.speechSynthesis.speak(utterance);
  };

  const handleAsk = async (questionText?: string) => {
    const textToQuery = questionText || transcript;
    if (!textToQuery.trim()) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    }

    setIsProcessing(true);
    addChatMessage({ sender: 'user', text: textToQuery, isVoice: true });

    try {
      const response = await fetch('/api/coach/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToQuery,
          userProfile: user,
          targetCareer: selectedCareer.title,
          skillGaps: skillGaps.slice(0, 4),
        }),
      });

      let aiReply = "Focus on closing your gap in Design Systems this week. I recommend building a multi-brand token system.";
      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          aiReply = data.reply;
        }
      }

      setLastAiResponse(aiReply);
      addChatMessage({ sender: 'ai', text: aiReply, isVoice: true });
      setTranscript('');

      // Play synthesized voice guidance
      await playTTS(aiReply);
    } catch (err) {
      console.error('Chat error:', err);
      const fallback = "Focus on closing your gap in Design Systems this week. Build an interactive component library in Figma.";
      setLastAiResponse(fallback);
      addChatMessage({ sender: 'ai', text: fallback });
      await playTTS(fallback);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl bg-[#0B1020] text-white border border-[#6C63FF]/30 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute -top-24 -left-24 w-60 h-60 bg-[#6C63FF]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-[#00C2A8]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6C63FF] to-[#00C2A8] flex items-center justify-center text-white shadow-lg">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-lg tracking-tight">SkillLens Voice Coach</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#00C2A8]/20 text-[#00C2A8] border border-[#00C2A8]/30">
                  LIVE AI VOICE
                </span>
              </div>
              <p className="text-xs text-gray-400">Personalized voice guidance for {selectedCareer.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isSpeaking) stopAudioPlayback();
                setAudioMuted(!audioMuted);
              }}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition"
              title={audioMuted ? 'Unmute voice' : 'Mute voice'}
            >
              {audioMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-[#00C2A8]" />}
            </button>
            <button
              onClick={() => {
                stopAudioPlayback();
                setIsVoiceModalOpen(false);
              }}
              className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Voice Visualizer Orb */}
        <div className="relative my-8 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Outer rings */}
            <div
              className={`absolute w-44 h-44 rounded-full border border-[#6C63FF]/30 transition-all duration-700 ${
                isListening || isSpeaking ? 'scale-125 opacity-70 animate-ping' : 'scale-100 opacity-20'
              }`}
            />
            <div
              className={`absolute w-36 h-36 rounded-full bg-gradient-to-r from-[#6C63FF]/20 to-[#00C2A8]/20 blur-xl transition-all duration-500 ${
                isListening || isSpeaking ? 'scale-125' : 'scale-95'
              }`}
            />

            {/* Central Interactive Voice Button */}
            <button
              onClick={toggleListening}
              disabled={isProcessing}
              className={`relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-xl transition-all duration-300 transform active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-tr from-red-500 to-rose-600 ring-8 ring-red-500/20 shadow-red-500/40'
                  : isSpeaking
                  ? 'bg-gradient-to-tr from-[#00C2A8] to-[#6C63FF] ring-8 ring-[#00C2A8]/20 shadow-[#00C2A8]/40 animate-pulse'
                  : 'bg-gradient-to-tr from-[#6C63FF] to-[#8B5CF6] hover:scale-105 shadow-[#6C63FF]/40'
              }`}
            >
              {isListening ? (
                <MicOff className="w-9 h-9 text-white animate-bounce" />
              ) : isProcessing ? (
                <RefreshCw className="w-9 h-9 text-white animate-spin" />
              ) : (
                <Mic className="w-9 h-9 text-white" />
              )}
            </button>
          </div>

          {/* Status Label */}
          <div className="mt-5 text-center">
            <p className="text-sm font-semibold tracking-wide">
              {isListening
                ? 'Listening to you... Speak now'
                : isProcessing
                ? 'SkillLens AI is thinking...'
                : isSpeaking
                ? 'AI Coach is speaking...'
                : 'Tap microphone to start speaking'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {isListening
                ? 'Tap again when finished to ask'
                : 'Natural conversational guidance powered by Gemini'}
            </p>
          </div>
        </div>

        {/* Live Transcript / Response Box */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl p-4 min-h-[110px] max-h-[160px] overflow-y-auto mb-4 text-sm leading-relaxed">
          {transcript ? (
            <div>
              <span className="text-[11px] font-semibold text-[#00C2A8] uppercase tracking-wider block mb-1">
                You asked:
              </span>
              <p className="text-white italic">"{transcript}"</p>
            </div>
          ) : lastAiResponse ? (
            <div>
              <span className="text-[11px] font-semibold text-[#6C63FF] uppercase tracking-wider flex items-center gap-1 mb-1">
                <Sparkles className="w-3 h-3 text-[#00C2A8]" /> AI Coach Guidance:
              </span>
              <p className="text-gray-200 line-clamp-4">{lastAiResponse}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-6">Your speech will appear here...</p>
          )}
        </div>

        {/* Quick Voice Prompt Suggestions */}
        <div className="space-y-2 mb-5">
          <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
            Quick Questions to Ask:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              'What should I learn this week?',
              'How can I close my Design Systems gap?',
              'Am I ready for a junior interview?',
              'Suggest a high-impact portfolio project',
            ].map((promptText, i) => (
              <button
                key={i}
                onClick={() => handleAsk(promptText)}
                className="text-xs bg-white/10 hover:bg-[#6C63FF]/30 border border-white/10 hover:border-[#6C63FF]/50 px-3 py-1.5 rounded-full text-gray-200 hover:text-white transition"
              >
                {promptText}
              </button>
            ))}
          </div>
        </div>

        {/* Manual Query Input Fallback */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAsk();
            }}
            placeholder="Or type your career question..."
            className="flex-1 bg-white/10 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#6C63FF]"
          />
          <button
            onClick={() => handleAsk()}
            disabled={!transcript.trim() || isProcessing}
            className="px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#8B5CF6] hover:opacity-90 disabled:opacity-50 text-white rounded-xl text-sm font-semibold flex items-center gap-2 transition"
          >
            <Send className="w-4 h-4" />
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};
