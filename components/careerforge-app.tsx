'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  Crosshair,
  GitBranch,
  GitFork,
  Layers3,
  Lightbulb,
  Lock,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Target,
  X,
  Zap,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

const phases = [
  {
    name: 'Foundation',
    caption: 'Build the mental models',
    color: 'violet',
  },
  {
    name: 'Core Skills',
    caption: 'Ship with confidence',
    color: 'cyan',
  },
  {
    name: 'Specialization',
    caption: 'Find your edge',
    color: 'amber',
  },
  {
    name: 'Projects',
    caption: 'Make it undeniable',
    color: 'emerald',
  },
  {
    name: 'Interview Ready',
    caption: 'Tell your story',
    color: 'rose',
  },
]

const initialNodes = [
  {
    id: 'html',
    title: 'HTML & CSS',
    phase: 0,
    status: 'known',
    hours: '8 hrs',
    type: 'Fundamentals',
    x: 70,
    y: 90,
  },
  {
    id: 'git',
    title: 'Git & GitHub',
    phase: 0,
    status: 'completed',
    hours: '6 hrs',
    type: 'Workflow',
    x: 70,
    y: 270,
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    phase: 1,
    status: 'in-progress',
    hours: '24 hrs',
    type: 'Core skill',
    x: 300,
    y: 150,
  },
  {
    id: 'react',
    title: 'React',
    phase: 1,
    status: 'available',
    hours: '20 hrs',
    type: 'Core skill',
    x: 300,
    y: 350,
  },
  {
    id: 'typescript',
    title: 'TypeScript',
    phase: 2,
    status: 'available',
    hours: '14 hrs',
    type: 'Specialization',
    x: 550,
    y: 100,
  },
  {
    id: 'ai',
    title: 'AI SDK Patterns',
    phase: 2,
    status: 'locked',
    hours: '18 hrs',
    type: 'Specialization',
    x: 550,
    y: 315,
  },
  {
    id: 'saas',
    title: 'AI SaaS Build',
    phase: 3,
    status: 'locked',
    hours: '32 hrs',
    type: 'Portfolio project',
    x: 810,
    y: 170,
  },
  {
    id: 'interview',
    title: 'System Design',
    phase: 4,
    status: 'locked',
    hours: '12 hrs',
    type: 'Interview prep',
    x: 1050,
    y: 290,
  },
]

const nodeCopy: Record<
  string,
  {
    why: string
    learn: string[]
    project: string
    github: string
    questions: string[]
    roles: string[]
  }
> = {
  javascript: {
    why: 'JavaScript is the language your browser speaks. Strong fundamentals make frameworks, APIs, and AI integrations easier to reason about.',
    learn: [
      'Async JavaScript and the event loop',
      'Closures, modules, and composition',
      'Fetch, promises, and error handling',
    ],
    project:
      'Build a streaming chat interface with optimistic UI and keyboard shortcuts.',
    github: 'javascript-clean-code',
    questions: [
      'How does the event loop work?',
      'When would you use a closure?',
    ],
    roles: ['Frontend Engineer', 'Product Engineer'],
  },

  html: {
    why: 'Accessible structure and resilient styling are the foundation of every product users trust.',
    learn: [
      'Semantic HTML and accessible forms',
      'Responsive layouts with modern CSS',
      'Design tokens and component thinking',
    ],
    project:
      'Recreate a polished SaaS landing page with a responsive pricing flow.',
    github: 'accessible-saas-ui',
    questions: [
      'How do you approach responsive design?',
      'What makes HTML accessible?',
    ],
    roles: ['Frontend Engineer', 'Design Engineer'],
  },

  react: {
    why: 'React helps you build reusable interfaces and is widely used in modern product teams.',
    learn: [
      'Components and props',
      'State and effects',
      'Reusable UI architecture',
    ],
    project: 'Build a dashboard with reusable cards, filters and API data.',
    github: 'react-dashboard',
    questions: [
      'What is the difference between state and props?',
      'When should you use useEffect?',
    ],
    roles: ['Frontend Engineer', 'Full Stack Developer'],
  },

  typescript: {
    why: 'TypeScript makes large JavaScript applications safer and easier to maintain.',
    learn: [
      'Types and interfaces',
      'Generics',
      'Type-safe API responses',
    ],
    project: 'Convert a JavaScript project into a fully typed TypeScript app.',
    github: 'typescript-production-app',
    questions: [
      'Why use TypeScript?',
      'What are generics?',
    ],
    roles: ['Frontend Engineer', 'Full Stack Developer'],
  },

  python: {
    why: 'Python is widely used for automation, backend development, data and AI workflows.',
    learn: [
      'Python fundamentals',
      'Functions and modules',
      'APIs and automation',
    ],
    project: 'Build a small API or automation tool in Python.',
    github: 'python-career-project',
    questions: [
      'What are Python decorators?',
      'How does a Python API work?',
    ],
    roles: ['Python Developer', 'Backend Engineer'],
  },

  sql: {
    why: 'SQL is essential for working with real application data and backend systems.',
    learn: [
      'SELECT and filtering',
      'Joins and relationships',
      'Indexes and query optimization',
    ],
    project: 'Design a relational database for a real-world application.',
    github: 'sql-database-project',
    questions: [
      'What is a JOIN?',
      'What is database normalization?',
    ],
    roles: ['Backend Engineer', 'Data Analyst'],
  },
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex size-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300 shadow-[0_0_24px_rgba(167,139,250,0.35)]">
        <span className="absolute size-3.5 rounded-[4px] bg-[#120d25]" />
        <span className="absolute left-[9px] top-[8px] size-1.5 rounded-full bg-white" />
      </div>

      {!compact && (
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
          Career<span className="text-violet-300">Forge</span>
        </span>
      )}
    </div>
  )
}

