import React, { useState } from "react";
import Link from "@docusaurus/Link";
import { ArrowRight, Check, Copy } from "lucide-react";
import LiveGraph, { LiveLink, LiveNode } from "./LiveGraph";

const heroNodes: LiveNode[] = [
  { id: 0, label: "d3-graph-react" },
  { id: 1, label: "React 18", cyan: true },
  { id: 2, label: "d3-force" },
  { id: 3, label: "TypeScript", cyan: true },
  { id: 4, label: "Drag me!" },
  { id: 5, label: "Zoom & Pan", cyan: true },
  { id: 6, label: "Custom Nodes" },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
];

const heroLinks: LiveLink[] = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 0, target: 4 },
  { source: 0, target: 5 },
  { source: 0, target: 6 },
  { source: 1, target: 7 },
  { source: 2, target: 8 },
  { source: 2, target: 9 },
  { source: 3, target: 10 },
  { source: 5, target: 11 },
  { source: 6, target: 12 },
  { source: 6, target: 13 },
];

const InstallCommand = () => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText("npm install d3-graph-react").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy install command"
      className="group flex items-center gap-3 rounded-xl border border-slate-700/70 bg-[#0d1019] px-4 py-3 font-mono text-sm text-slate-300 transition hover:border-indigo-400/60 cursor-pointer"
    >
      <span className="select-none text-slate-500">$</span>
      <span>npm install d3-graph-react</span>
      <span className="ml-2 text-slate-500 transition group-hover:text-indigo-300">
        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </span>
    </button>
  );
};

export default function Hero() {
  return (
    <header className="relative overflow-hidden">
      {/* background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full opacity-25"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 65%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-48 right-0 h-[520px] w-[520px] rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 65%)" }}
      />
      <div aria-hidden className="dgr-dot-grid pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-16 lg:grid-cols-2 lg:gap-8 lg:pb-28 lg:pt-24">
        {/* Copy column */}
        <div className="text-center lg:text-left">
          <a
            href="https://www.npmjs.com/package/d3-graph-react"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300 hover:border-indigo-400/60 hover:no-underline"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            v1.3.0 — MIT licensed
          </a>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl xl:text-6xl">
            Force-directed graphs,
            <br />
            <span className="dgr-gradient-text">the React way.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-400 lg:mx-0">
            d3-graph-react wraps the power of <code className="text-indigo-300">d3-force</code> in
            a fully typed React component. Render nodes and links as plain JSX, drag, zoom, and
            animate — without writing a single line of D3.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link className="dgr-btn dgr-btn--primary" to="/docs/QuickStart">
              Get started <ArrowRight size={16} />
            </Link>
            <Link className="dgr-btn dgr-btn--ghost" to="/docs/Playground">
              Open playground
            </Link>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start">
            <InstallCommand />
          </div>
        </div>

        {/* Live graph column */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-slate-700/60 bg-[#0d1019]/80 shadow-[0_24px_80px_rgba(99,102,241,0.18)] backdrop-blur">
            {/* window chrome */}
            <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-slate-500">
                {"<Graph />"} — live, try dragging a node
              </span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <LiveGraph
              nodes={heroNodes}
              links={heroLinks}
              charge={-220}
              linkLength={95}
              className="dgr-dot-grid h-[420px] w-full lg:h-[480px]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
