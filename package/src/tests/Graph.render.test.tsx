import { act, render } from '@testing-library/react';
import { Graph, LinkComponentType, NodeComponentType } from '../Graph';
import { createSimCapture, sampleGraph, tickSim } from './testUtils';

describe('<Graph /> rendering', () => {
  it('renders one .node group per node', () => {
    const cap = createSimCapture();
    const { container } = render(<Graph graph={sampleGraph()} onSimulationCreated={cap.captureAndStop} />);
    expect(container.querySelectorAll('.node')).toHaveLength(3);
  });

  it('renders default links even when no linkForce is configured', () => {
    const cap = createSimCapture();
    const { container } = render(<Graph graph={sampleGraph()} onSimulationCreated={cap.captureAndStop} />);

    const links = container.querySelectorAll('path.link');
    expect(links).toHaveLength(2);
    links.forEach((path) => {
      const d = path.getAttribute('d');
      expect(d).toBeTruthy();
      expect(d).not.toContain('NaN');
      expect(d).not.toContain('undefined');
    });
  });

  it('renders default links when a linkForce is configured', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} linkForce={{ strength: 1, length: 100 }} onSimulationCreated={cap.capture} />,
    );
    act(() => cap.current.stop());

    expect(container.querySelectorAll('path.link')).toHaveLength(2);
  });

  it('skips links that reference missing nodes instead of crashing', () => {
    const cap = createSimCapture();
    const graph = {
      nodes: [{ id: 'a' }, { id: 'b' }],
      links: [
        { source: 0, target: 1 },
        { source: 0, target: 99 },
      ],
    };
    const { container } = render(<Graph graph={graph} onSimulationCreated={cap.captureAndStop} />);
    expect(container.querySelectorAll('path.link')).toHaveLength(1);
  });

  it('uses a per-instance marker id referenced by the default links', () => {
    const cap = createSimCapture();
    const { container } = render(<Graph graph={sampleGraph()} onSimulationCreated={cap.captureAndStop} />);

    const marker = container.querySelector('marker')!;
    expect(marker.id).toBeTruthy();
    const link = container.querySelector('path.link')!;
    expect(link.getAttribute('marker-end')).toBe(`url(#${marker.id})`);
  });

  it('passes user data to custom node and link components', () => {
    const cap = createSimCapture();
    type N = { id: string; label: string };
    const graph = {
      nodes: [
        { id: 'a', label: 'Node A' },
        { id: 'b', label: 'Node B' },
      ],
      links: [{ source: 0, target: 1 }],
    };
    const NodeComponent: NodeComponentType<N> = ({ node }) => <span data-testid={`node-${node.id}`}>{node.label}</span>;
    const linkSpy = jest.fn((_props: any) => null);

    const { getByTestId } = render(
      <Graph
        graph={graph}
        NodeComponent={NodeComponent}
        LinkComponent={linkSpy as unknown as LinkComponentType<{ source: number; target: number }>}
        onSimulationCreated={cap.captureAndStop}
      />,
    );

    expect(getByTestId('node-a').textContent).toBe('Node A');
    expect(getByTestId('node-b').textContent).toBe('Node B');
    expect(linkSpy).toHaveBeenCalled();
    const props = linkSpy.mock.calls[0][0] as any;
    expect(props.sourceNode.id).toBe('a');
    expect(props.targetNode.id).toBe('b');
    expect(props.link).toEqual(graph.links[0]);
  });

  it('moves node positions when the simulation ticks', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} chargeForce={{ strength: -50 }} onSimulationCreated={cap.capture} />,
    );
    act(() => cap.current.stop());

    const node = container.querySelectorAll('.node')[0];
    const before = node.getAttribute('transform');
    tickSim(cap.current, 50);
    expect(node.getAttribute('transform')).not.toBe(before);
    expect(node.getAttribute('transform')).not.toContain('NaN');
  });

  it('keeps rendering and ticking after the graph prop is replaced', () => {
    const cap = createSimCapture();
    const { container, rerender } = render(<Graph graph={sampleGraph()} onSimulationCreated={cap.captureAndStop} />);

    rerender(
      <Graph
        graph={{ nodes: [{ id: 'x' }, { id: 'y' }], links: [{ source: 0, target: 1 }] }}
        onSimulationCreated={cap.captureAndStop}
      />,
    );

    expect(cap.sims).toHaveLength(2);
    expect(container.querySelectorAll('.node')).toHaveLength(2);
    expect(container.querySelectorAll('path.link')).toHaveLength(1);
    tickSim(cap.current, 10);
    expect(container.querySelectorAll('.node')[0].getAttribute('transform')).not.toContain('NaN');
  });
});
