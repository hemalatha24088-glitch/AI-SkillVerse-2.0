const OPENROUTER_API_KEY = "YOUR_API_KEY_HERE";
const AI_PROMPT = `Generate exactly 4 fresh, realistic news headlines and short 2-sentence summaries about: 
1. The current state of AI.
2. New jobs and career paths being created by AI.
3. How AI is proving useful for future generations.
Return ONLY a valid JSON array of objects with keys: id (number), title (string), category (string), time (string like 'Just now'), source (string like 'AI Insight'), desc (string). Do not include markdown formatting or backticks in the response. Ensure it is perfectly valid JSON.`;

async function testOpenRouter() {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: AI_PROMPT }],
        max_tokens: 2500
      })
    });
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Fetch error:", err);
  }
}
testOpenRouter();
