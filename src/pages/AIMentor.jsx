import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Volume2, VolumeX, MessageSquare } from 'lucide-react';
import { callAI } from '../utils/callAI';

const SYSTEM_PROMPT = "Your name is Ram. You are an AI Mentor for a computer science learning platform. You help students with DSA, SQL, C++, Java, Python, and AI. Keep responses clear, encouraging, and formatted with markdown when showing code.";

const AIMentor = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I am Ram, your AI Mentor. I can help you with coding, DSA, SQL, interview prep, and AI concepts. What would you like to learn today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleVoice = () => {
    if (voiceEnabled) {
      window.speechSynthesis.cancel();
    }
    setVoiceEnabled(!voiceEnabled);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      history.unshift({ role: 'system', content: SYSTEM_PROMPT });
      history.push({ role: 'user', content: userText });

      const text = await callAI(history, 2500);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: text }]);
      
      if (voiceEnabled) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
      
      // Update global AI token usage if possible (simplified here)
      let currentTokens = parseInt(localStorage.getItem('ai_skillverse_ai_tokens') || '2400000');
      if (isNaN(currentTokens)) currentTokens = 2400000;
      localStorage.setItem('ai_skillverse_ai_tokens', (currentTokens + Math.floor(text.length / 4)).toString());
      
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "Sorry, I encountered an error connecting to my brain. Please check your OpenRouter API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="page-container flex flex-col h-[calc(100vh-4rem)] pt-20 pb-8">
      {/* ── Header ── */}
      <div className="mb-6 flex items-center justify-between shrink-0">
        <div className="space-y-2">
          <p className="section-label">AI Mentor</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-ink dark:text-[#EDE8DF] flex items-center gap-3">
            Chat with Ram
          </h1>
          <p className="text-sm text-ink-muted dark:text-dark-muted">
            Get instant help with your code or theory questions.
          </p>
        </div>
        
        <button 
          onClick={toggleVoice} 
          className="btn-ghost bg-surface-raised dark:bg-dark-card border border-[#E8E1D8] dark:border-dark-border"
          title={voiceEnabled ? "Mute Voice" : "Enable AI Voice"}
        >
          {voiceEnabled ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-ink-muted" />}
          <span className="hidden sm:inline-block">{voiceEnabled ? 'Voice On' : 'Voice Off'}</span>
        </button>
      </div>

      {/* ── Chat Container ── */}
      <div className="card flex-grow flex flex-col overflow-hidden bg-[#F5F1EB] dark:bg-[#1A1814] relative">
        
        {/* Chat History Area */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-[#E8E1D8] dark:bg-dark-border text-ink-muted' : 'bg-amber-100 text-amber-700'}`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`p-4 text-[15px] leading-relaxed font-inter ${
                  isUser 
                    ? 'bg-amber-500 text-white rounded-2xl rounded-tr-sm shadow-sm' 
                    : 'bg-surface dark:bg-dark-card text-ink dark:text-[#EDE8DF] border border-[#E8E1D8] dark:border-dark-border rounded-2xl rounded-tl-sm shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </motion.div>
            );
          })}
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="px-5 py-4 bg-surface dark:bg-dark-card border border-[#E8E1D8] dark:border-dark-border rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[52px]">
                <span className="w-2 h-2 bg-amber-500 rounded-full dot-1" />
                <span className="w-2 h-2 bg-amber-500 rounded-full dot-2" />
                <span className="w-2 h-2 bg-amber-500 rounded-full dot-3" />
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-surface dark:bg-dark-card border-t border-[#E8E1D8] dark:border-dark-border z-10">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Ram anything about coding, AI, or interviews..."
              className="w-full bg-[#F5F1EB] dark:bg-[#1A1814] border border-[#E8E1D8] dark:border-dark-border text-ink dark:text-[#EDE8DF] placeholder:text-ink-muted/70 rounded-full pl-6 pr-14 py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-shadow text-[15px]"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isTyping}
              className="absolute right-1.5 w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-500/50 text-white flex items-center justify-center transition-colors disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 -ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-ink-muted/80">
            <Sparkles className="w-3.5 h-3.5 text-amber-500/70" /> 
            AI mentor can make mistakes. Verify important information.
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AIMentor;
