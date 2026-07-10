import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, BrainCircuit, LayoutDashboard } from 'lucide-react';

const Navbar = ({ setSidebarOpen }) => {
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
    { name: 'Dashboard',  path: '/dashboard' },
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
    <nav className={`navbar transition-shadow duration-200 z-50 fixed top-0 w-full ${scrolled ? 'shadow-card' : ''}`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo, Mobile Toggle, and Left Links */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setSidebarOpen(prev => !prev)}
                className="p-1.5 -ml-2 text-ink-muted hover:text-ink hover:bg-surface-raised dark:text-dark-muted dark:hover:text-[#EDE8DF] dark:hover:bg-dark-card rounded-md transition-colors"
                aria-label="Toggle Sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            
            <Link to={isAuthenticated ? '/home' : '/'} className="flex items-center gap-2 mr-2">
              <BrainCircuit className="w-6 h-6 text-amber-500" />
              <span className="font-fraunces font-semibold text-lg text-ink dark:text-[#EDE8DF] tracking-tight hidden sm:block">
                AI SkillVerse
              </span>
            </Link>
          </div>

          {/* Left Nav Links (Home) */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-1">
              {visibleLinks.filter(l => l.name === 'Home').map((link) => (
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
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Right Nav Links (Admin, Dashboard) */}
          {isAuthenticated && (
            <div className="hidden lg:flex items-center gap-2">
              {visibleLinks.find(l => l.name === 'Admin') && (
                <Link
                  to="/admin"
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors duration-150
                    ${isActive('/admin')
                      ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                      : 'text-ink-muted hover:text-ink hover:bg-surface-raised dark:text-dark-muted dark:hover:text-[#EDE8DF] dark:hover:bg-dark-card'
                    }`}
                >
                  Admin
                </Link>
              )}
              
              {visibleLinks.find(l => l.name === 'Dashboard') && (
                <Link
                  to="/dashboard"
                  className={`px-4 py-1.5 rounded-md text-sm font-bold text-white transition-colors duration-150 shadow-sm border border-red-700/50
                    ${isActive('/dashboard')
                      ? 'bg-red-700 hover:bg-red-800'
                      : 'bg-red-600 hover:bg-red-700'
                    }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          )}

          <div className="flex items-center gap-2 lg:border-l lg:border-[#E8E1D8] lg:dark:border-dark-border lg:pl-4">
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

            {!isAuthenticated && (
              <Link to="/" className="btn-primary hidden sm:inline-flex">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
