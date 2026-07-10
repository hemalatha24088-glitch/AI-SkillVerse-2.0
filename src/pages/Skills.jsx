import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Terminal, Database, Cpu, Layers, Braces } from 'lucide-react';

export const skillsData = [
  { id: 'python', name: 'Python', icon: <Terminal className="w-8 h-8 text-blue-500" />, desc: 'Versatile language for AI, Data Science, and Backend.', level: 'Beginner Friendly' },
  { id: 'java', name: 'Java', icon: <Cpu className="w-8 h-8 text-red-500" />, desc: 'Object-oriented, widely used in enterprise & Android.', level: 'Intermediate' },
  { id: 'cpp', name: 'C++', icon: <Code className="w-8 h-8 text-blue-700" />, desc: 'High performance, competitive programming favorite.', level: 'Advanced' },
  { id: 'c', name: 'C Programming', icon: <Code className="w-8 h-8 text-slate-500" />, desc: 'The mother of all languages. Great for understanding memory.', level: 'Beginner' },
  { id: 'sql', name: 'SQL & Database', icon: <Database className="w-8 h-8 text-orange-500" />, desc: 'Essential for data manipulation and backend storage.', level: 'Beginner Friendly' },
  { id: 'primary-dsa', name: 'Primary DSA', icon: <Layers className="w-8 h-8 text-green-400" />, desc: 'Arrays, Strings, Linked Lists, Stacks, and Queues.', level: 'Beginner' },
  { id: 'secondary-dsa', name: 'Secondary DSA', icon: <Layers className="w-8 h-8 text-green-500" />, desc: 'Trees, Graphs, Hashing, and Sorting/Searching.', level: 'Intermediate' },
  { id: 'advanced-dsa', name: 'Advanced DSA', icon: <Layers className="w-8 h-8 text-green-600" />, desc: 'Dynamic Programming, Tries, and Advanced Algorithms.', level: 'Advanced' }
];

const Skills = () => {
  return (
    <div className="pb-20 pt-10">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Master Core <span className="text-gradient">Tech Skills</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Choose a skill to start your journey. Access complete roadmaps, notes, example programs, and practice questions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/skill/${skill.id}`} className="glass-card p-6 flex flex-col h-full hover:border-primary-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] transition-all duration-300 block group cursor-pointer">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{skill.name}</h3>
                  <span className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-md text-slate-500">{skill.level}</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm flex-grow mb-6">
                {skill.desc}
              </p>
              <div className="flex items-center justify-between text-sm font-semibold text-primary-600 dark:text-primary-400 mt-auto">
                <span>View Details & Roadmap</span>
                <Braces className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
