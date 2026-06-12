import React, { useEffect, useMemo, useRef, useState } from "react";
import { Graph } from "d3-graph-react";

export type LiveNode = {
  id: number;
  label?: string;
  cyan?: boolean;
};

export type LiveLink = { source: number; target: number };

const GraphNode = ({ node }: { node: LiveNode }) =>
  node.label ? (
    <div className={`dgr-node ${node.cyan ? "dgr-node--cyan" : ""}`}>
      <span className="dgr-node__dot" />
      {node.label}
    </div>
  ) : (
    <div
      style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "rgba(148, 163, 184, 0.55)",
        boxShadow: "0 0 8px rgba(148, 163, 184, 0.45)",
      }}
    />
  );

const GraphLink = ({
  sourceNode,
  sourceNodeRef,
  targetNode,
  targetNodeRef,
}: any) => {
  if (
    !sourceNode ||
    !targetNode ||
    !sourceNodeRef?.current ||
    !targetNodeRef?.current
  )
    return null;
  const { offsetWidth: sw, offsetHeight: sh } = sourceNodeRef.current;
  const { offsetWidth: tw, offsetHeight: th } = targetNodeRef.current;
  return (
    <line
      x1={sourceNode.x + sw / 2}
      y1={sourceNode.y + sh / 2}
      x2={targetNode.x + tw / 2}
      y2={targetNode.y + th / 2}
      stroke="rgba(129, 140, 248, 0.35)"
      strokeWidth={1.25}
    />
  );
};

type LiveGraphProps = {
  nodes: LiveNode[];
  links: LiveLink[];
  className?: string;
  charge?: number;
  linkLength?: number;
  linkStrength?: number;
  gravityStrength?: number;
  ambient?: number;
  /** Extra props forwarded verbatim to <Graph /> — memoize object values. */
  graphProps?: Record<string, any>;
};

/**
 * Self-measuring live graph: keeps the simulation's gravity centered on the
 * container regardless of its rendered size, and only mounts the graph on the
 * client once dimensions are known.
 */
export default function LiveGraph({
  nodes,
  links,
  className,
  charge = -120,
  linkLength = 110,
  linkStrength = 0.6,
  gravityStrength = 0.07,
  ambient = 0.04,
  graphProps,
}: LiveGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const centerRef = useRef(center);
  centerRef.current = center;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () =>
      setCenter([el.clientWidth / 2, el.clientHeight / 2]);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { onSimulationCreated: userOnSimulationCreated, ...restGraphProps } =
    graphProps ?? {};

  // the library seeds nodes near the origin; scatter them around the
  // container center instead so the graph never flies in from a corner
  const handleSimulationCreated = useMemo(
    () => (simulation: any) => {
      const [cx, cy] = centerRef.current ?? [0, 0];
      const simNodes = simulation.nodes();
      simNodes.forEach((node: any, index: number) => {
        const angle = (index / Math.max(simNodes.length, 1)) * 2 * Math.PI;
        const radius = 80 + (index % 4) * 55;
        node.x = cx + Math.cos(angle) * radius;
        node.y = cy + Math.sin(angle) * radius;
      });
      userOnSimulationCreated?.(simulation);
    },
    [userOnSimulationCreated]
  );

  const graph = useMemo(() => ({ nodes, links }), [nodes, links]);
  const gravity = useMemo(
    () =>
      center
        ? { strength: gravityStrength, center_x: center[0], center_y: center[1] }
        : undefined,
    [center?.[0], center?.[1], gravityStrength]
  );
  const chargeForce = useMemo(() => ({ strength: charge }), [charge]);
  const linkForce = useMemo(
    () => ({ strength: linkStrength, length: linkLength }),
    [linkLength, linkStrength]
  );

  return (
    <div ref={containerRef} className={className} style={{ display: "flex" }}>
      {gravity && (
        <Graph
          graph={graph}
          NodeComponent={GraphNode}
          LinkComponent={GraphLink}
          chargeForce={chargeForce}
          linkForce={linkForce}
          gravityForce={gravity}
          ambientAlphaTarget={ambient}
          zoomScale={[0.4, 4]}
          onSimulationCreated={handleSimulationCreated}
          {...restGraphProps}
        />
      )}
    </div>
  );
}
