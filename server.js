// server.js — Local dev proxy server
// Mirrors the logic in api/chat.js (Vercel serverless function) so AI features
// work during `npm run dev` without needing to deploy to Vercel first.
// This file is NOT deployed — only used locally.

import 'dotenv/config';
import express from 'express';

const app = express();
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
    return res.status(500).json({
      error: 'OPENROUTER_API_KEY is not set. Copy .env.example to .env and add your key.',
    });
  }

  const { messages, model = 'openrouter/auto', max_tokens = 2500 } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: messages array required.' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.SITE_URL || 'http://localhost:5173',
        'X-Title': 'AI SkillVerse 2.0',
      },
      body: JSON.stringify({ model, messages, max_tokens }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'OpenRouter API error' });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('[Dev Proxy] Error:', error.message);
    return res.status(500).json({ error: 'Internal server error in AI proxy.' });
  }
});

const PORT = process.env.PROXY_PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ AI proxy running at http://localhost:${PORT}/api/chat`);
});
