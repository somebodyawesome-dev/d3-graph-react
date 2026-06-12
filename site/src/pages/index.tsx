import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import { ArrowRight, Github } from "lucide-react";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import CodeShowcase from "../components/landing/CodeShowcase";

const CtaBand = () => (
  <section className="mx-auto max-w-7xl px-6 py-20 lg:py-24">
    <div className="relative overflow-hidden rounded-3xl border border-indigo-400/25 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-cyan-500/15 px-8 py-16 text-center">
      <div aria-hidden className="dgr-dot-grid pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative">
        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Ready to map your data?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
          Install the package, paste the quick start, and watch your first force-directed graph
          come to life in minutes.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link className="dgr-btn dgr-btn--primary" to="/docs/QuickStart">
            Get started <ArrowRight size={16} />
          </Link>
          <Link
            className="dgr-btn dgr-btn--ghost"
            href="https://github.com/somebodyawesome-dev/d3-graph-react"
          >
            <Github size={16} /> Star on GitHub
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default function Home() {
  return (
    <Layout
      title="Force-directed graphs for React"
      description="d3-graph-react wraps d3-force in a fully typed React component. Render nodes and links as JSX, with drag, zoom and tunable physics built in."
    >
      <Hero />
      <main>
        <Features />
        <CodeShowcase />
        <CtaBand />
      </main>
    </Layout>
  );
}
