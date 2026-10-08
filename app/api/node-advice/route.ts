import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key is not configured" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
    });

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

    console.log("Calling Gemini for node advice...");

    const result = await model.generateContent(prompt);

    const advice = result.response.text().trim();

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