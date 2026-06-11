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
  ambientAlphaTarget = 0,
  onSimulationCreated,
}: {
  graph: GraphType<N, L>['graph'];
  linkForce?: { strength: number; length: number };
  gravityForce?: { strength: number; center_x: number; center_y: number };
  chargeForce?: { strength: number };
  isNodeDraggable?: boolean;
  ambientAlphaTarget?: number;
  onSimulationCreated?: (simulation: Simulation<NodeType, SimulationLinkDatum<NodeType>>) => void;
}) {
  const [, forceUpdate] = useReducer((x) => !x, false);
  const { nodes, links } = graph;

  const [simulation, setSimulation] = useState<Simulation<NodeType, SimulationLinkDatum<NodeType>> | null>(null);
  const [simulationNodes, setSimulationNodes] = useState<NodeType[]>([]);
  const [simulationLinks, setSimulationLinks] = useState<SimulationLinkDatum<NodeType>[]>([]);
  // create array of reference  to hold nodes references
  const refHolder = useRef(nodes.map((_) => createRef<HTMLDivElement>()));
  const { current: nodeRefs } = refHolder;
  const { svgSelector } = useSelectorsContext();

  // refs so inline callbacks/values from consumers don't re-trigger effects
  const ambientAlphaTargetRef = useRef(ambientAlphaTarget);
  ambientAlphaTargetRef.current = ambientAlphaTarget;
  const onSimulationCreatedRef = useRef(onSimulationCreated);
  onSimulationCreatedRef.current = onSimulationCreated;

  useAwesomeEffect(() => {
    // map inputs to simulation nodes
    // give nodes different coordination to prevent explosion
    const simNodes: NodeType[] = nodes.map((node, index) => {
      return { index, id: node.id ?? index, x: index * 5, y: 0, vx: 0, vy: 0 };
    });
    setSimulationNodes(simNodes);
    // map inputs to simulation links, resolving endpoints to node objects
    // up-front so links render even when no link force is configured
    setSimulationLinks(
      links.map((val) => {
        return { ...val, source: simNodes[val.source] ?? val.source, target: simNodes[val.target] ?? val.target };
      }),
    );

    refHolder.current = nodes.map((_) => createRef<HTMLDivElement>());

    const sim = forceSimulation<NodeType, SimulationLinkDatum<NodeType>>()
      .nodes(simNodes)
      .on('tick', () => {
        // force re render of component because d3.js is not suited for react
        // and interanlly d3.js is changing states value every tick
        forceUpdate();
      });
    setSimulation(sim);
    onSimulationCreatedRef.current?.(sim);

    return () => {
      sim.on('tick', null);
      sim.stop();
    };
  }, [graph]);

  // refs attach during the commit that rendered the new nodes; re-render once
  // so links can measure node dimensions even when the simulation is idle
  useEffect(() => {
    if (simulationNodes.length) forceUpdate();
  }, [simulationNodes]);

  useEffect(() => {
    if (!simulation) return;
    simulation.alphaTarget(ambientAlphaTarget);
    if (ambientAlphaTarget > 0) simulation.restart();
  }, [simulation, ambientAlphaTarget]);

  useEffect(() => {
    if (!isNodeDraggable || !simulation || simulationNodes.length === 0) return;

    const selector = svgSelector().selectAll<SVGGElement, NodeType>('.node');

    function handleDragStart(ev: D3DragEvent<SVGGElement, NodeType, SubjectPosition>) {
      if (!ev.active) simulation!.alphaTarget(Math.max(0.3, ambientAlphaTargetRef.current)).restart();
    }

    function handleDragging(ev: D3DragEvent<SVGGElement, NodeType, SubjectPosition>, d: NodeType) {
      d.x = ev.x;
      d.y = ev.y;
      d.fx = ev.x;
      d.fy = ev.y;
    }

    function handleDragEnd(ev: D3DragEvent<SVGGElement, NodeType, SubjectPosition>, d: NodeType) {
      if (!ev.active) simulation!.alphaTarget(ambientAlphaTargetRef.current);
      d.fx = null;
      d.fy = null;
    }

    const dragBehavior = d3Drag<SVGGElement, NodeType>()
      .on('start', handleDragStart)
      .on('drag', handleDragging)
      .on('end', handleDragEnd);
    selector.data(simulationNodes).call(dragBehavior);

    return () => {
      selector.on('.drag', null);
    };
  }, [isNodeDraggable, svgSelector, simulation, simulationNodes]);

  // primitive deps: consumers commonly pass inline force objects on every
  // render, so depending on object identity would re-run these every frame
  const chargeStrength = chargeForce?.strength;
  useEffect(() => {
    if (!simulation) return;
    if (chargeStrength === undefined) {
      simulation.force('charge', null);
      return;
    }
    simulation.force('charge', forceManyBody().strength(chargeStrength));
    simulation.alpha(1).restart();
    return () => {
      simulation.force('charge', null);
    };
  }, [simulation, chargeStrength]);

  const gravityStrength = gravityForce?.strength;
  const gravityCenterX = gravityForce?.center_x;
  const gravityCenterY = gravityForce?.center_y;
  useEffect(() => {
    if (!simulation) return;
    if (gravityStrength === undefined || gravityCenterX === undefined || gravityCenterY === undefined) {
      simulation.force('center', null);
      return;
    }
    simulation.force('center', forceCenter(gravityCenterX, gravityCenterY).strength(gravityStrength));
    simulation.alpha(1).restart();
    return () => {
      simulation.force('center', null);
    };
  }, [simulation, gravityStrength, gravityCenterX, gravityCenterY]);

  const linkStrength = linkForce?.strength;
  const linkLength = linkForce?.length;
  useEffect(() => {
    if (!simulation) return;
    if (linkStrength === undefined || linkLength === undefined) {
      simulation.force('link', null);
      return;
    }
    simulation.force(
      'link',
      forceLink<NodeType, SimulationLinkDatum<NodeType>>()
        .id((d) => d.index)
        .strength(linkStrength)
        .distance(linkLength)
        .links(simulationLinks),
    );
    simulation.alpha(1).restart();
    return () => {
      simulation.force('link', null);
    };
  }, [simulation, linkStrength, linkLength, simulationLinks]);

  return {
    simulation,
    simulationNodes,
    simulationLinks,
    nodeRefs,
  };
}
