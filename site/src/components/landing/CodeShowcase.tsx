import React from "react";
import Link from "@docusaurus/Link";
import CodeBlock from "@theme/CodeBlock";
import { ArrowRight } from "lucide-react";
import LiveGraph, { LiveLink, LiveNode } from "./LiveGraph";

const exampleCode = `import { Graph } from "d3-graph-react";

const team = {
  nodes: [
    { id: 1, name: "Design" },
    { id: 2, name: "Frontend" },
    { id: 3, name: "Backend" },
    { id: 4, name: "Data" },
  ],
  links: [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
  ],
};

export const TeamGraph = () => (
  <Graph
    graph={team}
    chargeForce={{ strength: -200 }}
    NodeComponent={({ node }) => (
      <span className="pill">{node.name}</span>
    )}
  />
);`;

const demoNodes: LiveNode[] = [
  { id: 1, label: "Design" },
  { id: 2, label: "Frontend", cyan: true },
  { id: 3, label: "Backend" },
  { id: 4, label: "Data", cyan: true },
];

const demoLinks: LiveLink[] = [
  { source: 0, target: 1 },
  { source: 1, target: 2 },
  { source: 2, target: 3 },
];

export default function CodeShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-slate-800/70 bg-[#0d1019]/60 py-20 lg:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #a78bfa 0%, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
            Show me the code
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            From data to graph in <span className="dgr-gradient-text">under a minute</span>
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Pass nodes and links, style them with your own components. That's the whole API.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2">
          <div className="showcase-code text-left [&_pre]:!mb-0 [&_.theme-code-block]:h-full [&_.theme-code-block]:!mb-0">
            <CodeBlock language="tsx" title="TeamGraph.tsx">
              {exampleCode}
            </CodeBlock>
          </div>

          <div className="flex flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1019]">
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-2.5">
              <span className="font-mono text-xs text-slate-500">Result</span>
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Live
              </span>
            </div>
            <LiveGraph
              nodes={demoNodes}
              links={demoLinks}
              charge={-250}
              linkLength={120}
              className="dgr-dot-grid min-h-[360px] w-full flex-1"
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link className="dgr-btn dgr-btn--ghost" to="/docs/QuickStart">
            Follow the quick start <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
