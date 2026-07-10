import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Code2, Map, FileText, Brain, Mic2,
  Trophy, Newspaper, MessageSquare, Zap, BookOpen, Users
} from 'lucide-react';

/* ─── Feature data ─────────────────────────────────────────────────────── */
const features = [
  {
    icon: <Code2 className="w-5 h-5" />,
    label: 'Code Playground',
    desc: 'Write Python, Java, C++, and JavaScript with AI-powered output simulation.',
    path: '/playground',
    accent: 'bg-[#FFF3E0] text-amber-700',
    border: 'border-amber-200',
  },
  {
    icon: <Brain className="w-5 h-5" />,
    label: 'AI Quizzes',
    desc: 'Dynamic quizzes that adapt to your level — with instant visual feedback.',
    path: '/quizzes',
    accent: 'bg-[#EAF4EF] text-success',
    border: 'border-[#BEE0D2]',
  },
  {
    icon: <Map className="w-5 h-5" />,
    label: 'Roadmap Generator',
    desc: 'AI builds a personalised, phase-by-phase learning path to your target role.',
    path: '/roadmap',
    accent: 'bg-[#EEF2FF] text-indigo-700',
    border: 'border-indigo-200',
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    label: 'AI Mentor (Ram)',
    desc: 'Chat with your AI mentor any time — DSA, SQL, interview prep, all topics.',
    path: '/ai-mentor',
    accent: 'bg-[#FDF0E3] text-amber-700',
    border: 'border-amber-200',
  },
  {
    icon: <Mic2 className="w-5 h-5" />,
    label: 'Mock Interviews',
    desc: 'Live AI-conducted technical interviews with feedback after every answer.',
    path: '/mock-interviews',
    accent: 'bg-[#FEF3F3] text-[#B33A3A]',
    border: 'border-[#F0B0B0]',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    label: 'Resume Builder',
    desc: 'Build an ATS-optimised resume with a live preview that updates as you type.',
    path: '/career-tools',
    accent: 'bg-[#F0F9F5] text-success',
    border: 'border-[#BEE0D2]',
  },
  {
    icon: <Trophy className="w-5 h-5" />,
    label: 'Leaderboard',
    desc: 'Earn points on quizzes and track your ranking across skill areas.',
    path: '/leaderboard',
    accent: 'bg-[#FFFBEA] text-yellow-700',
    border: 'border-yellow-200',
  },
  {
    icon: <Newspaper className="w-5 h-5" />,
    label: 'Daily AI News',
    desc: 'AI-curated headlines on generative AI, new tools, and career opportunities.',
    path: '/daily-updates',
    accent: 'bg-[#F5F0FF] text-violet-700',
    border: 'border-violet-200',
  },
];

const stats = [
  { value: '10+', label: 'Skills & Languages' },
  { value: '500+', label: 'Practice Questions' },
  { value: '100+', label: 'Company PYQs' },
  { value: 'Free', label: 'Forever Core Access' },
];

/* ─── Hero Code Preview ─────────────────────────────────────────────────── */
const CodePreview = () => (
  <div className="relative rounded-lg overflow-hidden shadow-elevated border border-[#E8E1D8] dark:border-dark-border">
    {/* Editor titlebar */}
    <div className="bg-[#1E1B14] px-4 py-2.5 flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
      <span className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
      <span className="w-3 h-3 rounded-full bg-[#28C840]" />
      <span className="ml-3 text-xs font-mono text-[#8A7A6A]">solution.py</span>
    </div>
    {/* Code */}
    <div className="bg-[#18150F] px-5 py-4 font-mono text-xs leading-6 overflow-x-auto">
      <div><span className="text-[#7A9FD4]">def</span> <span className="text-[#E8C96A]">fibonacci</span><span className="text-[#EDE8DF]">(n):</span></div>
      <div className="pl-4"><span className="text-[#8A7A6A]"># Classic DP approach</span></div>
      <div className="pl-4"><span className="text-[#7A9FD4]">if</span> <span className="text-[#EDE8DF]">n &lt;= </span><span className="text-[#C77D30]">1</span><span className="text-[#EDE8DF]">: </span><span className="text-[#7A9FD4]">return</span> <span className="text-[#EDE8DF]">n</span></div>
      <div className="pl-4"><span className="text-[#EDE8DF]">a, b = </span><span className="text-[#C77D30]">0</span><span className="text-[#EDE8DF]">, </span><span className="text-[#C77D30]">1</span></div>
      <div className="pl-4"><span className="text-[#7A9FD4]">for</span> <span className="text-[#EDE8DF]">_ </span><span className="text-[#7A9FD4]">in</span> <span className="text-[#E8C96A]">range</span><span className="text-[#EDE8DF]">(</span><span className="text-[#C77D30]">2</span><span className="text-[#EDE8DF]">, n+</span><span className="text-[#C77D30]">1</span><span className="text-[#EDE8DF]">):</span></div>
      <div className="pl-8"><span className="text-[#EDE8DF]">a, b = b, a + b</span></div>
      <div className="pl-4"><span className="text-[#7A9FD4]">return</span> <span className="text-[#EDE8DF]">b</span></div>
      <div className="mt-2"><span className="text-[#E8C96A]">print</span><span className="text-[#EDE8DF]">(fibonacci(</span><span className="text-[#C77D30]">10</span><span className="text-[#EDE8DF]">))</span></div>
    </div>
    {/* Output strip */}
    <div className="bg-[#1F1B14] border-t border-[#3D3427] px-5 py-3 flex items-center gap-3">
      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 uppercase tracking-wider">AI Output</span>
      <span className="font-mono text-xs text-[#A8D8B0]">55</span>
    </div>
  </div>
);

