import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, User, Sparkles, Volume2, VolumeX } from 'lucide-react';
const OPENROUTER_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual key or use environment variables
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
      // Build history for OpenRouter
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      
      // Inject system prompt at the beginning
      history.unshift({ role: 'system', content: SYSTEM_PROMPT });
      
      // Add current message
      history.push({ role: 'user', content: userText });

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: history,
          max_tokens: 2500
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "OpenRouter API error");
      }

      const text = data.choices[0].message.content;
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: text }]);
      
      if (voiceEnabled) {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        // Optional: pick a good voice or adjust rate
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
      
      // Update global AI token usage
      if (data.usage && data.usage.total_tokens) {
        let currentTokens = parseInt(localStorage.getItem('ai_skillverse_ai_tokens') || '2400000');
        if (isNaN(currentTokens)) currentTokens = 2400000; // fallback if it was a string like '2.4M'
        localStorage.setItem('ai_skillverse_ai_tokens', (currentTokens + data.usage.total_tokens).toString());
      }
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "Sorry, I encountered an error connecting to my brain. Please check your OpenRouter API key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full max-w-4xl mx-auto h-[70vh] min-h-[600px]">
      <div className="text-center mb-6 shrink-0 relative">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold flex items-center justify-center gap-2">
          <Bot className="w-8 h-8 text-primary-500" /> <span className="text-gradient">Ram</span>
        </motion.h1>
        <p className="text-slate-500 text-sm">Powered by OpenRouter API</p>
        <button 
          onClick={toggleVoice} 
          className={`absolute right-0 top-0 p-2 rounded-full transition-colors ${voiceEnabled ? 'bg-primary-100 text-primary-600 dark:bg-primary-900/30' : 'bg-slate-100 text-slate-400 dark:bg-slate-800'}`}
          title={voiceEnabled ? "Mute Voice" : "Enable AI Voice"}
        >
          {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      <div className="glass-card flex-grow flex flex-col overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-purple-500/5 pointer-events-none"></div>
        
        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-6 space-y-6 z-10">
          {messages.map((msg) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={msg.id} 
              className={`flex gap-4 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white shadow-lg'}`}>
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-600 text-white rounded-tr-sm' : 'bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-tl-sm shadow-sm'}`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border rounded-tl-sm shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/50 dark:bg-dark-bg/50 border-t border-slate-200 dark:border-dark-border z-10 backdrop-blur-md">
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything about coding, AI, or interviews..."
              className="flex-grow px-4 py-3 rounded-full border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
            <button 
              type="submit" 
              disabled={!input.trim()}
              className="w-12 h-12 rounded-full bg-primary-600 hover:bg-primary-500 text-white flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <Send className="w-5 h-5 -ml-1" />
            </button>
          </form>
          <div className="text-center mt-2 flex items-center justify-center gap-1 text-xs text-slate-400">
             <Sparkles className="w-3 h-3 text-primary-400" /> Mentor can make mistakes. Verify important info.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
