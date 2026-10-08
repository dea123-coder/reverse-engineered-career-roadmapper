import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
Create a career roadmap for:

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
`;

    console.log("Calling Gemini...");

    const result = await model.generateContent(prompt);

    console.log("Gemini response received");

    const text = result.response.text().trim();

    console.log("Gemini text length:", text.length);

    let cleaned = text
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const roadmap = JSON.parse(cleaned);

    return NextResponse.json(roadmap);
  } catch (error) {
    console.error("GEMINI ERROR:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Unknown Gemini error",
      },
      { status: 500 }
    );
  }
}