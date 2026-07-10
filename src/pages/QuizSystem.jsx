import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Award, RefreshCcw, ArrowRight, Brain, Target, BarChart2 } from 'lucide-react';

const quizDataDB = {
  Global: [
    {
      id: 1,
      question: "Which of the following is NOT a core concept of Object-Oriented Programming?",
      options: ["Polymorphism", "Encapsulation", "Compilation", "Inheritance"],
      answer: 2,
      explanation: "Compilation is a process of translating code, not an OOP concept."
    },
    {
      id: 2,
      question: "What is the time complexity of searching in a perfectly balanced binary search tree?",
      options: ["O(1)", "O(n)", "O(n log n)", "O(log n)"],
      answer: 3,
      explanation: "A balanced BST halves the search space at each step, resulting in O(log n) time."
    },
    {
      id: 3,
      question: "In Python, which of these data structures is immutable?",
      options: ["List", "Dictionary", "Tuple", "Set"],
      answer: 2,
      explanation: "Tuples are immutable, meaning their elements cannot be changed after creation."
    }
  ],
  Python: [
    { id: 1, question: "What is the output of `print(2 ** 3)`?", options: ["6", "8", "9", "Error"], answer: 1, explanation: "The ** operator performs exponentiation. 2 to the power of 3 is 8." },
    { id: 2, question: "Which keyword is used to define a function in Python?", options: ["func", "define", "def", "function"], answer: 2, explanation: "The `def` keyword introduces a function definition." },
    { id: 3, question: "What does the `len()` function do?", options: ["Returns the memory size", "Returns the length of an object", "Converts to a list", "None of the above"], answer: 1, explanation: "`len()` returns the number of items in an object." }
  ],
  React: [
    { id: 1, question: "What hook is used to manage state in a functional component?", options: ["useContext", "useEffect", "useState", "useReducer"], answer: 2, explanation: "`useState` allows you to add React state to function components." },
    { id: 2, question: "Which of the following is used to pass data to a component from outside?", options: ["setState", "render with arguments", "PropTypes", "props"], answer: 3, explanation: "Props are arguments passed into React components." },
    { id: 3, question: "What is the virtual DOM?", options: ["A direct copy of the real DOM", "A lightweight JavaScript representation of the DOM", "A browser plugin", "None of the above"], answer: 1, explanation: "The Virtual DOM is a lightweight copy that React uses to optimize updates." }
  ],
  SQL: [
    { id: 1, question: "Which statement is used to extract data from a database?", options: ["OPEN", "GET", "SELECT", "EXTRACT"], answer: 2, explanation: "The `SELECT` statement is used to select data from a database." },
    { id: 2, question: "How do you filter records in SQL?", options: ["FILTER", "WHERE", "HAVING", "GROUP BY"], answer: 1, explanation: "The `WHERE` clause is used to filter records." },
    { id: 3, question: "Which operator is used to search for a specified pattern in a column?", options: ["LIKE", "GET", "MATCH", "SEARCH"], answer: 0, explanation: "The `LIKE` operator is used in a WHERE clause to search for a specified pattern." }
  ],
  DSA: [
    { id: 1, question: "Which data structure uses LIFO (Last In First Out)?", options: ["Queue", "Stack", "Tree", "Graph"], answer: 1, explanation: "A Stack follows the Last In First Out (LIFO) principle." },
    { id: 2, question: "What is the worst-case time complexity of QuickSort?", options: ["O(n log n)", "O(n)", "O(n^2)", "O(log n)"], answer: 2, explanation: "The worst-case occurs when the pivot elements are the greatest or smallest elements, resulting in O(n^2)." },
    { id: 3, question: "Which graph traversal uses a Queue?", options: ["DFS", "BFS", "Dijkstra", "A*"], answer: 1, explanation: "Breadth-First Search (BFS) uses a Queue to explore neighbors level by level." }
  ],
  "C++": [
    { id: 1, question: "Which symbol is used for a single-line comment in C++?", options: ["//", "/*", "--", "#"], answer: 0, explanation: "`//` is used for single-line comments in C++." },
    { id: 2, question: "What is used to allocate dynamic memory in C++?", options: ["malloc()", "alloc", "new", "create"], answer: 2, explanation: "The `new` operator allocates memory dynamically in C++." },
    { id: 3, question: "Which of the following is a pure virtual function?", options: ["virtual void show() = 0;", "virtual void show() {}", "void show() = 0;", "None of the above"], answer: 0, explanation: "Assigning `= 0` to a virtual function declaration makes it a pure virtual function." }
  ]
};

const skillsList = ['Python', 'React', 'SQL', 'DSA', 'C++'];

