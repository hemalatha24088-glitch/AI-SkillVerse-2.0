import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, RefreshCw, ExternalLink } from 'lucide-react';
import { callAI } from '../utils/callAI';

const AI_PROMPT = `Generate exactly 4 fresh, realistic news headlines and short 2-sentence summaries about: 
1. The current state of AI.
2. New jobs and career paths being created by AI.
3. How AI is proving useful for future generations.
Return ONLY a valid JSON array of objects with keys: id (number), title (string), category (string), time (string like 'Just now'), source (string like 'AI Insight'), desc (string). Do not include markdown formatting or backticks in the response. Ensure it is perfectly valid JSON.`;

const mockNews = [];

const DailyUpdates = () => {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState(mockNews);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const messages = [{ role: 'user', content: AI_PROMPT }];
      let content = await callAI(messages, 2500);
      
      // Handle reasoning models by extracting just the JSON array
      const start = content.indexOf('[');
      const end = content.lastIndexOf(']');
      
      if (start !== -1 && end !== -1) {
        content = content.slice(start, end + 1);
      } else {
        content = content.replace(/```json/g, "").replace(/```/g, "").trim();
      }
      
      const parsedNews = JSON.parse(content);
      setNews(parsedNews);
    } catch (err) {
      console.error("Failed to fetch AI news:", err);
      setNews([
        { id: 1, title: 'Error fetching AI Updates', category: 'System', time: 'Just now', source: 'Local', desc: err.message }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="pb-20 pt-10 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold flex items-center gap-2">
            <Newspaper className="w-8 h-8 text-primary-500" /> Daily <span className="text-gradient">AI Updates</span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">Stay ahead of the curve with the latest in AI and Tech.</p>
        </div>
        <button 
          onClick={fetchNews}
          className="btn-secondary flex items-center gap-2 py-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-primary-500' : ''}`} />
          Refresh Feed
        </button>
      </div>

      <div className="space-y-4">
        {news.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-all group cursor-pointer"
          >
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-2 text-xs font-medium">
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-md">
                  {item.category}
                </span>
                <span className="text-slate-400">{item.time}</span>
                <span className="text-slate-400 px-2 border-l border-slate-300 dark:border-slate-700">{item.source}</span>
              </div>
              <h3 className="text-xl font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {item.title}
              </h3>
              {item.desc && (
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              )}
            </div>
            <div className="flex items-center text-slate-400 group-hover:text-primary-500 transition-colors">
              <ExternalLink className="w-5 h-5" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DailyUpdates;
