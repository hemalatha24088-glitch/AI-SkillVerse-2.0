import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, BrainCircuit, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const stored = localStorage.getItem('sv_theme');
    const dark = stored === 'dark';
    setIsDark(dark);
    document.documentElement.classList.toggle('dark', dark);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('sv_theme', next ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home',       path: '/home' },
    { name: 'Roadmap',    path: '/roadmap' },
    { name: 'Resume',     path: '/career-tools' },
    { name: 'Skills',     path: '/skills' },
    { name: 'Quizzes',    path: '/quizzes' },
    { name: 'Interviews', path: '/mock-interviews' },
    { name: 'PYQs',       path: '/pyqs' },
    { name: 'AI Mentor',  path: '/ai-mentor' },
    { name: 'Playground', path: '/playground' },
    { name: 'News',       path: '/daily-updates' },
    { name: 'Admin',      path: '/admin' },
  ];

  const isActive = (path) => location.pathname === path;
  const isAuthenticated = localStorage.getItem('ai_skillverse_auth') === 'true';
  const role = localStorage.getItem('ai_skillverse_role');

  const visibleLinks = navLinks.filter(l => {
    if (l.name === 'Admin' && role !== 'admin') return false;
    return true;
  });

  return (
    <nav className={`navbar transition-shadow duration-200 ${scrolled ? 'shadow-card' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2">
          <BrainCircuit className="w-6 h-6 text-amber-500" />
          <span className="font-fraunces font-semibold text-lg text-ink dark:text-[#EDE8DF] tracking-tight">
            AI SkillVerse
          </span>
        </Link>

        {/* Desktop Nav Links */}
        {isAuthenticated && (
          <div className="hidden lg:flex items-center gap-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
                  ${isActive(link.path)
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-raised dark:text-dark-muted dark:hover:text-[#EDE8DF] dark:hover:bg-dark-card'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="btn-ghost p-2 rounded-lg"
            aria-label="Toggle theme"
          >
            {isDark
              ? <Sun className="w-4 h-4" />
              : <Moon className="w-4 h-4" />
            }
          </button>

          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary hidden sm:inline-flex">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          ) : (
            <Link to="/" className="btn-primary hidden sm:inline-flex">
              Sign in
            </Link>
          )}

          {/* Mobile toggle */}
          {isAuthenticated && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden btn-ghost p-2"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && isAuthenticated && (
        <div className="lg:hidden border-t border-[#E8E1D8] dark:border-dark-border bg-paper dark:bg-dark-paper shadow-elevated">
          <div className="max-w-7xl mx-auto px-4 py-3 grid grid-cols-2 gap-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'text-ink-muted hover:bg-surface-raised dark:text-dark-muted dark:hover:bg-dark-card'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="btn-primary col-span-2 mt-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
