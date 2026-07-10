# AI SkillVerse 2.0 🚀

> A personalized AI learning platform for students mastering programming, DSA, and AI careers.

[![CI](https://github.com/hemalatha24088-glitch/AI-SkillVerse-2.0/actions/workflows/ci.yml/badge.svg)](https://github.com/hemalatha24088-glitch/AI-SkillVerse-2.0/actions/workflows/ci.yml)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## Architecture

This is a **React SPA** (Vite + Tailwind CSS) that communicates with OpenRouter AI via a **serverless proxy** (`/api/chat.js`) deployed on Vercel. There is no traditional backend or database — AI responses are streamed through the proxy server-side, keeping the API key out of the browser bundle entirely.

```
Browser (React SPA)
    │
    │  POST /api/chat  { messages }
    ▼
Vercel Serverless Function (api/chat.js)
    │  attaches OPENROUTER_API_KEY from env
    │
    ▼
OpenRouter API → LLM response → Browser
```

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **AI Roadmap Generator** | Generates personalized, step-by-step learning paths based on your skill level and target role |
| 🎙️ **AI Voice Mentor (Ram)** | Interactive chat mentor with browser Speech Synthesis for spoken answers |
| 💻 **Code Playground** | Write code in Python, Java, C++, JS — AI simulates output and highlights errors |
| 📄 **Resume Builder** | ATS-optimised, 2-column resume with live preview and print-to-PDF |
| 🎯 **AI-Powered Quizzes** | Dynamic quiz generation with scoring and instant feedback |
| 🏢 **Company PYQs** | Interview questions from TCS, Google, Microsoft, Infosys and more |
| 🏆 **Leaderboard** | Track quiz points locally (browser-based, for demo purposes) |
| 📰 **Daily AI News** | AI-generated summaries of the latest AI industry news |
| 📝 **Notes Library** | In-depth notes for Python, C++, Java, DSA, SQL, and C |
| 🎭 **Mock Interviews** | AI-conducted mock technical interviews with live feedback |

> **Code Playground note**: Outputs are AI-simulated predictions and may not match actual compiler/interpreter behaviour on complex code. This is a learning aid, not a production execution engine.

> **Leaderboard note**: Scores are stored in your browser's localStorage. This is a local demo, not a shared global leaderboard.

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Icons**: Lucide React
- **AI Backend**: Vercel Serverless Functions (proxy) → OpenRouter API
- **Routing**: React Router DOM v6

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- An [OpenRouter API key](https://openrouter.ai/) (free tier available)

### Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hemalatha24088-glitch/AI-SkillVerse-2.0.git
   cd AI-SkillVerse-2.0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and fill in your OpenRouter API key:
   ```
   OPENROUTER_API_KEY=your_actual_key_here
   SITE_URL=http://localhost:5173
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

   > **Note on AI features in dev**: Vite's dev server does not run the serverless function in `/api`. To test AI features locally, either deploy to Vercel or run the proxy separately with a small Express wrapper. AI calls will fail with a 404 in pure `npm run dev` mode.

### Deployment (Vercel — Recommended)

1. Push your code to GitHub.
2. Import the repository on [vercel.com](https://vercel.com).
3. In **Project Settings → Environment Variables**, add:
   - `OPENROUTER_API_KEY` = your real key
   - `SITE_URL` = your Vercel deployment URL (e.g. `https://ai-skillverse.vercel.app`)
4. Deploy — Vercel automatically picks up the `/api/chat.js` function.

## 🛠️ Developer Scripts

All utility scripts are in `/scripts`. Run them via npm:

```bash
npm run generate:pdfs         # Generate Python learning PDFs
npm run update:dsa:primary    # Regenerate primary DSA notes
npm run update:sql            # Regenerate SQL notes
```

See [`scripts/README.md`](scripts/README.md) for the full list.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more information.

---

*Built with ❤️ by Hemalatha*
