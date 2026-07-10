import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Search, Filter, Lock, Loader2, Sparkles } from 'lucide-react';
import { callAI } from '../utils/callAI';

const defaultPyqs = [
  { id: 1, company: 'TCS', role: 'Ninja/Digital', skill: 'Java', difficulty: 'Medium', question: 'Write a program to reverse a string without using inbuilt functions.' },
  { id: 2, company: 'Infosys', role: 'System Engineer', skill: 'SQL', difficulty: 'Easy', question: 'Find the second highest salary from the Employee table.' },
  { id: 3, company: 'Microsoft', role: 'SDE 1', skill: 'DSA', difficulty: 'Hard', question: 'Detect a cycle in a linked list and return the starting node.' },
  { id: 4, company: 'Wipro', role: 'Project Engineer', skill: 'C++', difficulty: 'Medium', question: 'Implement a binary search algorithm on a sorted array.' },
  { id: 5, company: 'Google', role: 'SWE', skill: 'DSA', difficulty: 'Hard', question: 'Invert a binary tree.' },
  { id: 6, company: 'Accenture', role: 'ASE', skill: 'Python', difficulty: 'Easy', question: 'Check if a given string is a palindrome.' },
  { id: 7, company: 'Cognizant', role: 'GenC', skill: 'SQL', difficulty: 'Medium', question: 'Write a query to find duplicate records in a table.' },
  { id: 8, company: 'Capgemini', role: 'Analyst', skill: 'Java', difficulty: 'Medium', question: 'Explain the difference between HashMap and ConcurrentHashMap with examples.' },
  { id: 9, company: 'TCS', role: 'Digital', skill: 'React', difficulty: 'Medium', question: 'Explain the Virtual DOM and how React reconciles it with the Real DOM.' },
  { id: 10, company: 'Google', role: 'SWE', skill: 'DSA', difficulty: 'Hard', question: 'Find the median of two sorted arrays of different sizes.' },
  { id: 11, company: 'Microsoft', role: 'SDE 2', skill: 'Java', difficulty: 'Hard', question: 'Design a thread-safe Singleton class in Java.' },
  { id: 12, company: 'Infosys', role: 'Specialist Programmer', skill: 'Python', difficulty: 'Medium', question: 'How do decorators work in Python? Write a decorator to time a function.' },
  { id: 13, company: 'Wipro', role: 'Turbo', skill: 'SQL', difficulty: 'Hard', question: 'Write a SQL query to fetch N consecutive records where a specific condition is met.' },
  { id: 14, company: 'Accenture', role: 'FSE', skill: 'React', difficulty: 'Easy', question: 'What is the difference between props and state in React?' },
  { id: 15, company: 'Capgemini', role: 'Senior Analyst', skill: 'C++', difficulty: 'Hard', question: 'Explain virtual functions and vtables in C++.' },
  { id: 16, company: 'Cognizant', role: 'GenC Elevate', skill: 'DSA', difficulty: 'Medium', question: 'Write an algorithm to find the longest common subsequence.' },
  { id: 17, company: 'TCS', role: 'Ninja', skill: 'SQL', difficulty: 'Easy', question: 'Explain the difference between TRUNCATE, DELETE, and DROP.' },
  { id: 18, company: 'Google', role: 'SWE 3', skill: 'React', difficulty: 'Hard', question: 'How would you optimize a large React application to prevent unnecessary re-renders?' },
  { id: 19, company: 'Microsoft', role: 'SDE 1', skill: 'C++', difficulty: 'Medium', question: 'What are smart pointers in C++? Explain shared_ptr and unique_ptr.' },
  { id: 20, company: 'Infosys', role: 'System Engineer', skill: 'Java', difficulty: 'Easy', question: 'What is the difference between an abstract class and an interface?' },
  { id: 21, company: 'Wipro', role: 'Project Engineer', skill: 'Python', difficulty: 'Medium', question: 'Explain list comprehensions in Python and write an example.' },
  { id: 22, company: 'Accenture', role: 'ASE', skill: 'DSA', difficulty: 'Medium', question: 'Implement a queue using two stacks.' },
  { id: 23, company: 'Capgemini', role: 'Analyst', skill: 'React', difficulty: 'Medium', question: 'What are React Hooks? Can you name at least three built-in hooks?' },
  { id: 24, company: 'Cognizant', role: 'GenC', skill: 'C++', difficulty: 'Easy', question: 'What is the difference between pass-by-value and pass-by-reference?' },
  { id: 25, company: 'TCS', role: 'Digital', skill: 'DSA', difficulty: 'Hard', question: 'Solve the N-Queens problem using backtracking.' },
  { id: 26, company: 'Google', role: 'SWE', skill: 'Python', difficulty: 'Medium', question: 'Explain the Global Interpreter Lock (GIL) in Python.' },
  { id: 27, company: 'Microsoft', role: 'SDE 2', skill: 'SQL', difficulty: 'Hard', question: 'Write a query to find the Nth highest salary without using TOP or LIMIT.' },
  { id: 28, company: 'Infosys', role: 'Specialist Programmer', skill: 'React', difficulty: 'Hard', question: 'How does React handle routing? Explain the core concepts of React Router.' },
  { id: 29, company: 'Wipro', role: 'Turbo', skill: 'Java', difficulty: 'Medium', question: 'Explain the internal working of HashSet in Java.' },
  { id: 30, company: 'Accenture', role: 'FSE', skill: 'SQL', difficulty: 'Medium', question: 'What are the different types of JOINs in SQL?' },
  { id: 31, company: 'Capgemini', role: 'Senior Analyst', skill: 'Python', difficulty: 'Hard', question: 'How is memory managed in Python? Explain Garbage Collection.' },
  { id: 32, company: 'Cognizant', role: 'GenC Elevate', skill: 'Java', difficulty: 'Hard', question: 'Explain the Executor framework in Java and its advantages over traditional threads.' },
  { id: 33, company: 'TCS', role: 'Ninja', skill: 'C++', difficulty: 'Medium', question: 'What is a friend function in C++? Give an example.' },
  { id: 34, company: 'Google', role: 'SWE', skill: 'DSA', difficulty: 'Medium', question: 'Find the longest palindromic substring in a given string.' },
  { id: 35, company: 'Microsoft', role: 'SDE 1', skill: 'Python', difficulty: 'Easy', question: 'What is the difference between a tuple and a list?' },
  { id: 36, company: 'Infosys', role: 'System Engineer', skill: 'DSA', difficulty: 'Easy', question: 'Write a program to check if two strings are anagrams of each other.' },
  { id: 37, company: 'Wipro', role: 'Project Engineer', skill: 'React', difficulty: 'Medium', question: 'Explain the useEffect hook and its dependency array.' },
  { id: 38, company: 'Accenture', role: 'ASE', skill: 'C++', difficulty: 'Easy', question: 'What is the difference between malloc and new?' },
  { id: 39, company: 'Capgemini', role: 'Analyst', skill: 'SQL', difficulty: 'Easy', question: 'What is a primary key? How is it different from a unique key?' },
  { id: 40, company: 'Cognizant', role: 'GenC', skill: 'Python', difficulty: 'Easy', question: 'What is a dictionary in Python? How do you iterate over its keys and values?' },
  { id: 41, company: 'TCS', role: 'Digital', skill: 'Java', difficulty: 'Hard', question: 'Explain the concept of method overriding and dynamic method dispatch.' },
  { id: 42, company: 'Google', role: 'SWE 3', skill: 'SQL', difficulty: 'Hard', question: 'Explain window functions in SQL with an example using ROW_NUMBER.' },
  { id: 43, company: 'Microsoft', role: 'SDE 2', skill: 'React', difficulty: 'Medium', question: 'What is Context API? When would you use it over Redux?' },
  { id: 44, company: 'Infosys', role: 'Specialist Programmer', skill: 'C++', difficulty: 'Hard', question: 'Explain RAII (Resource Acquisition Is Initialization) in C++.' },
  { id: 45, company: 'Wipro', role: 'Turbo', skill: 'DSA', difficulty: 'Medium', question: 'Implement a LRU (Least Recently Used) Cache.' },
  { id: 46, company: 'Accenture', role: 'FSE', skill: 'Java', difficulty: 'Easy', question: 'What is the super keyword in Java used for?' },
  { id: 47, company: 'Capgemini', role: 'Senior Analyst', skill: 'React', difficulty: 'Hard', question: 'Explain Server-Side Rendering (SSR) vs Client-Side Rendering (CSR) in React apps.' },
  { id: 48, company: 'Cognizant', role: 'GenC Elevate', skill: 'SQL', difficulty: 'Medium', question: 'What is normalization? Explain 1NF, 2NF, and 3NF.' },
  { id: 49, company: 'TCS', role: 'Ninja', skill: 'DSA', difficulty: 'Easy', question: 'Find the missing number in an array of size n containing numbers from 1 to n+1.' },
  { id: 50, company: 'Google', role: 'SWE', skill: 'C++', difficulty: 'Medium', question: 'Explain the Diamond Problem in multiple inheritance and how to solve it.' },
  { id: 51, company: 'Microsoft', role: 'SDE 1', skill: 'Java', difficulty: 'Medium', question: 'How does Garbage Collection work in Java?' },
  { id: 52, company: 'Infosys', role: 'System Engineer', skill: 'React', difficulty: 'Easy', question: 'What is JSX and why do we use it in React?' },
];

