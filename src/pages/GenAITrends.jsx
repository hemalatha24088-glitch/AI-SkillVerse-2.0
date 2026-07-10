import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, FileVideo, Music, Code2, Bot, Settings2, ExternalLink } from 'lucide-react';

const trends = [
  {
    title: "Text-to-Image AI",
    icon: <ImageIcon className="w-6 h-6 text-pink-500" />,
    desc: "Models like Midjourney and DALL-E 3 are generating photorealistic images and art from simple text descriptions. Becoming essential in design workflows.",
    gradient: "from-pink-500 to-rose-500",
    url: "https://midjourney.com"
  },
  {
    title: "Text-to-Video AI",
    icon: <FileVideo className="w-6 h-6 text-purple-500" />,
    desc: "Sora and Runway Gen-2 are pushing boundaries by creating high-fidelity, consistent video clips directly from prompts.",
    gradient: "from-purple-500 to-indigo-500",
    url: "https://runwayml.com"
  },
  {
    title: "AI Music & Audio",
    icon: <Music className="w-6 h-6 text-blue-500" />,
    desc: "Suno and Udio can generate full songs with vocals and instrumentation in any genre, revolutionizing audio production.",
    gradient: "from-blue-500 to-cyan-500",
    url: "https://suno.com"
  },
  {
    title: "AI Coding Assistants",
    icon: <Code2 className="w-6 h-6 text-green-500" />,
    desc: "GitHub Copilot, Cursor, and Devin are moving from auto-complete to autonomous software engineering and debugging.",
    gradient: "from-green-500 to-emerald-500",
    url: "https://github.com/features/copilot"
  },
  {
    title: "AI Agents",
    icon: <Bot className="w-6 h-6 text-orange-500" />,
    desc: "Systems that don't just chat, but browse the web, use apps, and complete multi-step tasks autonomously on your behalf.",
    gradient: "from-orange-500 to-amber-500",
    url: "https://www.anthropic.com/news/claude-3-5-computer-use"
  },
  {
    title: "AI Automation",
    icon: <Settings2 className="w-6 h-6 text-red-500" />,
    desc: "Integrating AI into Zapier and Make to create intelligent workflows that process data, send emails, and manage systems.",
    gradient: "from-red-500 to-rose-600",
    url: "https://zapier.com/ai"
  }
];

const GenAITrends = () => {
  return (
    <div className="pb-20 pt-10">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Generative <span className="text-gradient">AI Trends</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore the explosive growth of generative models across different modalities and how they are reshaping creativity and productivity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trends.map((trend, index) => (
          <motion.a
            href={trend.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="block group relative p-[1px] rounded-2xl bg-gradient-to-br hover:scale-105 transition-transform duration-300 overflow-hidden cursor-pointer"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${trend.gradient} opacity-50`}></div>
            <div className="relative h-full bg-white dark:bg-dark-card rounded-2xl p-6 z-10 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  {trend.icon}
                </div>
                <h3 className="text-xl font-bold group-hover:text-primary-500 transition-colors">{trend.title}</h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                {trend.desc}
              </p>
              <div className="flex items-center gap-2 text-primary-500 text-sm font-semibold mt-2 group-hover:text-primary-600 transition-colors">
                Try it out <ExternalLink className="w-4 h-4" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default GenAITrends;
