import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, BrainCircuit, User } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default dark theme for futuristic vibe
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Roadmap', path: '/roadmap' },
    { name: 'Resume', path: '/career-tools' },
    { name: 'Skills', path: '/skills' },
    { name: 'Quizzes', path: '/quizzes' },
    { name: 'Interviews', path: '/mock-interviews' },
    { name: 'PYQs', path: '/pyqs' },
    { name: 'AI Mentor', path: '/ai-mentor' },
    { name: 'Playground', path: '/playground' },
    { name: 'News', path: '/daily-updates' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path) => location.pathname === path;
  const isAuthenticated = localStorage.getItem('ai_skillverse_auth') === 'true';
  const role = localStorage.getItem('ai_skillverse_role');

  const visibleNavLinks = navLinks.filter(link => {
    if (link.name === 'Admin' && role !== 'admin') return false;
    return true;
  });

  return (
    <nav className="glass-nav fixed w-full top-0 z-50 px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between">
      <Link to={isAuthenticated ? "/home" : "/"} className="flex items-center gap-2 group">
        <BrainCircuit className="w-8 h-8 text-primary-500 group-hover:text-purple-500 transition-colors" />
        <span className="text-xl font-bold font-outfit text-gradient">AI SkillVerse</span>
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {isAuthenticated && visibleNavLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`font-medium transition-colors hover:text-primary-500 ${isActive(link.path) ? 'text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {isAuthenticated ? (
          <Link to="/dashboard" className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 hover:bg-primary-500/10 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            <User className="w-4 h-4" />
            Dashboard
          </Link>
        ) : (
          <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-full border border-primary-500/30 hover:bg-primary-500/10 transition-colors text-primary-600 dark:text-primary-400 font-medium">
            <User className="w-4 h-4" />
            Login
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-300">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {isAuthenticated && (
          <button onClick={toggleMenu} className="text-slate-600 dark:text-slate-300">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Nav */}
      {isOpen && isAuthenticated && (
        <div className="absolute top-full left-0 w-full glass-nav flex flex-col p-4 gap-4 md:hidden shadow-xl border-t border-slate-200 dark:border-dark-border">
          {visibleNavLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`font-medium p-2 rounded-lg ${isActive(link.path) ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 p-3 mt-2 rounded-lg bg-primary-600 text-white font-medium">
            <User className="w-4 h-4" />
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
