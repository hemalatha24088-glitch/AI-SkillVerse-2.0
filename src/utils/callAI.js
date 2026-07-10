/**
 * callAI – thin wrapper that sends messages to the serverless proxy.
 *
 * The proxy lives at /api/chat (api/chat.js) and attaches the real
 * OpenRouter API key from its environment variables before forwarding
 * the request. The key is never visible to the browser.
 *
 * @param {Array<{role: string, content: string}>} messages  Chat history
 * @param {number} [max_tokens=2500]  Max tokens in the response
 * @returns {Promise<string>}  The assistant's reply text
 */
export async function callAI(messages, max_tokens = 2500) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages, max_tokens }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'AI service error. Please try again.');
  }

  return data.choices[0].message.content;
}
