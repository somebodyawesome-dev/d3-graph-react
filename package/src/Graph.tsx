import { drag as d3Drag } from 'd3-drag';
import { Simulation, SimulationLinkDatum, forceCenter, forceLink, forceManyBody, forceSimulation } from 'd3-force';
import { select as d3Select } from 'd3-selection';
import { D3ZoomEvent } from 'd3-zoom';
import { isEmpty } from 'lodash-es';
import React, { ReactNode, RefObject, createRef, forwardRef, useEffect, useReducer, useRef, useState } from 'react';
import { useZoom } from './hooks/useZoom';
import './index.css';
import { useAwesomeEffect } from './useAwesomeEffect';

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
  // NodeComponent?: (node: N) => React.JSX.Element;
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
  const [, forceUpdate] = useReducer((x) => !x, false);
  const { nodes, links } = graph;
  // init simulation
  // use refrence to prevents re assignment to simulation
  // dont change to state because simulation is constant

  const [simulation, setSimulation] = useState<Simulation<NodeType, SimulationLinkDatum<NodeType>> | null>(null);
  const [simulationNodes, setSimulationNodes] = useState<NodeType[]>([]);
  const [simulationLinks, setSimulationLinks] = useState<SimulationLinkDatum<NodeType>[]>([]);
  // create array of reference  to hold nodes references
  const refHolder = useRef(nodes.map((_) => createRef<HTMLDivElement>()));
  const { current: nodeRefs } = refHolder;
  useZoom(zoomScale, onZoom);
  // init drag events

  useEffect(() => {
    const customNodeDrag = d3Drag<SVGGElement, NodeType>();
    const selector = d3Select('#container').select<SVGElement>('svg').selectAll<SVGGElement, NodeType>('.node');
    const graphNodeDragConfig = () => {
      if (!simulation) return;
      customNodeDrag
        .on('start', (ev) => {
          if (!ev.active) simulation.alphaTarget(0.3).restart();
        })
        .on('drag', (ev, d) => {
          const draggedNode = simulationNodes[d.index];
          const { x, y } = ev;
          draggedNode.x = x; // x - subject.x;
          draggedNode.y = y; // y - subject.y;
          draggedNode.fx = draggedNode.x;
          draggedNode.fy = draggedNode.y;
          setSimulationNodes([...simulationNodes]);
        })
        .on('end', (ev, d) => {
          if (!ev.active) simulation.alphaTarget(0);
          const draggedNode = simulationNodes[d.index];
          draggedNode.fx = undefined;
          draggedNode.fy = undefined;
          setSimulationNodes([...simulationNodes]);
        });

      selector.data(simulationNodes).call(customNodeDrag);
    };
    const clearNodeDragConfig = () => {
      selector.on('mousedown.drag', null);
    };

    if (isNodeDraggable) graphNodeDragConfig();

    return () => {
      clearNodeDragConfig();
    };
  }, [isNodeDraggable, simulationNodes]);
  useEffect(() => {
    if (!simulation) return;
    if (!chargeForce) {
      simulation.force('charge', null);
      return;
    }
    simulation.force('charge', forceManyBody().strength(chargeForce.strength));
    simulation.alphaTarget(0.3).restart();
    return () => {
      simulation.force('charge', null);
    };
  }, [simulation, chargeForce]);
  useEffect(() => {
    if (!simulation) return;
    if (!gravityForce) {
      simulation.force('center', null);
      return;
    }
    simulation.force(
      'center',
      forceCenter(gravityForce.center_x, gravityForce.center_y).strength(gravityForce.strength),
    );
    simulation.alphaTarget(0.3).restart();
    return () => {
      simulation.force('center', null);
    };
  }, [simulation, gravityForce]);
  useEffect(() => {
    if (!simulation) return;
    if (!linkForce) {
      simulation.force('link', null);
      return;
    }

    simulation.nodes(simulationNodes).force(
      'link',
      forceLink<NodeType, SimulationLinkDatum<NodeType>>()
        .id((d) => d.index)
        .strength(linkForce.strength)
        .distance(linkForce.length)
        .links(simulationLinks),
    );

    // simulation.alpha(1).restart();

    simulation.alphaTarget(0.3).restart();
    return () => {
      simulation.force('link', null);
    };
  }, [simulation, linkForce, simulationNodes, simulationLinks]);
  // init zoom events

  useAwesomeEffect(() => {
    // map inputs to simulation nodes
    // give nodes different coordination to prevent explosion
    const simNodes = nodes.map((_, index) => {
      return { index, id: index, x: index * 5, y: index * 0, vx: 0, vy: 0 };
    });
    setSimulationNodes(simNodes);
    // map inputs to simulation links
    setSimulationLinks(
      links.map((val) => {
        return { ...val };
      }),
    );

    refHolder.current = nodes.map((_) => createRef<HTMLDivElement>());

    setSimulation(
      forceSimulation<NodeType, SimulationLinkDatum<NodeType>>()
        .nodes(simNodes)
        .on('tick', () => {
          // force re render of component because d3.js is not suited for react
          // and interanlly d3.js is changing states value every tick
          forceUpdate();
        }),
    );
  }, [graph]);

  return (
    <div id="container" className="w-full flex">
      <svg className="w-full min-h-full">
        <defs>
          <marker
            id="arrowhead"
            viewBox="-0 -5 10 10"
            refX={DEFAULT_LINK_LENGTH / 2 - 15}
            refY={0}
            orient={'auto'}
            markerWidth={13}
            markerHeight={13}
          >
            <path fill="#999" stroke="none" d="M 0,-5 L 10 ,0 L 0,5"></path>
          </marker>
        </defs>
        <g>
          {simulationLinks.map((val, index) => {
            const link = links[index];
            const sourceNode = val.source as NodeType;
            const targetNode = val.target as NodeType;

            const sourceNodeRef = nodeRefs.at(sourceNode.index);
            const targetNodeRef = nodeRefs.at(targetNode.index);
            if (!sourceNodeRef || !targetNodeRef) return null;
            return LinkComponent ? (
              <LinkComponent
                link={link}
                key={`link-${index}`}
                sourceNode={sourceNode}
                sourceNodeRef={sourceNodeRef}
                targetNode={targetNode}
                targetNodeRef={targetNodeRef}
              />
            ) : (
              <DefaultLinkComponent
                key={`links-${index}`}
                sourceNode={sourceNode}
                sourceNodeRef={sourceNodeRef}
                targetNode={targetNode}
                targetNodeRef={targetNodeRef}
              />
            );
          })}
          {simulationNodes.map((val, index) => {
            // TODO: add custom component
            const node = nodes[val.index];

            return (
              <ForignObjectWrapper key={`node-${index}`} ref={nodeRefs[index]} node={val}>
                {NodeComponent && <NodeComponent node={node} />}
              </ForignObjectWrapper>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
const ForignObjectWrapper = forwardRef<HTMLDivElement, { children?: ReactNode; node: NodeType }>(
  ({ children, node: { x, y } }, ref) => {
    return (
      <g
        className="node"
        // cx={85} cy={32}
        transform={`translate(${x},${y})`}
      >
        <foreignObject x="0" y="0" className="w-fit h-fit overflow-visible">
          <div className="w-min flex" ref={ref}>
            {children ?? <DefaultNodeComponent name="Node" />}
          </div>
        </foreignObject>
      </g>
    );
  },
);
const DefaultLinkComponent = ({
  sourceNode,
  sourceNodeRef,
  targetNode,
  targetNodeRef,
}: {
  sourceNode: NodeType;
  sourceNodeRef: RefObject<HTMLDivElement>;
  targetNode: NodeType;
  targetNodeRef: RefObject<HTMLDivElement>;
}) => {
  if (isEmpty(sourceNode) || isEmpty(targetNode) || isEmpty(sourceNodeRef.current) || isEmpty(targetNodeRef.current))
    return null;
  const { offsetWidth: sourceOffsetWidth, offsetHeight: sourceOffsetHeight } = sourceNodeRef.current;
  const { offsetWidth: targetOffsetWidth, offsetHeight: targetOffsetHeight } = targetNodeRef.current;
  return (
    <path
      className="link"
      fill="none"
      markerEnd="url(#arrowhead)"
      d={`M ${sourceNode.x + sourceOffsetWidth / 2},${sourceNode.y + sourceOffsetHeight / 2} L ${
        targetNode.x + targetOffsetWidth / 2
      } ${targetNode.y + targetOffsetHeight / 2}`}
      // strokeLinecap="butt"
      stroke={'gray'}
      strokeWidth={1}
    ></path>
  );
};

const DefaultNodeComponent = (params: { name: string }) => {
  const { name } = params;
  return (
    <div className="bg-white border-4 whitespace-  border-solid border-gray-300 rounded-xl px-2 min-w-[100px] min-h-[50px] flex justify-center items-center">
      <h1 className=" font-bold text-gray-600 text-sm text-center">{name}</h1>
    </div>
  );
};

export default Graph;
