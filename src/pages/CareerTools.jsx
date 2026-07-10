import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Briefcase, User, GraduationCap, Layout, Mail, Phone, MapPin, FolderGit2, Star, Edit3 } from 'lucide-react';

const CareerTools = () => {
  const [activeTab, setActiveTab] = useState('resume');
  
  const [resumeData, setResumeData] = useState({
    name: 'Eleanor Shellstrop',
    title: 'Senior Software Engineer',
    email: 'eleanor@example.com',
    phone: '+1 234 567 8900',
    location: 'New York, NY',
    summary: 'A passionate software engineer with 4+ years of experience in building scalable web applications and a strong foundation in distributed systems. Proven track record of improving database efficiency and leading frontend refactoring projects.',
    education: 'B.Tech in Computer Science, University of Technology\nGraduated: May 2020 | GPA: 3.8/4.0',
    experience: 'Software Developer Intern at Tech Corp (Summer 2023)\n- Built REST APIs using Node.js and Express\n- Optimized database queries by 40%, reducing latency by 200ms\n- Mentored 2 junior developers on React best practices',
    skills: 'JavaScript, TypeScript, React, Node.js, Python, SQL, Git, AWS',
    projects: 'AI SkillVerse (Full Stack)\n- Built an AI learning platform using React and OpenRouter API\n- Integrated quizzes, mock interviews, and automated roadmaps serving 10k+ users'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="page-container pt-24 pb-20 flex flex-col h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="text-center mb-10 shrink-0 print:hidden space-y-4">
        <span className="tag">Career Tools</span>
        <h1 className="text-display text-4xl md:text-5xl font-semibold">
          Resume Builder
        </h1>
        <p className="text-ink-muted">Create an ATS-friendly, professionally designed resume in real-time.</p>
        
        <div className="flex gap-3 justify-center mt-6">
          <button 
            onClick={() => setActiveTab('resume')}
            className={activeTab === 'resume' ? 'btn-primary' : 'btn-secondary'}
          >
            <FileText className="w-4 h-4" /> ATS Resume Builder
          </button>
          <button 
            onClick={() => setActiveTab('portfolio')}
            className={activeTab === 'portfolio' ? 'btn-primary' : 'btn-secondary'}
          >
            <Layout className="w-4 h-4" /> Portfolio Generator
          </button>
        </div>
      </div>

      {activeTab === 'resume' && (
        <div className="flex flex-col lg:flex-row gap-8 flex-grow min-h-0 print:block">
          
          {/* Editor Column */}
          <div className="w-full lg:w-1/3 flex flex-col print:hidden">
            <div className="card p-6 flex flex-col h-full bg-surface">
              <div className="flex items-center gap-2 mb-6 border-b border-[#E8E1D8] pb-4">
                <Edit3 className="w-5 h-5 text-amber-500" />
                <h3 className="font-fraunces text-xl font-medium text-ink dark:text-[#EDE8DF]">Resume Data</h3>
              </div>
              
              <div className="space-y-5 overflow-y-auto pr-2 custom-scrollbar flex-grow">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={resumeData.name} onChange={e => setResumeData({...resumeData, name: e.target.value})} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Job Title</label>
                  <input type="text" value={resumeData.title} onChange={e => setResumeData({...resumeData, title: e.target.value})} className="input" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Email</label>
                    <input type="email" value={resumeData.email} onChange={e => setResumeData({...resumeData, email: e.target.value})} className="input" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Phone</label>
                    <input type="text" value={resumeData.phone} onChange={e => setResumeData({...resumeData, phone: e.target.value})} className="input" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Location</label>
                  <input type="text" value={resumeData.location} onChange={e => setResumeData({...resumeData, location: e.target.value})} className="input" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Professional Summary</label>
                  <textarea rows="4" value={resumeData.summary} onChange={e => setResumeData({...resumeData, summary: e.target.value})} className="input resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Education</label>
                  <textarea rows="3" value={resumeData.education} onChange={e => setResumeData({...resumeData, education: e.target.value})} className="input resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Experience</label>
                  <textarea rows="5" value={resumeData.experience} onChange={e => setResumeData({...resumeData, experience: e.target.value})} className="input resize-none font-mono text-[13px] leading-relaxed"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Projects</label>
                  <textarea rows="4" value={resumeData.projects} onChange={e => setResumeData({...resumeData, projects: e.target.value})} className="input resize-none font-mono text-[13px] leading-relaxed"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2">Skills (Comma separated)</label>
                  <input type="text" value={resumeData.skills} onChange={e => setResumeData({...resumeData, skills: e.target.value})} className="input" />
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-[#E8E1D8]">
                <button onClick={handlePrint} className="w-full btn-primary py-3 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
              </div>
            </div>
          </div>

          {/* Preview Column (A4 Paper Container) */}
          <div className="w-full lg:w-2/3 flex justify-center bg-[#E5E1DA] dark:bg-[#1A1814] rounded-lg overflow-y-auto p-4 md:p-8 shadow-inner print:p-0 print:bg-white">
            
            {/* Actual A4 Page styling */}
            <div className="bg-white text-black shadow-card w-full max-w-[800px] min-h-[1131px] shrink-0 print:m-0 print:shadow-none print:w-full print:min-h-0 flex flex-col border-t-8 border-amber-600">
              
              {/* Resume Header */}
              <div className="px-12 pt-12 pb-8 text-center border-b border-gray-200">
                <h1 className="text-4xl font-semibold font-fraunces text-gray-900 mb-2">{resumeData.name}</h1>
                <h2 className="text-lg font-medium text-amber-700 tracking-widest uppercase mb-4">{resumeData.title}</h2>
                
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-amber-600" />
                    <span>{resumeData.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-600" />
                    <span>{resumeData.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{resumeData.location}</span>
                  </div>
                </div>
              </div>
              
              {/* Resume Body */}
              <div className="flex flex-col md:flex-row flex-grow">
                
                {/* Main Content Column (Left) */}
                <div className="w-full md:w-2/3 p-12 pr-8 bg-white border-r border-gray-100">
                  
                  {/* Summary */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-amber-200 pb-2 mb-4 flex items-center gap-2">
                      <User className="w-4 h-4 text-amber-600" /> Summary
                    </h3>
                    <p className="text-[13px] text-gray-700 leading-relaxed font-inter">{resumeData.summary}</p>
                  </div>

                  {/* Experience */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-amber-200 pb-2 mb-4 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-amber-600" /> Experience
                    </h3>
                    <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap font-inter pl-2 border-l-2 border-gray-200 ml-1">
                      {resumeData.experience}
                    </div>
                  </div>

                  {/* Projects */}
                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-amber-200 pb-2 mb-4 flex items-center gap-2">
                      <FolderGit2 className="w-4 h-4 text-amber-600" /> Projects
                    </h3>
                    <div className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap font-inter pl-2 border-l-2 border-gray-200 ml-1">
                      {resumeData.projects}
                    </div>
                  </div>
                </div>

                {/* Sidebar Content Column (Right) */}
                <div className="w-full md:w-1/3 bg-gray-50 p-12 pl-8">
                  
                  {/* Skills */}
                  <div className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-amber-200 pb-2 mb-4 flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-600" /> Skills
                    </h3>
                    <div className="flex flex-col gap-2">
                      {resumeData.skills.split(',').map((s, i) => (
                        <div key={i} className="text-[13px] text-gray-700 font-medium pb-1 border-b border-gray-200 last:border-0">
                          {s.trim()}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div className="mb-10">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b-2 border-amber-200 pb-2 mb-4 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-amber-600" /> Education
                    </h3>
                    <p className="text-[13px] text-gray-700 leading-relaxed whitespace-pre-wrap font-inter">
                      {resumeData.education}
                    </p>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'portfolio' && (
        <div className="card p-12 flex flex-col items-center justify-center min-h-[400px] bg-surface">
          <Layout className="w-16 h-16 text-amber-500 mb-6" />
          <h3 className="font-fraunces text-3xl font-semibold mb-3">Portfolio Generator</h3>
          <span className="tag mb-6">Coming Soon</span>
          <p className="text-ink-muted text-center max-w-md">
            Click one button to generate a complete, responsive React portfolio website based on your resume data!
          </p>
        </div>
      )}

    </div>
  );
};

export default CareerTools;
