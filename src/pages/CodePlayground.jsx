import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Terminal, Code2, Database, Lightbulb } from 'lucide-react';
import { callAI } from '../utils/callAI';

const CodePlayground = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('print("Hello, AI SkillVerse!")');
  const [output, setOutput] = useState('');
  const [resultStatus, setResultStatus] = useState('idle');
  const [errorHint, setErrorHint] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const textareaRef = useRef(null);
  const gutterRef = useRef(null);

  const handleScroll = () => {
    if (gutterRef.current && textareaRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const linesCount = code.split('\n').length;
  const lineNumbers = Array.from({ length: Math.max(1, linesCount) }, (_, i) => i + 1);

  const defaultCode = {
    python: 'print("Hello, AI SkillVerse!")',
    javascript: 'console.log("Hello, AI SkillVerse!");',
    java: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, AI SkillVerse!");\n  }\n}',
    cpp: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, AI SkillVerse!" << std::endl;\n    return 0;\n}',
    sql: 'SELECT * FROM users\nWHERE skill = "AI";'
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    setCode(defaultCode[newLang]);
    setOutput('');
  };

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and executing code...');
    setResultStatus('idle');
    setErrorHint('');
    
    try {
      const AI_PROMPT = `You are a strict code compiler and executor.
      Language: ${language}
      Code:
      ${code}
      
      Evaluate this code. If it is correct, return the standard output. If there is a syntax error or logic error, return an error message and a helpful hint pointing out the exact line number.
      Return ONLY a JSON object with this exact structure:
      {
        "status": "success" or "error",
        "output": "The stdout or stderr trace",
        "errorHint": "If error, provide a concise friendly hint with the line number. If success, leave empty."
      }`;

      const messages = [{ role: 'user', content: AI_PROMPT }];
      let content = await callAI(messages, 1500);

      const start = content.indexOf('{');
      const end = content.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        content = content.slice(start, end + 1);
      }
      
      const result = JSON.parse(content);
      setOutput(result.output || "");
      setResultStatus(result.status === 'error' ? 'error' : 'success');
      setErrorHint(result.errorHint || '');
      
    } catch (err) {
      setOutput('Failed to execute code: ' + err.message);
      setResultStatus('error');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full h-[70vh] min-h-[600px]">
      <div className="mb-6 flex justify-between items-end shrink-0">
        <div>
          <motion.h1 initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-3xl font-bold mb-2 flex items-center gap-2">
            <Code2 className="w-8 h-8 text-primary-500" /> Code <span className="text-gradient">Playground</span>
          </motion.h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm">Write and test code with AI-powered simulation.</p>
          <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-xs font-medium px-3 py-1.5 rounded-full">
            <span>🤖</span>
            <span>Outputs are AI-simulated predictions — not guaranteed-accurate execution results.</span>
          </div>
        </div>
        
        <div className="flex gap-4">
          <select 
            value={language} 
            onChange={handleLanguageChange}
            className="px-4 py-2 rounded-xl bg-white dark:bg-dark-card border border-slate-200 dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
          >
            <option value="python">Python</option>
            <option value="javascript">JavaScript</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="sql">SQL</option>
          </select>
          <button 
            onClick={handleRun}
            disabled={isRunning}
            className="btn-primary flex items-center gap-2 py-2 px-6 disabled:opacity-70"
          >
            {isRunning ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Play className="w-4 h-4" />}
            Run Code
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-grow min-h-0">
        {/* Editor Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 flex flex-col glass-card overflow-hidden">
          <div className="bg-slate-100 dark:bg-slate-800/50 p-2 border-b border-slate-200 dark:border-dark-border flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-xs font-mono text-slate-500 ml-2">main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'cpp' ? 'cpp' : language}</span>
          </div>
          
          <div className="flex-grow flex bg-slate-900 overflow-hidden relative">
            <div 
              ref={gutterRef}
              className="w-12 bg-slate-950 text-slate-500 font-mono text-sm py-4 text-right pr-3 select-none overflow-hidden leading-6"
              style={{ paddingBottom: '2rem' }}
            >
              {lineNumbers.map(n => <div key={n}>{n}</div>)}
            </div>
            <textarea 
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={handleScroll}
              spellCheck="false"
              className="flex-grow w-full py-4 pl-4 pr-4 bg-transparent text-slate-100 font-mono text-sm resize-none focus:outline-none overflow-auto leading-6 whitespace-pre"
              style={{ tabSize: 4 }}
            ></textarea>
          </div>
        </motion.div>

        {/* Output Area */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex-1 flex flex-col glass-card overflow-hidden">
          <div className="bg-slate-100 dark:bg-slate-800/50 p-3 border-b border-slate-200 dark:border-dark-border flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-semibold">Console Output</span>
          </div>
          <div className={`flex-grow w-full p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap transition-colors ${
            resultStatus === 'error' ? 'bg-red-950/20 text-red-400' : 'bg-black text-green-400'
          }`}>
            {resultStatus === 'idle' && !output && <span className="text-slate-600">Run code to see output...</span>}
            {output}
            
            {resultStatus === 'error' && errorHint && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-yellow-300 flex items-start gap-3"
              >
                <Lightbulb className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold mb-1">AI Hint</div>
                  <div className="whitespace-normal leading-relaxed">{errorHint}</div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CodePlayground;
