import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Target, Zap, Clock, BrainCircuit, Rocket, CheckCircle2 } from 'lucide-react';

const OPENROUTER_API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual key or use environment variables

const RoadmapGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  
  const [formData, setFormData] = useState({
    currentSkill: 'Beginner',
    targetRole: 'Full Stack Developer',
    timeCommitment: '10 hours/week'
  });

  const generateRoadmap = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);

    const prompt = `Act as an expert career coach and senior engineer. 
    The user is currently a ${formData.currentSkill}. 
    They want to become a ${formData.targetRole}. 
    They can commit ${formData.timeCommitment}.
    
    Generate a detailed, step-by-step learning roadmap. 
    Use markdown formatting. 
    Structure the response clearly into "Phase 1, Phase 2, Phase 3" etc. 
    Include specific technologies, projects to build, and estimated timelines for each phase.
    Keep it extremely actionable and concise. No fluff.`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2000
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "Failed to generate");

      setRoadmap(data.choices[0].message.content);
    } catch (err) {
      console.error(err);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 pt-10 max-w-6xl mx-auto px-4">
      <div className="text-center mb-12">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
          AI <span className="text-gradient">Roadmap Generator</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400">Get a personalized, step-by-step path to your dream career.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Input Form */}
        <div className="lg:col-span-1">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="text-primary-500 w-6 h-6" /> Your Goal
            </h3>
            
            <form onSubmit={generateRoadmap} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Current Skill Level</label>
                <select 
                  value={formData.currentSkill}
                  onChange={(e) => setFormData({...formData, currentSkill: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>Absolute Beginner (No coding experience)</option>
                  <option>Beginner (Know basic syntax)</option>
                  <option>Intermediate (Can build small projects)</option>
                  <option>Advanced (Looking to specialize)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Target Role</label>
                <input 
                  type="text" 
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                  placeholder="e.g. AI Engineer, Data Scientist"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Time Commitment</label>
                <select 
                  value={formData.timeCommitment}
                  onChange={(e) => setFormData({...formData, timeCommitment: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>5 hours / week (Part-time)</option>
                  <option>10 hours / week (Dedicated)</option>
                  <option>20+ hours / week (Intensive)</option>
                  <option>40 hours / week (Full-time)</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Zap className="w-5 h-5 animate-pulse" /> Generating...</>
                ) : (
                  <><Map className="w-5 h-5" /> Generate Roadmap</>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Roadmap Display */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="glass-card p-12 flex flex-col items-center justify-center h-full min-h-[400px]">
              <BrainCircuit className="w-16 h-16 text-primary-500 animate-pulse mb-4" />
              <h3 className="text-xl font-semibold mb-2">Analyzing the industry...</h3>
              <p className="text-slate-500 text-center max-w-sm">The AI is calculating the most efficient learning path based on your current skills and target role.</p>
            </div>
          ) : roadmap ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
              <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-200 dark:border-dark-border">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Your Personalized Journey</h2>
                  <p className="text-slate-500">Follow this roadmap to become a {formData.targetRole}</p>
                </div>
              </div>

              <div className="prose prose-lg dark:prose-invert max-w-none prose-h3:text-primary-600 dark:prose-h3:text-primary-400 whitespace-pre-wrap">
                <p>{roadmap}</p>
              </div>
            </motion.div>
          ) : (
            <div className="glass-card p-12 flex flex-col items-center justify-center h-full min-h-[400px] border-dashed border-2 border-slate-200 dark:border-slate-700 bg-transparent">
              <Map className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-slate-400">No Roadmap Yet</h3>
              <p className="text-slate-500 text-center max-w-sm">Fill out the form on the left to generate your custom AI roadmap.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
