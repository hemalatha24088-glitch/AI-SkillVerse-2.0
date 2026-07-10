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
    handleAuth();
  };

  const handleGoogleAuth = (e) => {
    e.preventDefault();
    handleAuth('Google User', 'google@example.com');
  };

  const handleAuth = (authName = name, authEmail = email) => {
    // Set Auth state
    localStorage.setItem('ai_skillverse_auth', 'true');
    
    // Set Role (RBAC)
    if (authEmail.toLowerCase() === 'hemalatha24088@gmail.com') {
      localStorage.setItem('ai_skillverse_role', 'admin');
    } else {
      localStorage.setItem('ai_skillverse_role', 'user');
    }

    // Save to Mock DB if registering or google
    if (!isLogin || authName === 'Google User') {
      const existingUsersStr = localStorage.getItem('ai_skillverse_users');
      const existingUsers = existingUsersStr ? JSON.parse(existingUsersStr) : [];
      
      const newUser = {
        id: Date.now(),
        name: authName || authEmail.split('@')[0],
        email: authEmail,
        joined: new Date().toISOString(),
        points: 0,
        status: 'Active'
      };
      
      localStorage.setItem('ai_skillverse_users', JSON.stringify([newUser, ...existingUsers]));
    }

    navigate('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card w-full max-w-md p-8 sm:p-10 relative overflow-hidden bg-surface"
      >
        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-[#faefd9] dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
            <BrainCircuit className="w-8 h-8 text-amber-600 dark:text-amber-400 -rotate-3" />
          </div>
          <h1 className="text-3xl font-bold font-fraunces text-ink dark:text-[#EDE8DF] mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-ink-muted text-sm">
            {isLogin ? 'Enter your details to access your dashboard.' : 'Start your journey to mastering AI skills.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          {!isLogin && (
            <div>
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Full Name</label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8BFB4] dark:text-dark-muted" />
                <input required type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" className="input pl-10" />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8BFB4] dark:text-dark-muted" />
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input pl-10" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider">Password</label>
              {isLogin && (
                <a href="#" className="text-xs text-amber-600 dark:text-amber-400 font-medium hover:underline">Forgot?</a>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C8BFB4] dark:text-dark-muted" />
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="input pl-10" />
            </div>
          </div>

          <button type="submit" className="w-full btn-primary py-3.5 mt-2 text-sm uppercase tracking-wider font-bold">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center space-x-4">
          <div className="h-px bg-[#E8E1D8] dark:bg-dark-border flex-1"></div>
          <span className="text-xs text-ink-muted font-medium uppercase tracking-wider">Or continue with</span>
          <div className="h-px bg-[#E8E1D8] dark:bg-dark-border flex-1"></div>
        </div>

        <div className="mt-6">
          <button 
            type="button"
            onClick={handleGoogleAuth}
            className="w-full btn-secondary py-3.5 flex items-center justify-center gap-3 border border-[#E8E1D8] dark:border-dark-border bg-white dark:bg-dark-card hover:bg-[#F5F1EB] dark:hover:bg-dark-paper transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-sm font-semibold text-ink dark:text-[#EDE8DF]">Google</span>
          </button>
        </div>

        <div className="mt-8 text-center text-sm relative z-10">
          <span className="text-ink-muted">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginRegister;
