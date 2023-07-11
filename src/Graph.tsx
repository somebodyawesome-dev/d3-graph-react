import React, { RefObject, createRef, forwardRef, useEffect, useReducer, useRef, useState } from 'react';
import { drag as d3Drag } from 'd3-drag';
import { ForceLink, SimulationLinkDatum, forceLink, forceCenter, forceManyBody, forceSimulation } from 'd3-force';
import { select as d3Select, selectAll as d3SelectAll } from 'd3-selection';
import { zoom as d3Zoom } from 'd3-zoom';
import { isEmpty } from 'lodash-es';

// component inputs
export type GraphProps = {
  nodes: { title: string; isTopic: boolean }[];
  links: { from: number; to: number }[];
};

export type Node = {};
export type Link = { source: number; target: number };
// node type in the simulation
type NodeType = {
  index: number;
  id: string | number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
};
// links type in simulation
type LinkType = {
  source: number;
  target: number;
};

const DEFAULT_LINK_LENGTH = 200;
const DEFAULT_LINK_FORCE_STRENGTH = 1;
const DEFAULT_REPULSION_FORCE = -200;
const DEFAULT_CENTER_FORCE = 1;
const DEFAULT_CENTER_X = 400;
const DEFAULT_CENTER_Y = 400;
export type GraphType<N extends Node, L extends Link> = {
  graph: {
    nodes: N[];
    links: L[];
  };
  // NodeComponent?: (node: N) => React.JSX.Element;
  NodeComponent?: React.FC<{ node: N }>;
};
export function Graph<N extends Node, L extends Link>({ graph, NodeComponent }: GraphType<N, L>) {
  const { nodes, links } = graph;
  const [, forceUpdate] = useReducer((x) => !x, false);
  // init simulation
  // use refrence to prevents re assignment to simulation
  // dont change to state because simulation is constant
  const { current: simulation } = useRef(
    forceSimulation()
      // repulsion force
      .force('charge', forceManyBody().strength(DEFAULT_REPULSION_FORCE))
      // link force
      .force(
        'link',
        forceLink<NodeType, LinkType>()
          .id((d) => d.index)
          .strength(DEFAULT_LINK_FORCE_STRENGTH)
          .distance(DEFAULT_LINK_LENGTH)
          .links([]),
      )
      // gravity force
      .force('center', forceCenter(DEFAULT_CENTER_X, DEFAULT_CENTER_Y).strength(DEFAULT_CENTER_FORCE)),
  );
  const [simulationNodes, setSimulationNodes] = useState<NodeType[]>([]);
  const [simulationLinks, setSimulationLinks] = useState<SimulationLinkDatum<NodeType>[]>([]);
  // create array of reference  to hold nodes references
  const refHolder = useRef(nodes.map((_) => createRef<HTMLDivElement>()));
  const { current: nodeRefs } = refHolder;

  // init zoom events
  const zoomConfig = () => {
    // onZoom change scale of all elements
    const onZoom = (d3Event: any) => {
      const transform = d3Event.transform;
      d3SelectAll(`#microservice-workflow`).select<SVGElement>('svg').select('g').attr('transform', transform);
    };
    const selector = d3Select('#microservice-workflow').select<SVGElement>('svg');
    const zoomObject = d3Zoom<SVGElement, unknown>().scaleExtent([0.5, 8]);
    zoomObject.on('zoom', onZoom);
    zoomObject.scaleTo(selector, 1);
    // avoid double click on graph to trigger zoom
    // for more details consult: https://github.com/danielcaldas/react-d3-graph/pull/202
    selector.call(zoomObject).on('dblclick.zoom', null);
  };
  // init drag events
  const graphNodeDragConfig = () => {
    const customNodeDrag = d3Drag<SVGGElement, NodeType>()
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

    d3Select('#microservice-workflow')
      .select<SVGElement>('svg')
      .selectAll<SVGGElement, NodeType>('.node')
      .data(simulationNodes)
      .call(customNodeDrag);
  };

  useEffect(() => {
    // init configuration setup
    zoomConfig();
  }, []);
  useEffect(() => {
    // map inputs to simulation nodes
    // give nodes different coordination to prevent explosion
    setSimulationNodes(
      nodes.map((val, index) => {
        return { index, id: index, x: index * 5, y: index * 0, vx: 0, vy: 0 };
      }),
    );
    // map inputs to simulation links
    setSimulationLinks(
      links.map((val) => {
        return { ...val };
      }),
    );

    refHolder.current = nodes.map((_) => createRef<HTMLDivElement>());
  }, [graph]);
  useEffect(() => {
    // synchronize event listener to simulationNodes update
    graphNodeDragConfig();
    simulation
      .nodes(simulationNodes)
      .on('tick', () => {
        // force re render of component because d3.js is not suited for react
        // and interanlly d3.js is changing states value every tick
        forceUpdate();
      })
      .restart();
  }, [simulationNodes]);
  useEffect(() => {
    // update link force according to simulationLinks updates
    (simulation.force('link') as ForceLink<NodeType, SimulationLinkDatum<NodeType>>).links(simulationLinks);
  }, [simulationLinks]);

  return (
    <div id="microservice-workflow" className="">
      <svg className="w-full h-[80vh] ">
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
            const sourceNode = val.source as NodeType;
            const targetNode = val.target as NodeType;

            const sourceNodeRef = nodeRefs[sourceNode.index];
            const targetNodeRef = nodeRefs[targetNode.index];

            return (
              <Path
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

            return NodeComponent ? (
              <NodeComponent node={node} />
            ) : (
              <TopicNode title={'awesome title'} ref={nodeRefs[index]} key={index} {...val} />
            );
            // return node.isTopic ? (
            //   <TopicNode title={node.title} ref={nodeRefs[index]} key={index} {...val} />
            // ) : (
            //   <MsNode title={node.title} ref={nodeRefs[index]} key={index} {...val} />
            // );
          })}
        </g>
      </svg>
    </div>
  );
}
const Path = ({
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
      // @ts-ignore
      d={`M ${sourceNode.x + sourceOffsetWidth / 2},${sourceNode.y + sourceOffsetHeight / 2} L ${
        targetNode.x + targetOffsetWidth / 2
      } ${
        // @ts-ignore
        targetNode.y + targetOffsetHeight / 2
      }`}
      // strokeLinecap="butt"
      stroke={'gray'}
      strokeWidth={1}
    ></path>
  );
};
const MsNode = forwardRef<HTMLDivElement, { x: number; y: number; title: string }>(({ x, y, title }, ref) => {
  return (
    <g className="node" cx={85} cy={32} transform={`translate(${x},${y})`}>
      <foreignObject x="0" y="0" className="w-1 h-1 overflow-visible">
        <MicroserviceCard ref={ref} name={title} />
      </foreignObject>
    </g>
  );
});
const TopicNode = forwardRef<HTMLDivElement, { x: number; y: number; title: string }>(({ x, y, title }, ref) => {
  return (
    <g className="node" cx={85} cy={32} transform={`translate(${x},${y})`}>
      <foreignObject x="0" y="0" className="w-1 h-1 overflow-visible">
        <Topic ref={ref} name={title} />
      </foreignObject>
    </g>
  );
});
const Topic = forwardRef<HTMLDivElement, { name: string }>((params, ref) => {
  const { name } = params;
  return (
    <div
      className="bg-white border-4 whitespace-  border-solid border-gray-300 rounded-xl px-2 min-w-[100px] min-h-[50px] flex justify-center items-center"
      ref={ref}
    >
      <h1 className=" font-bold text-gray-600 text-sm text-center">{name}</h1>
    </div>
  );
});
const MicroserviceCard = forwardRef<HTMLDivElement, { name: string }>((params, ref) => {
  const { name } = params;
  return (
    <div
      ref={ref}
      className="bg-white relative overflow-hidden border border-solid border-gray-400 w-[170px] max-w-[180px]  py-3 flex flex-col justify-center items-center gap-3 hover:scale-[101%] transition-all"
    >
      <span className="animate-animateTop absolute top-0 left-0 w-full h-[3px] bg-gradient-to-l from-[#FFFFFF] to-[#26d926] "></span>
      <span className="animate-animateRight absolute top-0 right-0 h-full w-[3px] bg-gradient-to-t from-[#FFFFFF] to-[#26d926] "></span>
      <span className="animate-animateBottom absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#FFFFFF] to-[#26d926] "></span>
      <span className="animate-animateLeft absolute top-0 left-0 h-full w-[3px] bg-gradient-to-b from-[#FFFFFF] to-[#26d926] "></span>
      <div className="w-full flex flex-col gap-1  p-2">
        <Text title="Microservice Name" value={name} />
      </div>

      {/* <div className="relative rounded-full">
          <div className="overflow-hidden p-2 group transition-all bg-transparent border-2 border-[#FF7900] hover:border-[#FF7900]  rounded flex justify-center items-center cursor-pointer after:absolute after:-z-20 after:content-[''] after:h-full after:inset-0 after:bg-[#FF7900] after:transition-all after:w-0 after:hover:w-full after:rounded">
         
            <span className="font-bold text-[#FF7900] group-hover:text-black">
              More infos
            </span>
          </div>
        </div> */}
    </div>
  );
});
const Text = ({ title, value, inSameLine }: { title: string; value: string; inSameLine?: boolean }) => {
  return (
    <div className={`flex ${!inSameLine ? 'flex-row' : 'flex-col'}  gap-0 relative`}>
      <h4 className=" absolute -top-4 text-xs font-medium text-[#FF7900]">{title}</h4>
      <h1 className="font-bold text-base">{value}</h1>
    </div>
  );
};
