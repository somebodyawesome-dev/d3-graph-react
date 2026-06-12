import React, { useEffect, useMemo, useRef, useState } from "react";
import { Graph } from "d3-graph-react";
import { forceCollide, forceX, forceY } from "d3-force";
import { characters, relationships } from "../examples/theoffice/theoffice";
import {
  nodes as departmentNodes,
  links as departmentLinks,
  DepartmentNode,
} from "../examples/department";
import CharacterNode from "../examples/theoffice/CharacterNode";
import { Slider, Toggle } from "./demos/DemoShell";

const CustomLink = ({ sourceNode, sourceNodeRef, targetNode, targetNodeRef, link }: any) => {
  if (!sourceNode || !targetNode || !sourceNodeRef?.current || !targetNodeRef?.current)
    return null;

  const { offsetWidth: sw, offsetHeight: sh } = sourceNodeRef.current;
  const { offsetWidth: tw, offsetHeight: th } = targetNodeRef.current;

  return (
    <path
      d={`M ${sourceNode.x + sw / 2},${sourceNode.y + sh / 2}
          L ${targetNode.x + tw / 2} ${targetNode.y + th / 2}`}
      stroke={link?.color || "gray"}
      strokeWidth={2}
      strokeDasharray={link?.type === "Hookup/Fling" ? "5,3" : undefined}
      fill="none"
    />
  );
};

const officeLegend = [
  { color: "#e91e63", label: "Married" },
  { color: "#2196f3", label: "Engaged" },
  { color: "#4caf50", label: "Dated" },
  { color: "#ff9800", label: "Hookup / Fling" },
];

// tuned per dataset: character portraits are 70px circles, department
// bubbles go up to ~180px wide
const DATASET_TUNING = {
  theoffice: {
    linkLength: 140, linkStrength: 0.5, gravityStrength: 0.1,
    chargeStrength: -60, collideRadius: 48,
  },
  department: {
    linkLength: 190, linkStrength: 0.8, gravityStrength: 0.1,
    chargeStrength: -300, collideRadius: 85,
  },
} as const;

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h4 className="mb-3 mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500 first:mt-0">
    {children}
  </h4>
);