const companies = ['All', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant', 'Microsoft', 'Google'];
const skills = ['All', 'Java', 'Python', 'C++', 'SQL', 'DSA', 'React'];



const CompanyPYQs = () => {
  const [pyqs, setPyqs] = useState(defaultPyqs);
  const [companyFilter, setCompanyFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const customPYQsStr = localStorage.getItem('ai_skillverse_custom_pyqs');
    if (customPYQsStr) {
      const customPYQs = JSON.parse(customPYQsStr);
      setPyqs([...customPYQs, ...defaultPyqs]);
    }
  }, []);

  const fetchMorePYQs = async () => {
    setLoading(true);
    try {
      const targetSkill = skillFilter === 'All' ? 'mixed general software engineering (Java, Python, SQL, DSA)' : skillFilter;
      const targetCompany = companyFilter === 'All' ? 'top tech companies (TCS, Google, Microsoft, Infosys, etc.)' : companyFilter;
      
      const AI_PROMPT = `Generate exactly 6 real-world software engineering interview questions asked by ${targetCompany}. Focus strictly on the skill: ${targetSkill}. 
      Return ONLY a valid JSON array of objects. Do not include markdown formatting or thinking text.
      Each object must match this structure exactly:
      {
        "id": a unique random number between 100 and 9999,
        "company": "Company Name",
        "role": "Job Role (e.g., SDE 1, Analyst, Ninja)",
        "skill": "Main Skill (e.g., Java, Python, DSA, SQL)",
        "difficulty": "Easy, Medium, or Hard",
        "question": "The actual interview question text"
      }`;

      let content = await callAI([{ role: 'user', content: AI_PROMPT }], 2500);
      
      const start = content.indexOf('[');
      const end = content.lastIndexOf(']');
      
      if (start !== -1 && end !== -1) {
        content = content.slice(start, end + 1);
      } else {
        content = content.replace(/```json/g, "").replace(/```/g, "").trim();
      }
      
      const newQuestions = JSON.parse(content);
      setPyqs(newQuestions);
      
    } catch (err) {
      console.error("Failed to fetch PYQs:", err);
      alert("Error generating questions: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredPYQs = pyqs.filter(q => {
    const matchesCompany = companyFilter === 'All' || q.company.toLowerCase() === companyFilter.toLowerCase();
    const matchesSkill = skillFilter === 'All' || q.skill.toLowerCase() === skillFilter.toLowerCase();
    const matchesSearch = q.question.toLowerCase().includes(search.toLowerCase()) || q.skill.toLowerCase().includes(search.toLowerCase()) || q.company.toLowerCase().includes(search.toLowerCase());
    return matchesCompany && matchesSkill && matchesSearch;
  });

  return (
    <div className="pb-20 pt-10">
      <div className="text-center mb-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Company <span className="text-gradient">PYQs</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Practice Previous Year Questions asked in top tech companies. Filter by company, skill, and difficulty.
        </p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search questions or skills..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <button 
            onClick={fetchMorePYQs}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 md:w-auto"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            {loading ? 'Generating...' : 'Generate New PYQs'}
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <span className="text-sm font-semibold text-slate-500 min-w-20">Company:</span>
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 hide-scrollbar w-full">
            {companies.map(c => (
              <button
                key={c}
                onClick={() => setCompanyFilter(c)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${companyFilter === c ? 'bg-primary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <span className="text-sm font-semibold text-slate-500 min-w-20">Skill:</span>
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 hide-scrollbar w-full">
            {skills.map(s => (
              <button
                key={s}
                onClick={() => setSkillFilter(s)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-colors ${skillFilter === s ? 'bg-secondary-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPYQs.map((q, index) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-6 flex flex-col h-full relative"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary-500" />
                <span className="font-bold">{q.company}</span>
                <span className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">{q.role}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded font-medium ${
                q.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                q.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {q.difficulty}
              </span>
            </div>
            
            <p className="text-slate-800 dark:text-slate-200 font-medium text-lg mb-4 flex-grow">
              {q.question}
            </p>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-dark-border">
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400">#{q.skill}</span>
              <button className="flex items-center gap-2 text-sm font-medium px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <Lock className="w-4 h-4" /> View Solution
              </button>
            </div>
          </motion.div>
        ))}
        
        {filteredPYQs.length === 0 && (
          <div className="col-span-full text-center py-12 text-slate-500">
            No questions found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyPYQs;
