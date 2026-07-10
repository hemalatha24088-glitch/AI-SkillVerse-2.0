import React from 'react';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-dark-border bg-white/50 dark:bg-dark-bg/50 backdrop-blur-md mt-20 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <BrainCircuit className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-bold font-outfit text-gradient">AI SkillVerse</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm mb-6">
              Master the skills of tomorrow. Learn Generative AI, coding, databases, and prepare for interviews in one unified platform.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary-500 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Learn</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/skills" className="hover:text-primary-500 transition-colors">Coding Skills</Link></li>
              <li><Link to="/latest-ai" className="hover:text-primary-500 transition-colors">AI Technologies</Link></li>
              <li><Link to="/gen-ai-trends" className="hover:text-primary-500 transition-colors">Gen AI Trends</Link></li>
              <li><Link to="/notes" className="hover:text-primary-500 transition-colors">Notes & Materials</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Practice</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/playground" className="hover:text-primary-500 transition-colors">Code Playground</Link></li>
              <li><Link to="/quizzes" className="hover:text-primary-500 transition-colors">Quizzes</Link></li>
              <li><Link to="/pyqs" className="hover:text-primary-500 transition-colors">Company PYQs</Link></li>
              <li><Link to="/leaderboard" className="hover:text-primary-500 transition-colors">Leaderboard</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-dark-border mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} AI SkillVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
