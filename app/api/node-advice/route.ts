import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/openrouter";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { targetRole, node, context } = body;

    if (!targetRole || !node) {
      return NextResponse.json(
        { error: "Missing target role or node" },
        { status: 400 }
      );
    }

    if (!process.env.OPENROUTER_API_KEY) {
      return NextResponse.json(
        { error: "OpenRouter API key is not configured" },
        { status: 500 }
      );
    }

    const prompt = `
You are an expert career coach.

Target career:
${targetRole}

Selected roadmap skill:
${JSON.stringify(node, null, 2)}

Current roadmap context:
${JSON.stringify(context, null, 2)}

Create a practical action plan for this skill.

Include:
1. What to learn
2. A weekend project
3. GitHub repository idea
4. 3 interview questions
5. A concrete next step

Keep it concise, realistic for a student, and directly actionable.
Return plain text only. Do not use JSON.
`;

    console.log("Calling OpenRouter Gemini for node advice...");

    const advice = await generateWithGemini(prompt);

    console.log("Node advice received:", advice.length);

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("NODE ADVICE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate action plan",
      },
      { status: 500 }
    );
  }
}