function Landing({
  onGenerate,
}: {
  onGenerate: (role: string, hours: string, timeline: string) => void
}) {
  const [role, setRole] = useState('')
  const [hours, setHours] = useState('8')
  const [timeline, setTimeline] = useState('6 months')
  const [invalid, setInvalid] = useState(false)

  const submit = () => {
    if (!role.trim()) {
      setInvalid(true)
      return
    }

    onGenerate(role.trim(), hours, timeline)
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0b0814] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_-10%,rgba(111,76,255,0.23),transparent_38%),radial-gradient(circle_at_90%_40%,rgba(0,210,255,0.07),transparent_26%)]" />

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-7 text-sm text-white/45 sm:flex">
            <span>How it works</span>
            <span>Roadmap library</span>
            <span>Sign in</span>
          </div>

          <Button
            variant="outline"
            className="border-white/10 bg-white/[0.03] text-xs text-white hover:bg-white/[0.08] sm:hidden"
          >
            <Menu data-icon="inline-start" />
            Menu
          </Button>
        </nav>

        <section className="mx-auto flex max-w-4xl flex-col items-center pb-20 pt-24 text-center sm:pt-32">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-300/25 bg-violet-300/[0.09] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-violet-100 shadow-[0_0_30px_rgba(139,92,246,0.12)]">
            <Sparkles className="size-3.5" />
            Your unfair advantage, mapped
          </div>

           <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.96] tracking-[-0.07em] text-white drop-shadow-[0_8px_40px_rgba(139,92,246,0.12)] sm:text-7xl lg:text-[82px]">
            Reverse Engineer
            <br />
            <span className="bg-gradient-to-r from-violet-200 via-fuchsia-200 to-cyan-200 bg-clip-text text-transparent">
              Your Dream Career
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-7 text-white/50 sm:text-lg">
            Turn an ambitious goal into a focused, AI-powered roadmap. Know
            what to learn, what to build, and what to do next.
          </p>

          <div className="mt-11 w-full max-w-2xl rounded-[22px] border border-violet-200/15 bg-white/[0.055] p-2 text-left shadow-[0_30px_100px_rgba(0,0,0,0.38),0_0_60px_rgba(124,58,237,0.08)] backdrop-blur-2xl sm:p-3">
            <div
              className={`rounded-xl border bg-black/20 p-4 ${
                invalid
                  ? 'border-rose-400/70'
                  : 'border-transparent focus-within:border-violet-400/40'
              }`}
            >
              <label
                htmlFor="dream-role"
                className="mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/35"
              >
                Dream role
              </label>

              <input
                id="dream-role"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value)
                  setInvalid(false)
                }}
                placeholder="e.g. Full Stack Developer at an AI startup"
                className="w-full bg-transparent text-base text-white outline-none placeholder:text-white/25"
              />

              {invalid && (
                <p className="mt-2 text-xs text-rose-300">
                  Tell us the role you are working toward.
                </p>
              )}
            </div>

            <div className="grid gap-2 p-1 pt-2 sm:grid-cols-2">
              <label className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <Clock3 className="size-4 text-violet-300" />
                  Hours per week
                </span>

                <input
                  aria-label="Hours per week"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="w-12 bg-transparent text-right text-sm font-medium text-white outline-none"
                />
              </label>

              <label className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
                <span className="flex items-center gap-2 text-xs text-white/45">
                  <Target className="size-4 text-cyan-300" />
                  Timeline
                </span>

                <select
                  aria-label="Timeline"
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="bg-transparent text-right text-sm font-medium text-white outline-none"
                >
                  <option className="bg-[#171225]">3 months</option>
                  <option className="bg-[#171225]">6 months</option>
                  <option className="bg-[#171225]">12 months</option>
                </select>
              </label>
            </div>

            <Button
              onClick={submit}
              className="mt-2 h-13 w-full rounded-xl bg-gradient-to-r from-violet-100 via-white to-cyan-100 text-sm font-semibold text-[#151022] shadow-[0_8px_30px_rgba(139,92,246,0.18)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(139,92,246,0.28)]"
            >
              Generate My Roadmap
              <ArrowRight data-icon="inline-end" />
            </Button>

            <p className="pt-3 text-center text-[11px] text-white/30">
              AI-generated recommendations based on your goal.
            </p>
          </div>
        </section>

        <section className="grid gap-3 border-t border-white/[0.07] pt-8 sm:grid-cols-3">
          {[
            {
              icon: Crosshair,
              title: 'Hyper-Specific Paths',
              copy: 'Skip the generic advice. Get a sequence tuned to the role you actually want.',
            },
            {
              icon: GitBranch,
              title: 'Interactive Skill Map',
              copy: 'See how every skill connects, compounds, and unlocks your next move.',
            },
            {
              icon: Zap,
              title: 'AI Action Plans',
              copy: 'Turn every milestone into a practical plan you can start this weekend.',
            },
          ].map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
             className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300/20 hover:bg-white/[0.045] hover:shadow-[0_16px_45px_rgba(0,0,0,0.2)]"
            >
              <Icon className="mb-7 size-5 text-violet-300 transition-transform duration-300 group-hover:scale-110" />
              <h2 className="text-sm font-semibold text-white">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-white/40">{copy}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  )
}

