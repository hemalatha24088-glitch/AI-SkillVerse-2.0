import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown } from 'lucide-react';



const tabs = ['Global', 'Python', 'React', 'SQL', 'DSA', 'C++'];

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  const [activeTab, setActiveTab] = useState('Global');

  useEffect(() => {
    // Load from local storage
    const storedUsers = localStorage.getItem('ai_skillverse_users');
    let currentUsers = [];
    
    if (storedUsers) {
      currentUsers = JSON.parse(storedUsers);
    } 

    setUsers(currentUsers);
  }, []);

  const getPointsForTab = (user, tab) => {
    if (tab === 'Global') return user.points || 0;
    return user[`points_${tab.toLowerCase()}`] || 0;
  };

  const sortedUsers = [...users].sort((a, b) => getPointsForTab(b, activeTab) - getPointsForTab(a, activeTab));

  const getRankIcon = (index) => {
    if (index === 0) return <Crown className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-slate-300" />;
    if (index === 2) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="font-bold text-slate-400 w-6 text-center">{index + 1}</span>;
  };

  return (
    <div className="pb-20 pt-10 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Global <span className="text-gradient">Leaderboard</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400">
          Complete quizzes and practice coding to earn points and climb the ranks!
        </p>
        <div className="mt-3 inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-300 text-xs font-medium px-4 py-2 rounded-full">
          <span>⚠️</span>
          <span>Scores are stored locally in your browser — this is a demo leaderboard, not a live global ranking.</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === tab
                ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white dark:bg-dark-bg border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-dark-border">
                <th className="p-4 font-semibold text-slate-500 dark:text-slate-400">Rank</th>
                <th className="p-4 font-semibold text-slate-500 dark:text-slate-400">Student</th>
                <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-center">Badge</th>
                <th className="p-4 font-semibold text-slate-500 dark:text-slate-400 text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className={`border-b border-slate-100 dark:border-dark-border/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${user.id === 1 ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''}`}
                >
                  <td className="p-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {getRankIcon(index)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                      <span className={`font-semibold ${user.id === 1 ? 'text-primary-600 dark:text-primary-400' : ''}`}>
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md font-medium text-slate-600 dark:text-slate-300">
                      {user.badge}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-lg text-primary-600 dark:text-primary-400">
                    {getPointsForTab(user, activeTab)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Leaderboard;
