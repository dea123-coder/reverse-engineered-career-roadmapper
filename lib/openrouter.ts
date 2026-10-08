const MODEL = "google/gemini-2.5-flash";

export async function generateWithGemini(prompt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenRouter API key is missing");
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "CareerForge",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 4000,
      }),
    }
  );

  const responseText = await response.text();

  console.log("OPENROUTER STATUS:", response.status);
  console.log("OPENROUTER RESPONSE:", responseText);

  if (!response.ok) {
    throw new Error(`OpenRouter ${response.status}: ${responseText}`);
  }

  const result = JSON.parse(responseText);
  const content = result?.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("OpenRouter returned no AI content");
  }

  return content.trim();
}