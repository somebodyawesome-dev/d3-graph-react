import { act, fireEvent, render } from '@testing-library/react';
import { Graph } from '../Graph';
import { createSimCapture, sampleGraph } from './testUtils';

const panStart = (el: Element, x: number, y: number) =>
  fireEvent.mouseDown(el, { view: window, button: 0, clientX: x, clientY: y });
const panMove = (x: number, y: number) => fireEvent.mouseMove(window, { view: window, clientX: x, clientY: y });
const panEnd = (x: number, y: number) => fireEvent.mouseUp(window, { view: window, clientX: x, clientY: y });

describe('<Graph /> zoom & pan interaction', () => {
  it('applies a wheel zoom to the inner g element', () => {
    const cap = createSimCapture();
    const { container } = render(<Graph graph={sampleGraph()} onSimulationCreated={cap.captureAndStop} />);
    const svg = container.querySelector('svg')!;
    const g = svg.querySelector('g')!;

    expect(g.getAttribute('transform')).toBeNull();
    fireEvent.wheel(svg, { deltaY: -120, clientX: 0, clientY: 0 });
    const transform = g.getAttribute('transform')!;
    expect(transform).toMatch(/scale\(/);
    expect(transform).not.toMatch(/scale\(1\)/);
  });

  it('preserves the viewport across re-renders with churned inline zoom props (regression)', () => {
    // the original bug: inline zoomScale/onZoom props re-initialized the zoom
    // behavior on every render (i.e. every simulation tick), wiping or
    // freezing the user's pan/zoom
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { container, rerender } = render(
      <Graph graph={graph} zoomScale={[0.5, 8]} onZoom={() => undefined} onSimulationCreated={cap.captureAndStop} />,
    );
    const svg = container.querySelector('svg')!;
    const g = svg.querySelector('g')!;

    fireEvent.wheel(svg, { deltaY: -120, clientX: 100, clientY: 100 });
    const zoomed = g.getAttribute('transform')!;
    expect(zoomed).toBeTruthy();

    for (let i = 0; i < 5; i++) {
      rerender(
        <Graph graph={graph} zoomScale={[0.5, 8]} onZoom={() => undefined} onSimulationCreated={cap.captureAndStop} />,
      );
    }
    expect(g.getAttribute('transform')).toBe(zoomed);
  });

  it('keeps an in-flight pan gesture tracking across prop-churn re-renders (regression)', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { container, rerender } = render(
      <Graph graph={graph} zoomScale={[0.5, 8]} onZoom={() => undefined} onSimulationCreated={cap.captureAndStop} />,
    );
    const svg = container.querySelector('svg')!;
    const g = svg.querySelector('g')!;

    panStart(svg, 50, 50);
    panMove(70, 60);
    expect(g.getAttribute('transform')).toContain('translate(20,10)');

    // re-render mid-gesture with fresh inline props
    rerender(
      <Graph graph={graph} zoomScale={[0.5, 8]} onZoom={() => undefined} onSimulationCreated={cap.captureAndStop} />,
    );

    panMove(90, 70);
    expect(g.getAttribute('transform')).toContain('translate(40,20)');
    panEnd(90, 70);
  });

  it('invokes the latest onZoom callback even when it changes identity', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const firstSpy = jest.fn();
    const { container, rerender } = render(
      <Graph graph={graph} onZoom={firstSpy} onSimulationCreated={cap.captureAndStop} />,
    );
    const svg = container.querySelector('svg')!;

    fireEvent.wheel(svg, { deltaY: -120, clientX: 0, clientY: 0 });
    expect(firstSpy).toHaveBeenCalledTimes(1);

    const secondSpy = jest.fn();
    rerender(<Graph graph={graph} onZoom={secondSpy} onSimulationCreated={cap.captureAndStop} />);
    fireEvent.wheel(svg, { deltaY: -120, clientX: 0, clientY: 0 });
    expect(secondSpy).toHaveBeenCalledTimes(1);
    expect(firstSpy).toHaveBeenCalledTimes(1);
  });

  it('clamps the scale when the zoom extent shrinks below the current zoom', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { container, rerender } = render(
      <Graph graph={graph} zoomScale={[0.5, 8]} onSimulationCreated={cap.captureAndStop} />,
    );
    const svg = container.querySelector('svg')!;
    const g = svg.querySelector('g')!;

    fireEvent.wheel(svg, { deltaY: -120, clientX: 0, clientY: 0 }); // k ≈ 1.18
    rerender(<Graph graph={graph} zoomScale={[2, 8]} onSimulationCreated={cap.captureAndStop} />);
    expect(g.getAttribute('transform')).toMatch(/scale\(2\)/);
  });

  it('keeps double click disabled for zooming', () => {
    const cap = createSimCapture();
    const { container } = render(<Graph graph={sampleGraph()} onSimulationCreated={cap.captureAndStop} />);
    const svg = container.querySelector('svg')!;
    const g = svg.querySelector('g')!;

    fireEvent.dblClick(svg, { view: window, clientX: 10, clientY: 10 });
    expect(g.getAttribute('transform')).toBeNull();
  });

  it('does not interrupt panning while the simulation is ticking', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} chargeForce={{ strength: -30 }} onSimulationCreated={cap.capture} />,
    );
    const sim = cap.current;
    act(() => sim.stop());
    const svg = container.querySelector('svg')!;
    const g = svg.querySelector('g')!;

    panStart(svg, 0, 0);
    panMove(10, 10);
    // a tick-driven render in the middle of the gesture
    act(() => {
      sim.tick(1);
      const listener = sim.on('tick') as (() => void) | undefined;
      if (listener) listener();
    });
    panMove(30, 25);
    expect(g.getAttribute('transform')).toContain('translate(30,25)');
    panEnd(30, 25);
  });
});
