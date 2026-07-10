import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Activity, BrainCircuit, CheckSquare, Settings, Plus, FileText, Database, ShieldAlert, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  // Quiz Form State
  const [showQuizForm, setShowQuizForm] = useState(false);
  const [newQuiz, setNewQuiz] = useState({
    skill: 'Global',
    question: '',
    options: ['', '', '', ''],
    answer: 0
  });

  // PYQ Form State
  const [showPYQForm, setShowPYQForm] = useState(false);
  const [newPYQ, setNewPYQ] = useState({
    company: '',
    role: '',
    skill: '',
    difficulty: 'Medium',
    question: ''
  });

  // AI Flags State
  const [showFlags, setShowFlags] = useState(false);
  const aiFlagsRaw = localStorage.getItem('ai_skillverse_flags') || '3';
  const aiFlagsCount = parseInt(aiFlagsRaw);

  useEffect(() => {
    // Load users from localStorage
    const savedUsersStr = localStorage.getItem('ai_skillverse_users');
    let users = [];
    if (savedUsersStr) {
      users = JSON.parse(savedUsersStr);
    } 

    // Automatically add you if the database is completely empty!
    if (users.length === 0) {
      const adminUser = {
        id: Date.now(),
        name: 'Hemalatha (Admin)',
        email: 'hemalatha24088@gmail.com',
        joined: new Date().toISOString(),
        points: 0,
        status: 'Active'
      };
      users = [adminUser];
      localStorage.setItem('ai_skillverse_users', JSON.stringify(users));
    }
    
    // Sort users to show newest first and format their join date nicely
    const formattedUsers = users.slice(0, 10).map(u => ({
      ...u,
      joined: new Date(u.joined).toLocaleString() !== 'Invalid Date' 
        ? new Date(u.joined).toLocaleDateString() 
        : u.joined // Fallback if it's the mock string
    }));
    setRecentUsers(formattedUsers);

    // Load dynamic counts
    const totalStudents = users.length;
    // Remove static 45210, use 0 instead
    const quizzesCompletedStr = localStorage.getItem('ai_skillverse_total_quizzes');
    const quizzesCompleted = quizzesCompletedStr ? parseInt(quizzesCompletedStr) : 0;
    
    // Remove static 2.4M, use 0 instead
    const aiTokensRaw = localStorage.getItem('ai_skillverse_ai_tokens');
    let aiTokens = 0;
    if (aiTokensRaw && !isNaN(parseInt(aiTokensRaw))) {
      aiTokens = parseInt(aiTokensRaw).toLocaleString();
    }

    setStats([
      { label: 'Total Students', value: totalStudents.toLocaleString(), change: 'Live', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
      { label: 'Quizzes Completed', value: quizzesCompleted.toLocaleString(), change: 'Live', icon: CheckSquare, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
      { label: 'AI Mentor Tokens', value: aiTokens, change: 'Live', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
      { label: 'System Uptime', value: '100%', change: 'Live', icon: Activity, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' }
    ]);

  }, []);

  return (
    <div className="pb-20 pt-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary-500" /> 
            Admin <span className="text-gradient">Dashboard</span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage platform content and monitor AI SkillVerse metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if(window.confirm('Are you sure you want to wipe all local database records (users, quizzes, AI tokens)?')) {
                localStorage.removeItem('ai_skillverse_users');
                localStorage.removeItem('ai_skillverse_total_quizzes');
                localStorage.removeItem('ai_skillverse_ai_tokens');
                window.location.reload();
              }
            }}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-medium hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2"
          >
            <Database className="w-4 h-4" /> Reset Database
          </button>
          <button className="btn-primary py-2 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Content
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-dark-border overflow-x-auto hide-scrollbar pb-2">
        {['overview', 'users', 'content', 'ai_logs'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium whitespace-nowrap capitalize transition-colors ${
              activeTab === tab 
                ? 'text-primary-600 border-b-2 border-primary-600 dark:text-primary-400 dark:border-primary-400' 
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-slate-500 dark:text-slate-400 font-medium text-sm">{stat.label}</h3>
                <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="glass-card p-6 lg:col-span-1">
              <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => setShowPYQForm(!showPYQForm)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-left"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <span className="font-medium">Publish New PYQ</span>
                  </div>
                  <Plus className={`w-4 h-4 text-slate-400 transition-transform ${showPYQForm ? 'rotate-45' : ''}`} />
                </button>

                {showPYQForm && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 border border-slate-200 dark:border-dark-border rounded-xl space-y-3 bg-white dark:bg-dark-bg"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const customPYQs = JSON.parse(localStorage.getItem('ai_skillverse_custom_pyqs') || '[]');
                      customPYQs.push({...newPYQ, id: Date.now()});
                      localStorage.setItem('ai_skillverse_custom_pyqs', JSON.stringify(customPYQs));
                      alert('Custom PYQ Published Successfully!');
                      setShowPYQForm(false);
                      setNewPYQ({ company: '', role: '', skill: '', difficulty: 'Medium', question: '' });
                    }}
                  >
                    <input 
                      required placeholder="Company (e.g. TCS)" value={newPYQ.company}
                      onChange={e => setNewPYQ({...newPYQ, company: e.target.value})}
                      className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    />
                    <div className="flex gap-2">
                      <input 
                        required placeholder="Role" value={newPYQ.role}
                        onChange={e => setNewPYQ({...newPYQ, role: e.target.value})}
                        className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                      />
                      <input 
                        required placeholder="Skill" value={newPYQ.skill}
                        onChange={e => setNewPYQ({...newPYQ, skill: e.target.value})}
                        className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                      />
                    </div>
                    <select
                      value={newPYQ.difficulty}
                      onChange={e => setNewPYQ({...newPYQ, difficulty: e.target.value})}
                      className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                    <textarea 
                      required placeholder="Question text" value={newPYQ.question}
                      onChange={e => setNewPYQ({...newPYQ, question: e.target.value})}
                      className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    />
                    <button type="submit" className="w-full btn-primary py-2 text-sm">Publish PYQ</button>
                  </motion.form>
                )}
                <button 
                  onClick={() => setShowQuizForm(!showQuizForm)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-left"
                >
                  <div className="flex items-center gap-3">
                    <CheckSquare className="w-5 h-5 text-green-500" />
                    <span className="font-medium">Create Quiz</span>
                  </div>
                  <Plus className={`w-4 h-4 text-slate-400 transition-transform ${showQuizForm ? 'rotate-45' : ''}`} />
                </button>

                {showQuizForm && (
                  <motion.form 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 border border-slate-200 dark:border-dark-border rounded-xl space-y-3 bg-white dark:bg-dark-bg"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const customQuizzes = JSON.parse(localStorage.getItem('ai_skillverse_custom_quizzes') || '[]');
                      customQuizzes.push({...newQuiz, id: Date.now()});
                      localStorage.setItem('ai_skillverse_custom_quizzes', JSON.stringify(customQuizzes));
                      alert('Custom Quiz Added Successfully!');
                      setShowQuizForm(false);
                      setNewQuiz({ skill: 'Global', question: '', options: ['', '', '', ''], answer: 0 });
                    }}
                  >
                    <input 
                      required placeholder="Skill (e.g. Global, Python)" value={newQuiz.skill}
                      onChange={e => setNewQuiz({...newQuiz, skill: e.target.value})}
                      className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    />
                    <textarea 
                      required placeholder="Quiz Question" value={newQuiz.question}
                      onChange={e => setNewQuiz({...newQuiz, question: e.target.value})}
                      className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                    />
                    {newQuiz.options.map((opt, i) => (
                      <div key={i} className="flex gap-2">
                        <input 
                          type="radio" name="correct_answer" required
                          checked={newQuiz.answer === i}
                          onChange={() => setNewQuiz({...newQuiz, answer: i})}
                        />
                        <input 
                          required placeholder={`Option ${i+1}`} value={opt}
                          onChange={e => {
                            const newOpts = [...newQuiz.options];
                            newOpts[i] = e.target.value;
                            setNewQuiz({...newQuiz, options: newOpts});
                          }}
                          className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none"
                        />
                      </div>
                    ))}
                    <button type="submit" className="w-full btn-primary py-2 text-sm">Save Quiz</button>
                  </motion.form>
                )}
                <button 
                  onClick={() => setShowFlags(!showFlags)}
                  className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700 text-left"
                >
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-5 h-5 text-orange-500" />
                    <span className="font-medium">Review AI Flags</span>
                  </div>
                  {aiFlagsCount > 0 ? (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{aiFlagsCount}</span>
                  ) : (
                    <CheckSquare className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {showFlags && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 border border-slate-200 dark:border-dark-border rounded-xl space-y-3 bg-white dark:bg-dark-bg"
                  >
                    {aiFlagsCount > 0 ? (
                      <>
                        <p className="text-sm text-slate-600 dark:text-slate-400">There are flagged inappropriate questions asked to the AI Mentor.</p>
                        <button 
                          onClick={() => {
                            localStorage.setItem('ai_skillverse_flags', '0');
                            setShowFlags(false);
                            window.location.reload();
                          }}
                          className="w-full py-2 text-sm bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-lg hover:bg-orange-200 transition-colors"
                        >
                          Clear All Flags
                        </button>
                      </>
                    ) : (
                      <p className="text-sm text-green-600 font-medium">All flags have been cleared! System is secure.</p>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Recent Users Table */}
            <div className="glass-card p-6 lg:col-span-2 overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Recent Registrations</h2>
                <button className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-dark-border">
                      <th className="pb-3 text-sm font-semibold text-slate-500">Student Name</th>
                      <th className="pb-3 text-sm font-semibold text-slate-500">Joined</th>
                      <th className="pb-3 text-sm font-semibold text-slate-500">Total Points</th>
                      <th className="pb-3 text-sm font-semibold text-slate-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-slate-100 dark:border-dark-border/50 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3">
                          <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </td>
                        <td className="py-3 text-sm text-slate-600 dark:text-slate-400">{user.joined}</td>
                        <td className="py-3 font-mono font-medium text-primary-600 dark:text-primary-400">{user.points}</td>
                        <td className="py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                            {user.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Placeholder for other tabs */}
      {activeTab !== 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-12 text-center flex flex-col items-center justify-center border-dashed border-2">
          <TrendingUp className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
          <h2 className="text-xl font-bold text-slate-500 mb-2">Module Under Development</h2>
          <p className="text-slate-400">The {activeTab} management module will be available in the next platform update.</p>
        </motion.div>
      )}
    </div>
  );
};

export default AdminDashboard;
