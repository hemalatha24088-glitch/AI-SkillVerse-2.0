import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Award, RefreshCcw } from 'lucide-react';

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
  const [score, setScore] = useState(0);
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

  // Default to Global if not started to avoid undefined, but we won't render it
  const quizData = mergedQuizData[currentSkill] || mergedQuizData['Global'];

  // Load points from local storage on mount
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
    }
  };

  const handleNext = () => {
    if (currentQ < quizData.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
      
      // Update global total quizzes metric
      const totalQuizzes = parseInt(localStorage.getItem('ai_skillverse_total_quizzes') || '45210');
      localStorage.setItem('ai_skillverse_total_quizzes', (totalQuizzes + 1).toString());

      // Update global points
      const currentPoints = parseInt(localStorage.getItem('ai_skillverse_points') || '0');
      localStorage.setItem('ai_skillverse_points', (currentPoints + score).toString());
      
      // Update skill-specific points if not Global
      if (currentSkill !== 'Global') {
        const skillKey = `ai_skillverse_points_${currentSkill.toLowerCase()}`;
        const currentSkillPoints = parseInt(localStorage.getItem(skillKey) || '0');
        localStorage.setItem(skillKey, (currentSkillPoints + score).toString());
      }
      
      // Update mocked user in leaderboard
      const users = JSON.parse(localStorage.getItem('ai_skillverse_users') || '[]');
      if(users.length > 0) {
        users[0].points += score;
        if (currentSkill !== 'Global') {
          users[0][`points_${currentSkill.toLowerCase()}`] = (users[0][`points_${currentSkill.toLowerCase()}`] || 0) + score;
        }
        localStorage.setItem('ai_skillverse_users', JSON.stringify(users));
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
  };

  const selectSkillAndRestart = (skill) => {
    setCurrentSkill(skill);
    setCurrentQ(0);
    setSelected(null);
    setShowResult(false);
    setScore(0);
    setQuizFinished(false);
    setQuizStarted(true);
  };

  return (
    <div className="pb-20 pt-10 max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold mb-4">
          Interactive <span className="text-gradient">Quizzes</span>
        </motion.h1>
      </div>

      {!quizStarted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center">
          <Award className="w-20 h-20 text-primary-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Ready to test your knowledge?</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">Select a skill below to start a specific quiz and earn points for the leaderboard!</p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(mergedQuizData).filter(skill => skill !== 'Global').map(skill => (
              <button
                key={skill}
                onClick={() => selectSkillAndRestart(skill)}
                className="px-6 py-3 rounded-xl border-2 border-primary-500/30 hover:border-primary-500 hover:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-bold transition-all transform hover:scale-105"
              >
                {skill} Quiz
              </button>
            ))}
          </div>
        </motion.div>
      ) : !quizFinished ? (
        <motion.div 
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-8"
        >
          <div className="flex justify-between items-center mb-6 text-sm font-medium text-slate-500">
            <span>Question {currentQ + 1} of {quizData.length}</span>
            <span>Current Score: {score}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mb-8">{quizData[currentQ].question}</h2>

          <div className="space-y-4 mb-8">
            {quizData[currentQ].options.map((opt, idx) => {
              let btnClass = "w-full text-left p-4 rounded-xl border transition-all duration-200 font-medium ";
              
              if (!showResult) {
                btnClass += selected === idx 
                  ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 ring-2 ring-primary-500/20" 
                  : "border-slate-200 dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-700 bg-white/50 dark:bg-dark-bg/50";
              } else {
                if (idx === quizData[currentQ].answer) {
                  btnClass += "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300";
                } else if (idx === selected) {
                  btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300";
                } else {
                  btnClass += "border-slate-200 dark:border-dark-border opacity-50";
                }
              }

              return (
                <button 
                  key={idx} 
                  onClick={() => handleSelect(idx)}
                  disabled={showResult}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span>{opt}</span>
                    {showResult && idx === quizData[currentQ].answer && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                    {showResult && idx === selected && idx !== quizData[currentQ].answer && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-100 dark:bg-slate-800 rounded-xl mb-8 border border-slate-200 dark:border-dark-border">
              <p className="text-sm">
                <span className="font-bold">Explanation:</span> {quizData[currentQ].explanation}
              </p>
            </motion.div>
          )}

          <div className="flex justify-end">
            {!showResult ? (
              <button 
                onClick={handleSubmit} 
                disabled={selected === null}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Answer
              </button>
            ) : (
              <button onClick={handleNext} className="btn-primary">
                {currentQ < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-card p-10 text-center">
          <Award className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-2">{currentSkill} Quiz Completed!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8">You scored {score} points. These points have been added to your {currentSkill !== 'Global' ? `${currentSkill} and Global ranking` : 'Global ranking'}.</p>
          
          <div className="mb-8 border-t border-slate-200 dark:border-dark-border pt-6">
            <h3 className="text-xl font-bold mb-4">Choose your next challenge:</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skillsList.map(skill => (
                <button
                  key={skill}
                  onClick={() => selectSkillAndRestart(skill)}
                  className="px-4 py-2 rounded-xl border border-primary-500/30 hover:bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium transition-colors"
                >
                  {skill} Quiz
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 border-t border-slate-200 dark:border-dark-border pt-6">
            <button onClick={() => setQuizStarted(false)} className="btn-secondary flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" /> Change Skill
            </button>
            <a href="/leaderboard" className="btn-primary">View Leaderboard</a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default QuizSystem;
