import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Briefcase, Code, User, GraduationCap, Layout, Mail, Phone, MapPin, FolderGit2, Star } from 'lucide-react';

const CareerTools = () => {
  const [activeTab, setActiveTab] = useState('resume');
  
  const [resumeData, setResumeData] = useState({
    name: 'Your Name',
    title: 'Software Engineer',
    email: 'email@example.com',
    phone: '+1 234 567 8900',
    summary: 'A passionate software engineer with experience in building scalable web applications and a strong foundation in data structures and algorithms.',
    education: 'B.Tech in Computer Science, University Name (2020-2024)',
    experience: 'Software Developer Intern at Tech Corp (Summer 2023)\n- Built REST APIs using Node.js\n- Optimized database queries by 40%',
    skills: 'JavaScript, React, Node.js, Python, SQL, Git',
    projects: 'AI SkillVerse (Full Stack)\n- Built an AI learning platform using React and OpenRouter API\n- Integrated quizzes, mock interviews, and roadmaps'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="pb-20 pt-10 max-w-6xl mx-auto px-4 min-h-[80vh]">
      <div className="text-center mb-12 print:hidden">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
          Career <span className="text-gradient">Tools</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400">Build your ATS-friendly resume and developer portfolio instantly.</p>
      </div>

      <div className="flex gap-4 justify-center mb-8 print:hidden">
        <button 
          onClick={() => setActiveTab('resume')}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${activeTab === 'resume' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <FileText className="w-5 h-5" /> ATS Resume Builder
        </button>
        <button 
          onClick={() => setActiveTab('portfolio')}
          className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${activeTab === 'portfolio' ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25' : 'bg-white dark:bg-dark-card text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <Layout className="w-5 h-5" /> Portfolio Generator
        </button>
      </div>

      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="glass-card p-6 print:hidden h-[600px] overflow-y-auto">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Code className="text-primary-500 w-6 h-6" /> Resume Data
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input type="text" value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Job Title</label>
                <input type="text" value={resumeData.title} onChange={e => setResumeData({...resumeData, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" value={resumeData.email} onChange={e => setResumeData({...resumeData, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input type="text" value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Professional Summary</label>
                <textarea rows="3" value={resumeData.summary} onChange={e => setResumeData({...resumeData, summary: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Education</label>
                <textarea rows="2" value={resumeData.education} onChange={e => setResumeData({...resumeData, education: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience</label>
                <textarea rows="4" value={resumeData.experience} onChange={e => setResumeData({...resumeData, experience: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Projects</label>
                <textarea rows="4" value={resumeData.projects} onChange={e => setResumeData({...resumeData, projects: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Skills</label>
                <input type="text" value={resumeData.skills} onChange={e => setResumeData({...resumeData, skills: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
            </div>
            
            <button onClick={handlePrint} className="w-full btn-primary py-3 mt-6 flex items-center justify-center gap-2">
              <Download className="w-5 h-5" /> Download / Print PDF
            </button>
          </div>

          {/* Preview (Printable Area) */}
          <div className="bg-white text-slate-800 shadow-2xl min-h-[842px] w-[595px] mx-auto print:m-0 print:shadow-none print:w-full print:min-h-0 relative overflow-hidden flex flex-col font-sans border-t-8 border-primary-600">
            {/* Header */}
            <div className="px-10 pt-10 pb-6 flex justify-between items-end border-b border-slate-100">
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">{resumeData.name}</h1>
                <h2 className="text-lg font-medium text-primary-600 tracking-wide uppercase">{resumeData.title}</h2>
              </div>
              <div className="flex flex-col gap-1.5 text-xs text-slate-500 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span>{resumeData.email}</span>
                  <Mail className="w-3.5 h-3.5 text-primary-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>{resumeData.phone}</span>
                  <Phone className="w-3.5 h-3.5 text-primary-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>New York, NY</span>
                  <MapPin className="w-3.5 h-3.5 text-primary-500" />
                </div>
              </div>
            </div>
            
            {/* Body */}
            <div className="flex flex-row flex-grow">
              
              {/* Main Content Column */}
              <div className="w-2/3 p-10 bg-white">
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-primary-500" /> Professional Summary
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{resumeData.summary}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-primary-500" /> Experience
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{resumeData.experience}</p>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-100 pb-2 mb-4 flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-primary-500" /> Projects
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">{resumeData.projects}</p>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="w-1/3 bg-slate-50 p-10 border-l border-slate-100">
                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary-500" /> Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.split(',').map((s, i) => (
                      <span key={i} className="px-2 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] uppercase tracking-wider font-semibold rounded-md shadow-sm">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-slate-800 border-b-2 border-slate-200 pb-2 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-primary-500" /> Education
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">{resumeData.education}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="glass-card p-12 flex flex-col items-center justify-center min-h-[400px]">
          <Layout className="w-16 h-16 text-primary-500 mb-4" />
          <h3 className="text-2xl font-bold mb-2">Portfolio Generator (Coming Soon)</h3>
          <p className="text-slate-500 text-center max-w-md">
            Soon you will be able to click one button and generate a complete, responsive React portfolio website based on your resume data!
          </p>
        </div>
      )}

    </div>
  );
};

export default CareerTools;
