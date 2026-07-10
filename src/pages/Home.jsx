import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Code2, Database, Brain, BrainCircuit, ArrowRight, BookOpen, Trophy } from 'lucide-react';

const Home = () => {
  const stats = [
    { icon: <BookOpen className="w-6 h-6" />, label: '10+ Skills', value: 'Learn' },
    { icon: <Database className="w-6 h-6" />, label: '500+ Questions', value: 'Practice' },
    { icon: <Trophy className="w-6 h-6" />, label: '100+ PYQs', value: 'Interview' },
    { icon: <Sparkles className="w-6 h-6" />, label: 'Daily AI Updates', value: 'Stay Updated' },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 text-sm font-medium text-primary-600 dark:text-primary-400"
        >
          <Sparkles className="w-4 h-4" />
          <span>The future of learning is here</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          Master <span className="text-gradient">AI, Coding</span> <br className="hidden md:block" /> & Future Tech Skills
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mb-10"
        >
          Learn Generative AI, Python, Java, C, C++, SQL, DSA, Interview PYQs, Quizzes, and Coding Practice in one powerful platform.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link to="/skills" className="btn-primary flex items-center justify-center gap-2">
            Start Learning <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/gen-ai-trends" className="btn-secondary flex items-center justify-center gap-2">
            <Brain className="w-5 h-5" /> Explore AI Trends
          </Link>
          <Link to="/playground" className="btn-secondary flex items-center justify-center gap-2">
            <Code2 className="w-5 h-5" /> Practice Coding
          </Link>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="p-4 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              {stat.icon}
            </div>
            <div>
              <h3 className="font-bold text-xl">{stat.label}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Visual Section */}
      <section className="relative rounded-3xl overflow-hidden glass-card border border-primary-500/20 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 space-y-6 z-10">
          <h2 className="text-3xl md:text-5xl font-bold">Powered by <span className="text-gradient">AI Mentor</span></h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Get stuck while coding? Have doubts about DSA or AI concepts? Chat with our integrated AI Mentor to get instant solutions, explanations, and guidance.
          </p>
          <Link to="/ai-mentor" className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:underline">
            Try AI Mentor Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex-1 relative w-full aspect-square md:aspect-video flex items-center justify-center">
           {/* Abstract AI visual representation */}
           <div className="absolute w-64 h-64 border border-primary-500/30 rounded-full animate-[spin_10s_linear_infinite]"></div>
           <div className="absolute w-48 h-48 border border-purple-500/30 rounded-full animate-[spin_7s_linear_infinite_reverse]"></div>
           <BrainCircuit className="w-24 h-24 text-primary-500 relative z-10 animate-pulse" />
           <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
        </div>
      </section>
    </div>
  );
};

export default Home;
