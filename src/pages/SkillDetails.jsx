import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Code2, AlertTriangle, MessageSquare, PlaySquare, FileText, CheckCircle2, Copy, Check, Terminal, Database, Cpu, Layers } from 'lucide-react';
import { skillsData } from './Skills';
import { cNotesData } from '../data/c_notes';
import { javaNotesData } from '../data/java_notes';
import { pythonNotesData } from '../data/python_notes';
import { cppNotesData } from '../data/cpp_notes';
import { primaryDsaNotesData } from '../data/primary_dsa_notes';
import { secondaryDsaNotesData } from '../data/secondary_dsa_notes';
import { advancedDsaNotesData } from '../data/advanced_dsa_notes';
import { sqlNotesData } from '../data/sql_notes';

// Helper component for Code Block with Copy Button
const CodeBlock = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-slate-900 rounded-xl p-4 overflow-x-auto my-4 group">
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-lg bg-slate-800 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-white hover:bg-slate-700"
        title="Copy code"
      >
        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
      <pre className="text-green-400 font-mono text-sm">
        <code>{code}</code>
      </pre>
    </div>
  );
};

// Reusable Component for rendering dynamic notes (C, Java, etc.)
const RichNotesRenderer = ({ notesData }) => {
  const getIcon = (iconName) => {
    switch(iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-primary-500" />;
      case 'Database': return <Database className="w-6 h-6 text-primary-500" />;
      case 'Terminal': return <Terminal className="w-6 h-6 text-primary-500" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-primary-500" />;
      case 'Layers': return <Layers className="w-6 h-6 text-primary-500" />;
      case 'Code2': return <Code2 className="w-6 h-6 text-primary-500" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6 text-primary-500" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6 text-primary-500" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-primary-500" />;
      default: return <FileText className="w-6 h-6 text-primary-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {notesData.map((section, idx) => (
        <motion.section 
          key={section.id}
          id={section.id}
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }}
          transition={{ delay: 0.1 }} 
          className="glass-card p-6 scroll-mt-24"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 border-b border-slate-200 dark:border-dark-border pb-3">
            {getIcon(section.icon)} {section.title}
          </h2>
          
          <div className="space-y-4">
            {section.content.map((block, i) => {
              if (block.type === 'paragraph') {
                return <p key={i} className="font-poppins text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{block.text}</p>;
              }
              if (block.type === 'tip') {
                return (
                  <div key={i} className="font-poppins bg-primary-500/10 border-l-4 border-primary-500 p-4 rounded-r-lg my-4 text-sm text-primary-700 dark:text-primary-300">
                    <strong className="font-semibold block mb-1">💡 Pro Tip</strong>
                    <span className="whitespace-pre-line">{block.text}</span>
                  </div>
                );
              }
              if (block.type === 'warning') {
                return (
                  <div key={i} className="font-poppins bg-red-500/10 border-l-4 border-red-500 p-4 rounded-r-lg my-4 text-sm text-red-700 dark:text-red-300">
                    <strong className="font-semibold flex items-center gap-2 mb-1"><AlertTriangle className="w-4 h-4"/> Warning</strong>
                    {block.text}
                  </div>
                );
              }
              if (block.type === 'code') {
                return (
                  <div key={i} className="my-4">
                    {block.title && <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">{block.title}</h4>}
                    <CodeBlock code={block.code} />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </motion.section>
      ))}
    </div>
  );
};

const SkillDetails = () => {
  const { skillId } = useParams();
  
  // Determine if we have rich notes for this skill
  let activeNotesData = null;
  if (skillId === 'c') activeNotesData = cNotesData;
  if (skillId === 'java') activeNotesData = javaNotesData;
  if (skillId === 'python') activeNotesData = pythonNotesData;
  if (skillId === 'cpp') activeNotesData = cppNotesData;
  if (skillId === 'primary-dsa') activeNotesData = primaryDsaNotesData;
  if (skillId === 'secondary-dsa') activeNotesData = secondaryDsaNotesData;
  if (skillId === 'advanced-dsa') activeNotesData = advancedDsaNotesData;
  if (skillId === 'sql') activeNotesData = sqlNotesData;
  
  const skill = skillsData.find(s => s.id === skillId) || skillsData[0]; // Fallback for demo

  return (
    <div className="pb-20 pt-10">
      {/* Header */}
      <div className="glass-card p-8 rounded-3xl mb-8 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="flex items-center gap-6 mb-4 relative z-10">
          <div className="p-4 bg-white dark:bg-dark-bg rounded-2xl shadow-sm border border-slate-100 dark:border-dark-border">
            {skill.icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">{skill.name}</h1>
            <p className="text-slate-600 dark:text-slate-400">
              {activeNotesData ? 'Complete Notes — Zero to Pro' : skill.desc}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-8 relative z-10">
          <Link to="/playground" className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
            <PlaySquare className="w-4 h-4" /> Code Playground
          </Link>
          <Link to="/quizzes" className="btn-secondary flex items-center gap-2 py-2 px-4 text-sm">
            <CheckCircle2 className="w-4 h-4" /> Take Quiz
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8 order-2 lg:order-1">
          {activeNotesData ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 sticky top-24 max-h-[80vh] overflow-y-auto custom-scrollbar">
              <h3 className="text-lg font-bold mb-4 border-b border-slate-200 dark:border-dark-border pb-2">Table of Contents</h3>
              <ul className="space-y-3">
                {activeNotesData.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-sm font-medium text-slate-600 hover:text-primary-500 dark:text-slate-400 dark:hover:text-primary-400 transition-colors flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 opacity-50 flex-shrink-0"></div>
                      <span className="truncate">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6">
              <h3 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-dark-border pb-2">Beginner Roadmap</h3>
              <ul className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
                <li className="relative flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-primary-500 z-10 border-4 border-white dark:border-dark-card shadow"></div>
                  <div className="text-sm font-medium">Basics & Syntax</div>
                </li>
                <li className="relative flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 z-10 border-4 border-white dark:border-dark-card shadow"></div>
                  <div className="text-sm font-medium text-slate-500">Control Flow & Functions</div>
                </li>
                <li className="relative flex items-center gap-4">
                  <div className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 z-10 border-4 border-white dark:border-dark-card shadow"></div>
                  <div className="text-sm font-medium text-slate-500">Data Structures</div>
                </li>
              </ul>
            </motion.div>
          )}

          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 border-b border-slate-200 dark:border-dark-border pb-2">Interview Prep</h3>
            <div className="space-y-3">
              <Link to="/pyqs" className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <span className="text-sm font-medium">Company PYQs</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 order-1 lg:order-2">
          {activeNotesData ? (
            <RichNotesRenderer notesData={activeNotesData} />
          ) : (
            <div className="space-y-8">
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><BookOpen className="w-6 h-6 text-primary-500" /> Introduction & Why Learn</h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
                  {skill.name} is a fundamental skill in the modern tech ecosystem. It is widely used in top tech companies for building scalable systems. Learning this will open doors to roles like Software Engineer, Data Scientist, or Backend Developer.
                </p>
              </motion.section>

              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Code2 className="w-6 h-6 text-primary-500" /> Example Program</h2>
                <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-green-400 font-mono text-sm">
                    <code>
{`// Simple Hello World Example
function greet() {
  console.log("Welcome to AI SkillVerse!");
}
greet();`}
                    </code>
                  </pre>
                </div>
              </motion.section>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SkillDetails;
