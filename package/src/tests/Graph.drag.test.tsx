import { act, fireEvent, render } from '@testing-library/react';
import { Graph } from '../Graph';
import { createSimCapture, sampleGraph, tickSim } from './testUtils';

// d3-drag listens for mousedown on the node (event.view must be window) and
// registers mousemove/mouseup on event.view — so move/up target window.
const dragStart = (el: Element, x: number, y: number) =>
  fireEvent.mouseDown(el, { view: window, button: 0, clientX: x, clientY: y });
const dragMove = (x: number, y: number) => fireEvent.mouseMove(window, { view: window, clientX: x, clientY: y });
const dragEnd = (x: number, y: number) => fireEvent.mouseUp(window, { view: window, clientX: x, clientY: y });

describe('<Graph /> drag interaction', () => {
  it('pins the node under the cursor while dragging and releases it after', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} chargeForce={{ strength: -30 }} onSimulationCreated={cap.capture} />,
    );
    const sim = cap.current;
    act(() => sim.stop());

    const nodeEl = container.querySelectorAll('.node')[0];
    const datum = sim.nodes()[0];
    // initial seeded position: node 0 sits at (0, 0)
    expect(datum.x).toBe(0);
    expect(datum.y).toBe(0);

    dragStart(nodeEl, 10, 10);
    dragMove(60, 45); // moved +50/+35 from the press point
    expect(datum.fx).toBeCloseTo(50);
    expect(datum.fy).toBeCloseTo(35);

    // while pinned, a tick must move the node exactly to its fixed position
    tickSim(sim, 1);
    expect(nodeEl.getAttribute('transform')).toBe('translate(50,35)');

    dragEnd(60, 45);
    expect(datum.fx).toBeNull();
    expect(datum.fy).toBeNull();
  });

  it('reheats the simulation on drag start and cools it back down on drag end', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} chargeForce={{ strength: -30 }} onSimulationCreated={cap.capture} />,
    );
    const sim = cap.current;
    act(() => sim.stop());

    const nodeEl = container.querySelectorAll('.node')[0];
    dragStart(nodeEl, 0, 0);
    expect(sim.alphaTarget()).toBeCloseTo(0.3);
    dragMove(20, 20);
    dragEnd(20, 20);
    expect(sim.alphaTarget()).toBe(0);
    act(() => sim.stop());
  });

  it('physics still works after a previous drag has ended (regression)', () => {
    // the original bug: drag end froze alphaTarget handling so the graph
    // never came back to life on the next interaction
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} chargeForce={{ strength: -30 }} onSimulationCreated={cap.capture} />,
    );
    const sim = cap.current;
    act(() => sim.stop());
    const nodeEl = container.querySelectorAll('.node')[0];

    // first interaction
    dragStart(nodeEl, 0, 0);
    dragMove(30, 30);
    dragEnd(30, 30);
    act(() => sim.stop());

    // simulate a fully settled graph
    act(() => {
      sim.alpha(0);
    });

    // second interaction must reheat the physics again
    dragStart(nodeEl, 30, 30);
    expect(sim.alphaTarget()).toBeCloseTo(0.3);
    tickSim(sim, 5);
    expect(sim.alpha()).toBeGreaterThan(0); // climbing back toward the 0.3 target
    dragMove(80, 80);
    expect(sim.nodes()[0].fx).not.toBeNull();
    dragEnd(80, 80);
    expect(sim.alphaTarget()).toBe(0);
    act(() => sim.stop());
  });

  it('restores the ambient alpha target on drag end when one is configured', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} ambientAlphaTarget={0.1} onSimulationCreated={cap.capture} />,
    );
    const sim = cap.current;
    act(() => sim.stop());

    const nodeEl = container.querySelectorAll('.node')[0];
    dragStart(nodeEl, 0, 0);
    expect(sim.alphaTarget()).toBeCloseTo(0.3);
    dragEnd(0, 0);
    expect(sim.alphaTarget()).toBeCloseTo(0.1);
    act(() => sim.stop());
  });

  it('does not drag when isNodeDraggable is false', () => {
    const cap = createSimCapture();
    const { container } = render(
      <Graph graph={sampleGraph()} isNodeDraggable={false} onSimulationCreated={cap.captureAndStop} />,
    );
    const sim = cap.current;

    const nodeEl = container.querySelectorAll('.node')[0];
    dragStart(nodeEl, 0, 0);
    dragMove(50, 50);
    expect(sim.nodes()[0].fx).toBeUndefined();
    expect(sim.nodes()[0].x).toBe(0);
    dragEnd(50, 50);
  });

  it('keeps drag working after re-renders with churned inline props', () => {
    const cap = createSimCapture();
    const graph = sampleGraph();
    const { container, rerender } = render(
      <Graph graph={graph} chargeForce={{ strength: -30 }} onSimulationCreated={cap.capture} />,
    );
    const sim = cap.current;
    act(() => sim.stop());

    // consumer-style churn: fresh inline objects/functions on every render
    rerender(
      <Graph
        graph={graph}
        chargeForce={{ strength: -30 }}
        onZoom={() => undefined}
        onSimulationCreated={cap.capture}
      />,
    );
    rerender(
      <Graph
        graph={graph}
        chargeForce={{ strength: -30 }}
        onZoom={() => undefined}
        onSimulationCreated={cap.capture}
      />,
    );
    expect(cap.sims).toHaveLength(1);

    const nodeEl = container.querySelectorAll('.node')[0];
    dragStart(nodeEl, 0, 0);
    dragMove(25, 15);
    expect(sim.nodes()[0].fx).toBeCloseTo(25);
    expect(sim.nodes()[0].fy).toBeCloseTo(15);
    dragEnd(25, 15);
    act(() => sim.stop());
  });
});
