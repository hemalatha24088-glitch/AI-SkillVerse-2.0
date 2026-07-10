// api/chat.js — Vercel Serverless Function
// This file runs on the server. The OPENROUTER_API_KEY is never exposed to the browser.

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server misconfiguration: API key not set.' });
  }

  // Forward the request body (messages, model, max_tokens) to OpenRouter
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
    console.error('Proxy error:', error);
    return res.status(500).json({ error: 'Internal server error in AI proxy.' });
  }
}
