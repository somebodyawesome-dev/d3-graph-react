import { D3ZoomEvent } from 'd3-zoom';
import React, { RefObject } from 'react';
import { GraphContainer } from './components/GraphContainer';
import { LinkRenderer } from './components/LinkRenderer';
import { NodeRenderer } from './components/NodeRenderer';
import { useSimulation } from './hooks/useSimulation';
import { useZoom } from './hooks/useZoom';
import './index.css';

export type Node = { id: string | number };
export type Link = { source: number; target: number };
// node type in the simulation
export type NodeType = {
  index: number;
  id: string | number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
};
export const DEFAULT_LINK_LENGTH = 200;
// use this value as default don't pass value direactly into component props
// to prevent unecessary 300 re renders C:
const DEFAULT_ZOOM_SCALE = [0.5, 8] as [number, number];
export type NodeComponentType<N> = React.FC<{ node: N }>;
export type LinkComponentType<L> = React.FC<{
  link: L;
  sourceNode: NodeType;
  sourceNodeRef: RefObject<HTMLDivElement>;
  targetNode: NodeType;
  targetNodeRef: RefObject<HTMLDivElement>;
}>;
export type GraphType<N extends Node = Node, L extends Link = Link> = {
  graph: {
    nodes: N[];
    links: L[];
  };
  NodeComponent?: NodeComponentType<N>;
  LinkComponent?: LinkComponentType<L>;
  zoomScale?: [number, number];
  onZoom?: (d3zoomEven: D3ZoomEvent<SVGElement, unknown>) => any;
  linkForce?: { strength: number; length: number };
  gravityForce?: { strength: number; center_x: number; center_y: number };
  chargeForce?: { strength: number };
  isNodeDraggable?: boolean;
};
export function Graph<N extends Node, L extends Link>({
  graph,
  LinkComponent,
  NodeComponent,
  zoomScale = DEFAULT_ZOOM_SCALE,
  linkForce,
  gravityForce,
  chargeForce,
  isNodeDraggable = true,
  onZoom,
}: GraphType<N, L>) {
  const { nodeRefs, simulationLinks, simulationNodes } = useSimulation({
    graph,
    linkForce,
    gravityForce,
    chargeForce,
    isNodeDraggable,
  });
  useZoom(zoomScale, onZoom);
  const { nodes, links } = graph;

  return (
    <GraphContainer>
      <LinkRenderer links={links} simLinks={simulationLinks} nodeRefs={nodeRefs} LinkComponent={LinkComponent} />
      <NodeRenderer nodes={nodes} simNodes={simulationNodes} nodeRefs={nodeRefs} NodeComponent={NodeComponent} />
    </GraphContainer>
  );
}

export default Graph;