/* ─── Component ─────────────────────────────────────────────────────────── */
const Home = () => {
  return (
    <div className="min-h-screen bg-paper dark:bg-dark-bg">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Copy */}
          <div className="space-y-7">
            <span className="tag">
              <Zap className="w-3 h-3" />
              AI-Powered Learning Platform
            </span>

            <h1 className="font-fraunces text-5xl md:text-6xl font-semibold text-ink dark:text-[#EDE8DF] leading-[1.1]">
              Build real skills.<br />
              <em className="text-amber-500 not-italic">Land the job.</em>
            </h1>

            <p className="text-base md:text-lg text-ink-muted dark:text-dark-muted leading-relaxed max-w-lg">
              Learn Python, DSA, SQL, and AI with an adaptive mentor, practice real interview questions, and get a personalised roadmap — all in one place.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/skills" className="btn-primary text-base px-6 py-3">
                Start Learning <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/playground" className="btn-secondary text-base px-6 py-3">
                <Code2 className="w-4 h-4" />
                Try the Playground
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 pt-2">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-fraunces text-xl font-semibold text-ink dark:text-[#EDE8DF]">{s.value}</div>
                  <div className="text-xs text-ink-muted dark:text-dark-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Code preview */}
          <div className="lg:block">
            <CodePreview />
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12 space-y-3">
          <p className="section-label">Everything you need</p>
          <h2 className="font-fraunces text-4xl font-semibold text-ink dark:text-[#EDE8DF]">
            One platform, every skill
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <Link
              key={f.label}
              to={f.path}
              className={`group card-hover p-5 flex flex-col gap-4 border ${f.border} dark:border-dark-border`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${f.accent}`}>
                {f.icon}
              </div>
              <div>
                <h3 className="font-fraunces font-medium text-base text-ink dark:text-[#EDE8DF] mb-1">
                  {f.label}
                </h3>
                <p className="text-sm text-ink-muted dark:text-dark-muted leading-relaxed">
                  {f.desc}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 group-hover:gap-2 transition-all duration-150">
                Explore <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── AI Mentor Callout ─────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="rounded-lg border border-amber-200 dark:border-amber-900/40 bg-[#FDF8F0] dark:bg-amber-950/10 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <p className="section-label">Meet your mentor</p>
            <h2 className="font-fraunces text-3xl md:text-4xl font-semibold text-ink dark:text-[#EDE8DF]">
              Ram — your AI mentor, available 24/7
            </h2>
            <p className="text-ink-muted dark:text-dark-muted leading-relaxed">
              Stuck on a linked list problem at midnight? Confused about SQL joins? Ram answers every question instantly, with code examples, in plain language.
            </p>
            <Link to="/ai-mentor" className="btn-primary inline-flex">
              Chat with Ram <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Chat preview */}
          <div className="card p-4 space-y-3 dark:bg-dark-card dark:border-dark-border">
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-amber-600" />
              </div>
              <div className="bg-surface-raised dark:bg-dark-border rounded-lg rounded-tl-none px-3 py-2 text-sm text-ink dark:text-[#EDE8DF] max-w-[80%]">
                Hello! I'm Ram. Ask me anything about DSA, SQL, Python, or interview prep. 💡
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <div className="bg-amber-500 rounded-lg rounded-tr-none px-3 py-2 text-sm text-white max-w-[80%]">
                Explain binary search with an example
              </div>
              <div className="w-7 h-7 rounded-full bg-[#E8E1D8] dark:bg-dark-border flex items-center justify-center flex-shrink-0">
                <Users className="w-4 h-4 text-ink-muted" />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-amber-600" />
              </div>
              <div className="bg-surface-raised dark:bg-dark-border rounded-lg rounded-tl-none px-3 py-2 text-sm text-ink dark:text-[#EDE8DF] max-w-[80%]">
                Binary search halves the search space each step — O(log n). Here's the pattern...
              </div>
            </div>
            {/* Typing indicator */}
            <div className="flex gap-3 items-end">
              <div className="w-7 h-7 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Brain className="w-4 h-4 text-amber-600" />
              </div>
              <div className="bg-surface-raised dark:bg-dark-border rounded-lg rounded-tl-none px-4 py-3 flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-ink-muted dot-1" />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-muted dot-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-ink-muted dot-3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <h2 className="font-fraunces text-4xl font-semibold text-ink dark:text-[#EDE8DF]">
          Ready to level up?
        </h2>
        <p className="text-ink-muted dark:text-dark-muted max-w-md mx-auto">
          Join thousands of students using AI SkillVerse to prepare for real tech interviews.
        </p>
        <Link to="/skills" className="btn-primary text-base px-8 py-3 inline-flex">
          <BookOpen className="w-4 h-4" />
          Start for free
        </Link>
      </section>

    </div>
  );
};

export default Home;