const QuizSystem = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentSkill, setCurrentSkill] = useState('Global');
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  
  // Track stats for the final report
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Load custom quizzes from localStorage and merge with DB
  const customQuizzes = JSON.parse(localStorage.getItem('ai_skillverse_custom_quizzes') || '[]');
  const mergedQuizData = { ...quizDataDB };
  customQuizzes.forEach(cq => {
    mergedQuizData[cq.skill] = [...(mergedQuizData[cq.skill] || []), {
      id: cq.id,
      question: cq.question,
      options: cq.options,
      answer: cq.answer,
      explanation: "Custom question added by Admin"
    }];
  });

  const quizData = mergedQuizData[currentSkill] || mergedQuizData['Global'];

  useEffect(() => {
    const savedPoints = localStorage.getItem('ai_skillverse_points');
    if (!savedPoints) localStorage.setItem('ai_skillverse_points', '0');
  }, []);

  const handleSelect = (index) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    if (selected === quizData[currentQ].answer) {
      setScore(score + 10);
      setCorrectCount(correctCount + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      
      const totalQuizzes = parseInt(localStorage.getItem('ai_skillverse_total_quizzes') || '45210');
      localStorage.setItem('ai_skillverse_total_quizzes', (totalQuizzes + 1).toString());

      const currentPoints = parseInt(localStorage.getItem('ai_skillverse_points') || '0');
      localStorage.setItem('ai_skillverse_points', (currentPoints + score).toString());
      
      if (currentSkill !== 'Global') {
        const skillKey = `ai_skillverse_points_${currentSkill.toLowerCase()}`;
        const currentSkillPoints = parseInt(localStorage.getItem(skillKey) || '0');
        localStorage.setItem(skillKey, (currentSkillPoints + score).toString());
      }
      
      const users = JSON.parse(localStorage.getItem('ai_skillverse_users') || '[]');
      if(users.length > 0) {
        users[0].points += score;
        if (currentSkill !== 'Global') {
          users[0][`points_${currentSkill.toLowerCase()}`] = (users[0][`points_${currentSkill.toLowerCase()}`] || 0) + score;
        }
        localStorage.setItem('ai_skillverse_users', JSON.stringify(users));
      }
      
      // Log to Recent Activity
      const activities = JSON.parse(localStorage.getItem('ai_skillverse_recent_activity') || '[]');
      activities.unshift({
        title: `${currentSkill} Quiz Completed`,
        time: 'Just now',
        points: `+${score} pts`
      });
      // Keep only last 5 activities
      if (activities.length > 5) activities.pop();
      localStorage.setItem('ai_skillverse_recent_activity', JSON.stringify(activities));
    }
  };

  const selectSkillAndRestart = (skill) => {
    setCurrentSkill(skill);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setCorrectCount(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  // Calculate Progress
  const progressPercent = quizStarted && !quizFinished ? ((currentQ + 1) / quizData.length) * 100 : 0;
  const maxPossibleScore = quizData.length * 10;
  const accuracyPercent = quizFinished ? Math.round((correctCount / quizData.length) * 100) : 0;

  return (
    <div className="page-container flex flex-col items-center pt-24 pb-20">
      
      {!quizStarted ? (
        <div className="w-full max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <span className="tag">Assessments</span>
            <h1 className="text-display text-4xl md:text-5xl font-semibold">Test your knowledge</h1>
            <p className="text-ink-muted max-w-lg mx-auto">
              Select a domain below to take a quick assessment. Gain leaderboard points and find gaps in your understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.keys(mergedQuizData).filter(skill => skill !== 'Global').map(skill => (
              <button
                key={skill}
                onClick={() => selectSkillAndRestart(skill)}
                className="card-hover p-6 flex flex-col items-center text-center gap-3 bg-surface group"
              >
                <div className="w-12 h-12 rounded-full bg-[#faefd9] text-[#C77D30] flex items-center justify-center group-hover:bg-[#C77D30] group-hover:text-white transition-colors duration-200">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-fraunces text-xl font-medium text-ink dark:text-[#EDE8DF]">{skill}</h3>
                <span className="text-sm font-medium text-amber-600 dark:text-amber-400 group-hover:underline">Start Quiz →</span>
              </button>
            ))}
          </div>
        </div>
      ) : !quizFinished ? (
        <div className="w-full max-w-2xl">
          {/* Progress Header */}
          <div className="mb-8 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <p className="section-label mb-1">{currentSkill} Assessment</p>
                <h2 className="text-2xl font-semibold font-fraunces">Question {currentQ + 1} of {quizData.length}</h2>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-ink-muted">Score</span>
                <div className="text-xl font-semibold text-amber-600">{score}</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#E8E1D8] dark:bg-dark-border rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-amber-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="card p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-medium text-ink dark:text-[#EDE8DF] mb-6 leading-relaxed">
              {quizData[currentQ].question}
            </h3>

            <div className="space-y-3 mb-8">
              {quizData[currentQ].options.map((opt, idx) => {
                
                const isSelected = selected === idx;
                const isCorrectAnswer = idx === quizData[currentQ].answer;
                
                // Base Option Style
                let optionClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 flex items-center justify-between ";
                
                if (!showResult) {
                  optionClass += isSelected 
                    ? "border-amber-500 bg-[#faefd9] dark:bg-amber-900/20 text-amber-900 dark:text-amber-100"
                    : "border-[#E8E1D8] dark:border-dark-border bg-surface dark:bg-dark-card text-ink dark:text-[#EDE8DF] hover:border-[#C8BFB4] dark:hover:border-dark-muted";
                } else {
                  if (isCorrectAnswer) {
                    optionClass += "border-success bg-success-light dark:bg-success/20 text-success dark:text-success-light";
                  } else if (isSelected && !isCorrectAnswer) {
                    optionClass += "border-error bg-error-light dark:bg-error/20 text-error dark:text-error-light";
                  } else {
                    optionClass += "border-[#E8E1D8] dark:border-dark-border bg-surface dark:bg-dark-card opacity-50";
                  }
                }

                return (
                  <button 
                    key={idx} 
                    onClick={() => handleSelect(idx)}
                    disabled={showResult}
                    className={optionClass}
                  >
                    <span className="font-medium text-sm md:text-base">{opt}</span>
                    
                    {/* Animated Icon Reveal on Submit */}
                    <AnimatePresence>
                      {showResult && isCorrectAnswer && (
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0 }}>
                          <CheckCircle2 className="w-5 h-5 text-success" />
                        </motion.div>
                      )}
                      {showResult && isSelected && !isCorrectAnswer && (
                        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0 }}>
                          <XCircle className="w-5 h-5 text-error" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box */}
            <AnimatePresence>
              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mb-8 overflow-hidden rounded-lg bg-surface-raised dark:bg-dark-border"
                >
                  <div className="p-4 border-l-4 border-amber-500">
                    <p className="text-sm text-ink dark:text-[#EDE8DF] leading-relaxed">
                      <span className="font-semibold mr-2">Explanation:</span> 
                      {quizData[currentQ].explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex justify-end pt-2 border-t border-[#E8E1D8] dark:border-dark-border">
              {!showResult ? (
                <button 
                  onClick={handleSubmit} 
                  disabled={selected === null}
                  className="btn-primary disabled:opacity-50"
                >
                  Submit Answer
                </button>
              ) : (
                <button onClick={handleNext} className="btn-primary">
                  {currentQ < quizData.length - 1 ? 'Next Question' : 'View Results'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Results Report */
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
          <div className="card p-8 md:p-12 text-center space-y-8">
            <div className="mx-auto w-20 h-20 bg-[#faefd9] text-[#C77D30] rounded-full flex items-center justify-center">
              <Award className="w-10 h-10" />
            </div>
            
            <div>
              <h2 className="text-display text-3xl font-semibold mb-2">Assessment Complete</h2>
              <p className="text-ink-muted">Here is your performance breakdown for the {currentSkill} quiz.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-raised dark:bg-dark-card p-4 rounded-lg border border-[#E8E1D8] dark:border-dark-border">
                <Target className="w-5 h-5 text-amber-600 mb-2 mx-auto" />
                <div className="text-2xl font-bold font-fraunces text-ink dark:text-[#EDE8DF]">{correctCount} <span className="text-sm font-inter text-ink-muted">/ {quizData.length}</span></div>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-muted mt-1">Correct Answers</div>
              </div>
              <div className="bg-surface-raised dark:bg-dark-card p-4 rounded-lg border border-[#E8E1D8] dark:border-dark-border">
                <BarChart2 className="w-5 h-5 text-amber-600 mb-2 mx-auto" />
                <div className="text-2xl font-bold font-fraunces text-ink dark:text-[#EDE8DF]">{accuracyPercent}%</div>
                <div className="text-xs font-medium uppercase tracking-wider text-ink-muted mt-1">Accuracy</div>
              </div>
            </div>

            <div className="bg-[#faefd9] dark:bg-amber-900/20 p-4 rounded-lg">
              <p className="text-amber-900 dark:text-amber-200 text-sm font-medium">
                You earned <strong className="text-amber-700 dark:text-amber-400">{score} points</strong>. 
                These have been added to your Global and {currentSkill} leaderboard rankings!
              </p>
            </div>
            
            <div className="pt-6 border-t border-[#E8E1D8] dark:border-dark-border flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={() => setQuizStarted(false)} className="btn-secondary">
                <RefreshCcw className="w-4 h-4" /> Take Another Quiz
              </button>
              <a href="/leaderboard" className="btn-primary">
                View Leaderboard
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizSystem;
