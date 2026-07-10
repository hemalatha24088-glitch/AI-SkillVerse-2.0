import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, MessageSquareCode, Image as ImageIcon, Video, Bot, BrainCircuit, Rocket, Database, Terminal } from 'lucide-react';

const techData = [
  {
    title: "Generative AI",
    icon: <BrainCircuit className="w-8 h-8 text-purple-500" />,
    meaning: "AI that can generate text, images, or other media in response to prompts.",
    uses: "Content creation, code generation, art, marketing.",
    tools: "ChatGPT, Claude, Midjourney",
    skills: "Prompt Engineering, Basic ML concepts",
    future: "Will automate standard content and repetitive coding tasks.",
    roadmap: "Learn Prompts -> Understand APIs -> Build basic GenAI Apps"
  },
  {
    title: "Large Language Models (LLMs)",
    icon: <MessageSquareCode className="w-8 h-8 text-blue-500" />,
    meaning: "Massive AI models trained on vast amounts of text data to understand and generate human language.",
    uses: "Chatbots, translation, summarization.",
    tools: "OpenAI API, HuggingFace, LLaMA",
    skills: "Python, NLP basics, API integration",
    future: "More personalized, smaller open-source models running locally.",
    roadmap: "Python basics -> API usage -> Fine-tuning concepts"
  },
  {
    title: "Retrieval-Augmented Generation (RAG)",
    icon: <Database className="w-8 h-8 text-green-500" />,
    meaning: "Enhancing LLMs by retrieving facts from an external knowledge base before generating a response.",
    uses: "Company knowledge bases, customer support bots.",
    tools: "LangChain, LlamaIndex, Pinecone",
    skills: "Vector Databases, Python, embeddings",
    future: "Standard architecture for all enterprise AI applications.",
    roadmap: "Understand embeddings -> Learn Vector DBs -> Build a RAG pipeline"
  },
  {
    title: "AI Agents",
    icon: <Bot className="w-8 h-8 text-orange-500" />,
    meaning: "Autonomous systems that can perceive their environment, make decisions, and take actions to achieve a goal.",
    uses: "Automated research, multi-step task execution, coding assistants.",
    tools: "AutoGPT, BabyAGI, CrewAI",
    skills: "Python, System Design, Prompting",
    future: "Personal digital assistants that handle complex workflows.",
    roadmap: "Basic API calls -> LangChain Agents -> Multi-agent systems"
  },
  {
    title: "Prompt Engineering",
    icon: <Terminal className="w-8 h-8 text-pink-500" />,
    meaning: "The practice of designing and refining inputs to get optimal outputs from AI models.",
    uses: "Improving AI output quality, jailbreaking, specific formatting.",
    tools: "ChatGPT, Playground",
    skills: "Logical thinking, linguistics, domain knowledge",
    future: "Will evolve from manual tweaking to automated optimization.",
    roadmap: "Basic prompts -> Few-shot learning -> Chain of thought"
  },
  {
    title: "Multimodal AI",
    icon: <ImageIcon className="w-8 h-8 text-teal-500" />,
    meaning: "AI models that can understand and process multiple types of data simultaneously (text, image, audio).",
    uses: "Image analysis, video understanding, voice assistants.",
    tools: "GPT-4V, Gemini 1.5 Pro",
    skills: "Data processing, API integration",
    future: "Seamless interaction mirroring human perception.",
    roadmap: "Text APIs -> Vision APIs -> Audio processing"
  }
];


const LatestAITech = () => {
  return (
    <div className="pb-20 pt-10">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Latest <span className="text-gradient">AI Technologies</span>
        </motion.h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Explore the cutting-edge technologies shaping the future. Understand what they are, how they are used, and how you can master them.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {techData.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 flex flex-col h-full hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
          >
            {/* Decorative background gradient */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-colors"></div>
            
            <div className="mb-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl inline-block w-fit">
              {tech.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{tech.title}</h3>
            
            <div className="space-y-4 flex-grow text-sm">
              <div>
                <span className="font-semibold text-primary-600 dark:text-primary-400 block mb-1">What is it?</span>
                <p className="text-slate-600 dark:text-slate-300">{tech.meaning}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-primary-600 dark:text-primary-400 block mb-1">Uses</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">{tech.uses}</p>
                </div>
                <div>
                  <span className="font-semibold text-primary-600 dark:text-primary-400 block mb-1">Tools</span>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">{tech.tools}</p>
                </div>
              </div>
              <div>
                <span className="font-semibold text-primary-600 dark:text-primary-400 block mb-1">Skills Required</span>
                <p className="text-slate-600 dark:text-slate-300">{tech.skills}</p>
              </div>
              <div>
                <span className="font-semibold text-primary-600 dark:text-primary-400 block mb-1">Future Scope</span>
                <p className="text-slate-600 dark:text-slate-300">{tech.future}</p>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-dark-border">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 block">Beginner Roadmap</span>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <Rocket className="w-4 h-4 text-orange-500" /> {tech.roadmap}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LatestAITech;
