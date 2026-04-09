"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Bot,
  Cpu,
  Users,
  Rocket,
  Zap,
  MessageSquare,
} from "lucide-react";

interface Slide {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  accent: string;
  icon: React.ReactNode;
}

const slides: Slide[] = [
  // 1 — Title
  {
    title: "The Age of AI Agents",
    subtitle: "What It Means for Makat",
    accent: "from-violet-500 to-fuchsia-500",
    icon: <Rocket className="w-16 h-16" />,
    content: (
      <div className="flex flex-col items-center gap-4 mt-4">
        <p className="text-lg text-neutral-500">makat.ai • 2026</p>
      </div>
    ),
  },

  // 2 — What Are AI Agents?
  {
    title: "What Are AI Agents?",
    accent: "from-blue-500 to-cyan-500",
    icon: <Bot className="w-14 h-14" />,
    content: (
      <div className="flex flex-col items-center gap-8 mt-6 max-w-3xl mx-auto">
        <p className="text-2xl text-neutral-200 text-center">
          Not chatbots — tools that{" "}
          <span className="text-cyan-400 font-semibold">think</span>,{" "}
          <span className="text-blue-400 font-semibold">plan</span>, and{" "}
          <span className="text-violet-400 font-semibold">act</span>.
        </p>
        <div className="flex items-center gap-4 text-xl md:text-2xl font-semibold">
          <span className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-cyan-400">
            Harness
          </span>
          <span className="text-neutral-500">+</span>
          <span className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-blue-400">
            Model
          </span>
          <span className="text-neutral-500">=</span>
          <span className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-violet-400">
            Agent
          </span>
        </div>
        <p className="text-lg text-neutral-400 text-center max-w-xl">
          The <span className="text-cyan-400">harness</span> gives tools, memory, and the ability to act.
          The <span className="text-blue-400">model</span> provides intelligence.
          Together — an <span className="text-violet-400">agent</span> that gets work done.
        </p>
      </div>
    ),
  },

  // 3 — Meet Claude Code
  {
    title: "Meet Claude Code",
    subtitle: "The harness that finally works",
    accent: "from-orange-500 to-amber-500",
    icon: <Cpu className="w-14 h-14" />,
    content: (
      <div className="flex flex-col items-center gap-8 mt-6 max-w-3xl mx-auto">
        <p className="text-xl text-neutral-300 text-center">
          An AI agent for software engineering — it reads your code, writes changes, runs tests, and iterates until the job is done.
        </p>
        <div className="grid md:grid-cols-3 gap-4 w-full">
          {[
            { title: "Write Code", desc: "Features, bug fixes, refactors" },
            { title: "Review PRs", desc: "Spot issues, suggest fixes" },
            { title: "Triage Bugs", desc: "Reply with full context" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white/5 rounded-xl p-5 border border-white/10"
            >
              <h4 className="font-semibold text-orange-300 mb-1">
                {item.title}
              </h4>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-neutral-500 italic">
          Our engineers already use it daily.
        </p>
      </div>
    ),
  },

  // 4 — Two Tracks
  {
    title: "AI at Makat: Two Tracks",
    accent: "from-emerald-500 to-pink-500",
    icon: <Rocket className="w-14 h-14" />,
    content: (
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-8 max-w-3xl mx-auto">
        <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
          <h3 className="text-2xl font-semibold text-emerald-400 mb-2">Internal</h3>
          <p className="text-neutral-400">How we work</p>
        </div>
        <span className="text-3xl text-neutral-600 font-bold">+</span>
        <div className="flex-1 bg-white/5 rounded-2xl p-6 border border-white/10 text-center">
          <h3 className="text-2xl font-semibold text-pink-400 mb-2">In the Product</h3>
          <p className="text-neutral-400">How our operators work</p>
        </div>
      </div>
    ),
  },

  // 5 — AI at Makat: Internal
  {
    title: "AI at Makat: Internal",
    accent: "from-emerald-500 to-teal-500",
    icon: <Zap className="w-14 h-14" />,
    content: (
      <div className="grid md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-lg font-semibold mb-3 text-neutral-500">Before</h3>
          <ul className="space-y-3 text-neutral-400">
            <li>Only engineers use AI</li>
            <li>Bug investigation takes hours</li>
            <li>Tools work in isolation</li>
          </ul>
        </div>
        <div className="bg-white/5 rounded-2xl p-6 border border-emerald-500/20">
          <h3 className="text-lg font-semibold mb-3 text-emerald-400">After</h3>
          <ul className="space-y-3 text-neutral-200">
            <li>Every team member has AI</li>
            <li>Bug investigation in minutes</li>
            <li>AI woven into every tool</li>
          </ul>
        </div>
      </div>
    ),
  },

  // 5 — AI at Makat: In the Product
  {
    title: "AI in the Product",
    subtitle: "Operators × AI = Scale",
    accent: "from-pink-500 to-rose-500",
    icon: <Users className="w-14 h-14" />,
    content: (
      <div className="grid md:grid-cols-3 gap-4 mt-6 max-w-4xl mx-auto">
        {[
          { title: "Automate the Routine", desc: "AI handles repetitive tasks" },
          { title: "Smart Suggestions", desc: "Context-aware next actions" },
          { title: "Scale Without Hiring", desc: "Same team, 10× output" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-white/5 rounded-xl p-5 border border-white/10"
          >
            <h4 className="font-semibold text-rose-300 mb-2">{item.title}</h4>
            <p className="text-neutral-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },

  // 6 — AI Won't Replace You
  {
    title: "AI Won't Replace You",
    subtitle: "It Will Empower You",
    accent: "from-yellow-500 to-orange-500",
    icon: <Zap className="w-14 h-14" />,
    content: (
      <div className="max-w-3xl mx-auto mt-6 space-y-6 text-center">
        <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          Every person doing 10× more.
        </p>
        <p className="text-xl text-neutral-400">
          Minimal hiring. Maximum impact per person.
        </p>
      </div>
    ),
  },

  // 7 — Growing Pains
  {
    title: "It Won't Be Smooth",
    subtitle: "And that's OK",
    accent: "from-red-500 to-orange-500",
    icon: <Zap className="w-14 h-14" />,
    content: (
      <div className="flex flex-col items-center gap-8 mt-6 max-w-2xl mx-auto text-center">
        <p className="text-xl text-neutral-300">
          New tools break old habits. There will be friction, mistakes, and
          moments of doubt.
        </p>
        <div className="flex items-center gap-3 text-2xl font-semibold">
          <span className="text-red-400">Awkward at first</span>
          <span className="text-neutral-600">→</span>
          <span className="text-orange-400">Second nature later</span>
        </div>
        <p className="text-lg text-neutral-500">
          Every tool we rely on today was once the &quot;new thing.&quot;
        </p>
      </div>
    ),
  },

  // 8 — Introducing the Makat Agent
  {
    title: "The Makat Agent",
    subtitle: "AI inside the product — growing with us",
    accent: "from-violet-500 to-purple-500",
    icon: <Bot className="w-14 h-14" />,
    content: (
      <div className="grid md:grid-cols-3 gap-4 mt-6 max-w-4xl mx-auto">
        {[
          { phase: "Phase 1", title: "Assist", desc: "Suggest actions, surface data", color: "text-violet-400" },
          { phase: "Phase 2", title: "Automate", desc: "Run workflows with approval", color: "text-purple-400" },
          { phase: "Phase 3", title: "Autonomous", desc: "Act proactively, escalate edge cases", color: "text-fuchsia-400" },
        ].map((item) => (
          <div
            key={item.phase}
            className="bg-white/5 rounded-xl p-5 border border-white/10"
          >
            <p className={`text-sm font-mono ${item.color} mb-1`}>{item.phase}</p>
            <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
            <p className="text-neutral-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },

  // 8 — Q&A
  {
    title: "Q & A",
    accent: "from-indigo-500 to-blue-500",
    icon: <MessageSquare className="w-14 h-14" />,
    content: (
      <div className="flex flex-col items-center gap-4 mt-8">
        <p className="text-xl text-neutral-400">
          Your input shapes where we go.
        </p>
      </div>
    ),
  },
];

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback(
    (next: number) => {
      if (next < 0 || next >= slides.length) return;
      setDirection(next > current ? 1 : -1);
      setCurrent(next);
    },
    [current]
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, goTo]);

  const slide = slides[current];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 600 : -600, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -600 : 600, opacity: 0 }),
  };

  return (
    <div className="relative w-full h-screen flex flex-col overflow-hidden select-none">
      {/* Progress bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-50">
        <motion.div
          className={`h-full bg-gradient-to-r ${slide.accent}`}
          animate={{ width: `${((current + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Slide area */}
      <div className="flex-1 flex items-center justify-center px-8">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial={direction === 0 ? "center" : "enter"}
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="w-full max-w-5xl"
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className={`p-4 rounded-2xl bg-gradient-to-br ${slide.accent} text-white/90`}
              >
                {slide.icon}
              </div>
            </div>

            {/* Title */}
            <h1
              className={`text-5xl md:text-6xl font-bold text-center bg-gradient-to-r ${slide.accent} bg-clip-text text-transparent`}
            >
              {slide.title}
            </h1>

            {slide.subtitle && (
              <h2 className="text-2xl md:text-3xl text-center text-neutral-400 mt-3">
                {slide.subtitle}
              </h2>
            )}

            {/* Content */}
            <div className="mt-8">{slide.content}</div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-8 pb-6">
        <button
          onClick={() => goTo(current - 1)}
          disabled={current === 0}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current
                  ? `bg-gradient-to-r ${slide.accent} scale-125`
                  : "bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          disabled={current === slides.length - 1}
          className="p-2 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
