import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Flame, Trophy, BookOpen, Star, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [points, setPoints] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('ai_skillverse_auth');
    if (!isAuth) {
      navigate('/auth');
      return;
    }
    const savedPoints = localStorage.getItem('ai_skillverse_points');
    if (savedPoints) setPoints(parseInt(savedPoints));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ai_skillverse_auth');
    navigate('/');
  };

  return (
    <div className="pb-20 pt-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold">
            Welcome back, <span className="text-gradient">Student</span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Here is your learning progress overview.</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary flex items-center gap-2 py-2">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-500 rounded-2xl">
            <Flame className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Daily Streak</h3>
            <p className="text-2xl font-bold">5 Days</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-500 rounded-2xl">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Total Points</h3>
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{points}</p>
          </div>
        </motion.div>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-6 flex items-center gap-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-2xl">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-slate-500 text-sm font-medium">Quizzes Completed</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><BookOpen className="w-5 h-5 text-primary-500" /> Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div>
                <p className="font-medium">Python Basics Quiz</p>
                <p className="text-xs text-slate-500">2 hours ago</p>
              </div>
              <span className="text-green-500 font-medium">+30 pts</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div>
                <p className="font-medium">Solved TCS PYQ - Arrays</p>
                <p className="text-xs text-slate-500">Yesterday</p>
              </div>
              <span className="text-green-500 font-medium">+50 pts</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div>
                <p className="font-medium">Read Gen AI Notes</p>
                <p className="text-xs text-slate-500">2 days ago</p>
              </div>
              <span className="text-green-500 font-medium">+10 pts</span>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 bg-gradient-to-br from-primary-600 to-purple-700 text-white border-none">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-300 fill-current" /> Recommended Next Skill</h2>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mt-4 border border-white/20">
            <h3 className="text-2xl font-bold mb-2">Prompt Engineering</h3>
            <p className="text-primary-100 mb-6 text-sm">Based on your interest in Generative AI, learning Prompt Engineering will help you get 10x better results from LLMs.</p>
            <a href="/skills" className="px-6 py-2 bg-white text-primary-700 font-bold rounded-full hover:bg-slate-10 transition-colors inline-block text-sm">
              Start Learning
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
