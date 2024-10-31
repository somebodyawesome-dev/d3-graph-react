import { drag as d3Drag, D3DragEvent, SubjectPosition } from 'd3-drag';
import { Simulation, SimulationLinkDatum, forceCenter, forceLink, forceManyBody, forceSimulation } from 'd3-force';
import { createRef, useEffect, useReducer, useRef, useState } from 'react';
import { GraphType, Link, Node, NodeType } from '../Graph';
import { useAwesomeEffect } from '../useAwesomeEffect';
import { useSelectorsContext } from './useSelectorProvider';

export function useSimulation<N extends Node, L extends Link>({
  graph,
  linkForce,
  gravityForce,
  chargeForce,
  isNodeDraggable,
}: {
  graph: GraphType<N, L>['graph'];
  linkForce?: { strength: number; length: number };
  gravityForce?: { strength: number; center_x: number; center_y: number };
  chargeForce?: { strength: number };
  isNodeDraggable?: boolean;
}) {
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
  const { svgSelector } = useSelectorsContext();
  useEffect(() => {

    const dragBehavior = d3Drag<SVGGElement, NodeType>();
    const selector = svgSelector().selectAll<SVGGElement, NodeType>('.node');
    const graphNodeDragConfig = () => {
      if (!simulation) return;
      function handleDragStart(ev: D3DragEvent<SVGGElement, NodeType, SubjectPosition>) {
        if (!ev.active) simulation!.alphaTarget(0.3).restart();
      }

      function handleDragging(ev: D3DragEvent<SVGGElement, NodeType, SubjectPosition>, d: NodeType) {
        d.x = ev.x;
        d.y = ev.y;
        d.fx = ev.x;
        d.fy = ev.y;
      }

      function handleDragEnd(ev: D3DragEvent<SVGGElement, NodeType, SubjectPosition>, d: NodeType) {
        if (!ev.active) simulation!.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
      dragBehavior.on('start', handleDragStart).on('drag', handleDragging).on('end', handleDragEnd);

      selector.data(simulationNodes).call(dragBehavior);
    };
    const clearNodeDragConfig = () => {
      selector.on('.drag', null);
    };

    if (isNodeDraggable) graphNodeDragConfig();

    return () => {
      clearNodeDragConfig();
    };
  }, [isNodeDraggable, svgSelector, simulationNodes]);
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
  return {
    simulationNodes,
    simulationLinks,
    nodeRefs,
  };
}
