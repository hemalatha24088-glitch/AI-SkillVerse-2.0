import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Award, Share2 } from 'lucide-react';

const Certificate = () => {
  const canvasRef = useRef(null);
  const [name, setName] = useState('Your Name');
  const [course, setCourse] = useState('Full Stack AI Engineering');

  // Draw the certificate on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Canvas dimensions
    canvas.width = 1200;
    canvas.height = 800;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f8fafc'); // slate-50
    gradient.addColorStop(1, '#e2e8f0'); // slate-200
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative Border
    ctx.strokeStyle = '#6366f1'; // indigo-500
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    
    // Inner Border
    ctx.strokeStyle = '#8b5cf6'; // violet-500
    ctx.lineWidth = 4;
    ctx.strokeRect(65, 65, canvas.width - 130, canvas.height - 130);

    // Title
    ctx.fillStyle = '#1e293b'; // slate-800
    ctx.font = 'bold 60px "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 220);

    // Subtitle
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.font = '30px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('THIS IS PROUDLY PRESENTED TO', canvas.width / 2, 320);

    // Recipient Name
    ctx.fillStyle = '#4f46e5'; // indigo-600
    ctx.font = 'bold 80px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(name.toUpperCase() || 'STUDENT NAME', canvas.width / 2, 450);

    // Description
    ctx.fillStyle = '#475569'; // slate-600
    ctx.font = '28px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('For successfully completing the comprehensive program in', canvas.width / 2, 550);
    
    ctx.fillStyle = '#1e293b'; // slate-800
    ctx.font = 'bold 36px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText(course, canvas.width / 2, 620);

    // Signatures and Dates
    ctx.fillStyle = '#64748b'; // slate-500
    ctx.font = '24px "Helvetica Neue", Arial, sans-serif';
    
    // Date
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillText(today, 300, 710);
    ctx.fillRect(200, 725, 200, 2);
    ctx.fillText('Date', 300, 755);

    // Signature
    ctx.font = 'italic 32px "Georgia", serif';
    ctx.fillText('AI SkillVerse Team', canvas.width - 300, 710);
    ctx.fillRect(canvas.width - 400, 725, 200, 2);
    ctx.font = '24px "Helvetica Neue", Arial, sans-serif';
    ctx.fillText('Instructor', canvas.width - 300, 755);

  }, [name, course]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `AI_SkillVerse_Certificate_${name.replace(/\s+/g, '_')}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="pb-20 pt-10 max-w-6xl mx-auto px-4 min-h-[80vh]">
      <div className="text-center mb-12">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold mb-4">
          Achievement <span className="text-gradient">Certificate</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400">Generate and download your verifiable proof of completion.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls */}
        <div className="lg:col-span-1">
          <div className="glass-card p-6 sticky top-24">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="text-primary-500 w-6 h-6" /> Details
            </h3>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Your Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-slate-700 dark:text-slate-300">Course / Skill</label>
                <select 
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option>Full Stack AI Engineering</option>
                  <option>Data Structures & Algorithms Masterclass</option>
                  <option>Advanced Python Programming</option>
                  <option>SQL & Database Architecture</option>
                  <option>Machine Learning Fundamentals</option>
                </select>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-dark-border">
                <button 
                  onClick={handleDownload}
                  className="w-full btn-primary py-3 flex items-center justify-center gap-2 mb-3"
                >
                  <Download className="w-5 h-5" /> Download High-Res PNG
                </button>
                <button 
                  className="w-full py-3 rounded-xl border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-semibold flex items-center justify-center gap-2 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                >
                  <Share2 className="w-5 h-5" /> Share on LinkedIn
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Preview */}
        <div className="lg:col-span-2 overflow-hidden flex justify-center items-start">
          <div className="w-full max-w-[800px] bg-white rounded-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-dark-border">
            <canvas 
              ref={canvasRef} 
              className="w-full h-auto"
            ></canvas>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