function StatusIcon({ status }: { status: string }) {
  if (status === 'known' || status === 'completed') {
    return <Check className="size-4 text-emerald-300" />
  }

  if (status === 'locked') {
    return <Lock className="size-4 text-white/30" />
  }

  if (status === 'in-progress') {
    return (
      <Circle className="size-4 fill-violet-300 text-violet-300" />
    )
  }

  return <Circle className="size-4 text-cyan-200" />
}

export function Roadmap({
  onBack = () => {},
  roadmapData,
}: {
  onBack?: () => void
  roadmapData?: any
}) {
  const [selected, setSelected] = useState('')
  const [actionPlan, setActionPlan] = useState('')
  const [actionPlanLoading, setActionPlanLoading] = useState(false)
  const [nodes, setNodes] = useState<any[]>(initialNodes)

  // NEW: actual graph zoom state
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
const [isDragging, setIsDragging] = useState(false)
const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Convert Gemini roadmap nodes into the graph format.
  useEffect(() => {
    if (!roadmapData?.nodes || !Array.isArray(roadmapData.nodes)) {
      setNodes(initialNodes)
      return
    }

    const aiNodes = roadmapData.nodes
      .map((item: any, index: number) => {
        const phaseValue =
          typeof item.phase === 'number'
            ? item.phase
            : Math.floor(index / 2)

        return {
          id: String(item.id ?? `ai-node-${index}`),

          title:
            item.title ??
            item.name ??
            item.skill ??
            item.label ??
            `Skill ${index + 1}`,

          type:
            item.type ??
            item.category ??
            item.kind ??
            'Career Skill',

          phase: Math.max(0, Math.min(4, phaseValue)),

          hours:
            item.hours ??
            item.estimatedHours ??
            item.estimated_hours ??
            '10 hrs',

          status:
            item.status === 'completed' ||
            item.status === 'known' ||
            item.status === 'in-progress' ||
            item.status === 'locked' ||
            item.status === 'available'
              ? item.status
              : index === 0
                ? 'in-progress'
                : 'available',

          x:
            item.x ??
            60 +
              (index % 2) * 230 +
              Math.floor(index / 4) * 480,

          y:
            item.y ??
            90 + (index % 4) * 120,
        }
      })
      .filter((node: any) => node.title)

    if (aiNodes.length > 0) {
      setNodes(aiNodes)
    } else {
      setNodes(initialNodes)
    }

    setSelected('')
    setActionPlan('')
    setZoom(1)
    setPan({ x: 0, y: 0 })
  }, [roadmapData])

  const selectedNode = nodes.find((node) => node.id === selected)

  const copy =
    selectedNode && nodeCopy[selectedNode.id]
      ? nodeCopy[selectedNode.id]
      : {
          why: `${selectedNode?.title || 'This skill'} is an important part of your target career path. Building practical ability here will help you move toward your goal.`,
          learn: [
            `Understand the fundamentals of ${selectedNode?.title || 'this skill'}`,
            'Practice through a small hands-on project',
            'Learn common real-world patterns and best practices',
          ],
          project: `Build a small practical project using ${selectedNode?.title || 'this skill'} and document what you learned.`,
          github: `${String(
            selectedNode?.title || 'career'
          )
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')}-career-project`,
          questions: [
            `What are the fundamentals of ${selectedNode?.title || 'this skill'}?`,
            `How would you use ${selectedNode?.title || 'this skill'} in a real project?`,
          ],
          roles: [
            roadmapData?.goal || 'Target role',
            'Related Engineer',
          ],
        }

  const completedCount = nodes.filter(
    (node) =>
      node.status === 'completed' ||
      node.status === 'known'
  ).length

  const progress =
    nodes.length > 0
      ? Math.round((completedCount / nodes.length) * 100)
      : 0

  // Always connect only existing nodes.
  const edges = nodes
    .slice(0, -1)
    .map((_: any, index: number) => [index, index + 1])

  // CHANGED:
  // Marking a skill as known now asks Gemini to recalculate
  // the roadmap instead of only changing the local UI.
  const markKnown = async () => {
    if (!selectedNode || !roadmapData) return

    setActionPlanLoading(true)
    setActionPlan('')

    try {
      const response = await fetch('/api/recalculate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roadmap: roadmapData,
          knownSkill: selectedNode,
          goal: roadmapData.goal,
        }),
      })

      const responseText = await response.text()

      let data: any = {}

      try {
        data = responseText ? JSON.parse(responseText) : {}
      } catch {
        throw new Error(
          `Invalid recalculation response (${response.status})`
        )
      }

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to recalculate roadmap'
        )
      }

      setNodes((current) =>
        current.map((node) =>
          node.id === selectedNode.id
            ? { ...node, status: 'known' }
            : node
        )
      )

      // Update the parent roadmap so the graph can rebuild
      // from Gemini's recalculated result.
      window.dispatchEvent(
        new CustomEvent('careerforge-roadmap-updated', {
          detail: data,
        })
      )

      // Since roadmapData is owned by the parent, use a local
      // replacement for the current graph when possible.
      if (data?.nodes && Array.isArray(data.nodes)) {
        const updatedNodes = data.nodes
          .map((item: any, index: number) => ({
            id: String(item.id ?? `ai-node-${index}`),
            title:
              item.title ??
              item.name ??
              item.skill ??
              item.label ??
              `Skill ${index + 1}`,
            type:
              item.type ??
              item.category ??
              item.kind ??
              'Career Skill',
            phase:
              typeof item.phase === 'number'
                ? Math.max(0, Math.min(4, item.phase))
                : Math.floor(index / 2),
            hours:
              item.hours ??
              item.estimatedHours ??
              item.estimated_hours ??
              '10 hrs',
            status:
              item.id === selectedNode.id
                ? 'known'
                : item.status === 'completed' ||
                    item.status === 'known'
                  ? item.status
                  : index === 0
                    ? 'in-progress'
                    : 'available',
            x:
              item.x ??
              60 +
                (index % 2) * 230 +
                Math.floor(index / 4) * 480,
            y:
              item.y ??
              90 + (index % 4) * 120,
          }))
          .filter((node: any) => node.title)

        if (updatedNodes.length > 0) {
          setNodes(updatedNodes)
        }
      }

      setSelected('')
      setActionPlan('')
      setZoom(1)
      setPan({ x: 0, y: 0 })
    } catch (error) {
      console.error('RECALCULATE ERROR:', error)

      setActionPlan(
        error instanceof Error
          ? error.message
          : 'Could not recalculate the roadmap right now. Please try again.'
      )
    } finally {
      setActionPlanLoading(false)
    }
  }

  const generateActionPlan = async () => {
    if (!selectedNode) return

    setActionPlanLoading(true)
    setActionPlan('')

    try {
      const response = await fetch('/api/node-advice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetRole:
            roadmapData?.goal || 'Full Stack Developer',
          node: selectedNode,
          context: roadmapData,
        }),
      })

      const responseText = await response.text()

      let data: any = {}

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {}
      } catch {
        throw new Error(
          `Invalid API response (${response.status})`
        )
      }

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to generate action plan'
        )
      }

      setActionPlan(
        typeof data.advice === 'string'
          ? data.advice
          : JSON.stringify(data, null, 2)
      )
    } catch (error) {
      console.error('ACTION PLAN ERROR:', error)

      setActionPlan(
        'Could not generate the action plan right now. Please try again.'
      )
    } finally {
      setActionPlanLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0814] text-white">
      {/* HEADER */}
      <header className="border-b border-white/[0.08] bg-[#0b0814]/90 px-5 py-4 backdrop-blur-xl sm:px-8">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <button
            onClick={onBack}
            aria-label="Back to CareerForge home"
          >
            <Logo />
          </button>

          <div className="hidden items-center gap-8 lg:flex">
            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                Target role
              </p>

              <p className="mt-1 max-w-[360px] truncate text-sm font-medium">
                {roadmapData?.goal || 'Your Dream Role'}
              </p>
            </div>

            <div className="h-8 w-px bg-white/10" />

            <div>
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                Timeline
              </p>

              <p className="mt-1 text-sm font-medium">
                {roadmapData?.timeline || '6 months'}
                <span className="text-white/35">
                  {' '}
                  · {roadmapData?.hoursPerWeek || 8} hrs/week
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                Roadmap progress
              </p>

              <p className="mt-1 text-sm font-semibold text-violet-200">
                {progress}% complete
              </p>
            </div>

            <div className="h-2 w-20 overflow-hidden rounded-full bg-white/10 sm:w-28">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <button
              aria-label="Open menu"
              className="ml-1 rounded-lg border border-white/10 p-2 text-white/50 lg:hidden"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs text-violet-300">
              <Sparkles className="size-3.5" />
              Your personalized path
            </div>

            <h1 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">
              From curious to career-ready.
            </h1>
          </div>

          <div className="hidden items-center gap-2 text-xs text-white/35 md:flex">
            <span className="size-2 rounded-full bg-emerald-300" />
            Completed

            <span className="ml-3 size-2 rounded-full bg-violet-300" />
            In progress

            <span className="ml-3 size-2 rounded-full border border-white/30" />
            Available
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
          {/* GRAPH */}
          <section
            className={`relative min-h-[520px] overflow-hidden rounded-[22px] sm:min-h-[680px] border border-white/[0.1] bg-[#0f0c1b] shadow-[0_25px_80px_rgba(0,0,0,0.22)] ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            aria-label="Interactive career roadmap"
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest('button')) return
              setIsDragging(true)
              setDragStart({
                x: e.clientX - pan.x,
                y: e.clientY - pan.y,
              })
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              if (!isDragging) return
              setPan({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y,
              })
            }}
            onPointerUp={() => setIsDragging(false)}
            onPointerCancel={() => setIsDragging(false)}
          >
            <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" />

            <div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-[#161226]/90 px-3 py-2 text-xs text-white/50 backdrop-blur">
              <Layers3 className="size-3.5 text-violet-300" />
              Skill graph
              <span className="text-white/20">·</span>
              {nodes.length} nodes
            </div>

            {/* ZOOM CONTROLS */}
            <div className="absolute right-5 top-5 z-10 flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#161226]/90">
              <button
                aria-label="Zoom in"
                onClick={() =>
                  setZoom((value) =>
                    Math.min(Number((value + 0.15).toFixed(2)), 1.8)
                  )
                }
                className="p-2.5 text-white/45 hover:bg-white/10 hover:text-white"
              >
                <Plus className="size-4" />
              </button>

              <div className="h-px bg-white/10" />

              <button
                aria-label="Zoom out"
                onClick={() =>
                  setZoom((value) =>
                    Math.max(Number((value - 0.15).toFixed(2)), 0.6)
                  )
                }
                className="p-2.5 text-white/45 hover:bg-white/10 hover:text-white"
              >
                <Minus className="size-4" />
              </button>

              <div className="h-px bg-white/10" />

              <button
                aria-label="Fit roadmap view"
                onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }) }}
                className="p-2.5 text-white/45 hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="size-4" />
              </button>
            </div>

            <div className="absolute bottom-5 left-5 z-10 rounded-lg border border-white/10 bg-[#161226]/90 px-3 py-2 text-[11px] text-white/45 backdrop-blur">
              Click a skill to explore · Drag to pan · Use controls to zoom
            </div>

            <div
              className="relative mx-auto mt-24 h-[510px] min-w-[1170px] max-w-[1170px]"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 160ms ease-out',
              }}
            >
              {phases.map((phase, i) => (
                <div
                  key={phase.name}
                  className="absolute top-0 w-[180px] text-center"
                  style={{ left: `${i * 240 + 10}px` }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">
                    {phase.name}
                  </p>

                  <p className="mt-1 text-[10px] text-white/25">
                    {phase.caption}
                  </p>

                  <div className="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              ))}

              <svg
                className="pointer-events-none absolute inset-0 overflow-visible"
                width="1170"
                height="510"
                aria-hidden="true"
              >
                {edges.map(([a, b]) => {
                  const from = nodes[a]
                  const to = nodes[b]

                  if (!from || !to) return null

                  return (
                    <path
                      key={`${a}-${b}`}
                      d={`M ${from.x + 170} ${
                        from.y + 54
                      } C ${from.x + 210} ${
                        from.y + 54
                      }, ${to.x - 30} ${
                        to.y + 54
                      }, ${to.x} ${to.y + 54}`}
                      fill="none"
                      stroke={
                        from.status === 'completed' ||
                        from.status === 'known'
                          ? 'rgba(167,139,250,.5)'
                          : 'rgba(255,255,255,.13)'
                      }
                      strokeWidth="1.5"
                      strokeDasharray={
                        from.status === 'locked'
                          ? '4 5'
                          : undefined
                      }
                    />
                  )
                })}
              </svg>

              {nodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => {
                    setSelected(node.id)
                    setActionPlan('')
                  }}
                  className={`absolute w-[172px] rounded-xl border p-3 text-left transition-all duration-200 hover:-translate-y-1 ${
                    selected === node.id
                      ? 'border-violet-300/80 bg-violet-400/[0.14] shadow-[0_0_0_3px_rgba(167,139,250,0.12),0_12px_40px_rgba(139,92,246,0.18)]'
                      : node.status === 'locked'
                        ? 'border-white/[0.07] bg-white/[0.025] opacity-65'
                        : 'border-white/[0.1] bg-[#181329]/95 shadow-[0_8px_30px_rgba(0,0,0,0.18)] hover:border-violet-300/40 hover:shadow-[0_12px_35px_rgba(139,92,246,0.12)]'
                  }`}
                  style={{
                    left: node.x,
                    top: node.y,
                  }}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span
                      className={`rounded-md p-1.5 ${
                        node.status === 'completed' ||
                        node.status === 'known'
                          ? 'bg-emerald-300/10'
                          : node.status === 'in-progress'
                            ? 'bg-violet-300/10'
                            : 'bg-white/[0.06]'
                      }`}
                    >
                      <StatusIcon status={node.status} />
                    </span>

                    <span className="text-[10px] text-white/30">
                      {node.hours}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {node.title}
                  </p>

                  <p className="mt-1 text-[10px] text-white/35">
                    {node.type}
                  </p>

                  {node.status === 'in-progress' && (
                    <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[62%] rounded-full bg-violet-300" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className="rounded-2xl border border-white/[0.09] bg-[#100d1e] p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/30">
                  Your journey
                </p>

                <h2 className="mt-1 text-lg font-semibold">
                  Milestones
                </h2>
              </div>

              <span className="text-sm font-medium text-violet-200">
                {progress}%
              </span>
            </div>

            <div className="mb-7 h-2 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex flex-col gap-1">
              {phases.map((phase, index) => {
                const phaseNodes = nodes.filter(
                  (node) => node.phase === index
                )

                const phaseDone =
                  phaseNodes.length > 0 &&
                  phaseNodes.every(
                    (node) =>
                      node.status === 'completed' ||
                      node.status === 'known'
                  )

                const phaseActive =
                  !phaseDone &&
                  phaseNodes.some(
                    (node) => node.status === 'in-progress'
                  )

                return (
                  <div
                    key={phase.name}
                    className={`flex items-center gap-3 rounded-xl p-3 ${
                      phaseActive
                        ? 'border border-violet-300/20 bg-violet-300/[0.07]'
                        : ''
                    }`}
                  >
                    <div
                      className={`flex size-8 items-center justify-center rounded-full border ${
                        phaseDone
                          ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-300'
                          : phaseActive
                            ? 'border-violet-300/40 bg-violet-300/10 text-violet-200'
                            : 'border-white/10 text-white/25'
                      }`}
                    >
                      {phaseDone ? (
                        <CheckCircle2 className="size-4" />
                      ) : (
                        <span className="text-xs">
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">
                        {phase.name}
                      </p>

                      <p className="mt-0.5 text-[11px] text-white/30">
                        {phaseDone
                          ? 'Completed'
                          : phaseActive
                            ? 'In progress'
                            : 'Upcoming'}
                      </p>
                    </div>

                    {phaseActive && (
                      <ChevronRight className="size-4 text-violet-300" />
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-7 rounded-xl border border-violet-300/10 bg-violet-300/[0.04] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-violet-200">
                <GitBranch className="size-4" />
                Entry-level roles
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {(Array.isArray(roadmapData?.entryLevelRoles)
                  ? roadmapData.entryLevelRoles
                  : []
                )
                  .slice(0, 5)
                  .map((role: any, index: number) => (
                    <span
                      key={`${String(role)}-${index}`}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] text-white/60"
                    >
                      {typeof role === 'string'
                        ? role
                        : role?.title || role?.name || 'Entry role'}
                    </span>
                  ))}
              </div>

              {(!Array.isArray(roadmapData?.entryLevelRoles) ||
                roadmapData.entryLevelRoles.length === 0) && (
                <p className="mt-2 text-xs text-white/30">
                  AI will identify realistic entry points for this career.
                </p>
              )}
            </div>

            <div className="mt-7 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4">
              <div className="flex items-center gap-2 text-xs font-medium text-cyan-200">
                <Bot className="size-4" />
                AI coach note
              </div>

              <p className="mt-2 text-xs leading-5 text-white/45">
                Your roadmap adapts to your target role and the skills you
                mark as already known.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* DRAWER */}
      {selectedNode && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/35"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelected('')
            }
          }}
        >
          <aside className="flex h-full w-full max-w-[430px] flex-col overflow-hidden border-l border-white/10 bg-[#120e21] shadow-2xl">
            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 sm:p-8">
              {/* HEADER */}
              <div className="mb-8 flex shrink-0 items-start justify-between">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-violet-300">
                    <Sparkles className="size-3.5" />
                    AI-generated skill brief
                  </div>

                  <h2 className="text-2xl font-semibold">
                    {selectedNode.title}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/40">
                    <span className="rounded-full border border-white/10 px-2.5 py-1">
                      {selectedNode.type}
                    </span>

                    <span className="rounded-full border border-white/10 px-2.5 py-1">
                      {selectedNode.hours}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelected('')}
                  aria-label="Close skill details"
                  className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex flex-col gap-7">
                {/* WHY */}
                <section>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                    Why this matters
                  </h3>

                  <p className="text-sm leading-6 text-white/65">
                    {copy.why}
                  </p>
                </section>

                {/* LEARN */}
                <section>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                    What to learn
                  </h3>

                  <ul className="flex flex-col gap-2.5">
                    {copy.learn.map((item) => (
                      <li
                        key={item}
                        className="flex gap-2.5 text-sm text-white/65"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-violet-300" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>

                {/* PROJECT */}
                <section className="rounded-xl border border-violet-300/15 bg-violet-300/[0.05] p-4">
                  <div className="flex items-center gap-2 text-xs font-medium text-violet-200">
                    <Lightbulb className="size-4" />
                    Weekend project
                  </div>

                  <p className="mt-2 text-sm leading-5 text-white/65">
                    {copy.project}
                  </p>
                </section>

                {/* GITHUB */}
                <section>
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                    GitHub project suggestion
                  </h3>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="flex items-center gap-3">
                      <GitFork className="size-4 text-white/60" />

                      <span className="text-sm text-white/70">
                        {copy.github}
                      </span>
                    </div>

                    <ArrowUpRight className="size-4 text-white/30" />
                  </div>
                </section>

                {/* QUESTIONS */}
                <section>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                    Interview questions
                  </h3>

                  <div className="flex flex-col gap-2">
                    {copy.questions.map((q, i) => (
                      <div
                        key={q}
                        className="flex gap-3 rounded-lg border border-white/[0.07] p-3 text-sm text-white/60"
                      >
                        <span className="text-violet-300">
                          0{i + 1}
                        </span>

                        {q}
                      </div>
                    ))}
                  </div>
                </section>

                {/* ROLES */}
                <section>
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">
                    Related roles
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {copy.roles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full bg-white/[0.06] px-3 py-1.5 text-xs text-white/55"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </section>

                {/* ACTION PLAN */}
                {actionPlanLoading && (
                  <section className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-cyan-200">
                      <Bot className="size-4" />
                      AI is creating your action plan...
                    </div>

                    <div className="mt-4 h-2 animate-pulse rounded-full bg-white/10" />
                    <div className="mt-2 h-2 w-4/5 animate-pulse rounded-full bg-white/10" />
                    <div className="mt-2 h-2 w-3/5 animate-pulse rounded-full bg-white/10" />
                  </section>
                )}

                {actionPlan && !actionPlanLoading && (
                  <section className="rounded-xl border border-cyan-300/15 bg-cyan-300/[0.05] p-4">
                    <div className="flex items-center gap-2 text-xs font-medium text-cyan-200">
                      <Bot className="size-4" />
                      AI Action Plan

                      <span className="rounded-full bg-white/10 px-2 py-0.5 text-[9px] text-white/50">
                        AI Generated
                      </span>
                    </div>

                    <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-white/65">
                      {actionPlan}
                    </p>
                  </section>
                )}

                {/* BUTTONS */}
                <div className="sticky bottom-0 mt-2 flex shrink-0 gap-2 border-t border-white/10 bg-[#120e21] py-4">
                  <Button
                    onClick={markKnown}
                    disabled={actionPlanLoading}
                    variant="outline"
                    className="flex-1 border-white/10 bg-white/[0.04] text-white hover:bg-white/10"
                  >
                    <Check data-icon="inline-start" />

                    {actionPlanLoading
                      ? 'Updating...'
                      : 'Mark as Known'}
                  </Button>

                  <Button
                    onClick={generateActionPlan}
                    disabled={actionPlanLoading}
                    className="flex-1 bg-white text-[#151022] hover:bg-violet-100"
                  >
                    <Sparkles data-icon="inline-start" />

                    {actionPlanLoading
                      ? 'Generating...'
                      : 'Action Plan'}
                  </Button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  )
}

export default function CareerForgeApp() {
  const [view, setView] = useState<'landing' | 'roadmap'>(
    'landing'
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [roadmapData, setRoadmapData] = useState<any>(null)

  // Listen for roadmap recalculation from the Roadmap component.
  useEffect(() => {
    const handleRoadmapUpdate = (event: Event) => {
      const customEvent = event as CustomEvent

      if (customEvent.detail) {
        setRoadmapData(customEvent.detail)
      }
    }

    window.addEventListener(
      'careerforge-roadmap-updated',
      handleRoadmapUpdate
    )

    return () => {
      window.removeEventListener(
        'careerforge-roadmap-updated',
        handleRoadmapUpdate
      )
    }
  }, [])

  const generateRoadmap = async (
    role: string,
    hours: string,
    timeline: string
  ) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/roadmap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetRole: role,
          hoursPerWeek: Number(hours),
          timeline,
        }),
      })

      const responseText = await response.text()

      console.log('API STATUS:', response.status)
      console.log('API RESPONSE:', responseText)

      let data: any = {}

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {}
      } catch {
        throw new Error(
          `Invalid API response (${response.status}): ${
            responseText || 'Empty response'
          }`
        )
      }

      if (!response.ok) {
        throw new Error(
          data.error || 'Failed to generate roadmap'
        )
      }

      setRoadmapData(data)
      setView('roadmap')
    } catch (err) {
      console.error(err)

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while generating your roadmap.'
      )
    } finally {
      setLoading(false)
    }
  }

  if (view === 'landing') {
    return (
      <>
        <Landing onGenerate={generateRoadmap} />

        {loading && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0814]/90 backdrop-blur-sm">
            <div className="text-center">
              <div className="mx-auto mb-5 size-10 animate-spin rounded-full border-2 border-white/10 border-t-violet-300" />

              <p className="text-sm font-medium text-white">
                Reverse-engineering your career path...
              </p>

              <p className="mt-2 text-xs text-white/40">
                AI is building your personalized roadmap
              </p>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="fixed bottom-6 left-1/2 z-[100] w-[calc(100%-32px)] max-w-md -translate-x-1/2 rounded-xl border border-rose-300/20 bg-[#1a1020] p-4 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <p className="text-sm font-medium text-rose-200">
                  Couldn&apos;t generate roadmap
                </p>

                <p className="mt-1 text-xs leading-5 text-white/50">
                  {error}
                </p>
              </div>

              <button
                onClick={() => setError('')}
                className="text-white/40 hover:text-white"
                aria-label="Close error"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        )}
      </>
    )
  }

  return (
    <Roadmap
      onBack={() => setView('landing')}
      roadmapData={roadmapData}
    />
  )
}
