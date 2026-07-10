import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Terminal, Code2, Lightbulb, AlertTriangle, Cpu } from 'lucide-react';
import Editor from '@monaco-editor/react';
import { callAI } from '../utils/callAI';

const CodePlayground = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('print("Hello, AI SkillVerse!")');
  const [output, setOutput] = useState('');
  const [resultStatus, setResultStatus] = useState('idle');
  const [errorHint, setErrorHint] = useState('');
  const [isRunning, setIsRunning] = useState(false);

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
    setResultStatus('idle');
    setErrorHint('');
  };

  const handleRun = async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setOutput('');
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

  // Map language for Monaco
  const monacoLanguage = language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : language === 'sql' ? 'sql' : language === 'javascript' ? 'javascript' : 'python';

  return (
    <div className="page-container flex flex-col h-[calc(100vh-4rem)] pt-24 pb-8">
      {/* ── Header ── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4 shrink-0">
        <div className="space-y-3">
          <p className="section-label">Practice Environment</p>
          <h1 className="text-3xl md:text-4xl font-semibold text-ink dark:text-[#EDE8DF] flex items-center gap-3">
            <Code2 className="w-8 h-8 text-amber-500" />
            Code Playground
          </h1>
          <p className="text-sm text-ink-muted dark:text-dark-muted">
            Write code in 5 languages. Hit run to see simulated execution and AI feedback.
          </p>
        </div>
        
        <div className="flex gap-3">
          <select 
            value={language} 
            onChange={handleLanguageChange}
            className="input max-w-[140px] font-medium"
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
            className="btn-primary min-w-[120px]"
          >
            {isRunning ? (
              <span className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-white dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-white dot-3" />
              </span>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                Run Code
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Main Layout (Editor + Output) ── */}
      <div className="flex flex-col lg:flex-row gap-6 flex-grow min-h-0">
        
        {/* Editor Panel */}
        <div className="flex-1 flex flex-col rounded-lg border border-[#E8E1D8] dark:border-dark-border overflow-hidden shadow-card">
          <div className="bg-[#1E1B14] px-4 py-2.5 flex justify-between items-center border-b border-[#3D3427]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28C840]" />
              <span className="ml-3 text-xs font-mono text-[#8A7A6A]">
                main.{language === 'python' ? 'py' : language === 'javascript' ? 'js' : language === 'cpp' ? 'cpp' : language}
              </span>
            </div>
          </div>
          
          <div className="flex-grow bg-[#1E1B14] relative">
            <Editor
              height="100%"
              language={monacoLanguage}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: '"Fira Code", monospace',
                padding: { top: 16, bottom: 16 },
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: "smooth",
                renderLineHighlight: "all",
              }}
              loading={
                <div className="absolute inset-0 flex items-center justify-center text-[#8A7A6A] font-mono text-sm">
                  Loading editor...
                </div>
              }
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className="flex-1 flex flex-col rounded-lg border border-[#E8E1D8] dark:border-dark-border overflow-hidden shadow-card bg-surface dark:bg-dark-card relative">
          
          {/* Output Header */}
          <div className="bg-surface-raised dark:bg-dark-border/50 px-4 py-3 border-b border-[#E8E1D8] dark:border-dark-border flex justify-between items-center">
            <div className="flex items-center gap-2 text-ink dark:text-[#EDE8DF]">
              <Terminal className="w-4 h-4" />
              <span className="text-sm font-medium">Execution Output</span>
            </div>
            
            {/* Disclaimer Badge */}
            <div className="inline-flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-400 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
              <Cpu className="w-3.5 h-3.5" />
              AI-Simulated
            </div>
          </div>
          
          {/* Output Content */}
          <div className="flex-grow p-5 font-mono text-sm overflow-y-auto relative">
            <AnimatePresence mode="wait">
              {isRunning ? (
                <motion.div 
                  key="running"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-ink-muted dark:text-dark-muted gap-4"
                >
                  <div className="flex gap-1.5 items-center bg-surface-raised dark:bg-dark-border px-4 py-2 rounded-full shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-500 dot-1" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 dot-2" />
                    <span className="w-2 h-2 rounded-full bg-amber-500 dot-3" />
                  </div>
                  <span className="text-xs font-medium uppercase tracking-widest text-amber-600 dark:text-amber-500">AI is evaluating code</span>
                </motion.div>
              ) : resultStatus === 'idle' && !output ? (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-ink-muted/50 dark:text-dark-muted/50 text-center"
                >
                  <Play className="w-10 h-10 mb-3 opacity-20" />
                  <p>Run your code to see the simulated output here.</p>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className={`whitespace-pre-wrap ${resultStatus === 'error' ? 'text-error dark:text-[#FF8A8A]' : 'text-[#2C5F4A] dark:text-[#88C9A1]'}`}>
                    {output}
                  </div>
                  
                  {resultStatus === 'error' && errorHint && (
                    <div className="bg-[#FFF8F0] dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg p-4 flex gap-3 text-amber-900 dark:text-amber-200">
                      <Lightbulb className="w-5 h-5 flex-shrink-0 text-amber-600" />
                      <div>
                        <div className="font-semibold text-sm mb-1 text-amber-800 dark:text-amber-400">AI Hint</div>
                        <div className="leading-relaxed">{errorHint}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodePlayground;
