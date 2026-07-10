import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Search } from 'lucide-react';
import { skillsData } from './Skills';

const Notes = () => {
  return (
    <div className="pb-20 pt-10">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Study <span className="text-gradient">Notes & Materials</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Download comprehensive, beginner-friendly notes for every skill. Includes examples, tips, and cheat sheets.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>
        <input 
          type="text" 
          placeholder="Search notes..." 
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col items-start gap-4 hover:shadow-lg transition-all group"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary-500" />
                <h3 className="font-bold text-lg">{skill.name} Notes</h3>
              </div>
              <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded">PDF</span>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              Complete guide covering basics to advanced topics, cheat sheets, and interview prep material.
            </p>
            
            <button className="mt-2 w-full py-2 rounded-lg border border-primary-500/50 text-primary-600 dark:text-primary-400 font-medium flex items-center justify-center gap-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors group-hover:border-primary-500">
              <Download className="w-4 h-4" /> Download Notes
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
