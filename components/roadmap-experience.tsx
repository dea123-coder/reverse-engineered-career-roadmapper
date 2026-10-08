'use client'

import { useState } from 'react'
import {
  AlertTriangle,
  ArrowLeft,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock3,
  GitBranch,
  GitFork,
  Layers3,
  Lightbulb,
  Lock,
  Minus,
  Plus,
  RotateCcw,
  Sparkles,
  Target,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const phases = ['Foundation', 'Core Skills', 'Specialization', 'Projects', 'Interview Ready']
const nodes = [
  { id: 'html', title: 'HTML & CSS', phase: 0, status: 'known', hours: '8 hrs', kind: 'Fundamentals', x: 50, y: 70 },
  { id: 'git', title: 'Git & GitHub', phase: 0, status: 'completed', hours: '6 hrs', kind: 'Workflow', x: 50, y: 250 },
  { id: 'javascript', title: 'JavaScript', phase: 1, status: 'in-progress', hours: '24 hrs', kind: 'Core skill', x: 285, y: 125 },
  { id: 'react', title: 'React', phase: 1, status: 'available', hours: '20 hrs', kind: 'Core skill', x: 285, y: 325 },
  { id: 'typescript', title: 'TypeScript', phase: 2, status: 'available', hours: '14 hrs', kind: 'Specialization', x: 530, y: 70 },
  { id: 'ai', title: 'AI SDK Patterns', phase: 2, status: 'locked', hours: '18 hrs', kind: 'Specialization', x: 530, y: 300 },
  { id: 'saas', title: 'AI SaaS Build', phase: 3, status: 'locked', hours: '32 hrs', kind: 'Portfolio project', x: 775, y: 150 },
  { id: 'interview', title: 'System Design', phase: 4, status: 'locked', hours: '12 hrs', kind: 'Interview prep', x: 1015, y: 280 },
]

const details = {
  why: 'This skill is a building block for the role you want. Strong fundamentals help you ship confidently and make every advanced concept easier to reason about.',
  learn: ['Core concepts and mental models', 'Practical patterns used on production teams', 'Testing, debugging, and communicating tradeoffs'],
  project: 'Build a small, polished feature that demonstrates the skill with a clear README and a short demo video.',
  github: 'careerforge-weekend-build',
  questions: ['How would you explain this concept to a teammate?', 'What tradeoffs would you consider in production?', 'How do you debug a problem in this area?'],
  roles: ['Frontend Engineer', 'Product Engineer', 'Full Stack Developer'],
}

function Brand() {
  return <div className="flex items-center gap-2.5"><div className="relative flex size-8 items-center justify-center rounded-[10px] bg-gradient-to-br from-violet-400 via-fuchsia-400 to-cyan-300"><span className="absolute size-3.5 rounded-[4px] bg-[#120d25]" /><span className="absolute left-[9px] top-[8px] size-1.5 rounded-full bg-white" /></div><span className="text-[15px] font-semibold text-white">Career<span className="text-violet-300">Forge</span></span></div>
}

function Status({ status }: { status: string }) {
  if (status === 'locked') return <Lock className="size-3.5 text-white/30" />
  if (status === 'completed' || status === 'known') return <Check className="size-3.5 text-emerald-300" />
  if (status === 'in-progress') return <Circle className="size-3.5 fill-violet-300 text-violet-300" />
  return <Circle className="size-3.5 text-cyan-200" />
}

function Drawer({ node, onClose, onKnown }: { node: typeof nodes[number]; onClose: () => void; onKnown: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-end bg-black/45 sm:items-stretch" onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
    <aside className="max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border border-white/10 bg-[#120e21] p-6 shadow-2xl sm:h-full sm:max-h-none sm:w-[430px] sm:rounded-none sm:border-y-0 sm:border-r-0 sm:border-l sm:p-8" aria-label="Skill details">
      <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-white/15 sm:hidden" />
      <div className="mb-8 flex items-start justify-between gap-4"><div><div className="mb-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-violet-300"><Sparkles className="size-3.5" /> AI Generated</div><h2 className="text-2xl font-semibold tracking-[-0.035em]">{node.title}</h2><div className="mt-3 flex flex-wrap gap-2 text-[11px] text-white/45"><span className="rounded-full border border-white/10 px-2.5 py-1">{node.kind}</span><span className="rounded-full border border-white/10 px-2.5 py-1">Intermediate</span><span className="rounded-full border border-white/10 px-2.5 py-1">{node.hours}</span></div></div><button onClick={onClose} aria-label="Close skill details" className="rounded-lg p-2 text-white/40 hover:bg-white/10 hover:text-white"><X className="size-5" /></button></div>
      <div className="flex flex-col gap-7"><section><h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Why this matters</h3><p className="text-sm leading-6 text-white/65">{details.why}</p></section><section><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">What to learn</h3><ul className="flex flex-col gap-2.5">{details.learn.map((item) => <li key={item} className="flex gap-2.5 text-sm text-white/65"><Check className="mt-0.5 size-4 shrink-0 text-violet-300" />{item}</li>)}</ul></section><section className="rounded-xl border border-violet-300/15 bg-violet-300/[0.05] p-4"><div className="flex items-center gap-2 text-xs font-medium text-violet-200"><Lightbulb className="size-4" /> Weekend project</div><p className="mt-2 text-sm leading-5 text-white/65">{details.project}</p></section><section><h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">GitHub project suggestion</h3><div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3"><GitFork className="size-5 text-white/60" /><span className="text-sm text-white/70">{details.github}</span><ArrowLeft className="ml-auto size-4 rotate-180 text-white/30" /></div></section><section><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Interview questions</h3><ol className="flex list-decimal flex-col gap-2 pl-5 text-sm leading-5 text-white/60">{details.questions.map((question) => <li key={question}>{question}</li>)}</ol></section><section><h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-white/35">Related roles</h3><div className="flex flex-wrap gap-2">{details.roles.map((role) => <span key={role} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55">{role}</span>)}</div></section></div>
      <div className="sticky bottom-0 mt-8 flex gap-2 border-t border-white/10 bg-[#120e21] pt-5"><Button onClick={onKnown} variant="outline" className="flex-1 border-white/10 bg-white/[0.03] text-white hover:bg-white/10">{node.status === 'known' ? 'Known' : 'Mark as Known'}</Button><Button className="flex-1 bg-white text-[#151022] hover:bg-violet-100"><Sparkles data-icon="inline-start" /> Generate Action Plan</Button></div>
    </aside>
  </div>
}

export function RoadmapExperience() {
  const [selected, setSelected] = useState<string | null>(null)
  const [state, setState] = useState<'success' | 'generating' | 'loading' | 'error' | 'empty'>('success')
  const [known, setKnown] = useState<string[]>(['html', 'git'])
  const selectedNode = nodes.find((node) => node.id === selected)
  const progress = Math.round((known.length / nodes.length) * 100)
  const showContent = state === 'success'

  return <main className="min-h-screen bg-[#0b0814] text-white"><header className="border-b border-white/[0.08] bg-[#0b0814]/90 px-5 py-4 backdrop-blur-xl sm:px-8"><div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4"><Brand /><div className="hidden items-center gap-8 lg:flex"><div><p className="text-[10px] uppercase tracking-[0.14em] text-white/30">Target role</p><p className="mt-1 text-sm font-medium">Full Stack Developer <span className="text-white/35">at an AI startup</span></p></div><div className="h-8 w-px bg-white/10" /><div><p className="text-[10px] uppercase tracking-[0.14em] text-white/30">Timeline</p><p className="mt-1 text-sm font-medium">6 months <span className="text-white/35">· 8 hrs/week</span></p></div></div><div className="flex items-center gap-3"><div className="hidden text-right sm:block"><p className="text-[10px] uppercase tracking-[0.14em] text-white/30">Roadmap progress</p><p className="mt-1 text-sm font-semibold text-violet-200">{progress}% complete</p></div><div className="h-2 w-20 overflow-hidden rounded-full bg-white/10 sm:w-28"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" style={{ width: `${progress}%` }} /></div></div></div></header>
    <div className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8"><div className="mb-5 flex flex-wrap items-end justify-between gap-3"><div><div className="mb-2 flex items-center gap-2 text-xs text-violet-300"><Sparkles className="size-3.5" /> Your personalized path</div><h1 className="text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">From curious to career-ready.</h1></div><div className="flex flex-wrap gap-2"><Button onClick={() => setState('generating')} variant="outline" className="border-white/10 bg-white/[0.03] text-xs text-white/65 hover:bg-white/10">Preview loading</Button><Button onClick={() => setState('error')} variant="outline" className="border-white/10 bg-white/[0.03] text-xs text-white/65 hover:bg-white/10">Preview error</Button></div></div>
      {!showContent ? <StateCard state={state} onRetry={() => setState('success')} /> : <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]"><section className="relative min-h-[680px] overflow-x-auto overflow-y-hidden rounded-2xl border border-white/[0.09] bg-[#100d1e] shadow-[0_20px_90px_rgba(0,0,0,0.2)]" aria-label="Interactive career roadmap"><div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:42px_42px]" /><div className="absolute left-5 top-5 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-[#161226]/90 px-3 py-2 text-xs text-white/50"><Layers3 className="size-3.5 text-violet-300" /> Skill graph · 8 nodes</div><div className="absolute right-5 top-5 z-10 flex flex-col rounded-lg border border-white/10 bg-[#161226]/90"><button aria-label="Zoom in" className="p-2.5 text-white/45 hover:bg-white/10"><Plus className="size-4" /></button><div className="h-px bg-white/10" /><button aria-label="Zoom out" className="p-2.5 text-white/45 hover:bg-white/10"><Minus className="size-4" /></button><div className="h-px bg-white/10" /><button aria-label="Fit roadmap view" className="p-2.5 text-white/45 hover:bg-white/10"><RotateCcw className="size-4" /></button></div><div className="relative mx-auto mt-24 h-[510px] min-w-[1170px] max-w-[1170px]">{phases.map((phase, index) => <div key={phase} className="absolute top-0 w-[180px] text-center" style={{ left: `${index * 240 + 10}px` }}><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/55">{phase}</p><div className="mx-auto mt-4 h-px w-14 bg-gradient-to-r from-transparent via-white/20 to-transparent" /></div>)}<svg className="pointer-events-none absolute inset-0" width="1170" height="510" aria-hidden="true">{[[0,2],[1,2],[2,3],[2,4],[3,5],[4,5],[4,6],[5,6],[6,7]].map(([a,b]) => { const from = nodes[a]; const to = nodes[b]; return <path key={`${a}-${b}`} d={`M ${from.x+170} ${from.y+54} C ${from.x+210} ${from.y+54}, ${to.x-30} ${to.y+54}, ${to.x} ${to.y+54}`} fill="none" stroke="rgba(167,139,250,.45)" strokeWidth="1.5" strokeDasharray={from.status === 'locked' ? '4 5' : undefined} /> })}</svg>{nodes.map((node) => { const isKnown = known.includes(node.id) || node.status === 'completed'; return <button key={node.id} onClick={() => setSelected(node.id)} className={`absolute w-[172px] rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5 ${selected === node.id ? 'border-violet-300/70 bg-violet-400/[0.13]' : node.status === 'locked' ? 'border-white/[0.07] bg-white/[0.025] opacity-65' : 'border-white/[0.1] bg-[#181329] hover:border-violet-300/35'}`} style={{ left: node.x, top: node.y }} aria-label={`Open ${node.title} skill details`}><div className="mb-3 flex items-center justify-between"><span className={`rounded-md p-1.5 ${isKnown ? 'bg-emerald-300/10' : node.status === 'in-progress' ? 'bg-violet-300/10' : 'bg-white/[0.06]'}`}><Status status={isKnown ? 'known' : node.status} /></span><span className="text-[10px] text-white/30">{node.hours}</span></div><p className="text-sm font-semibold text-white">{node.title}</p><p className="mt-1 text-[10px] text-white/35">{node.kind}</p>{node.status === 'in-progress' && <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full w-[62%] rounded-full bg-violet-300" /></div>}</button>})}</div><div className="absolute bottom-5 left-5 rounded-lg border border-white/10 bg-[#161226]/90 px-3 py-2 text-[11px] text-white/45">Click any skill to explore <span className="text-violet-300">→</span></div></section><Milestones progress={progress} /></div>}
    </div>{selectedNode && <Drawer node={selectedNode} onClose={() => setSelected(null)} onKnown={() => { setKnown((current) => current.includes(selectedNode.id) ? current : [...current, selectedNode.id]); setSelected(null) }} />}</main>
}

function Milestones({ progress }: { progress: number }) { return <aside className="rounded-2xl border border-white/[0.09] bg-[#100d1e] p-5 sm:p-6"><div className="mb-6 flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.14em] text-white/30">Your journey</p><h2 className="mt-1 text-lg font-semibold">Milestones</h2></div><span className="text-sm font-medium text-violet-200">{progress}%</span></div><div className="mb-7 h-2 overflow-hidden rounded-full bg-white/[0.07]"><div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-cyan-300 transition-all" style={{ width: `${progress}%` }} /></div><div className="flex flex-col gap-1">{phases.map((phase, index) => { const done = index < 2; const active = index === 2; return <div key={phase} className={`flex items-center gap-3 rounded-xl p-3 ${active ? 'border border-violet-300/20 bg-violet-300/[0.07]' : ''}`}><div className={`flex size-8 items-center justify-center rounded-full border ${done ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-300' : active ? 'border-violet-300/40 bg-violet-300/10 text-violet-200' : 'border-white/10 text-white/25'}`}>{done ? <CheckCircle2 className="size-4" /> : <span className="text-xs">{index + 1}</span>}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-white">{phase}</p><p className="mt-0.5 text-[11px] text-white/30">{done ? 'Completed' : active ? 'Up next' : 'Locked'}</p></div>{active && <ChevronRight className="size-4 text-violet-300" />}</div>})}</div><div className="mt-7 rounded-xl border border-cyan-300/10 bg-cyan-300/[0.04] p-4"><div className="flex items-center gap-2 text-xs font-medium text-cyan-200"><Bot className="size-4" /> AI coach note</div><p className="mt-2 text-xs leading-5 text-white/45">You are building momentum. Finish JavaScript fundamentals before branching into your specialization.</p></div></aside> }

function StateCard({ state, onRetry }: { state: string; onRetry: () => void }) { const config = { generating: { icon: Sparkles, title: 'Forge is mapping your path…', copy: 'Analyzing your goal, current skills, and the fastest route to impact.', action: null }, loading: { icon: Sparkles, title: 'Loading skill advice…', copy: 'Your AI coach is preparing a focused brief for this node.', action: null }, error: { icon: AlertTriangle, title: 'We hit a rough edge', copy: 'Your roadmap could not be loaded. Your goal is safe — try again to reconnect.', action: 'Retry' }, empty: { icon: GitBranch, title: 'Your roadmap is ready to begin', copy: 'Generate a path from your dream role to see your first skill map.', action: 'Generate roadmap' } }[state as 'generating' | 'loading' | 'error' | 'empty']; const Icon = config.icon; return <section className="flex min-h-[680px] items-center justify-center rounded-2xl border border-white/[0.09] bg-[#100d1e] p-6"><div className="max-w-md text-center"><div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-300/[0.08] text-violet-200">{state === 'generating' || state === 'loading' ? <Sparkles className="size-7" /> : <Icon className="size-7" />}</div><h2 className="text-2xl font-semibold tracking-[-0.03em]">{config.title}</h2><p className="mt-3 text-sm leading-6 text-white/45">{config.copy}</p>{config.action && <Button onClick={onRetry} className="mt-7 bg-white text-[#151022] hover:bg-violet-100">{config.action}<ChevronRight data-icon="inline-end" /></Button>}{(state === 'generating' || state === 'loading') && <div className="mx-auto mt-8 h-1.5 w-48 overflow-hidden rounded-full bg-white/10"><div className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-400 to-cyan-300" /></div>}</div></section> }

export default RoadmapExperience
