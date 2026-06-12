import React, { useMemo, useRef, useState } from "react";
import LiveGraph, { LiveLink, LiveNode } from "../landing/LiveGraph";
import { DemoButton, DemoShell, Slider, Toggle } from "./DemoShell";

/* ------------------------------------------------------------------ */
/* Shared sample data                                                  */
/* ------------------------------------------------------------------ */

const clusterNodes: LiveNode[] = [
  { id: 0, label: "Hub" },
  { id: 1, label: "Alpha", cyan: true },
  { id: 2, label: "Beta" },
  { id: 3, label: "Gamma", cyan: true },
  { id: 4, label: "Delta" },
  { id: 5, label: "Epsilon", cyan: true },
];

const clusterLinks: LiveLink[] = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 0, target: 4 },
  { source: 0, target: 5 },
  { source: 1, target: 2 },
  { source: 3, target: 4 },
];

/* ------------------------------------------------------------------ */
/* graph / overview                                                    */
/* ------------------------------------------------------------------ */

export function BasicGraphDemo() {
  const [draggable, setDraggable] = useState(true);
  const graphProps = useMemo(() => ({ isNodeDraggable: draggable }), [draggable]);

  return (
    <DemoShell
      title="<Graph graph={{ nodes, links }} />"
      controls={
        <Toggle label="isNodeDraggable" checked={draggable} onChange={setDraggable} />
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={-220}
        graphProps={graphProps}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/* NodeComponent                                                       */
/* ------------------------------------------------------------------ */

const people = [
  { id: 0, name: "Ava Chen", role: "Engineering Lead", color: "#818cf8" },
  { id: 1, name: "Liam Park", role: "Frontend", color: "#22d3ee" },
  { id: 2, name: "Mia Torres", role: "Design", color: "#a78bfa" },
  { id: 3, name: "Noah Smith", role: "Backend", color: "#34d399" },
  { id: 4, name: "Zoe Adams", role: "Data", color: "#fbbf24" },
];

const peopleLinks: LiveLink[] = [
  { source: 0, target: 1 },
  { source: 0, target: 2 },
  { source: 0, target: 3 },
  { source: 3, target: 4 },
];

const PersonNode = ({ node }: { node: any }) => (
  <div
    className="flex items-center gap-2.5 rounded-xl border bg-[#11141d] px-3 py-2 shadow-lg"
    style={{ borderColor: `${node.color}66`, cursor: "grab" }}
  >
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#0a0c12]"
      style={{ background: node.color }}
    >
      {node.name
        .split(" ")
        .map((w: string) => w[0])
        .join("")}
    </span>
    <span className="flex flex-col leading-tight">
      <span className="whitespace-nowrap text-xs font-bold text-white">{node.name}</span>
      <span className="whitespace-nowrap text-[10px] text-slate-400">{node.role}</span>
    </span>
  </div>
);

export function NodeComponentDemo() {
  const graphProps = useMemo(() => ({ NodeComponent: PersonNode }), []);
  return (
    <DemoShell title="NodeComponent={PersonCard}" height={400}>
      <LiveGraph
        nodes={people as any}
        links={peopleLinks}
        charge={-450}
        linkLength={140}
        graphProps={graphProps}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/* LinkComponent                                                       */
/* ------------------------------------------------------------------ */

const wireNodes: LiveNode[] = [
  { id: 0, label: "API" },
  { id: 1, label: "Web", cyan: true },
  { id: 2, label: "Mobile", cyan: true },
  { id: 3, label: "Cache" },
  { id: 4, label: "Queue" },
];

const wireLinks = [
  { source: 0, target: 1, kind: "http" },
  { source: 0, target: 2, kind: "http" },
  { source: 0, target: 3, kind: "internal" },
  { source: 0, target: 4, kind: "async" },
] as any[];

const linkStyles: Record<string, { stroke: string; dash?: string }> = {
  http: { stroke: "#818cf8" },
  internal: { stroke: "#34d399" },
  async: { stroke: "#fbbf24", dash: "6,4" },
};

const WireLink = ({ link, sourceNode, sourceNodeRef, targetNode, targetNodeRef }: any) => {
  if (!sourceNode || !targetNode || !sourceNodeRef?.current || !targetNodeRef?.current)
    return null;
  const { offsetWidth: sw, offsetHeight: sh } = sourceNodeRef.current;
  const { offsetWidth: tw, offsetHeight: th } = targetNodeRef.current;
  const style = linkStyles[link.kind] ?? linkStyles.http;
  return (
    <line
      x1={sourceNode.x + sw / 2}
      y1={sourceNode.y + sh / 2}
      x2={targetNode.x + tw / 2}
      y2={targetNode.y + th / 2}
      stroke={style.stroke}
      strokeWidth={2}
      strokeDasharray={style.dash}
      opacity={0.8}
    />
  );
};

const LegendSwatch = ({ color, label, dashed }: { color: string; label: string; dashed?: boolean }) => (
  <span className="flex items-center gap-1.5 text-xs text-slate-300">
    <svg width="22" height="6">
      <line
        x1="0"
        y1="3"
        x2="22"
        y2="3"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={dashed ? "5,3" : undefined}
      />
    </svg>
    {label}
  </span>
);

export function LinkComponentDemo() {
  const graphProps = useMemo(() => ({ LinkComponent: WireLink }), []);
  return (
    <DemoShell
      title="LinkComponent={WireLink}"
      controls={
        <>
          <LegendSwatch color="#818cf8" label="HTTP" />
          <LegendSwatch color="#34d399" label="Internal" />
          <LegendSwatch color="#fbbf24" label="Async" dashed />
        </>
      }
    >
      <LiveGraph
        nodes={wireNodes}
        links={wireLinks}
        charge={-350}
        linkLength={130}
        graphProps={graphProps}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/* zoomScale + onZoom                                                  */
/* ------------------------------------------------------------------ */

export function ZoomScaleDemo() {
  const [min, setMin] = useState(0.5);
  const [max, setMax] = useState(4);
  const [zoom, setZoom] = useState(1);

  const graphProps = useMemo(
    () => ({
      zoomScale: [min, max] as [number, number],
      onZoom: (event: any) => setZoom(event.transform.k),
    }),
    [min, max]
  );

  return (
    <DemoShell
      title="zoomScale={[min, max]} — scroll or pinch inside the frame"
      controls={
        <>
          <Slider label="min zoom" value={min} min={0.1} max={1} step={0.1} onChange={setMin} />
          <Slider label="max zoom" value={max} min={1} max={10} step={0.5} onChange={setMax} />
          <span className="text-xs font-semibold text-slate-300">
            current zoom{" "}
            <code className="rounded bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[11px] text-cyan-300">
              {zoom.toFixed(2)}×
            </code>
          </span>
        </>
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={-220}
        graphProps={graphProps}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/* Forces                                                              */
/* ------------------------------------------------------------------ */

export function LinkForceDemo() {
  const [length, setLength] = useState(110);
  const [strength, setStrength] = useState(0.6);

  return (
    <DemoShell
      title="linkForce={{ length, strength }}"
      controls={
        <>
          <Slider label="length" value={length} min={30} max={300} step={10} onChange={setLength} />
          <Slider label="strength" value={strength} min={0} max={2} step={0.1} onChange={setStrength} />
        </>
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={-180}
        linkLength={length}
        linkStrength={strength}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

export function GravityForceDemo() {
  const [strength, setStrength] = useState(0.07);

  return (
    <DemoShell
      title="gravityForce={{ strength, center_x, center_y }}"
      controls={
        <Slider label="strength" value={strength} min={0} max={0.3} step={0.01} onChange={setStrength} />
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={-220}
        gravityStrength={strength}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

export function ChargeForceDemo() {
  const [strength, setStrength] = useState(-200);

  return (
    <DemoShell
      title="chargeForce={{ strength }}"
      controls={
        <Slider label="strength" value={strength} min={-500} max={50} step={10} onChange={setStrength} />
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={strength}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/* ambientAlphaTarget                                                  */
/* ------------------------------------------------------------------ */

export function AmbientAlphaTargetDemo() {
  const [ambient, setAmbient] = useState(0.05);

  return (
    <DemoShell
      title="ambientAlphaTarget={value} — 0 settles, higher floats"
      controls={
        <Slider label="ambientAlphaTarget" value={ambient} min={0} max={0.15} step={0.01} onChange={setAmbient} />
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={-220}
        ambient={ambient}
        className="h-full w-full"
      />
    </DemoShell>
  );
}

/* ------------------------------------------------------------------ */
/* onSimulationCreated                                                 */
/* ------------------------------------------------------------------ */

export function SimulationDemo() {
  const simRef = useRef<any>(null);
  const [alpha, setAlpha] = useState(1);

  const graphProps = useMemo(
    () => ({
      onSimulationCreated: (simulation: any) => {
        simRef.current = simulation;
        // namespaced listener so the library's own tick handler is untouched
        simulation.on("tick.demo", () => setAlpha(simulation.alpha()));
      },
    }),
    []
  );

  return (
    <DemoShell
      title="onSimulationCreated={(simulation) => ...}"
      controls={
        <>
          <DemoButton onClick={() => simRef.current?.alpha(1).restart()}>
            Reheat — alpha(1).restart()
          </DemoButton>
          <DemoButton onClick={() => simRef.current?.stop()}>Freeze — stop()</DemoButton>
          <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            alpha
            <span className="h-1.5 w-28 overflow-hidden rounded-full bg-slate-700">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 transition-[width]"
                style={{ width: `${Math.min(alpha, 1) * 100}%` }}
              />
            </span>
            <code className="rounded bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[11px] text-indigo-300">
              {alpha.toFixed(3)}
            </code>
          </span>
        </>
      }
    >
      <LiveGraph
        nodes={clusterNodes}
        links={clusterLinks}
        charge={-220}
        ambient={0}
        graphProps={graphProps}
        className="h-full w-full"
      />
    </DemoShell>
  );
}
