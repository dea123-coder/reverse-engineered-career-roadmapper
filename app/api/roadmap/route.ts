import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/openrouter";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { targetRole, hoursPerWeek, timeline } = body;

    if (!targetRole || !hoursPerWeek || !timeline) {
      return NextResponse.json(
        { error: "Missing required fields" },
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
Create a personalized career roadmap for:

Target role: ${targetRole}
Hours per week: ${hoursPerWeek}
Timeline: ${timeline}

Return ONLY valid JSON.

Format:
{
  "goal": "string",
  "timeline": "string",
  "hoursPerWeek": number,
  "phases": [],
  "nodes": [],
  "entryLevelRoles": [],
  "certifications": [],
  "projects": [],
  "skills": []
}

Each roadmap node should preferably contain:
{
  "id": "unique-id",
  "title": "skill or milestone",
  "type": "category",
  "phase": 0,
  "hours": "10 hrs",
  "status": "available",
  "dependencies": []
}

Make the roadmap realistic, specific to the target role, and suitable for a student.
`;

    console.log("Calling OpenRouter Gemini...");

    const text = await generateWithGemini(prompt);

    console.log("OpenRouter Gemini response received");
    console.log("AI text length:", text.length);

    const cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const roadmap = JSON.parse(cleaned);

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("ROADMAP AI ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate roadmap",
      },
      { status: 500 }
    );
  }
}