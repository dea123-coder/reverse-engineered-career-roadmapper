import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { roadmap, knownSkill, goal } = body;

    if (!roadmap || !knownSkill || !goal) {
      return NextResponse.json(
        { error: "Missing roadmap, known skill, or goal" },
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
You are an expert career roadmap planner.

The user wants to become:
${goal}

Here is the current roadmap:
${JSON.stringify(roadmap, null, 2)}

The user already knows this skill:
${JSON.stringify(knownSkill, null, 2)}

Recalculate the roadmap.

Important:
- Do NOT simply return the same roadmap.
- Remove or reduce unnecessary learning for the known skill.
- Unlock or move forward dependent skills where appropriate.
- Keep the roadmap realistic for the target career.
- Preserve useful skills.
- Update statuses where appropriate.
- The result must be useful for a student.

Return ONLY valid JSON.

Use this structure:
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

Each node should contain:
{
  "id": "unique-id",
  "title": "skill or milestone",
  "type": "category",
  "phase": 0,
  "hours": "10 hrs",
  "status": "available"
}
`;

    console.log("Recalculating roadmap...");

    const result = await model.generateContent(prompt);

    const text = result.response.text().trim();

    let cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const updatedRoadmap = JSON.parse(cleaned);

    return NextResponse.json(updatedRoadmap);
  } catch (error) {
    console.error("RECALCULATE ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to recalculate roadmap",
      },
      { status: 500 }
    );
  }
}