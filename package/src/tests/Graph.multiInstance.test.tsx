import { act, fireEvent, render } from '@testing-library/react';
import { Graph } from '../Graph';
import { createSimCapture, sampleGraph } from './testUtils';

describe('multiple <Graph /> instances on the same page', () => {
  const renderTwoGraphs = () => {
    const capA = createSimCapture();
    const capB = createSimCapture();
    const utils = render(
      <>
        <Graph graph={sampleGraph()} onSimulationCreated={capA.captureAndStop} />
        <Graph
          graph={{ nodes: [{ id: 'one' }, { id: 'two' }], links: [{ source: 0, target: 1 }] }}
          onSimulationCreated={capB.captureAndStop}
        />
      </>,
    );
    const svgs = utils.container.querySelectorAll('svg');
    return { ...utils, capA, capB, svgA: svgs[0], svgB: svgs[1] };
  };

  it('renders both graphs with their own nodes', () => {
    const { svgA, svgB } = renderTwoGraphs();
    expect(svgA.querySelectorAll('.node')).toHaveLength(3);
    expect(svgB.querySelectorAll('.node')).toHaveLength(2);
  });

  it('does not emit duplicate default container ids', () => {
    renderTwoGraphs();
    expect(document.querySelectorAll('#container')).toHaveLength(0);
  });

  it('uses distinct arrowhead marker ids per instance', () => {
    const { svgA, svgB } = renderTwoGraphs();
    const markerA = svgA.querySelector('marker')!;
    const markerB = svgB.querySelector('marker')!;
    expect(markerA.id).not.toBe(markerB.id);
    expect(svgA.querySelector('path.link')!.getAttribute('marker-end')).toBe(`url(#${markerA.id})`);
    expect(svgB.querySelector('path.link')!.getAttribute('marker-end')).toBe(`url(#${markerB.id})`);
  });

  it('zooming one graph does not affect the other (regression)', () => {
    // the original bug: selections were document-wide id lookups, so every
    // instance's zoom/drag handlers attached to the first matching container
    const { svgA, svgB } = renderTwoGraphs();
    const gA = svgA.querySelector('g')!;
    const gB = svgB.querySelector('g')!;

    fireEvent.wheel(svgB, { deltaY: -120, clientX: 0, clientY: 0 });
    expect(gB.getAttribute('transform')).toMatch(/scale\(/);
    expect(gA.getAttribute('transform')).toBeNull();
  });

  it('dragging a node in one graph does not touch the other (regression)', () => {
    const { svgB, capA, capB } = renderTwoGraphs();
    const simA = capA.current;
    const simB = capB.current;

    const nodeB = svgB.querySelectorAll('.node')[0];
    fireEvent.mouseDown(nodeB, { view: window, button: 0, clientX: 0, clientY: 0 });
    fireEvent.mouseMove(window, { clientX: 40, clientY: 40 });

    expect(simB.nodes()[0].fx).toBeCloseTo(40);
    expect(simA.nodes().every((n) => n.fx === undefined || n.fx === null)).toBe(true);

    fireEvent.mouseUp(window, { view: window, clientX: 40, clientY: 40 });
    act(() => {
      simA.stop();
      simB.stop();
    });
  });
});
