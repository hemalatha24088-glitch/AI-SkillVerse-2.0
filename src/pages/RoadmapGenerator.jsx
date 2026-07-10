import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Target, Zap, BrainCircuit, Rocket, CheckCircle2, Circle } from 'lucide-react';
import { callAI } from '../utils/callAI';

const RoadmapGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null); // Array of phase objects
  const [completedTasks, setCompletedTasks] = useState(new Set());
  
  const [formData, setFormData] = useState({
    currentSkill: 'Beginner (Know basic syntax)',
    targetRole: 'Full Stack Developer',
    timeCommitment: '10 hours / week'
  });

  const toggleTask = (taskId) => {
    setCompletedTasks(prev => {
      const next = new Set(prev);
      if (next.has(taskId)) {
        next.delete(taskId);
      } else {
        next.add(taskId);
      }
      return next;
    });
  };

  const generateRoadmap = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);
    setCompletedTasks(new Set());

    const prompt = `Act as an expert career coach and senior engineer. 
    The user is currently a: ${formData.currentSkill}. 
    They want to become a: ${formData.targetRole}. 
    They can commit: ${formData.timeCommitment}.
    
    Generate a highly structured, step-by-step learning roadmap. 
    You MUST respond with ONLY a valid JSON array of objects. Do not include markdown code blocks or any other text before or after the JSON.
    
    Format:
    [
      {
        "phase": "Phase 1: Foundation",
        "description": "Brief description of this phase.",
        "tasks": [
          "Learn HTML structure and semantics",
          "Master CSS flexbox and grid"
        ]
      },
      ...
    ]`;

    try {
      const text = await callAI([{ role: 'user', content: prompt }], 2500);
      
      // Attempt to extract JSON if the AI wrapped it in markdown code blocks
      let jsonString = text.trim();
      if (jsonString.startsWith('```json')) {
        jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '').trim();
      } else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```/, '').replace(/```$/, '').trim();
      }
      
      const parsedData = JSON.parse(jsonString);
      setRoadmap(parsedData);
    } catch (err) {
      console.error("Failed to parse roadmap JSON or call AI:", err);
      // Fallback dummy data if AI fails to return valid JSON
      setRoadmap([
        {
          phase: "Phase 1: Foundation",
          description: "Establish the core fundamentals required for your role.",
          tasks: ["Learn the core language syntax", "Understand data types and control flow", "Build a small CLI project"]
        },
        {
          phase: "Phase 2: Advanced Concepts",
          description: "Dive deeper into complex topics and frameworks.",
          tasks: ["Learn Object-Oriented principles", "Understand API integrations", "Learn testing fundamentals"]
        },
        {
          phase: "Phase 3: Portfolio Building",
          description: "Apply your knowledge by building full projects.",
          tasks: ["Build a full-stack CRUD application", "Deploy your application", "Optimize performance and accessibility"]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Calculate Progress
  let totalTasksCount = 0;
  if (roadmap) {
    roadmap.forEach(phase => {
      totalTasksCount += phase.tasks.length;
    });
  }
  const progressPercent = totalTasksCount === 0 ? 0 : Math.round((completedTasks.size / totalTasksCount) * 100);

  return (
    <div className="page-container pt-24 pb-20">
      
      <div className="text-center mb-12 shrink-0">
        <span className="tag">Roadmap</span>
        <h1 className="text-display text-4xl md:text-5xl font-semibold mt-4 mb-4">
          Personalized Journey
        </h1>
        <p className="text-ink-muted">Generate an actionable, step-by-step path to your dream career.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        
        {/* Input Form Column */}
        <div className="lg:col-span-4">
          <div className="card p-6 lg:sticky lg:top-28 bg-surface">
            <h3 className="text-xl font-fraunces font-semibold mb-6 flex items-center gap-2 text-ink dark:text-[#EDE8DF]">
              <Target className="text-amber-500 w-5 h-5" /> Define Goal
            </h3>
            
            <form onSubmit={generateRoadmap} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Current Skill Level</label>
                <select 
                  value={formData.currentSkill}
                  onChange={(e) => setFormData({...formData, currentSkill: e.target.value})}
                  className="input"
                >
                  <option>Absolute Beginner (No coding experience)</option>
                  <option>Beginner (Know basic syntax)</option>
                  <option>Intermediate (Can build small projects)</option>
                  <option>Advanced (Looking to specialize)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Target Role</label>
                <input 
                  type="text" 
                  value={formData.targetRole}
                  onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                  placeholder="e.g. Data Scientist, UI Developer"
                  className="input"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Time Commitment</label>
                <select 
                  value={formData.timeCommitment}
                  onChange={(e) => setFormData({...formData, timeCommitment: e.target.value})}
                  className="input"
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
                className="w-full btn-primary py-3 flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <><Zap className="w-4 h-4 animate-pulse" /> Generating...</>
                ) : (
                  <><Map className="w-4 h-4" /> Generate Roadmap</>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Roadmap Display Column */}
        <div className="lg:col-span-8">
          {loading ? (
            <div className="card p-12 flex flex-col items-center justify-center h-full min-h-[400px] bg-[#F5F1EB] dark:bg-[#1A1814] border-0">
              <BrainCircuit className="w-12 h-12 text-amber-500 animate-pulse mb-6" />
              <h3 className="text-xl font-fraunces font-semibold mb-2">Analyzing learning paths...</h3>
              <p className="text-ink-muted text-center max-w-sm text-sm">
                The AI is compiling the most efficient step-by-step timeline for a {formData.targetRole}.
              </p>
            </div>
          ) : roadmap ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-6 md:p-10 bg-surface">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#E8E1D8] dark:border-dark-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#faefd9] text-[#C77D30] rounded-xl flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold font-fraunces text-ink dark:text-[#EDE8DF]">Your Roadmap</h2>
                    <p className="text-ink-muted text-sm mt-1">{formData.currentSkill.split(' ')[0]} to {formData.targetRole}</p>
                  </div>
                </div>
                
                {/* Progress Status */}
                <div className="bg-[#F5F1EB] dark:bg-dark-card px-4 py-3 rounded-lg border border-[#E8E1D8] dark:border-dark-border min-w-[140px]">
                  <div className="flex justify-between text-xs font-semibold text-ink-muted mb-2">
                    <span>PROGRESS</span>
                    <span>{progressPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#E8E1D8] dark:bg-dark-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Timeline */}
              <div className="relative border-l-2 border-[#E8E1D8] dark:border-dark-border ml-3 space-y-10">
                {roadmap.map((phase, pIdx) => (
                  <div key={pIdx} className="relative pl-8 md:pl-10">
                    
                    {/* Timeline Node */}
                    <div className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full bg-surface border-4 border-amber-500 flex items-center justify-center"></div>
                    
                    <div className="mb-4">
                      <h3 className="text-xl font-bold font-fraunces text-ink dark:text-[#EDE8DF]">{phase.phase}</h3>
                      <p className="text-ink-muted text-sm mt-1">{phase.description}</p>
                    </div>

                    {/* Task Checklist */}
                    <div className="space-y-3">
                      {phase.tasks.map((task, tIdx) => {
                        const taskId = `${pIdx}-${tIdx}`;
                        const isCompleted = completedTasks.has(taskId);
                        
                        return (
                          <div 
                            key={taskId}
                            onClick={() => toggleTask(taskId)}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              isCompleted 
                                ? 'bg-[#faefd9]/50 border-amber-200/50 dark:bg-amber-900/10 dark:border-amber-900/30' 
                                : 'bg-surface hover:bg-[#F5F1EB] border-[#E8E1D8] dark:hover:bg-dark-card dark:border-dark-border'
                            }`}
                          >
                            <button className="mt-0.5 shrink-0 text-amber-500 focus:outline-none">
                              {isCompleted ? (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                                </motion.div>
                              ) : (
                                <Circle className="w-5 h-5 text-[#C8BFB4] hover:text-amber-400 transition-colors" />
                              )}
                            </button>
                            <span className={`text-sm font-medium transition-colors ${isCompleted ? 'text-ink-muted line-through' : 'text-ink dark:text-[#EDE8DF]'}`}>
                              {task}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                ))}
              </div>
              
              {progressPercent === 100 && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-10 p-6 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-900/50 text-center">
                  <h3 className="text-xl font-fraunces font-bold text-amber-800 dark:text-amber-400 mb-2">Congratulations! 🎉</h3>
                  <p className="text-amber-700 dark:text-amber-200/80 text-sm">You have completed all the tasks in your custom roadmap. You are ready for your next career step!</p>
                </motion.div>
              )}

            </motion.div>
          ) : (
            <div className="card p-12 flex flex-col items-center justify-center h-full min-h-[400px] border-dashed border-2 border-[#E8E1D8] dark:border-dark-border bg-transparent shadow-none">
              <Map className="w-12 h-12 text-[#C8BFB4] dark:text-dark-muted mb-4" />
              <h3 className="text-lg font-medium mb-1 text-ink-muted">No Roadmap Generated</h3>
              <p className="text-ink-muted/70 text-center text-sm max-w-sm">
                Fill out your goal on the left to generate your custom AI roadmap.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoadmapGenerator;
