import React from "react";
import {
  Braces,
  Component,
  MousePointerClick,
  Orbit,
  SlidersHorizontal,
  Workflow,
} from "lucide-react";

const features = [
  {
    icon: Component,
    title: "Nodes are just React components",
    description:
      "Render anything as a node — avatars, cards, badges, charts. If it's JSX, it can live inside your graph. Links too.",
  },
  {
    icon: MousePointerClick,
    title: "Drag, zoom & pan built in",
    description:
      "Smooth d3-powered interactions out of the box. Pinch, scroll, grab — no event wiring, no extra dependencies.",
  },
  {
    icon: SlidersHorizontal,
    title: "Tunable physics",
    description:
      "Shape the layout with simple props: link distance, charge repulsion, and gravity. No d3-force API to learn.",
  },
  {
    icon: Braces,
    title: "TypeScript-first",
    description:
      "Fully generic over your node and link data. Autocomplete and type-safety follow your domain types everywhere.",
  },
  {
    icon: Orbit,
    title: "Ambient motion",
    description:
      "One prop keeps your graph gently floating forever — perfect for dashboards and landing pages that feel alive.",
  },
  {
    icon: Workflow,
    title: "Escape hatch to raw D3",
    description:
      "Need full control? onSimulationCreated hands you the underlying d3-force simulation to extend as you wish.",
  },
];

export default function Features() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-indigo-400">
          Why d3-graph-react
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Everything you need to ship{" "}
          <span className="dgr-gradient-text">interactive graphs</span>
        </h2>
        <p className="mt-4 text-lg text-slate-400">
          The expressiveness of D3, the developer experience of React.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <div key={title} className="dgr-card p-7">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-400/30 bg-indigo-500/10 text-indigo-300">
              <Icon size={22} />
            </div>
            <h3 className="mb-2 text-lg font-bold text-white">{title}</h3>
            <p className="text-[0.95rem] leading-relaxed text-slate-400">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
