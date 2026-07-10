import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock framer-motion so tests don't need a real browser animation engine
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Smoke test: verify the callAI utility constructs the correct request shape
describe('callAI utility', () => {
  it('sends POST to /api/chat with messages array', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'Hello from AI' } }] }),
    });
    global.fetch = mockFetch;

    const { callAI } = await import('../utils/callAI');
    const result = await callAI([{ role: 'user', content: 'Test' }], 100);

    expect(mockFetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }));

    const body = JSON.parse(mockFetch.mock.calls[0][1].body);
    expect(body.messages).toEqual([{ role: 'user', content: 'Test' }]);
    expect(body.max_tokens).toBe(100);
    expect(result).toBe('Hello from AI');
  });

  it('throws an error when the proxy returns a non-ok response', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Unauthorized' }),
    });

    const { callAI } = await import('../utils/callAI');
    await expect(callAI([{ role: 'user', content: 'Test' }])).rejects.toThrow('Unauthorized');
  });
});

// Smoke test: verify the Leaderboard renders the localStorage disclaimer
describe('Leaderboard page', () => {
  it('renders the localStorage disclaimer', async () => {
    // Leaderboard reads from localStorage — mock it as empty
    vi.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);

    const { default: Leaderboard } = await import('../pages/Leaderboard');
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/demo leaderboard, not a live global ranking/i)).toBeInTheDocument();
  });
});
