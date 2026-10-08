# Reverse-Engineered Career Roadmapper

## What it does

Reverse-Engineered Career Roadmapper is an AI-powered web application that takes a user's specific dream career and reverse-engineers it into a personalized, interactive career roadmap.

Instead of showing a generic checklist, it generates realistic skills, phases, projects, entry-level roles, and actionable next steps based on the user's target role, available weekly hours, and timeline.

**Problem Statement:** #1 — Reverse-Engineered Career Roadmapper

---

## Done / Left / Plan

### Done
- AI-powered personalized roadmap generation
- Target role, weekly hours, and timeline input
- Interactive roadmap graph with zoom and pan
- Roadmap phases and skill nodes
- Clickable roadmap nodes
- AI-generated action plans for selected skills
- AI-generated weekend project suggestions
- GitHub repository suggestions
- Interview question generation
- "Mark as Known" functionality
- AI-powered roadmap recalculation after a skill is marked as known
- Entry-level role suggestions
- Responsive mobile-friendly interface
- AI disclosure
- Error handling for API failures
- Environment-variable based API key handling

### Left
- Progress persistence across sessions
- Roadmap export/share functionality
- Advanced progress analytics
- Authentication and user accounts
- Optional database persistence

### Plan
The current hackathon version focuses on delivering the complete core experience:
**Dream Career → AI Roadmap → Interactive Graph → Skill Action Plan → Dynamic Recalculation**

Future versions can add persistent user profiles, progress tracking, sharing, and deeper career analytics.

---

## Architecture and Why

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- React

Next.js provides a single framework for the user interface and backend API routes while TypeScript improves reliability and maintainability.

### Backend
- Next.js Route Handlers
- OpenRouter API
- Google Gemini 2.5 Flash

The backend sends structured career-planning prompts to Gemini through OpenRouter and converts the AI response into roadmap data used by the frontend.

### Data
The hackathon version uses client-side React state for the active roadmap.

No unnecessary personal data is collected.

### Deployment
- Vercel

### High-Level Flow

User Input
↓
Target Role + Hours/Week + Timeline
↓
Next.js API Route
↓
OpenRouter
↓
Google Gemini 2.5 Flash
↓
Structured Career Roadmap
↓
Interactive Roadmap Graph
↓
User selects a skill
↓
AI-generated Action Plan
↓
User marks skill as known
↓
AI recalculates the roadmap

---

## What We Added

### 1. Personalized AI Roadmap

The user enters a specific career goal such as:

> Full Stack Developer at an AI startup

The application uses AI to generate a roadmap based on the target career, available study time, and timeline.

### 2. Interactive Career Graph

The roadmap is presented as an interactive visual graph instead of a simple checklist.

Users can:
- Zoom
- Pan
- Explore roadmap phases
- Select individual skill nodes
- View node details

### 3. AI Action Plans

When a user selects a roadmap node, the application generates practical guidance including:
- What to learn
- Weekend project ideas
- GitHub repository ideas
- Interview questions
- Concrete next steps

### 4. Dynamic Roadmap Recalculation

Users can mark a skill as already known.

The application sends the current roadmap and known skill back to the AI, which recalculates the roadmap and moves the user forward instead of forcing them to repeat something they already know.

### 5. Entry-Level Roles

The AI identifies realistic entry-level positions related to the user's target career.

### 6. Student-Focused Planning

The roadmap is designed around realistic student constraints such as:
- Limited weekly study hours
- A defined timeline
- Practical projects
- Interview preparation
- Entry-level opportunities

---

## How to Run It

### 1. Clone the repository

```bash
git clone https://github.com/dea123-coder/reverse-engineered-career-roadmapper.git
cd reverse-engineered-career-roadmapper
