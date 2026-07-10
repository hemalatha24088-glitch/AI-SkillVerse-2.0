import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Target, Flame, Trophy, BookOpen, Star, LogOut, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [points, setPoints] = useState(0);
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('ai_skillverse_auth');
    if (!isAuth) {
      navigate('/auth');
      return;
    }
    
    // Load points
    const savedPoints = localStorage.getItem('ai_skillverse_points');
    if (savedPoints) setPoints(parseInt(savedPoints));

    // Load recent activity specific to this user
    try {
      const savedActivities = JSON.parse(localStorage.getItem('ai_skillverse_recent_activity') || '[]');
      setActivities(savedActivities);
    } catch (e) {
      setActivities([]);
    }

  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ai_skillverse_auth');
    navigate('/');
  };

  return (
    <div className="page-container pt-24 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4 border-b border-[#E8E1D8] dark:border-dark-border pb-6">
        <div>
          <span className="tag mb-3">Student Dashboard</span>
          <h1 className="text-display text-3xl md:text-4xl font-semibold text-ink dark:text-[#EDE8DF]">
            Welcome back
          </h1>
          <p className="text-ink-muted mt-2">Here is your learning progress overview.</p>
        </div>
        <button onClick={handleLogout} className="btn-secondary py-2 text-xs uppercase tracking-wider font-semibold">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card p-6 flex items-center gap-4 bg-surface hover:-translate-y-1 transition-transform duration-200">
          <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Daily Streak</h3>
            <p className="text-2xl font-bold font-fraunces text-ink dark:text-[#EDE8DF]">1 Day</p>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4 bg-surface hover:-translate-y-1 transition-transform duration-200">
          <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Total Points</h3>
            <p className="text-2xl font-bold font-fraunces text-amber-600">{points}</p>
          </div>
        </div>
        
        <div className="card p-6 flex items-center gap-4 bg-surface hover:-translate-y-1 transition-transform duration-200">
          <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-ink-muted text-xs font-semibold uppercase tracking-wider mb-1">Assessments</h3>
            <p className="text-2xl font-bold font-fraunces text-ink dark:text-[#EDE8DF]">
              {activities.filter(a => a.title.includes('Quiz')).length}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 card p-6 md:p-8 bg-surface">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold font-fraunces flex items-center gap-2 text-ink dark:text-[#EDE8DF]">
              <BookOpen className="w-5 h-5 text-amber-500" /> Your Recent Activity
            </h2>
          </div>
          
          <div className="space-y-3">
            {activities.length > 0 ? (
              activities.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-[#F5F1EB] dark:bg-dark-card border border-[#E8E1D8] dark:border-dark-border rounded-lg">
                  <div>
                    <p className="font-medium text-ink dark:text-[#EDE8DF]">{activity.title}</p>
                    <p className="text-xs text-ink-muted mt-1">{activity.time}</p>
                  </div>
                  <span className="text-success font-semibold bg-success-light dark:bg-success/20 px-3 py-1 rounded-full text-sm">
                    {activity.points}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-[#E8E1D8] dark:border-dark-border rounded-xl">
                <p className="text-ink-muted mb-4">No recent activity yet. Start taking quizzes to earn points!</p>
                <button onClick={() => navigate('/quizzes')} className="btn-secondary">
                  Take an Assessment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Card */}
        <div className="lg:col-span-1 card p-8 bg-amber-600 text-white border-none flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-6">
              <Star className="w-5 h-5 text-white fill-current" /> 
            </div>
            <h2 className="text-xl font-bold font-fraunces mb-2">Recommended Next Skill</h2>
            <h3 className="text-3xl font-bold font-fraunces mb-4">Prompt Engineering</h3>
            <p className="text-amber-100 text-sm leading-relaxed mb-8">
              Based on your interest in Generative AI, learning Prompt Engineering will help you get 10x better results from LLMs.
            </p>
          </div>
          <a href="/skills" className="w-full py-3 bg-white text-amber-700 font-semibold rounded-lg hover:bg-[#F5F1EB] transition-colors inline-flex justify-center items-center gap-2">
            Start Learning <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
