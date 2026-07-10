import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Briefcase, Building2, PlayCircle, Bot } from 'lucide-react';

const OPENROUTER_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual key or use environment variables

const MockInterviews = () => {
  const [setupMode, setSetupMode] = useState(true);
  const [role, setRole] = useState('Software Development Engineer');
  const [company, setCompany] = useState('Google');
  const [difficulty, setDifficulty] = useState('Medium');
  
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const startInterview = () => {
    setSetupMode(false);
    const initialMessage = { 
      id: Date.now(), 
      sender: 'bot', 
      text: `Welcome to your mock interview for the **${role}** position at **${company}** (${difficulty} difficulty).\n\nI am your interviewer today. Let's start with a brief introduction. Tell me about yourself and your background in software engineering.` 
    };
    setMessages([initialMessage]);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    const userMsg = { id: Date.now(), sender: 'user', text: userText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const SYSTEM_PROMPT = `You are a senior technical interviewer at ${company}. You are interviewing the user for the role of ${role}. The difficulty of this interview is ${difficulty}. 
      Rules:
      1. Ask exactly ONE question at a time.
      2. Wait for the user to answer.
      3. Evaluate their answer briefly (point out strengths and flaws), then ask the NEXT question.
      4. Ask a mix of behavioral, DSA, system design, and role-specific technical questions.
      5. Keep the tone professional but encouraging.`;

      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));
      
      history.unshift({ role: 'system', content: SYSTEM_PROMPT });
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
          max_tokens: 1500
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || "OpenRouter API error");
      }

      const text = data.choices[0].message.content;
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: text }]);
      
    } catch (error) {
      console.error("Interview API Error:", error);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: "Sorry, the interview platform is experiencing technical difficulties. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="pb-20 pt-10 max-w-4xl mx-auto min-h-[80vh] flex flex-col">
      <div className="text-center mb-8 shrink-0">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
          AI <span className="text-gradient">Mock Interviews</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400">Practice real-world technical and behavioral interviews with AI.</p>
      </div>

      {setupMode ? (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-8 max-w-lg mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Interview Setup</h2>
          
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Target Role</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Target Company</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                >
                  <option value="Google">Google</option>
                  <option value="Microsoft">Microsoft</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Meta">Meta</option>
                  <option value="TCS">TCS</option>
                  <option value="Infosys">Infosys</option>
                  <option value="Startups">General Startup</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Difficulty</label>
              <select 
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              >
                <option value="Easy">Easy (Intern/Entry Level)</option>
                <option value="Medium">Medium (Junior/Mid Level)</option>
                <option value="Hard">Hard (Senior/Staff Level)</option>
              </select>
            </div>

            <button 
              onClick={startInterview}
              className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4"
            >
              <PlayCircle className="w-5 h-5" /> Start Interview
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="glass-card flex-grow flex flex-col overflow-hidden relative min-h-[500px]">
          <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-dark-border bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary-500" />
              <span className="font-semibold">{company} Interviewer</span>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
              {role} - {difficulty}
            </span>
          </div>
          
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
            {messages.map((msg) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={msg.id} 
                className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'}`}>
                  {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-4 rounded-2xl ${msg.sender === 'user' ? 'bg-primary-500 text-white rounded-tr-sm' : 'bg-slate-100 dark:bg-slate-800 rounded-tl-sm text-slate-800 dark:text-slate-200'}`}>
                  <div className="prose prose-sm dark:prose-invert max-w-none text-sm whitespace-pre-wrap">
                    <p>{msg.text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <div className="flex gap-4 max-w-[80%]">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-slate-500" />
                </div>
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 rounded-tl-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-4 bg-white/50 dark:bg-dark-bg/50 border-t border-slate-200 dark:border-dark-border relative z-10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your answer..."
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="absolute right-2 p-2 rounded-lg bg-primary-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-600 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MockInterviews;
