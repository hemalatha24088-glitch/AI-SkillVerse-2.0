import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Map, 
  Briefcase, 
  Award, 
  CheckCircle2, 
  Users, 
  FileText, 
  Bot, 
  TerminalSquare, 
  Newspaper, 
  TrendingUp, 
  Cpu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const isAuthenticated = localStorage.getItem('ai_skillverse_auth') === 'true';

  if (!isAuthenticated) return null;

  const sidebarLinks = [
    { name: 'Roadmap',    path: '/roadmap',         icon: Map },
    { name: 'Resume',     path: '/career-tools',    icon: Briefcase },
    { name: 'Skills',     path: '/skills',          icon: Award },
    { name: 'Quizzes',    path: '/quizzes',         icon: CheckCircle2 },
    { name: 'Interviews', path: '/mock-interviews', icon: Users },
    { name: 'PYQs',       path: '/pyqs',            icon: FileText },
    { name: 'AI Mentor',  path: '/ai-mentor',       icon: Bot },
    { name: 'Playground', path: '/playground',      icon: TerminalSquare },
    { name: 'News',       path: '/daily-updates',   icon: Newspaper },
    { name: 'AI Trends',  path: '/gen-ai-trends',   icon: TrendingUp },
    { name: 'AI Tech',    path: '/latest-ai',       icon: Cpu },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-ink/50 dark:bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-surface border-r border-[#E8E1D8] dark:border-dark-border transform transition-transform duration-300 ease-in-out flex flex-col h-[calc(100vh-3.5rem)] mt-14
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="flex justify-end mb-2">
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-ink-muted hover:text-ink dark:text-dark-muted dark:hover:text-[#EDE8DF]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-4 ml-3 mt-2">
            Tools & Resources
          </div>

          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive(link.path)
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'
                    : 'text-ink-muted hover:bg-[#F5F1EB] hover:text-ink dark:text-dark-muted dark:hover:text-[#EDE8DF] dark:hover:bg-dark-card'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive(link.path) ? 'text-amber-500' : 'text-ink-muted/70 dark:text-dark-muted/70'}`} />
                {link.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