function Playground() {
  const [selectedExample, setSelectedExample] =
    useState<keyof typeof DATASET_TUNING>("theoffice");
  const [zoomMin, setZoomMin] = useState(0.5);
  const [zoomMax, setZoomMax] = useState(8);
  const [draggable, setDraggable] = useState(true);
  const [linkLength, setLinkLength] = useState(DATASET_TUNING.theoffice.linkLength);
  const [linkStrength, setLinkStrength] = useState(DATASET_TUNING.theoffice.linkStrength);
  const [gravityStrength, setGravityStrength] = useState(
    DATASET_TUNING.theoffice.gravityStrength
  );
  const [chargeStrength, setChargeStrength] = useState(
    DATASET_TUNING.theoffice.chargeStrength
  );

  const switchExample = (value: keyof typeof DATASET_TUNING) => {
    setSelectedExample(value);
    const tuning = DATASET_TUNING[value];
    setLinkLength(tuning.linkLength);
    setLinkStrength(tuning.linkStrength);
    setGravityStrength(tuning.gravityStrength);
    setChargeStrength(tuning.chargeStrength);
  };

  // keep the gravity center in the middle of the viewport at any size
  const viewportRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<[number, number]>([350, 280]);
  const centerRef = useRef(center);
  centerRef.current = center;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setCenter([el.clientWidth / 2, el.clientHeight / 2]);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const indexedCharacters = useMemo(
    () => characters.map((char, index) => ({ ...char, index })),
    []
  );

  const indexedRelationships = useMemo(
    () =>
      relationships
        .map((relation) => {
          const sourceIndex = characters.findIndex((c) => c.id === relation.source);
          const targetIndex = characters.findIndex((c) => c.id === relation.target);
          if (sourceIndex === -1 || targetIndex === -1) return null;
          return {
            source: sourceIndex,
            target: targetIndex,
            color: relation.color,
            type: relation.type,
          };
        })
        .filter(Boolean),
    []
  );

  const example = useMemo(() => {
    if (selectedExample === "department") {
      return {
        graph: {
          nodes: departmentNodes.map((node) => ({ ...node, image: "" })),
          links: departmentLinks,
        },
        NodeComponent: DepartmentNode,
        LinkComponent: undefined,
      };
    }
    return {
      graph: { nodes: indexedCharacters, links: indexedRelationships },
      NodeComponent: CharacterNode,
      LinkComponent: CustomLink,
    };
  }, [selectedExample, indexedCharacters, indexedRelationships]);

  return (
    <div className="my-6 flex flex-col overflow-hidden rounded-xl border border-slate-700/60 bg-[#0d1019] lg:flex-row">
      {/* Controls panel */}
      {/* no w-full here: the library's bundled CSS also defines .w-full and can
          load after ours, overriding the lg:w-80 — column children stretch anyway */}
      <div className="flex flex-col border-b border-slate-800 px-5 py-5 lg:w-80 lg:shrink-0 lg:border-b-0 lg:border-r">
        <SectionTitle>Dataset</SectionTitle>
        <select
          className="w-full cursor-pointer rounded-lg border border-slate-700 bg-[#11141d] px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-indigo-400/60"
          value={selectedExample}
          onChange={(e) => switchExample(e.target.value as keyof typeof DATASET_TUNING)}
        >
          <option value="theoffice">Romances in The Office</option>
          <option value="department">Agile organization</option>
        </select>

        <SectionTitle>Interaction</SectionTitle>
        <Toggle label="Draggable nodes" checked={draggable} onChange={setDraggable} />

        <SectionTitle>Zoom</SectionTitle>
        <div className="flex flex-col gap-4">
          <Slider label="min zoom" value={zoomMin} min={0.1} max={1} step={0.1} onChange={setZoomMin} />
          <Slider label="max zoom" value={zoomMax} min={1} max={12} step={0.5} onChange={setZoomMax} />
        </div>

        <SectionTitle>Forces</SectionTitle>
        <div className="flex flex-col gap-4">
          <Slider label="link length" value={linkLength} min={30} max={400} step={10} onChange={setLinkLength} />
          <Slider label="link strength" value={linkStrength} min={0} max={2} step={0.1} onChange={setLinkStrength} />
          <Slider label="gravity strength" value={gravityStrength} min={0} max={0.3} step={0.01} onChange={setGravityStrength} />
          <Slider label="charge strength" value={chargeStrength} min={-500} max={50} step={10} onChange={setChargeStrength} />
        </div>

        {selectedExample === "theoffice" && (
          <>
            <SectionTitle>Legend</SectionTitle>
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {officeLegend.map(({ color, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-slate-300">
                  <span
                    className="inline-block h-3 w-3 rounded-sm"
                    style={{ backgroundColor: color }}
                  />
                  {label}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Graph viewport */}
      <div ref={viewportRef} className="dgr-dot-grid flex h-[70dvh] w-full">
        <Graph
          key={selectedExample}
          containerId="playground-graph"
          graph={example.graph}
          isNodeDraggable={draggable}
          linkForce={{ length: linkLength, strength: linkStrength }}
          zoomScale={[zoomMin, zoomMax]}
          gravityForce={{ center_x: center[0], center_y: center[1], strength: gravityStrength }}
          chargeForce={{ strength: chargeStrength }}
          NodeComponent={example.NodeComponent}
          LinkComponent={example.LinkComponent}
          onSimulationCreated={(simulation) => {
            const [cx, cy] = centerRef.current;
            const tuning = DATASET_TUNING[selectedExample];
            // keep nodes from overlapping — the props don't expose a
            // collision force, so register it on the raw simulation
            simulation.force("collide", forceCollide(tuning.collideRadius) as any);
            // gravityForce (forceCenter) only recenters the mean, so charge
            // would push the disconnected clusters offscreen; forceX/forceY
            // actually pull every node back toward the middle
            simulation.force("x", forceX(cx).strength(0.06) as any);
            simulation.force("y", forceY(cy).strength(0.06) as any);
            // scatter initial positions in a spiral around the center so the
            // graph doesn't fly in from the top-left corner
            const simNodes = simulation.nodes();
            simNodes.forEach((node: any, index: number) => {
              const angle = index * 2.4; // golden angle, evenly fills the disc
              const radius = 30 + 26 * Math.sqrt(index);
              node.x = cx + Math.cos(angle) * radius;
              node.y = cy + Math.sin(angle) * radius;
            });
          }}
        />
      </div>
    </div>
  );
}

export default Playground;
