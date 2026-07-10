import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Set Auth state
    localStorage.setItem('ai_skillverse_auth', 'true');
    
    // Set Role (RBAC)
    if (email.toLowerCase() === 'hemalatha24088@gmail.com') {
      localStorage.setItem('ai_skillverse_role', 'admin');
    } else {
      localStorage.setItem('ai_skillverse_role', 'user');
    }

    // Save to Mock DB if registering
    if (!isLogin) {
      const existingUsersStr = localStorage.getItem('ai_skillverse_users');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      
      const newUser = {
        id: Date.now(),
        name: name || email.split('@')[0],
        email: email,
        joined: new Date().toISOString(),
        points: 0,
        status: 'Active'
      };
      
      localStorage.setItem('ai_skillverse_users', JSON.stringify([newUser, ...existingUsers]));
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card w-full max-w-md p-8 relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="text-center mb-8 relative z-10">
          <BrainCircuit className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create an Account'}</h1>
          <p className="text-slate-500 text-sm">
            {isLogin ? 'Enter your details to access your learning dashboard.' : 'Start your journey to mastering AI and Tech skills.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-dark-border bg-white/50 dark:bg-dark-bg/50 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-dark-border bg-white/50 dark:bg-dark-bg/50 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-dark-border bg-white/50 dark:bg-dark-bg/50 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500" />
            </div>
          </div>

          {isLogin && (
            <div className="text-right">
              <a href="#" className="text-xs text-primary-600 dark:text-primary-400 hover:underline">Forgot password?</a>
            </div>
          )}

          <button type="submit" className="w-full btn-primary py-3 mt-4">
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm relative z-10">
          <span className="text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-primary-600 dark:text-primary-400 font-medium hover:underline"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
